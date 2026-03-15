const COOP = 'Cross-Origin-Opener-Policy';
const COEP = 'Cross-Origin-Embedder-Policy';
const CORP = 'Cross-Origin-Resource-Policy';

const SW_PATH = new URL(self.location.href).pathname.replace(/\/[^/]*$/, '/');

function isInScope(url) {
  const path = new URL(url).pathname;
  return path === SW_PATH || path === SW_PATH.replace(/\/$/, '') || path.startsWith(SW_PATH);
}

self.addEventListener('install', function () {
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function (e) {
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin || !isInScope(url)) return;

  const isDoc = e.request.mode === 'navigate' || e.request.destination === 'document';
  const path = url.pathname;
  const isIndex = path.endsWith('/') || path.endsWith('/index.html') || path === SW_PATH.replace(/\/$/, '');

  if (isDoc || isIndex) {
    e.respondWith(
      fetch(e.request, { cache: 'reload' }).then(async function (r) {
        if (!r.ok) return r;
        const headers = new Headers(r.headers);
        headers.set(COOP, 'same-origin');
        headers.set(COEP, 'require-corp');
        headers.set(CORP, 'same-origin');
        return new Response(await r.arrayBuffer(), {
          status: r.status,
          statusText: r.statusText,
          headers: headers
        });
      }).catch(function () {
        return fetch(e.request);
      })
    );
    return;
  }

  e.respondWith(
    fetch(e.request).then(async function (r) {
      if (!r.ok) return r;
      const headers = new Headers(r.headers);
      headers.set(CORP, 'same-origin');
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
