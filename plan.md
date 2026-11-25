# Railway PHP edition implementation plan

## Goal

Add a separate deployable edition of EPOSTCARD for Railway without replacing the existing React/Express app. The new edition uses plain HTML, CSS and browser JavaScript, with PHP as the only server runtime. It uses no Node.js at runtime and no SQL database.

## Architecture

- `public/index.html`, `styles.css`, and `app.js` provide a responsive Burmese-language editor and public postcard viewer, reusing the existing EPOSTCARD visual direction, themes, templates, flow cards, configurable buttons and media support.
- `public/api.php` provides the PHP API. `EDITOR_PASSWORD` is read from Railway service variables. Editor actions (list, save, delete) require a password-authenticated session. Public postcard loading and image delivery do not require editor login.
- Postcard JSON, uploaded media and PHP session files are stored under a Railway Volume mounted at `/app/data`. Files are not stored in localStorage or an SQL database.
- The Dockerfile uses PHP + Apache, honors Railway's injected `PORT`, and exposes `/health.php` for health checks.
- The existing repository root and current Manus/React project remain unchanged; Railway should use `railway-php` as its root directory.

## Project structure

- `public/` — standalone HTML, CSS, JavaScript, PHP API and health endpoint.
- `docker/entrypoint.sh` — maps Apache to Railway's runtime `PORT` and prepares the data directory.
- `Dockerfile` — PHP/Apache runtime image; no Node build or SQL service.
- `README.md` — Railway deployment instructions, required variable, volume mount and verification steps.
