# EPOSTCARD — Railway PHP edition

This standalone edition uses plain HTML/CSS/JavaScript in the browser and PHP + Apache on the server. It does not require Node.js at runtime, a SQL database, or Manus storage credentials. The existing React/Express app at the repository root is kept intact.

## Railway setup

1. Add this `railway-php` directory to the GitHub repository, then create a Railway project from that repository. Set the service's **Root Directory** to `/railway-php` so Railway uses this directory's `Dockerfile`.
2. Attach a Railway Volume to the service and set its mount path to `/app/data`. The app stores postcard JSON, media files, and PHP session files there.
3. In the Railway service's **Variables**, set `EDITOR_PASSWORD` to a password you choose. Do not add quotes around the value. The editor refuses login until this variable is set. This is the only required application variable.
4. Set the service health-check path to `/health.php`.
5. Deploy, then open the domain generated under **Settings → Networking**. The editor opens at `/`; public share links use `/?view=<postcard-id>`.

Railway provides `PORT` and `RAILWAY_VOLUME_MOUNT_PATH` automatically. Do not set `MANUS_API_URL`, `MANUS_API_KEY`, or `DATABASE_URL` for this edition. No SQL/database service is needed.

## Quick verification

Open the site, enter the `EDITOR_PASSWORD`, create a postcard, upload media if desired, and save it. Copy the share link and open it in a private/incognito window; the postcard should be viewable without the editor password. Restart or redeploy the service and confirm the postcard remains available. The existing Manus-hosted storage is separate; its old postcards are not imported automatically.

## Local development

Use PHP 8.3 or newer with the built-in PHP server, set `APP_ENV=development`, `EDITOR_PASSWORD`, and `DATA_DIR` to a writable folder, then run:

```sh
php -S 127.0.0.1:8080 -t public
```

Open `http://127.0.0.1:8080`.
