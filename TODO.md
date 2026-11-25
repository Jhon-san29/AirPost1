# Railway PHP edition TODO

- [x] **Build a separate non-Node EPOSTCARD edition** — Use HTML, CSS, browser JavaScript and PHP; require no Node.js at runtime and do not replace the existing React/Express app.
- [x] **Password-protect the editor** — Read the editor secret from `EDITOR_PASSWORD`; require an authenticated editor session for listing, saving, and deleting postcards; keep public share links accessible without the editor password.
- [x] **Persist without SQL** — Store postcard JSON, media, and session files under the Railway Volume mount `/app/data`; do not use localStorage, Manus storage credentials, or SQL.
- [x] **Preserve postcard creation behavior** — Edit recipient, sender, occasion, message, envelope label, themes, templates, flow text/media, flow order, and each flow's configurable buttons/actions; allow at least one and up to eight buttons per flow.
- [x] **Provide compact public share links** — Save card JSON and uploaded images/GIFs as server-side files; share links contain a short opaque postcard ID rather than the postcard JSON or base64 media; public recipients can open the link and view the interactive flow.
- [x] **Package for Railway** — Include PHP/Apache Dockerfile, honor Railway `PORT`, provide `/health.php`, document Root Directory `railway-php`, volume mount and `EDITOR_PASSWORD` setup.
