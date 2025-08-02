// ==============================================
// MÓDULO: Menu Apple Style Otimizado
// ==============================================
// Versão: 2.0.0 - Performance Optimized
// Descrição: Menu hambúrguer moderno otimizado

import { CONFIG, APP_STATE } from './config.js';
import { DOM_CACHE, addEventListenerOptimized, addClass, removeClass } from './utils.js';

/**
 * Inicializa o menu hambúrguer moderno de forma otimizada
 * @returns {void}
 */
export function initializeAppleMenu() {
  const hamburger = DOM_CACHE.hamburger;
  const menuOverlay = DOM_CACHE.menuOverlay;
  const menuClose = DOM_CACHE.menuClose;
  const menuLinks = document.querySelectorAll('.menu-items a');

  if (!hamburger || !menuOverlay || !menuClose) {
    console.warn('Elementos do menu Apple não encontrados');
    return;
  }

  // Event listeners otimizados
  addEventListenerOptimized(hamburger, 'click', openMenu);
  addEventListenerOptimized(menuClose, 'click', closeMenu);
  
  // Fechar menu ao clicar em um link
  menuLinks.forEach(link => {
    addEventListenerOptimized(link, 'click', handleMenuLinkClick);
  });

  // Fechar menu ao pressionar ESC
  addEventListenerOptimized(document, 'keydown', handleKeyDown);

  // Fechar menu ao clicar fora
  addEventListenerOptimized(menuOverlay, 'click', handleOverlayClick);

  console.log('🍎 Menu Apple otimizado inicializado');
}

/**
 * Abre o menu com animações otimizadas
 * @returns {void}
 */
function openMenu() {
  const menuOverlay = DOM_CACHE.menuOverlay;
  const hamburger = DOM_CACHE.hamburger;
  
  if (!menuOverlay || !hamburger) return;

  // Salva a posição atual do scroll
  const scrollY = window.scrollY;
  
  // Adiciona classes ativas
  addClass(menuOverlay, CONFIG.CLASSES.ACTIVE);
  addClass(hamburger, CONFIG.CLASSES.ACTIVE);
  addClass(document.body, 'menu-open');
  
  // Impede o scroll
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollY}px`;
  document.body.style.width = '100%';
  
  // Atualiza estado
  APP_STATE.isMenuOpen = true;
  APP_STATE.scrollPosition = scrollY;
  
  // Foca no primeiro link para acessibilidade
  setTimeout(() => {
    const firstLink = menuOverlay.querySelector('.menu-items a');
    if (firstLink) {
      firstLink.focus();
    }
  }, 300);

  console.log('🍎 Menu aberto');
}

/**
 * Fecha o menu com animações otimizadas
 * @returns {void}
 */
function closeMenu() {
  const menuOverlay = DOM_CACHE.menuOverlay;
  const hamburger = DOM_CACHE.hamburger;
  
  if (!menuOverlay || !hamburger) return;

  // Remove classes ativas
  removeClass(menuOverlay, CONFIG.CLASSES.ACTIVE);
  removeClass(hamburger, CONFIG.CLASSES.ACTIVE);
  removeClass(document.body, 'menu-open');
  
  // Restaura o scroll
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  
  // Restaura posição do scroll
  if (APP_STATE.scrollPosition) {
    window.scrollTo(0, APP_STATE.scrollPosition);
    APP_STATE.scrollPosition = 0;
  }
  
  // Atualiza estado
  APP_STATE.isMenuOpen = false;
  
  // Foca no hamburger para acessibilidade
  setTimeout(() => {
    hamburger.focus();
  }, 300);

  console.log('🍎 Menu fechado');
}

/**
 * Manipula o clique em links do menu
 * @param {Event} e - Evento de clique
 * @returns {void}
 */
function handleMenuLinkClick(e) {
  const link = e.currentTarget;
  const href = link.getAttribute('href');
  
  // Fecha o menu
  closeMenu();
  
  // Navega para o link após um pequeno delay para a animação
  setTimeout(() => {
    if (href && href !== '#') {
      window.location.href = href;
    }
  }, 300);
}

/**
 * Manipula teclas pressionadas
 * @param {KeyboardEvent} e - Evento de tecla
 * @returns {void}
 */
function handleKeyDown(e) {
  if (e.key === 'Escape' && APP_STATE.isMenuOpen) {
    closeMenu();
  }
}

/**
 * Manipula clique no overlay
 * @param {Event} e - Evento de clique
 * @returns {void}
 */
function handleOverlayClick(e) {
  const menuOverlay = DOM_CACHE.menuOverlay;
  
  if (e.target === menuOverlay) {
    closeMenu();
  }
}

/**
 * Verifica se o menu está aberto
 * @returns {boolean} True se o menu está aberto
 */
export function isMenuOpen() {
  return APP_STATE.isMenuOpen;
}

/**
 * Fecha o menu se estiver aberto
 * @returns {void}
 */
export function closeMenuIfOpen() {
  if (APP_STATE.isMenuOpen) {
    closeMenu();
  }
}

/**
 * Limpa o menu Apple
 * @returns {void}
 */
export function cleanupAppleMenu() {
  // Remove event listeners se necessário
  if (APP_STATE.isMenuOpen) {
    closeMenu();
  }
  
  console.log('🧹 Menu Apple limpo');
} 