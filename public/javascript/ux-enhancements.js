// ==============================================
// MÓDULO: Melhorias de UX Otimizadas
// ==============================================
// Versão: 2.0.0 - Performance Optimized
// Descrição: Melhorias de UX essenciais e otimizadas

import { CONFIG } from './config.js';
import { addEventListenerOptimized, throttle } from './utils.js';

let progressBar = null;
let scrollHandler = null;

/**
 * Inicializa melhorias de UX essenciais
 * @returns {void}
 */
export function initializeUXEnhancements() {
  console.log('🚀 Inicializando melhorias de UX otimizadas...');
  
  createProgressBar();
  initScrollSuave();
  initKeyboardNavigation();
  initARIALabels();
  
  console.log('✅ Melhorias de UX otimizadas inicializadas');
}

/**
 * Cria a barra de progresso de leitura otimizada
 */
function createProgressBar() {
  progressBar = document.createElement('div');
  progressBar.className = 'reading-progress-bar';
  progressBar.setAttribute('aria-label', 'Progresso de leitura da página');
  progressBar.setAttribute('role', 'progressbar');
  progressBar.setAttribute('aria-valuenow', '0');
  progressBar.setAttribute('aria-valuemin', '0');
  progressBar.setAttribute('aria-valuemax', '100');
  
  document.body.appendChild(progressBar);
  
  // Usa throttling para melhor performance no scroll
  scrollHandler = throttle(updateProgressBar, 16); // ~60fps
  addEventListenerOptimized(window, 'scroll', scrollHandler, { passive: true });
}

/**
 * Atualiza a barra de progresso de forma otimizada
 */
function updateProgressBar() {
  if (!progressBar) return;
  
  requestAnimationFrame(() => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    progressBar.style.width = scrolled + '%';
    progressBar.setAttribute('aria-valuenow', Math.round(scrolled));
  });
}

/**
 * Inicializa scroll suave otimizado
 */
function initScrollSuave() {
  // Scroll suave já está implementado via CSS
  // Adiciona comportamento adicional para links internos
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  
  internalLinks.forEach(link => {
    addEventListenerOptimized(link, 'click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: CONFIG.SCROLL_BEHAVIOR
        });
      }
    });
  });
}

/**
 * Inicializa navegação por teclado otimizada
 */
function initKeyboardNavigation() {
  addEventListenerOptimized(document, 'keydown', (e) => {
    // Navegação por teclado para dots
    if (e.key === 'Tab') {
      const dots = document.querySelectorAll('.navigation-dots .dot');
      const activeDot = document.querySelector('.navigation-dots .dot.active');
      
      if (activeDot) {
        const currentIndex = Array.from(dots).indexOf(activeDot);
        const nextIndex = e.shiftKey ? currentIndex - 1 : currentIndex + 1;
        
        if (nextIndex >= 0 && nextIndex < dots.length) {
          e.preventDefault();
          dots[nextIndex].focus();
        }
      }
    }
    
    // Navegação por teclado para menu
    if (e.key === 'Escape') {
      const menuOverlay = document.getElementById('menuOverlay');
      if (menuOverlay && menuOverlay.classList.contains('active')) {
        const closeButton = document.getElementById('menuClose');
        if (closeButton) {
          closeButton.click();
        }
      }
    }
  });
}

/**
 * Inicializa labels ARIA para acessibilidade
 */
function initARIALabels() {
  // Adiciona labels ARIA para elementos importantes
  const elementsWithoutAria = document.querySelectorAll('button:not([aria-label]), .navigation-dots .dot:not([aria-label])');
  
  elementsWithoutAria.forEach(element => {
    if (element.tagName === 'BUTTON' && !element.getAttribute('aria-label')) {
      element.setAttribute('aria-label', element.textContent || 'Botão');
    }
    
    if (element.classList.contains('dot') && !element.getAttribute('aria-label')) {
      const sectionName = element.getAttribute('data-section');
      element.setAttribute('aria-label', `Ir para seção ${sectionName}`);
    }
  });
}

/**
 * Limpa melhorias de UX
 * @returns {void}
 */
export function cleanupUXEnhancements() {
  if (progressBar && progressBar.parentNode) {
    progressBar.parentNode.removeChild(progressBar);
    progressBar = null;
  }
  
  if (scrollHandler) {
    window.removeEventListener('scroll', scrollHandler);
    scrollHandler = null;
  }
  
  console.log('🧹 Melhorias de UX limpas');
} 