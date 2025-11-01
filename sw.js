// Service Worker for DK Community App - Netlify + XYZ
const CACHE_NAME = 'dk-community-netlify-v1.1';
const urlsToCache = [
  'https://deepakchauhanxai.in/',
  'https://deepakchauhanxai.xyz/testing/scripts/app.js',
  'https://deepakchauhanxai.xyz/testing/scripts/ai-effects.js',
  'https://deepakchauhanxai.xyz/testing/styles/main.css',
  'https://deepakchauhanxai.xyz/images/AI-bhai.png',
  'https://deepakchauhanxai.xyz/testing/data/images.json',
  'https://deepakchauhanxai.xyz/testing/scripts/auto-image.js',
  'https://deepakchauhanxai.xyz/testing/scripts/language-auto.js',
  'https://deepakchauhanxai.xyz/testing/scripts/language.js',
  'https://deepakchauhanxai.xyz/testing/scripts/magic.js',
  'https://deepakchauhanxai.xyz/testing/scripts/ai-avatar-magic.js',
  'https://deepakchauhanxai.xyz/testing/scripts/angry-magic.js',
];

// Install Event
self.addEventListener('install', event => {
  console.log('🚀 Service Worker Installing for GitHub+XYZ...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('📦 Caching GitHub+XYZ app files');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch Event - Better version
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        
        return fetch(event.request)
          .then(response => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone the response
            const responseToCache = response.clone();
            
            // Cache the new response
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
              
            return response;
          })
          .catch(error => {
            console.log('Fetch failed; returning offline page instead.', error);
          });
      })
  );
});

// Activate Event - Clean up old caches
self.addEventListener('activate', event => {
  console.log('✅ Service Worker Activated for Netlify+XYZ');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
