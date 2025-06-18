# To Do Goals

A minimal dark-mode, browser-based task planner that supports:

- `todo.txt` parsing with `due:` and `time:` support
- Task grouping by date and sorting by time
- Context-aware color coding using `@context` (e.g., `@home`, `@work`)
- Task priority coloring via `(A)`, `(B)`, etc.
- Support for loading from file and storing locally
- Browser notifications for upcoming tasks
- Persistent reminders via a service worker when loaded over HTTPS or on `localhost`

## Features
- Only shows **today and future** tasks
- Color-coded based on tags
- Lightweight and offline-capable
- Automatically saves your last file to local storage
- Notification reminders for upcoming due times
- Mark tasks as done with a button
- Overdue tasks turn red until completed

## Usage
1. Open `to_do_goals.html` in your browser.
2. Upload your `todo.txt` file.
3. Tasks will be grouped by date and displayed in order.
4. Notifications require enabling permissions in the browser.
5. For persistent reminders after closing the page, open the planner from a secure origin (`https:` or `http://localhost`).

## Format Support
Tasks should include a description followed by `due:` and `time:` fields. A
priority like `(A)` can be placed at the beginning but is optional.

```
(A) Task description @context +project due:YYYY-MM-DD time:HH:MM
```

Example without priority:
```
😴 Nap before shift (1h) @home +rest due:2025-06-15 time:22:00
```

## Notes
- Works fully offline
- Tasks are stored locally between sessions
- Notifications appear based on `due:` and `time:` fields

## Hosting on Ubuntu
To host the planner on an Ubuntu server:
1. Install a web server such as **nginx** or, for quick tests, run `python3 -m http.server`.
2. Copy the repository files (e.g., `index.html`, `to_do_goals.html`, and `service-worker.js`) into your web root, often `/var/www/html` for nginx.
3. Enable HTTPS so the service worker can schedule persistent reminders. Tools like **Let's Encrypt** make it easy to obtain free certificates.
4. For local development you can simply use `http://localhost`, which counts as a secure origin for service workers.

## Server-side Login
This repository now includes a small Node.js server that provides a
basic login system. To start the server run:

```bash
node server.js
```

The default credentials are `admin` / `admin`. After starting the server
navigate to `http://localhost:3000` and log in. The planner will only be
accessible once logged in, and the session persists across page reloads
until you log out.

## License

This project is licensed under the [MIT License](LICENSE).
