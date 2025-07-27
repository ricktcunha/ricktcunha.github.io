// ==============================================
// MÓDULO: Menu Apple Style
// ==============================================
// Versão: 1.0.0
// Descrição: Menu hambúrguer moderno inspirado no estilo Apple

import { CONFIG, APP_STATE } from './config.js';
import { DOM_CACHE, addClass, removeClass } from './utils.js';

/**
 * Inicializa o menu hambúrguer moderno
 * @returns {void}
 */
export function initializeAppleMenu() {
  const hamburger = document.getElementById('hamburger');
  const menuOverlay = document.getElementById('menuOverlay');
  const menuClose = document.getElementById('menuClose');
  const menuLinks = document.querySelectorAll('.menu-items a');

  if (!hamburger || !menuOverlay || !menuClose) {
    console.warn('Elementos do menu Apple não encontrados');
    return;
  }

  // Event listeners
  hamburger.addEventListener('click', openMenu);
  menuClose.addEventListener('click', closeMenu);
  
  // Fechar menu ao clicar em um link
  menuLinks.forEach(link => {
    link.addEventListener('click', handleMenuLinkClick);
  });

  // Fechar menu ao pressionar ESC
  document.addEventListener('keydown', handleKeyDown);

  // Fechar menu ao clicar fora
  menuOverlay.addEventListener('click', handleOverlayClick);

  console.log('🍎 Menu Apple inicializado');
}

/**
 * Abre o menu com animações
 * @returns {void}
 */
function openMenu() {
  const menuOverlay = document.getElementById('menuOverlay');
  const hamburger = document.getElementById('hamburger');
  
  if (!menuOverlay || !hamburger) return;

  // Salva a posição atual do scroll
  const scrollY = window.scrollY;
  
  // Adiciona classes ativas
  addClass(menuOverlay, 'active');
  addClass(hamburger, 'active');
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
 * Fecha o menu com animações
 * @returns {void}
 */
function closeMenu() {
  const menuOverlay = document.getElementById('menuOverlay');
  const hamburger = document.getElementById('hamburger');
  
  if (!menuOverlay || !hamburger) return;

  // Remove classes ativas
  removeClass(menuOverlay, 'active');
  removeClass(hamburger, 'active');
  removeClass(document.body, 'menu-open');
  
  // Restaura o scroll
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  
  // Volta para a posição original do scroll
  if (APP_STATE.scrollPosition !== undefined) {
    window.scrollTo(0, APP_STATE.scrollPosition);
  }
  
  // Atualiza estado
  APP_STATE.isMenuOpen = false;
  APP_STATE.scrollPosition = undefined;
  
  // Retorna foco para o hambúrguer
  setTimeout(() => {
    hamburger.focus();
  }, 300);

  console.log('🍎 Menu fechado');
}

/**
 * Gerencia clique em links do menu
 * @param {Event} e - Evento de clique
 * @returns {void}
 */
function handleMenuLinkClick(e) {
  const link = e.currentTarget;
  const href = link.getAttribute('href');
  
  // Fecha o menu
  closeMenu();
  
  // Pequeno delay para permitir a animação de fechamento
  setTimeout(() => {
    if (href.startsWith('#')) {
      // Navegação interna
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navegação externa
      window.location.href = href;
    }
  }, 400);
}

/**
 * Gerencia teclas pressionadas
 * @param {KeyboardEvent} e - Evento de tecla
 * @returns {void}
 */
function handleKeyDown(e) {
  if (e.key === 'Escape' && APP_STATE.isMenuOpen) {
    closeMenu();
  }
  
  // Impede scroll via teclado quando menu está aberto
  if (APP_STATE.isMenuOpen) {
    const scrollKeys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '];
    if (scrollKeys.includes(e.key)) {
      e.preventDefault();
    }
  }
}

/**
 * Gerencia clique no overlay
 * @param {Event} e - Evento de clique
 * @returns {void}
 */
function handleOverlayClick(e) {
  // Fecha apenas se clicou no overlay, não nos itens
  if (e.target.classList.contains('menu-overlay')) {
    closeMenu();
  }
}

/**
 * Verifica se o menu está aberto
 * @returns {boolean}
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
 * Limpa event listeners do menu
 * @returns {void}
 */
export function cleanupAppleMenu() {
  // Remove event listeners se necessário
  document.removeEventListener('keydown', handleKeyDown);
  console.log('🧹 Menu Apple limpo');
} 