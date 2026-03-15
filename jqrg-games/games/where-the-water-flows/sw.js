// Service worker to add Cross-Origin Isolation headers required by Godot web (threads/SharedArrayBuffer).
// GitHub Pages does not send these headers; the SW serves the document with them so the game can run.
const COOP = 'Cross-Origin-Opener-Policy';
const COEP = 'Cross-Origin-Embedder-Policy';

self.addEventListener('install', function () {
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function (e) {
  const url = new URL(e.request.url);
  const sameOrigin = url.origin === self.location.origin;
  // Top-level document request (navigate) or explicit document destination
  const isDoc = e.request.mode === 'navigate' || e.request.destination === 'document';

  if (!sameOrigin || !isDoc) return;

  e.respondWith(
    fetch(e.request, { cache: 'reload' }).then(async function (r) {
      if (!r.ok) return r;
      const headers = new Headers(r.headers);
      headers.set(COOP, 'same-origin');
      headers.set(COEP, 'require-corp');
      return new Response(await r.arrayBuffer(), {
        status: r.status,
        statusText: r.statusText,
        headers: headers
      });
    }).catch(function () {
      return fetch(e.request);
    })
  );
});
