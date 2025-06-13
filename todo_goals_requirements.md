# To Do Goals Project: Custom Requirements for `todo.txt` File Integration

This document outlines the specific structure and expectations for `todo.txt` entries used with the To Do Goals planner. It is designed for developers, contributors, and automation scripts working within this dedicated project.

---

## 🧾 Supported Task Format
Each task must follow this structure **exactly** for it to be parsed and displayed correctly in the planner:

```
(PRIORITY) Task description @context +project due:YYYY-MM-DD time:HH:MM
```

### 🔹 Elements Explained
- `(A)` — Priority level (A = highest). Optional but supported.
- `Task description` — Required free text description. This must be **one continuous string**, not broken by `due:` or `time:` keywords.
- `@context` — Optional. Used for color coding and filtering (e.g., `@home`, `@work`).
- `+project` — Optional. Allows future tagging and grouping.
- `due:` — Required. Date in `YYYY-MM-DD` format. Tasks with past due dates are **not shown**.
- `time:` — Required. Time in `HH:MM` 24-hour format. Used for time sorting and notifications.

### ✅ Valid Examples
With priority:
```
(A) Take Daisy to the vet @errands +pets due:2025-06-09 time:14:00
```

Without priority:
```
😴 Nap before shift (1h) @home +rest due:2025-06-15 time:22:00
```

### ❌ Invalid Examples
```
Take out trash (missing due and time)
(A) Task without date or time
Task with incorrect date format due:06-09-2025
```

---

## 🗂️ Planner Behavior
- **Filters out** past due dates (before today’s date).
- **Groups tasks** by due date.
- **Sorts tasks** within each group by `time:`.
- **Color codes** based on `@context` (e.g. `@home`, `@evening`, `@work`).
- **Displays notifications** if permission granted and current time < due time.

---

## 📦 File Usage
- Must be a plain text file: `.txt`
- Uploaded manually through the file input or persisted via browser local storage
- Automatically reloaded on page refresh if stored in browser

---

## 🔔 Notifications
- Triggered for tasks with `due:` date equal to today and future `time:`.
- Only work if browser notification permissions are granted.
- When opened over HTTPS or on `localhost`, a service worker schedules future reminders so they appear even after closing the page.
- If loaded from an insecure origin (e.g. `file://`), reminders only fire while the tab remains open.

---

## 🛠 Future Features (Planned)
- Recurring task support
- Editable planner UI
- Tag filters and custom views
- Google Calendar integration (ICS + API)
- Exporting planner state back into `todo.txt`

---

For issues or suggestions, please open a GitHub issue or submit a PR with documentation updates.
