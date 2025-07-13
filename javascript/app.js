// ==============================================
// MÓDULO: Aplicação Principal
// ==============================================
// Versão: 1.0.0
// Descrição: Ponto de entrada e inicialização da aplicação

import { initializeDOMCache } from './utils.js';
import { 
  initializeHamburgerMenu, 
  initializeNavigationEffects, 
  initializeMenuOutsideClick 
} from './navigation.js';
import { 
  initializeAnimations, 
  initializeCustomCursor 
} from './animations.js';
import { initializeLightbox } from './lightbox.js';

/**
 * Inicializa todos os módulos da aplicação
 * @returns {Promise<void>}
 */
export async function initializeApp() {
  try {
    console.log('🚀 Iniciando aplicação...');
    
    // Inicializa cache DOM primeiro
    initializeDOMCache();
    
    // Inicializa módulos principais
    initializeHamburgerMenu();
    initializeNavigationEffects();
    initializeMenuOutsideClick();
    initializeAnimations();
    initializeCustomCursor();
    initializeLightbox();
    
    console.log('✅ Aplicação inicializada com sucesso!');
    
    // Log de informações úteis
    logAppInfo();
    
  } catch (error) {
    console.error('❌ Erro ao inicializar aplicação:', error);
  }
}

/**
 * Loga informações úteis sobre a aplicação
 * @returns {void}
 */
function logAppInfo() {
  const info = {
    'Elementos animados': document.querySelectorAll('.animated').length,
    'Imagens no lightbox': document.querySelectorAll('.imagem-projeto, .imagem-projeto-galeria').length,
    'Links de navegação': document.querySelectorAll('a').length,
    'Versão': '2.0.0',
    'Modular': true
  };
  
  console.table(info);
}

/**
 * Função de limpeza para quando a página for descarregada
 * @returns {void}
 */
export function cleanup() {
  // Remove event listeners se necessário
  console.log('🧹 Limpeza da aplicação realizada');
}

/**
 * Event listener principal - aguarda DOM estar pronto
 */
document.addEventListener("DOMContentLoaded", initializeApp);

/**
 * Event listener para limpeza quando a página for descarregada
 */
window.addEventListener("beforeunload", cleanup);

// Exporta para uso global se necessário
window.PortfolioApp = {
  initialize: initializeApp,
  cleanup: cleanup
}; 