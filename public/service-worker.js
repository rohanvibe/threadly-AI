// Basic Threadly Service Worker
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', () => {
  // Clear old caches if any
});

self.addEventListener('fetch', (event) => {
  // Standard fetch behavior
});
