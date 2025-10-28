// Service Worker for DK Community PWA
const CACHE_NAME = 'dk-community-v1.0';

// Install event
self.addEventListener('install', event => {
  console.log('🚀 Service Worker Installing...');
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.match(event.request);
      })
  );
});