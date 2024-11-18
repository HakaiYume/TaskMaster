self.addEventListener('push', function (event) {
    if (event.data) {
      const data = event.data.json()
      const options = {
        body: data.body,
        icon: data.icon || '/icon.png',
        badge: '/badge.png',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: '2',
        },
      }
      event.waitUntil(self.registration.showNotification(data.title, options))
    }
  })
   
  self.addEventListener('notificationclick', function (event) {
    console.log('Notification click received.')
    event.notification.close()
    event.waitUntil(clients.openWindow('<https://taskmaster-pwa.netlify.app>'))
  })
/*
  self.addEventListener('install', event => {
    const urlsToCache = [
      '/',
      '/tasks/new',
      '/icon512_rounded.png',
      '/icon512_maskable.png',
    ];
    
    event.waitUntil(
      caches.open('static-cache-v1').then(cache => {
        return cache.addAll(urlsToCache);
      })
    );
  });
  

  self.addEventListener('fetch', event => {
    if (event.request.url.includes('/api/tasks')) {
      event.respondWith(
        caches.match(event.request).then(response => {
          return response || fetch(event.request).then(networkResponse => {
            return caches.open('tasks-cache').then(cache => {
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            });
          });
        })
      );
    } else {
      event.respondWith(
        caches.match(event.request).then(response => {
          return response || fetch(event.request);
        })
      );
    }
  });
*/

  