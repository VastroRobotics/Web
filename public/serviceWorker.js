const CACHE_VERSION = 1;
const CACHE_NAMES = {
  static: `vastro-static-v${CACHE_VERSION}`,
  dynamic: `vastro-dynamic-v${CACHE_VERSION}`,
  videos: `vastro-videos-v${CACHE_VERSION}`
};

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/favicon.svg',
  '/fonts/grifterbold.otf'
];

const VIDEO_EXTENSIONS = ['.webm', '.mp4', '.mov'];
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.svg', '.webp'];

// Helper function to determine cache strategy based on request
function getCacheStrategy(request) {
  const url = new URL(request.url);
  const extension = url.pathname.substring(url.pathname.lastIndexOf('.'));
  
  if (VIDEO_EXTENSIONS.includes(extension)) {
    return 'videos';
  }
  if (IMAGE_EXTENSIONS.includes(extension) || url.pathname.includes('/assets/')) {
    return 'static';
  }
  return 'dynamic';
}

// Install service worker and cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAMES.static)
        .then(cache => cache.addAll(STATIC_ASSETS)),
      caches.open(CACHE_NAMES.dynamic),
      caches.open(CACHE_NAMES.videos)
    ])
  );
});

// Clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!Object.values(CACHE_NAMES).includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Custom fetch handling based on content type
self.addEventListener('fetch', event => {
  const strategy = getCacheStrategy(event.request);
  
  event.respondWith(
    caches.open(CACHE_NAMES[strategy])
      .then(cache => {
        return cache.match(event.request)
          .then(response => {
            // For videos, always return cached version if available
            if (strategy === 'videos' && response) {
              return response;
            }
            
            // Network first for dynamic content
            const fetchPromise = fetch(event.request).then(networkResponse => {
              if (networkResponse && networkResponse.status === 200) {
                cache.put(event.request, networkResponse.clone());
              }
              return networkResponse;
            }).catch(() => response);
            
            // Return cached response immediately for static assets
            if (strategy === 'static' && response) {
              // Update cache in background
              fetchPromise.catch(() => {});
              return response;
            }
            
            // Wait for network response, falling back to cache
            return fetchPromise.catch(() => response);
          });
      })
  );
});
