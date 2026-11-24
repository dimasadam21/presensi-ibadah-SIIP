// Service Worker untuk S I I P - Sistem Informasi Ibadah Pelajar (PWA / WebAPK)
const CACHE_NAME = 'siip-pwa-v29';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './config.js',
  './islamic_features.js',
  './ramadhan_feature.js',
  './tahsin_games.js',
  './tahsin_feature.js',
  './tahsin.css',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './apple-touch-icon.png',
  './logo-siip.png',
  './favicon.png',
  './logo-smkn1.png',
  './logo-gpai.png',
  './logo-banner.png',
  './mascot-ipin.png',
  './logo-si-ipin.png',
  './suara-si-ipin.mp3'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch(() => {});
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== location.origin) return;

  // Network-First untuk dokumen HTML & file JS agar pembaruan konfigurasi selalu seketika (realtime)
  const isNetworkFirst = event.request.mode === 'navigate' ||
                         url.pathname === '/' ||
                         url.pathname.endsWith('.html') ||
                         url.pathname.endsWith('.js');

  if (isNetworkFirst) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return networkResponse;
        })
        .catch(() => caches.match(event.request).then((res) => res || caches.match('./index.html')))
    );
    return;
  }

  // Cache-First untuk aset statis (gambar, manifest, icon)
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
          }
        }).catch(() => {});
        return cachedResponse;
      }
      return fetch(event.request).catch(() => caches.match('./index.html'));
    })
  );
});
