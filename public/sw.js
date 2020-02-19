const CACHE_NAME = 'cache-v1'

const resourcesToPrecache = [
  '/',
  '/index.html',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png',
  '/apple-touch-icon.png',
  '/favicon-16x16.png',
  '/favicon-32x32.png',
  '/favicon.ico',
  '/manifest.json',
]

const cacheResources = async () => {
  const cache = await caches.open(cacheName)
  return cache.addAll(resourceToPrecache)
}

self.addEventListener('install', async event => {
  self.skipWaiting()
  event.waitUntil(cacheResources())
})

const clearOldCache = async () => {
  const cacheNames = await caches.keys()
  const oldCacheName = cacheNames.find(name => name !== CACHE_NAME)
  caches.delete(oldCacheName)
}

self.addEventListener('activate', event => {
  event.waitUntil(clearOldCache())
})

const getResponseByRequest = async request => {
  const cache = await caches.open(CACHE_NAME)
  const cachedResponse = await cache.match(request)
  return cachedResponse || fetch(request)
}

self.addEventListener('fetch', event => {
  event.respondWith(getResponseByRequest(event.request))
})
