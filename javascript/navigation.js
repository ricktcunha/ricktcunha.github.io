// ==============================================
// MÓDULO: Navegação e Menu
// ==============================================
// Versão: 1.1.0
// Descrição: Gerencia menu hambúrguer e navegação (fade removido)

import { CONFIG, APP_STATE } from './config.js';
import { DOM_CACHE, addClass, isInternalNavigation } from './utils.js';

/**
 * Gerencia o menu hambúrguer responsivo
 * @returns {void}
 */
export function initializeHamburgerMenu() {
  if (!DOM_CACHE.hamburger || !DOM_CACHE.menu) {
    console.warn('Elementos do menu hambúrguer não encontrados');
    return;
  }

  DOM_CACHE.hamburger.addEventListener("click", toggleMenu);
}

/**
 * Alterna o estado do menu hambúrguer
 * @returns {void}
 */
function toggleMenu() {
  DOM_CACHE.menu.classList.toggle(CONFIG.CLASSES.ACTIVE);
  DOM_CACHE.hamburger.classList.toggle(CONFIG.CLASSES.ACTIVE);
  APP_STATE.isMenuOpen = !APP_STATE.isMenuOpen;
}

/**
 * Fecha o menu hambúrguer
 * @returns {void}
 */
export function closeMenu() {
  if (DOM_CACHE.menu && DOM_CACHE.hamburger) {
    DOM_CACHE.menu.classList.remove(CONFIG.CLASSES.ACTIVE);
    DOM_CACHE.hamburger.classList.remove(CONFIG.CLASSES.ACTIVE);
    APP_STATE.isMenuOpen = false;
  }
}

/**
 * Gerencia efeitos de navegação
 * @returns {void}
 */
export function initializeNavigationEffects() {
  // Removido efeitos de fade para melhor performance
  console.log('Efeitos de fade removidos da navegação');
}

/**
 * Gerencia o clique em links
 * @param {Event} e - Evento de clique
 * @returns {void}
 */
function handleLinkClick(e) {
  const link = e.currentTarget;
  
  // Ignora âncoras internas e links externos
  if (isInternalNavigation(link)) return;

  // Fecha o menu se estiver aberto
  if (APP_STATE.isMenuOpen) {
    closeMenu();
  }
  
  // Navegação direta sem fade
  window.location.href = link.getAttribute("href");
}

/**
 * Fecha o menu ao clicar fora dele
 * @returns {void}
 */
export function initializeMenuOutsideClick() {
  document.addEventListener("click", (e) => {
    if (APP_STATE.isMenuOpen && 
        !DOM_CACHE.hamburger.contains(e.target) && 
        !DOM_CACHE.menu.contains(e.target)) {
      closeMenu();
    }
  });
} 