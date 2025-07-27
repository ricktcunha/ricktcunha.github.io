// ==============================================
// MÓDULO: Aplicação Principal
// ==============================================
// Versão: 1.1.0
// Descrição: Ponto de entrada e inicialização da aplicação (fade removido)

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
import { initializeLoadingScreen } from './loading.js';
import { initializeUXEnhancements } from './ux-enhancements.js';

/**
 * Inicializa todos os módulos da aplicação
 * @returns {Promise<void>}
 */
export async function initializeApp() {
  try {
    console.log('🚀 Iniciando aplicação...');
    
    // Inicializa cache DOM primeiro
    initializeDOMCache();
    
    // Aguarda a tela de loading terminar
    await initializeLoadingScreen();
    
    // Inicializa módulos principais
    initializeHamburgerMenu();
    initializeNavigationEffects();
    initializeMenuOutsideClick();
    initializeAnimations();
    initializeCustomCursor();
    initializeLightbox();
    
    // Inicializa melhorias de UX
    initializeUXEnhancements();
    
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
    'Elementos parallax': 'Desabilitado',
    'Imagens lazy loading': document.querySelectorAll('img[data-src]').length,
    'Versão': '2.2.0',
    'Modular': true,
    'UX Enhancements': true
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