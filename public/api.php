<?php
declare(strict_types=1);

header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: strict-origin-when-cross-origin');

function json_response(array $payload, int $status = 200): never
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function api_error(string $message, int $status = 400): never
{
    json_response(['error' => $message], $status);
}

set_exception_handler(function (Throwable $error): void {
    error_log('[EPOSTCARD API] ' . $error->getMessage());
    json_response(['error' => 'Server error. Please try again.'], 500);
});

$action = (string)($_GET['action'] ?? '');
if ($action === 'health') {
    json_response(['ok' => true]);
}

$dataRoot = rtrim((string)(getenv('RAILWAY_VOLUME_MOUNT_PATH') ?: getenv('DATA_DIR') ?: (__DIR__ . '/../data')), '/');
if ($dataRoot === '') {
    $dataRoot = '/app/data';
}
if (!is_dir($dataRoot) && !mkdir($dataRoot, 0770, true) && !is_dir($dataRoot)) {
    api_error('Storage directory is not available.', 500);
}
$postcardsDir = $dataRoot . '/postcards';
$sessionsDir = $dataRoot . '/sessions';
foreach ([$postcardsDir, $sessionsDir] as $directory) {
    if (!is_dir($directory) && !mkdir($directory, 0770, true) && !is_dir($directory)) {
        api_error('Storage directory is not available.', 500);
    }
}

function valid_id(string $id): bool
{
    return (bool)preg_match('/^[a-f0-9]{32}$/i', $id);
}

function card_directory(string $root, string $id): string
{
    if (!valid_id($id)) {
        api_error('Invalid postcard link.', 400);
    }
    return $root . '/postcards/' . strtolower($id);
}

function atomic_write(string $path, string $contents): void
{
    $directory = dirname($path);
    if (!is_dir($directory) && !mkdir($directory, 0770, true) && !is_dir($directory)) {
        api_error('Could not create storage folder.', 500);
    }
    $temporary = $path . '.tmp-' . bin2hex(random_bytes(6));
    if (file_put_contents($temporary, $contents, LOCK_EX) === false || !rename($temporary, $path)) {
        @unlink($temporary);
        api_error('Could not save postcard data.', 500);
    }
}

function read_manifest(string $root): array
{
    $path = $root . '/postcards/index.json';
    if (!is_file($path)) {
        return ['version' => 1, 'postcards' => []];
    }
    $decoded = json_decode((string)file_get_contents($path), true);
    if (!is_array($decoded) || !isset($decoded['postcards']) || !is_array($decoded['postcards'])) {
        return ['version' => 1, 'postcards' => []];
    }
    return ['version' => 1, 'postcards' => $decoded['postcards']];
}

function with_manifest_lock(string $root, callable $callback): mixed
{
    $lock = fopen($root . '/postcards/.manifest.lock', 'c');
    if ($lock === false) {
        api_error('Could not lock postcard list.', 500);
    }
    if (!flock($lock, LOCK_EX)) {
        fclose($lock);
        api_error('Could not lock postcard list.', 500);
    }
    try {
        return $callback();
    } finally {
        flock($lock, LOCK_UN);
        fclose($lock);
    }
}

function require_method(string $method): void
{
    if (strtoupper((string)($_SERVER['REQUEST_METHOD'] ?? 'GET')) !== $method) {
        header('Allow: ' . $method);
        api_error('Method not allowed.', 405);
    }
}

function request_json(): array
{
    $raw = file_get_contents('php://input');
    if ($raw === false || $raw === '') {
        api_error('Request body is empty.', 400);
    }
    if (strlen($raw) > 31 * 1024 * 1024) {
        api_error('Request is too large.', 413);
    }
    $decoded = json_decode($raw, true);
    if (!is_array($decoded)) {
        api_error('Invalid JSON request.', 400);
    }
    return $decoded;
}

function editor_authenticated(): bool
{
    return isset($_SESSION['editor_ok']) && $_SESSION['editor_ok'] === true;
}

function require_editor(): void
{
    if (!editor_authenticated()) {
        api_error('Editor login required.', 401);
    }
}

function validate_and_store_media(mixed $value, string $root, string $id, string $label, int &$totalBytes): mixed
{
    if ($value === null || $value === '') {
        return $value;
    }
    if (!is_string($value)) {
        api_error('Invalid image value.', 400);
    }
    if (!str_starts_with($value, 'data:')) {
        if (preg_match('~^https?://~i', $value) || str_starts_with($value, '/api.php?action=media&') || str_starts_with($value, '/manus-storage/')) {
            return $value;
        }
        api_error('Image must be an uploaded image or an HTTP(S) URL.', 400);
    }
    if (!preg_match('~^data:(image/(?:jpeg|png|gif|webp));base64,([A-Za-z0-9+/]+={0,2})$~D', $value, $matches)) {
        api_error('Unsupported image type.', 400);
    }
    $mime = $matches[1];
    $bytes = base64_decode($matches[2], true);
    if ($bytes === false || strlen($bytes) === 0 || strlen($bytes) > 8 * 1024 * 1024) {
        api_error('Each image or GIF must be 8 MB or smaller.', 413);
    }
    $totalBytes += strlen($bytes);
    if ($totalBytes > 20 * 1024 * 1024) {
        api_error('Total image and GIF uploads must be 20 MB or smaller.', 413);
    }
    $signatureOk = match ($mime) {
        'image/png' => substr($bytes, 0, 8) === "\x89PNG\r\n\x1a\n",
        'image/jpeg' => str_starts_with($bytes, "\xff\xd8\xff"),
        'image/gif' => in_array(substr($bytes, 0, 6), ['GIF87a', 'GIF89a'], true),
        'image/webp' => substr($bytes, 0, 4) === 'RIFF' && substr($bytes, 8, 4) === 'WEBP',
        default => false,
    };
    if (!$signatureOk) {
        api_error('The uploaded file does not match its image type.', 400);
    }
    $extension = match ($mime) {
        'image/jpeg' => 'jpg',
        'image/png' => 'png',
        'image/gif' => 'gif',
        default => 'webp',
    };
    $safeLabel = preg_replace('/[^a-z0-9_-]/i', '-', $label) ?: 'media';
    $filename = $safeLabel . '-' . bin2hex(random_bytes(5)) . '.' . $extension;
    $directory = card_directory($root, $id) . '/media';
    if (!is_dir($directory) && !mkdir($directory, 0770, true) && !is_dir($directory)) {
        api_error('Could not create media folder.', 500);
    }
    if (file_put_contents($directory . '/' . $filename, $bytes, LOCK_EX) === false) {
        api_error('Could not save image.', 500);
    }
    return '/api.php?action=media&id=' . strtolower($id) . '&file=' . rawurlencode($filename);
}

function store_card_media(array $card, string $root, string $id): array
{
    $totalBytes = 0;
    if (array_key_exists('photo', $card)) {
        $card['photo'] = validate_and_store_media($card['photo'], $root, $id, 'photo', $totalBytes);
    }
    if (isset($card['flow']) && is_array($card['flow'])) {
        foreach ($card['flow'] as $stepIndex => &$step) {
            if (!is_array($step)) {
                continue;
            }
            foreach (['image', 'gif'] as $field) {
                if (array_key_exists($field, $step)) {
                    $step[$field] = validate_and_store_media($step[$field], $root, $id, 'flow-' . $stepIndex . '-' . $field, $totalBytes);
                }
            }
        }
        unset($step);
    }
    return $card;
}

function remove_tree(string $path): void
{
    if (!is_dir($path)) {
        @unlink($path);
        return;
    }
    $items = scandir($path);
    if ($items === false) {
        return;
    }
    foreach ($items as $item) {
        if ($item === '.' || $item === '..') {
            continue;
        }
        $child = $path . '/' . $item;
        if (is_dir($child)) {
            remove_tree($child);
        } else {
            @unlink($child);
        }
    }
    @rmdir($path);
}

if ($action === 'media') {
    $id = (string)($_GET['id'] ?? '');
    $filename = (string)($_GET['file'] ?? '');
    if (!valid_id($id) || !preg_match('/^[a-z0-9_-]+\.(?:jpg|png|gif|webp)$/i', $filename)) {
        http_response_code(404);
        exit;
    }
    $path = card_directory($dataRoot, $id) . '/media/' . $filename;
    if (!is_file($path)) {
        http_response_code(404);
        exit;
    }
    $mime = match (strtolower(pathinfo($filename, PATHINFO_EXTENSION))) {
        'jpg' => 'image/jpeg',
        'png' => 'image/png',
        'gif' => 'image/gif',
        'webp' => 'image/webp',
        default => 'application/octet-stream',
    };
    header('Content-Type: ' . $mime);
    header('Content-Length: ' . (string)filesize($path));
    header('Cache-Control: public, max-age=86400');
    readfile($path);
    exit;
}

if ($action === 'load') {
    $id = (string)($_GET['id'] ?? '');
    $path = card_directory($dataRoot, $id) . '/card.json';
    if (!is_file($path)) {
        api_error('Postcard not found.', 404);
    }
    $card = json_decode((string)file_get_contents($path), true);
    if (!is_array($card)) {
        api_error('Postcard data is invalid.', 500);
    }
    json_response(['id' => strtolower($id), 'card' => $card]);
}

$sessionActions = ['auth', 'login', 'logout', 'list', 'save', 'delete'];
if (in_array($action, $sessionActions, true)) {
    session_save_path($sessionsDir);
    session_name('airpost_editor');
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'secure' => (getenv('APP_ENV') === 'production') || isset($_SERVER['HTTPS']),
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
    session_start();
}

if ($action === 'auth') {
    $configured = trim((string)getenv('EDITOR_PASSWORD')) !== '';
    json_response(['authenticated' => editor_authenticated(), 'configured' => $configured]);
}

if ($action === 'login') {
    require_method('POST');
    $configuredPassword = (string)getenv('EDITOR_PASSWORD');
    if ($configuredPassword === '') {
        api_error('Set EDITOR_PASSWORD in the hosting service variables first.', 503);
    }
    $body = request_json();
    $password = (string)($body['password'] ?? '');
    if (!hash_equals($configuredPassword, $password)) {
        api_error('Password မှားနေပါတယ်။ ပြန်စမ်းကြည့်ပါ။', 401);
    }
    session_regenerate_id(true);
    $_SESSION['editor_ok'] = true;
    json_response(['ok' => true]);
}

if ($action === 'logout') {
    require_method('POST');
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $cookie = session_get_cookie_params();
        setcookie(session_name(), '', [
            'expires' => time() - 42000,
            'path' => $cookie['path'],
            'secure' => (bool)$cookie['secure'],
            'httponly' => (bool)$cookie['httponly'],
            'samesite' => $cookie['samesite'] ?: 'Lax',
        ]);
    }
    session_destroy();
    json_response(['ok' => true]);
}

if ($action === 'list') {
    require_method('GET');
    require_editor();
    json_response(read_manifest($dataRoot));
}

if ($action === 'save') {
    require_method('POST');
    require_editor();
    $body = request_json();
    $id = (string)($body['id'] ?? '');
    if ($id === '') {
        $id = bin2hex(random_bytes(16));
    }
    if (!valid_id($id)) {
        api_error('Invalid postcard id.', 400);
    }
    $id = strtolower($id);
    $name = trim((string)($body['name'] ?? ''));
    $card = $body['card'] ?? null;
    if ($name === '' || strlen($name) > 180 || !is_array($card)) {
        api_error('Postcard name and content are required.', 400);
    }
    if (isset($card['flow']) && is_array($card['flow']) && count($card['flow']) > 30) {
        api_error('A postcard can have at most 30 flow cards.', 400);
    }
    $storedCard = store_card_media($card, $dataRoot, $id);
    $cardPath = card_directory($dataRoot, $id) . '/card.json';
    atomic_write($cardPath, json_encode($storedCard, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
    $entry = [
        'id' => $id,
        'name' => $name,
        'to' => (string)($storedCard['to'] ?? ''),
        'occasion' => (string)($storedCard['occasion'] ?? ''),
        'theme' => (string)($storedCard['theme'] ?? 'sky'),
        'updatedAt' => gmdate('c'),
    ];
    $manifest = with_manifest_lock($dataRoot, function () use ($dataRoot, $entry): array {
        $current = read_manifest($dataRoot);
        $postcards = array_values(array_filter($current['postcards'], fn ($item) => !is_array($item) || ($item['id'] ?? '') !== $entry['id']));
        array_unshift($postcards, $entry);
        $current = ['version' => 1, 'postcards' => array_slice($postcards, 0, 1000)];
        atomic_write($dataRoot . '/postcards/index.json', json_encode($current, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
        return $current;
    });
    json_response(['id' => $id, 'name' => $name, 'card' => $storedCard, 'postcards' => $manifest['postcards']]);
}

if ($action === 'delete') {
    require_method('POST');
    require_editor();
    $body = request_json();
    $id = (string)($body['id'] ?? '');
    if (!valid_id($id)) {
        api_error('Invalid postcard id.', 400);
    }
    $id = strtolower($id);
    with_manifest_lock($dataRoot, function () use ($dataRoot, $id): void {
        $current = read_manifest($dataRoot);
        $current['postcards'] = array_values(array_filter($current['postcards'], fn ($item) => !is_array($item) || ($item['id'] ?? '') !== $id));
        atomic_write($dataRoot . '/postcards/index.json', json_encode($current, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
    });
    remove_tree(card_directory($dataRoot, $id));
    json_response(['ok' => true]);
}

api_error('Unknown action.', 404);
