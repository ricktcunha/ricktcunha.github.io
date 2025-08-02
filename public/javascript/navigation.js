// ==============================================
// MÓDULO: Navegação e Menu Otimizado
// ==============================================
// Versão: 2.0.0 - Performance Optimized
// Descrição: Sistema de navegação otimizado sem conflitos

import { CONFIG, APP_STATE } from './config.js';
import { DOM_CACHE, addEventListenerOptimized, addClass, removeClass, isInternalNavigation } from './utils.js';

/**
 * Inicializa o menu hambúrguer de forma otimizada
 * @returns {void}
 */
export function initializeHamburgerMenu() {
  if (!DOM_CACHE.hamburger) {
    console.warn('Elemento do menu hambúrguer não encontrado');
    return;
  }

  addEventListenerOptimized(DOM_CACHE.hamburger, "click", toggleMenu);
  console.log('🍔 Menu hambúrguer otimizado inicializado');
}

/**
 * Alterna o estado do menu hambúrguer
 * @returns {void}
 */
function toggleMenu() {
  if (!DOM_CACHE.hamburger) return;
  
  const isActive = DOM_CACHE.hamburger.classList.contains(CONFIG.CLASSES.ACTIVE);
  
  if (isActive) {
    closeMenu();
  } else {
    openMenu();
  }
}

/**
 * Abre o menu hambúrguer
 * @returns {void}
 */
function openMenu() {
  if (!DOM_CACHE.hamburger) return;
  
  addClass(DOM_CACHE.hamburger, CONFIG.CLASSES.ACTIVE);
  APP_STATE.isMenuOpen = true;
  
  // Salva posição do scroll
  APP_STATE.scrollPosition = window.scrollY;
  
  // Previne scroll do body
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.top = `-${APP_STATE.scrollPosition}px`;
  document.body.style.width = '100%';
  
  console.log('🍔 Menu aberto');
}

/**
 * Fecha o menu hambúrguer
 * @returns {void}
 */
export function closeMenu() {
  if (!DOM_CACHE.hamburger) return;
  
  removeClass(DOM_CACHE.hamburger, CONFIG.CLASSES.ACTIVE);
  APP_STATE.isMenuOpen = false;
  
  // Restaura scroll do body
  document.body.style.overflow = '';
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  
  // Restaura posição do scroll
  if (APP_STATE.scrollPosition) {
    window.scrollTo(0, APP_STATE.scrollPosition);
    APP_STATE.scrollPosition = 0;
  }
  
  console.log('🍔 Menu fechado');
}

/**
 * Inicializa efeitos de navegação otimizados
 * @returns {void}
 */
export function initializeNavigationEffects() {
  // Efeitos de navegação otimizados já implementados
  console.log('🎯 Efeitos de navegação otimizados ativos');
}

/**
 * Gerencia o clique em links de forma otimizada
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
  
  // Navegação direta sem efeitos desnecessários
  window.location.href = link.getAttribute("href");
}

/**
 * Fecha o menu ao clicar fora dele de forma otimizada
 * @returns {void}
 */
export function initializeMenuOutsideClick() {
  addEventListenerOptimized(document, "click", (e) => {
    if (APP_STATE.isMenuOpen && 
        !DOM_CACHE.hamburger?.contains(e.target)) {
      closeMenu();
    }
  });
  
  console.log('🎯 Clique fora do menu otimizado inicializado');
} 