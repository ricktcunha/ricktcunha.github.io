// ==============================================
// MÓDULO: Navegação e Menu
// ==============================================
// Versão: 1.0.0
// Descrição: Gerencia menu hambúrguer e efeitos de navegação

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
 * Gerencia efeitos de fade na navegação
 * @returns {void}
 */
export function initializeNavigationEffects() {
  // Adiciona fade-in ao carregar a página
  addClass(DOM_CACHE.body, CONFIG.CLASSES.FADE_IN);

  // Gerencia fade-out nos links
  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", handleLinkClick);
  });
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

  e.preventDefault();
  addClass(DOM_CACHE.body, CONFIG.CLASSES.FADE_OUT);
  
  // Fecha o menu se estiver aberto
  if (APP_STATE.isMenuOpen) {
    closeMenu();
  }
  
  setTimeout(() => {
    window.location.href = link.getAttribute("href");
  }, CONFIG.ANIMATION_DELAY);
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