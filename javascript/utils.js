// ==============================================
// MÓDULO: Utilitários
// ==============================================
// Versão: 1.0.0
// Descrição: Funções utilitárias e helpers

import { CONFIG } from './config.js';

/**
 * Cache de elementos DOM frequentemente utilizados
 * @type {Object}
 */
export const DOM_CACHE = {
  body: null,
  hamburger: null,
  menu: null,
  cursor: null,
  lightbox: null,
  lightboxImage: null,
  animatedElements: null,
  images: null,
  hoverElements: null
};

/**
 * Inicializa o cache de elementos DOM
 * @returns {void}
 */
export function initializeDOMCache() {
  DOM_CACHE.body = document.body;
  DOM_CACHE.hamburger = document.querySelector(CONFIG.SELECTORS.HAMBURGER);
  DOM_CACHE.menu = document.querySelector(CONFIG.SELECTORS.MENU);
  DOM_CACHE.cursor = document.querySelector(CONFIG.SELECTORS.CURSOR);
  DOM_CACHE.lightbox = document.querySelector(CONFIG.SELECTORS.LIGHTBOX);
  DOM_CACHE.lightboxImage = document.querySelector(CONFIG.SELECTORS.LIGHTBOX_IMAGE);
  DOM_CACHE.animatedElements = document.querySelectorAll(CONFIG.SELECTORS.ANIMATED);
  DOM_CACHE.images = document.querySelectorAll(CONFIG.SELECTORS.IMAGES);
  DOM_CACHE.hoverElements = document.querySelectorAll(CONFIG.SELECTORS.HOVER_ELEMENTS);
}

/**
 * Verifica se um elemento está visível na viewport
 * @param {Element} element - Elemento a ser verificado
 * @returns {boolean} True se o elemento está visível
 */
export function isElementInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight - CONFIG.SCROLL_OFFSET;
}

/**
 * Aplica debouncing para otimizar performance de eventos
 * @param {Function} func - Função a ser debounced
 * @param {number} wait - Tempo de espera em ms
 * @returns {Function} Função debounced
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
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
 * Adiciona classe CSS a um elemento
 * @param {Element} element - Elemento alvo
 * @param {string} className - Nome da classe
 * @returns {void}
 */
export function addClass(element, className) {
  if (element) {
    element.classList.add(className);
  }
}

/**
 * Remove classe CSS de um elemento
 * @param {Element} element - Elemento alvo
 * @param {string} className - Nome da classe
 * @returns {void}
 */
export function removeClass(element, className) {
  if (element) {
    element.classList.remove(className);
  }
}

/**
 * Alterna classe CSS de um elemento
 * @param {Element} element - Elemento alvo
 * @param {string} className - Nome da classe
 * @param {boolean} force - Força adicionar ou remover
 * @returns {void}
 */
export function toggleClass(element, className, force) {
  if (element) {
    element.classList.toggle(className, force);
  }
} 