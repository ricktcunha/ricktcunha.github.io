// ==============================================
// MÓDULO: Tela de Loading Otimizada
// ==============================================
// Versão: 2.0.0 - Performance Optimized
// Descrição: Sistema de loading otimizado com lazy loading

import { CONFIG } from './config.js';
import { DOM_CACHE, addClass, lazyLoadImage } from './utils.js';

/**
 * Inicializa a tela de loading de forma otimizada
 * @returns {Promise<void>}
 */
export function initializeLoadingScreen() {
  const loadingScreen = DOM_CACHE.loadingScreen;
  
  if (!loadingScreen) {
    console.warn('Tela de loading não encontrada');
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    // Verifica se já está tudo carregado
    if (isCriticalContentLoaded()) {
      console.log('✅ Conteúdo crítico já carregado, removendo tela de loading...');
      hideLoadingScreen(loadingScreen);
      resolve();
      return;
    }

    console.log('🔄 Aguardando carregamento de conteúdo crítico...');
    
    // Carrega apenas conteúdo crítico primeiro
    Promise.all([
      loadCriticalImages(),
      loadCriticalVideos(),
      waitForDOMReady()
    ]).then(() => {
      console.log('✅ Conteúdo crítico carregado, finalizando loading...');
      hideLoadingScreen(loadingScreen);
      resolve();
    }).catch((error) => {
      console.warn('⚠️ Erro no carregamento crítico, finalizando loading...', error);
      hideLoadingScreen(loadingScreen);
      resolve();
    });

    // Fallback: se demorar muito, remove a tela de loading
    setTimeout(() => {
      if (loadingScreen.parentNode) {
        console.log('⏰ Timeout: removendo tela de loading...');
        hideLoadingScreen(loadingScreen);
        resolve();
      }
    }, 3000); // Reduzido para 3 segundos
  });
}

/**
 * Carrega apenas imagens críticas (above the fold)
 * @returns {Promise<void>}
 */
function loadCriticalImages() {
  const criticalImages = document.querySelectorAll('img[src*="home"], img[src*="logo"], img[src*="rick"]');
  const imagePromises = Array.from(criticalImages).map(img => {
    if (img.complete) {
      return Promise.resolve();
    }
    return lazyLoadImage(img).catch(() => Promise.resolve()); // Ignora erros
  });
  
  return Promise.all(imagePromises);
}

/**
 * Carrega apenas vídeos críticos
 * @returns {Promise<void>}
 */
function loadCriticalVideos() {
  const criticalVideos = document.querySelectorAll('video[autoplay]');
  const videoPromises = Array.from(criticalVideos).map(video => {
    return new Promise((resolve) => {
      if (video.readyState >= 2) { // HAVE_CURRENT_DATA
        resolve();
      } else {
        video.addEventListener('canplay', resolve, { once: true });
        video.addEventListener('error', resolve, { once: true });
      }
    });
  });
  
  return Promise.all(videoPromises);
}

/**
 * Verifica se o conteúdo crítico já está carregado
 * @returns {boolean} True se o conteúdo crítico está carregado
 */
function isCriticalContentLoaded() {
  // Verifica se o DOM está completo
  if (document.readyState !== 'complete') {
    return false;
  }

  // Verifica se as imagens críticas estão carregadas
  const criticalImages = document.querySelectorAll('img[src*="home"], img[src*="logo"], img[src*="rick"]');
  for (let img of criticalImages) {
    if (!img.complete) {
      return false;
    }
  }

  // Verifica se os vídeos críticos estão prontos
  const criticalVideos = document.querySelectorAll('video[autoplay]');
  for (let video of criticalVideos) {
    if (video.readyState < 2) { // HAVE_CURRENT_DATA
      return false;
    }
  }

  return true;
}

/**
 * Aguarda o DOM estar completamente pronto
 * @returns {Promise<void>}
 */
function waitForDOMReady() {
  return new Promise((resolve) => {
    if (document.readyState === 'complete') {
      resolve();
    } else {
      window.addEventListener('load', resolve, { once: true });
    }
  });
}

/**
 * Esconde a tela de loading de forma otimizada
 * @param {HTMLElement} loadingScreen - Elemento da tela de loading
 * @returns {void}
 */
function hideLoadingScreen(loadingScreen) {
  // Remove imediatamente se tudo já estava carregado
  if (isCriticalContentLoaded()) {
    if (loadingScreen.parentNode) {
      loadingScreen.parentNode.removeChild(loadingScreen);
    }
    console.log('✅ Tela de loading removida (conteúdo crítico já carregado)');
    return;
  }

  // Caso contrário, faz a animação de fade out otimizada
  addClass(loadingScreen, CONFIG.CLASSES.HIDDEN);
  
  // Remove a tela de loading do DOM após a animação
  setTimeout(() => {
    if (loadingScreen.parentNode) {
      loadingScreen.parentNode.removeChild(loadingScreen);
    }
  }, 500); // Reduzido para 500ms
  
  console.log('✅ Tela de loading finalizada');
}

/**
 * Inicializa lazy loading para imagens não críticas
 * @returns {void}
 */
export function initializeLazyLoading() {
  const nonCriticalImages = document.querySelectorAll('img:not([src*="home"]):not([src*="logo"]):not([src*="rick"])');
  
  if (!nonCriticalImages.length) return;
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          addClass(img, CONFIG.CLASSES.LAZY);
        }
        imageObserver.unobserve(img);
      }
    });
  }, {
    rootMargin: `${CONFIG.LAZY_LOAD_OFFSET}px`
  });
  
  nonCriticalImages.forEach(img => {
    if (img.dataset.src) {
      imageObserver.observe(img);
    }
  });
  
  console.log(`🖼️ Lazy loading inicializado para ${nonCriticalImages.length} imagens`);
} 