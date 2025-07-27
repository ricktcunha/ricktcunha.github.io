// ==============================================
// MÓDULO: Animações e Efeitos Visuais
// ==============================================
// Versão: 1.1.0
// Descrição: Gerencia animações de scroll e cursor customizado (fade removido)

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
 * Funções de fade removidas para melhor performance
 * As animações de fade in/out foram desabilitadas
 */ 