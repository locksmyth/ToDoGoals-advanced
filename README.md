# To Do Goals

A minimal dark-mode, browser-based task planner that supports:

- `todo.txt` parsing with `due:` and `time:` support
- Task grouping by date and sorting by time
- Context-aware color coding using `@context` (e.g., `@home`, `@work`)
- Task priority coloring via `(A)`, `(B)`, etc.
- Support for loading from file and storing locally
- Browser notifications for upcoming tasks

## Features
- Only shows **today and future** tasks
- Color-coded based on tags
- Lightweight and offline-capable
- Automatically saves your last file to local storage
- Notification reminders for upcoming due times

## Usage
1. Open `to_do_goals.html` in your browser.
2. Upload your `todo.txt` file.
3. Tasks will be grouped by date and displayed in order.
4. Notifications require enabling permissions in the browser.

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
