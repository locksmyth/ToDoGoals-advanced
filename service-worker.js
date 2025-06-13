self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

const timers = [];

function schedule(tasks) {
  const now = Date.now();
  tasks.forEach(task => {
    const time = new Date(`${task.due}T${task.time}:00`).getTime();
    if (time > now) {
      const timeout = time - now;
      const id = setTimeout(() => {
        self.registration.showNotification('Task Reminder', {
          body: task.description,
          tag: `${task.due}-${task.time}-${task.description}`
        });
      }, timeout);
      timers.push(id);
    }
  });
}

self.addEventListener('message', (e) => {
  if (e.data && e.data.type === 'schedule') {
    timers.forEach(t => clearTimeout(t));
    timers.length = 0;
    schedule(e.data.tasks || []);
  }
});
