// Troky : réception des notifications sur le téléphone
self.addEventListener('push', e => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (x) { d = { title: 'Troky', body: e.data ? e.data.text() : '' }; }
  e.waitUntil(self.registration.showNotification(d.title || 'Troky', {
    body: d.body || '',
    icon: 'icon-192.png',
    badge: 'icon-192.png',
    data: { link: d.link || '/notifs' }
  }));
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = new URL('./#' + (e.notification.data && e.notification.data.link || '/notifs'), self.registration.scope).href;
  e.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    for (const c of list) if ('focus' in c) { c.navigate(url); return c.focus(); }
    return clients.openWindow(url);
  }));
});
