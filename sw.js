// ==============================================
// SERVICE WORKER - Cache e Funcionalidades Offline
// ==============================================
// Versão: 1.0.0
// Descrição: Gerencia cache e funcionalidades offline

const CACHE_NAME = 'rick-portfolio-v1.0.0';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

// Recursos para cache estático
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/css/main.css',
  '/javascript/script.js',
  '/javascript/app.js',
  '/javascript/loading.js',
  '/javascript/ux-enhancements.js',
  '/javascript/utils.js',
  '/javascript/config.js',
  '/javascript/navigation.js',
  '/javascript/animations.js',
  '/javascript/lightbox.js',
  '/favicon.svg',
  '/assets/home/logos/rick_logo_branco_detalhe.svg',
  '/assets/home/icons/github.svg',
  '/assets/home/icons/instagram.svg',
  '/assets/home/icons/Vector.svg'
];

// Recursos para cache dinâmico
const DYNAMIC_ASSETS = [
  '/contato.html',
  '/cv.html',
  '/portfolio.html',
  '/dev.html',
  '/design.html',
  '/kv.html',
  '/motion-design.html',
  '/postagens.html'
];

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  console.log('🔄 Service Worker instalando...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('📦 Cache estático aberto');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('✅ Cache estático preenchido');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('❌ Erro ao instalar cache estático:', error);
      })
  );
});

// Ativação do Service Worker
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker ativando...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('🗑️ Removendo cache antigo:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('✅ Service Worker ativado');
        return self.clients.claim();
      })
  );
});

// Interceptação de requisições
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Estratégia: Cache First para recursos estáticos
  if (request.method === 'GET' && isStaticAsset(url.pathname)) {
    event.respondWith(
      caches.match(request)
        .then(response => {
          if (response) {
            return response; // Retorna do cache
          }
          return fetch(request)
            .then(response => {
              // Adiciona ao cache se a resposta for válida
              if (response && response.status === 200) {
                const responseClone = response.clone();
                caches.open(STATIC_CACHE)
                  .then(cache => cache.put(request, responseClone));
              }
              return response;
            });
        })
    );
  }
  
  // Estratégia: Network First para páginas HTML
  else if (request.method === 'GET' && isHTMLPage(url.pathname)) {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Adiciona ao cache se a resposta for válida
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE)
              .then(cache => cache.put(request, responseClone));
          }
          return response;
        })
        .catch(() => {
          // Fallback para cache se a rede falhar
          return caches.match(request)
            .then(response => {
              if (response) {
                return response;
              }
              // Página offline personalizada
              return caches.match('/offline.html');
            });
        })
    );
  }
  
  // Estratégia: Stale While Revalidate para imagens
  else if (request.method === 'GET' && isImage(url.pathname)) {
    event.respondWith(
      caches.match(request)
        .then(cachedResponse => {
          const fetchPromise = fetch(request)
            .then(response => {
              if (response && response.status === 200) {
                const responseClone = response.clone();
                caches.open(DYNAMIC_CACHE)
                  .then(cache => cache.put(request, responseClone));
              }
              return response;
            });
          
          return cachedResponse || fetchPromise;
        })
    );
  }
});

// Funções auxiliares
function isStaticAsset(pathname) {
  return STATIC_ASSETS.some(asset => pathname.includes(asset)) ||
         pathname.includes('/css/') ||
         pathname.includes('/javascript/') ||
         pathname.includes('/favicon');
}

function isHTMLPage(pathname) {
  return pathname.endsWith('.html') || pathname === '/';
}

function isImage(pathname) {
  return /\.(jpg|jpeg|png|gif|svg|webp)$/i.test(pathname);
}

// Mensagens do Service Worker
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

// Background Sync (se suportado)
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  console.log('🔄 Sincronização em background...');
  // Implementar sincronização de dados se necessário
}

// Push Notifications (se suportado)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/assets/home/logos/rick_logo_branco_detalhe.svg',
      badge: '/favicon.svg',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Clique em notificação
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow('/')
  );
});

console.log('📦 Service Worker carregado'); 