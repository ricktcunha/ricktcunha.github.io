// ==============================================
// MÓDULO: Animações e Efeitos Visuais Otimizados
// ==============================================
// Versão: 2.0.0 - Performance Optimized
// Descrição: Sistema de animações otimizado com Intersection Observer

import { CONFIG } from './config.js';
import { DOM_CACHE, createIntersectionObserver, addEventListenerOptimized, addClass, removeClass } from './utils.js';

/**
 * Inicializa o sistema de animações de forma otimizada
 * @returns {void}
 */
export function initializeAnimations() {
  if (!DOM_CACHE.animatedElements.length) {
    console.warn('Nenhum elemento animado encontrado');
    return;
  }

  // Usa Intersection Observer para melhor performance
  const animationObserver = createIntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        addClass(entry.target, CONFIG.CLASSES.IN_VIEW);
      }
    });
  }, {
    rootMargin: `${CONFIG.SCROLL_OFFSET}px`,
    threshold: 0.1
  });

  // Observa todos os elementos animados
  DOM_CACHE.animatedElements.forEach(element => {
    animationObserver.observe(element);
  });
  
  console.log(`🎬 Animações otimizadas inicializadas para ${DOM_CACHE.animatedElements.length} elementos`);
}

/**
 * Inicializa o cursor customizado de forma otimizada
 * @returns {void}
 */
export function initializeCustomCursor() {
  if (!DOM_CACHE.cursor) {
    console.warn('Cursor customizado não encontrado');
    return;
  }

  // Atualiza posição do cursor com throttling
  let ticking = false;
  const updateCursorPosition = (e) => {
    if (!ticking) {
      requestAnimationFrame(() => {
        DOM_CACHE.cursor.style.left = `${e.clientX}px`;
        DOM_CACHE.cursor.style.top = `${e.clientY}px`;
        ticking = false;
      });
      ticking = true;
    }
  };

  // Adiciona event listener otimizado
  addEventListenerOptimized(document, "mousemove", updateCursorPosition, { passive: true });

  // Gerencia efeitos de hover de forma otimizada
  DOM_CACHE.hoverElements.forEach((element) => {
    const handleMouseEnter = () => {
      addClass(DOM_CACHE.cursor, CONFIG.CLASSES.CURSOR_HOVER);
      
      // Efeito específico para dots de navegação
      if (element.classList.contains('dot')) {
        addClass(DOM_CACHE.cursor, 'navigation-dot-hover');
      }
    };
    
    const handleMouseLeave = () => {
      removeClass(DOM_CACHE.cursor, CONFIG.CLASSES.CURSOR_HOVER);
      removeClass(DOM_CACHE.cursor, 'navigation-dot-hover');
    };

    addEventListenerOptimized(element, 'mouseenter', handleMouseEnter);
    addEventListenerOptimized(element, 'mouseleave', handleMouseLeave);
  });
  
  console.log('🎯 Cursor customizado otimizado inicializado');
} 