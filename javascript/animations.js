// ==============================================
// MÓDULO: Animações e Efeitos Visuais
// ==============================================
// Versão: 1.0.0
// Descrição: Gerencia animações de scroll e cursor customizado

import { CONFIG } from './config.js';
import { DOM_CACHE, isElementInViewport, debounce, toggleClass, addClass, removeClass } from './utils.js';

/**
 * Gerencia animações baseadas em scroll
 * @returns {void}
 */
export function handleScrollAnimation() {
  DOM_CACHE.animatedElements.forEach((element) => {
    const isVisible = isElementInViewport(element);
    toggleClass(element, CONFIG.CLASSES.IN_VIEW, isVisible);
  });
}

/**
 * Inicializa o sistema de animações
 * @returns {void}
 */
export function initializeAnimations() {
  if (!DOM_CACHE.animatedElements.length) {
    console.warn('Nenhum elemento animado encontrado');
    return;
  }

  const debouncedScrollHandler = debounce(handleScrollAnimation, CONFIG.DEBOUNCE_DELAY);
  
  window.addEventListener("scroll", debouncedScrollHandler);
  handleScrollAnimation(); // Verifica elementos já visíveis
  
  console.log(`Animação inicializada para ${DOM_CACHE.animatedElements.length} elementos`);
}

/**
 * Gerencia o cursor customizado
 * @returns {void}
 */
export function initializeCustomCursor() {
  if (!DOM_CACHE.cursor) {
    console.warn('Cursor customizado não encontrado');
    return;
  }

  // Atualiza posição do cursor
  document.addEventListener("mousemove", updateCursorPosition);

  // Gerencia efeitos de hover
  DOM_CACHE.hoverElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      addClass(DOM_CACHE.cursor, CONFIG.CLASSES.CURSOR_HOVER);
    });
    
    element.addEventListener("mouseleave", () => {
      removeClass(DOM_CACHE.cursor, CONFIG.CLASSES.CURSOR_HOVER);
    });
  });
  
  console.log('Cursor customizado inicializado');
}

/**
 * Atualiza a posição do cursor customizado
 * @param {MouseEvent} e - Evento de movimento do mouse
 * @returns {void}
 */
function updateCursorPosition(e) {
  DOM_CACHE.cursor.style.left = `${e.clientX}px`;
  DOM_CACHE.cursor.style.top = `${e.clientY}px`;
}

/**
 * Adiciona efeito de fade-in a um elemento
 * @param {Element} element - Elemento alvo
 * @param {number} delay - Delay em ms
 * @returns {Promise<void>}
 */
export function fadeInElement(element, delay = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      addClass(element, CONFIG.CLASSES.FADE_IN);
      resolve();
    }, delay);
  });
}

/**
 * Adiciona efeito de fade-out a um elemento
 * @param {Element} element - Elemento alvo
 * @param {number} delay - Delay em ms
 * @returns {Promise<void>}
 */
export function fadeOutElement(element, delay = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      addClass(element, CONFIG.CLASSES.FADE_OUT);
      resolve();
    }, delay);
  });
}

/**
 * Anima elementos sequencialmente
 * @param {Element[]} elements - Array de elementos
 * @param {number} staggerDelay - Delay entre cada elemento
 * @returns {Promise<void>}
 */
export function staggerAnimation(elements, staggerDelay = 100) {
  return new Promise((resolve) => {
    elements.forEach((element, index) => {
      setTimeout(() => {
        addClass(element, CONFIG.CLASSES.FADE_IN);
      }, index * staggerDelay);
    });
    
    setTimeout(resolve, elements.length * staggerDelay);
  });
} 