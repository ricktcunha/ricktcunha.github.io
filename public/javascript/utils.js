// ==============================================
// MÓDULO: Utilitários Otimizados
// ==============================================
// Versão: 2.0.0 - Performance Optimized
// Descrição: Funções utilitárias otimizadas para performance

import { CONFIG, APP_STATE, PERFORMANCE_CACHE } from './config.js';

/**
 * Cache de elementos DOM otimizado
 * @type {Object}
 */
export const DOM_CACHE = {
  body: null,
  hamburger: null,
  menuOverlay: null,
  menuClose: null,
  cursor: null,
  lightbox: null,
  lightboxImage: null,
  animatedElements: null,
  images: null,
  hoverElements: null,
  loadingScreen: null,
  navigationDots: null,
  progressBar: null
};

/**
 * Inicializa o cache de elementos DOM de forma otimizada
 * @returns {void}
 */
export function initializeDOMCache() {
  // Cache de queries DOM para evitar re-consultas
  const queryCache = new Map();
  
  const cachedQuerySelector = (selector) => {
    if (!queryCache.has(selector)) {
      queryCache.set(selector, document.querySelector(selector));
    }
    return queryCache.get(selector);
  };
  
  const cachedQuerySelectorAll = (selector) => {
    if (!queryCache.has(selector)) {
      queryCache.set(selector, document.querySelectorAll(selector));
    }
    return queryCache.get(selector);
  };

  // Inicializa cache DOM
  DOM_CACHE.body = document.body;
  DOM_CACHE.hamburger = cachedQuerySelector(CONFIG.SELECTORS.HAMBURGER);
  DOM_CACHE.menuOverlay = cachedQuerySelector(CONFIG.SELECTORS.MENU_OVERLAY);
  DOM_CACHE.menuClose = cachedQuerySelector(CONFIG.SELECTORS.MENU_CLOSE);
  DOM_CACHE.cursor = cachedQuerySelector(CONFIG.SELECTORS.CURSOR);
  DOM_CACHE.lightbox = cachedQuerySelector(CONFIG.SELECTORS.LIGHTBOX);
  DOM_CACHE.lightboxImage = cachedQuerySelector(CONFIG.SELECTORS.LIGHTBOX_IMAGE);
  DOM_CACHE.animatedElements = cachedQuerySelectorAll(CONFIG.SELECTORS.ANIMATED);
  DOM_CACHE.images = cachedQuerySelectorAll(CONFIG.SELECTORS.IMAGES);
  DOM_CACHE.hoverElements = cachedQuerySelectorAll(CONFIG.SELECTORS.HOVER_ELEMENTS);
  DOM_CACHE.loadingScreen = cachedQuerySelector(CONFIG.SELECTORS.LOADING_SCREEN);
  DOM_CACHE.navigationDots = cachedQuerySelectorAll(CONFIG.SELECTORS.NAVIGATION_DOTS);
  DOM_CACHE.progressBar = cachedQuerySelector(CONFIG.SELECTORS.PROGRESS_BAR);
  
  // Armazena cache para uso futuro
  PERFORMANCE_CACHE.domQueries = queryCache;
  
  console.log(`🔍 Cache DOM otimizado inicializado: ${DOM_CACHE.hoverElements.length} elementos de hover`);
}

/**
 * Verifica se um elemento está visível na viewport de forma otimizada
 * @param {Element} element - Elemento a ser verificado
 * @returns {boolean} True se o elemento está visível
 */
export function isElementInViewport(element) {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  
  return (
    rect.top < windowHeight - CONFIG.SCROLL_OFFSET &&
    rect.bottom > 0
  );
}

/**
 * Debounce otimizado com cache
 * @param {Function} func - Função a ser debounced
 * @param {number} wait - Tempo de espera em ms
 * @returns {Function} Função debounced
 */
export function debounce(func, wait) {
  let timeoutId;
  return function executedFunction(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), wait);
  };
}

/**
 * Throttle otimizado para eventos de scroll
 * @param {Function} func - Função a ser throttled
 * @param {number} limit - Limite de tempo em ms
 * @returns {Function} Função throttled
 */
export function throttle(func, limit) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Lazy loading otimizado para imagens
 * @param {Element} img - Elemento de imagem
 * @returns {Promise} Promise que resolve quando a imagem carrega
 */
export function lazyLoadImage(img) {
  return new Promise((resolve, reject) => {
    if (img.complete) {
      resolve(img);
      return;
    }
    
    const loadHandler = () => {
      img.removeEventListener('load', loadHandler);
      img.removeEventListener('error', errorHandler);
      resolve(img);
    };
    
    const errorHandler = () => {
      img.removeEventListener('load', loadHandler);
      img.removeEventListener('error', errorHandler);
      reject(new Error('Failed to load image'));
    };
    
    img.addEventListener('load', loadHandler, { once: true });
    img.addEventListener('error', errorHandler, { once: true });
  });
}

/**
 * Intersection Observer otimizado
 * @param {Function} callback - Callback a ser executado
 * @param {Object} options - Opções do observer
 * @returns {IntersectionObserver} Observer
 */
export function createIntersectionObserver(callback, options = {}) {
  const defaultOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
    ...options
  };
  
  const observer = new IntersectionObserver(callback, defaultOptions);
  APP_STATE.observers.add(observer);
  
  return observer;
}

/**
 * Gerenciador de event listeners otimizado
 * @param {Element} element - Elemento alvo
 * @param {string} event - Tipo do evento
 * @param {Function} handler - Handler do evento
 * @param {Object} options - Opções do evento
 * @returns {Function} Função para remover o listener
 */
export function addEventListenerOptimized(element, event, handler, options = {}) {
  if (!element) return () => {};
  
  const key = `${element.id || 'anonymous'}-${event}`;
  const existingHandler = APP_STATE.eventListeners.get(key);
  
  if (existingHandler) {
    element.removeEventListener(event, existingHandler, options);
  }
  
  element.addEventListener(event, handler, options);
  APP_STATE.eventListeners.set(key, handler);
  
  return () => {
    element.removeEventListener(event, handler, options);
    APP_STATE.eventListeners.delete(key);
  };
}

/**
 * Verifica se um link deve ser tratado como navegação interna
 * @param {HTMLAnchorElement} link - Elemento link
 * @returns {boolean} True se é navegação interna
 */
export function isInternalNavigation(link) {
  const href = link.getAttribute("href");
  return href && (href.startsWith("#") || link.target === "_blank");
}

/**
 * Adiciona classe CSS a um elemento de forma otimizada
 * @param {Element} element - Elemento alvo
 * @param {string} className - Nome da classe
 * @returns {void}
 */
export function addClass(element, className) {
  if (element && !element.classList.contains(className)) {
    element.classList.add(className);
  }
}

/**
 * Remove classe CSS de um elemento de forma otimizada
 * @param {Element} element - Elemento alvo
 * @param {string} className - Nome da classe
 * @returns {void}
 */
export function removeClass(element, className) {
  if (element && element.classList.contains(className)) {
    element.classList.remove(className);
  }
}

/**
 * Alterna classe CSS de um elemento de forma otimizada
 * @param {Element} element - Elemento alvo
 * @param {string} className - Nome da classe
 * @param {boolean} force - Força adicionar ou remover
 * @returns {void}
 */
export function toggleClass(element, className, force) {
  if (!element) return;
  
  if (typeof force === 'boolean') {
    element.classList.toggle(className, force);
  } else {
    element.classList.toggle(className);
  }
}

/**
 * Limpa todos os event listeners e observers
 * @returns {void}
 */
export function cleanupAll() {
  // Limpa observers
  APP_STATE.observers.forEach(observer => observer.disconnect());
  APP_STATE.observers.clear();
  
  // Limpa event listeners
  APP_STATE.eventListeners.clear();
  
  // Limpa cache de performance
  PERFORMANCE_CACHE.imageLoadPromises.clear();
  PERFORMANCE_CACHE.domQueries.clear();
  
  console.log('🧹 Limpeza completa realizada');
} 