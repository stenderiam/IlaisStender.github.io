const cacheName = 'v1';

// файлы для кэширования
const cacheFiles = [
  './',
  './index.html',
  './css/normalize.css',
  './css/main.css',
  // bundle!
  './dist/bundle.js',
  './icons/add.svg',
  './icons/delete.svg',
  './icons/fab.svg',
];
// install 

self.addEventListener('install', (e) => {
  console.log('[ServiceWorker] Installed');

  // e.waitUntil - passing a promise to extend the
  // installing stage untile the promise is resolved

  e.waitUntil(

    caches.open(cacheName).then((cache) => {

      // Add all the default files to the cache
      console.log('[ServiceWorker] Caching cacheFiles');
      return cache.addAll(cacheFiles);
    }),
  );
});


self.addEventListener('activate', (e) => {
  console.log('[ServiceWorker] Activated');

  e.waitUntil(

    // Get all the cache keys (cacheName)
    caches.keys().then((cacheNames) => {
      return Promise.all(cacheNames.map((thisCacheName) => {

        // If a cached item is saved under a previous cacheName
        if (thisCacheName !== cacheName) {

          // Delete that cached file
          console.log('[ServiceWorker] Removing Cached Files from Cache - ', thisCacheName);
          return caches.delete(thisCacheName);
        }
      }));
    }),
  ); // end e.waitUntil
});


self.addEventListener('fetch', (e) => {
  console.log('[ServiceWorker] Fetch', e.request.url);

  // e.respondWidth Responds to the fetch event
  e.respondWith(

    // Check in cache for the request being made
    caches.match(e.request)

      .then((response) => {

        // If the request is in the cache
        if (response) {
          console.log("[ServiceWorker] Found in Cache", e.request.url, response);
          // Return the cached version
          return response;
        }

        // If the request is NOT in the cache, fetch and cache

        const requestClone = e.request.clone();
        fetch(requestClone)
          .then((response) => {
            if (!response) {
              console.log('[ServiceWorker] No response from fetch ')
              return response;
            }
            const responseClone = response.clone();

            //  Open the cache
            caches.open(cacheName).then((cache) => {

              // Put the fetched response in the cache
              cache.put(e.request, responseClone);
              console.log('[ServiceWorker] New Data Cached', e.request.url);

              // Return the response
              return response;
            }); // end caches.open
          })
          .catch((err) => {
            console.log('[ServiceWorker] Error Fetching & Caching New Data', err);
          });
      }) // end caches.match(e.request)
  ); // end e.respondWith
});
