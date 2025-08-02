// ==============================================
// MÓDULO: Aplicação Principal Otimizada
// ==============================================
// Versão: 2.0.0 - Performance Optimized
// Descrição: Sistema principal otimizado com inicialização sequencial

import { initializeDOMCache, cleanupAll } from './utils.js';
import { 
  initializeHamburgerMenu, 
  initializeNavigationEffects, 
  initializeMenuOutsideClick 
} from './navigation.js';
import { initializeAppleMenu, cleanupAppleMenu } from './apple-menu.js';
import { 
  initializeAnimations, 
  initializeCustomCursor 
} from './animations.js';
import { initializeLightbox } from './lightbox.js';
import { initializeLoadingScreen, initializeLazyLoading } from './loading.js';
import { initializeUXEnhancements, cleanupUXEnhancements } from './ux-enhancements.js';
import { initializeNavigationDots, cleanupNavigationDots } from './navigation-dots.js';
import { runPerformanceTests, quickPerformanceCheck } from './performance-test.js';

/**
 * Inicializa todos os módulos da aplicação de forma sequencial e otimizada
 * @returns {Promise<void>}
 */
export async function initializeApp() {
  try {
    console.log('🚀 Iniciando aplicação otimizada...');
    
    // 1. Inicializa cache DOM primeiro
    initializeDOMCache();
    
    // 2. Aguarda a tela de loading terminar
    await initializeLoadingScreen();
    
    // 3. Inicializa módulos críticos primeiro
    initializeHamburgerMenu();
    initializeNavigationEffects();
    initializeMenuOutsideClick();
    initializeAppleMenu();
    
    // 4. Inicializa módulos visuais
    initializeAnimations();
    initializeCustomCursor();
    initializeLightbox();
    
    // 5. Inicializa módulos de navegação
    initializeNavigationDots();
    
    // 6. Inicializa melhorias de UX
    initializeUXEnhancements();
    
    // 7. Inicializa lazy loading para imagens não críticas
    initializeLazyLoading();
    
    // 8. Marca aplicação como inicializada
    window.PortfolioApp = {
      initialize: initializeApp,
      cleanup: cleanup,
      isInitialized: true,
      runPerformanceTests: runPerformanceTests,
      quickPerformanceCheck: quickPerformanceCheck
    };
    
    console.log('✅ Aplicação otimizada inicializada com sucesso!');
    
    // Log de informações úteis
    logAppInfo();
    
    // Executa verificação rápida de performance em desenvolvimento
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      setTimeout(() => {
        console.log('\n🔍 Executando verificação rápida de performance...');
        quickPerformanceCheck();
      }, 2000);
    }
    
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
    'Versão': '2.0.0',
    'Modular': true,
    'UX Enhancements': true,
    'Performance': 'Otimizada',
    'Testes de Performance': 'Disponíveis'
  };
  
  console.table(info);
}

/**
 * Função de limpeza completa para quando a página for descarregada
 * @returns {void}
 */
export function cleanup() {
  // Remove event listeners e observers
  cleanupAll();
  
  // Limpa módulos específicos
  cleanupNavigationDots();
  cleanupAppleMenu();
  cleanupUXEnhancements();
  
  console.log('🧹 Limpeza completa da aplicação realizada');
}

/**
 * Event listener principal - aguarda DOM estar pronto
 */
if (document.readyState === 'loading') {
  document.addEventListener("DOMContentLoaded", initializeApp);
} else {
  // DOM já está pronto
  initializeApp();
}

/**
 * Event listener para limpeza quando a página for descarregada
 */
window.addEventListener("beforeunload", cleanup);

/**
 * Event listener para limpeza quando a página for escondida
 */
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    // Página escondida - pode pausar algumas animações
    console.log('📱 Página escondida - otimizando recursos');
  } else {
    // Página visível novamente
    console.log('📱 Página visível - restaurando recursos');
  }
});

/**
 * Comandos de debug para console
 */
window.debugPortfolio = {
  // Executa testes completos de performance
  runTests: () => {
    console.log('🧪 Executando testes completos de performance...');
    runPerformanceTests();
  },
  
  // Verificação rápida
  quickCheck: () => {
    console.log('⚡ Executando verificação rápida...');
    quickPerformanceCheck();
  },
  
  // Mostra informações da aplicação
  info: () => {
    console.log('📊 Informações da aplicação:');
    logAppInfo();
  },
  
  // Mostra estado atual
  state: () => {
    console.log('🔍 Estado atual da aplicação:');
    console.log('PortfolioApp:', window.PortfolioApp);
    console.log('APP_STATE:', window.APP_STATE);
    console.log('DOM_CACHE:', window.DOM_CACHE);
  },
  
  // Limpa recursos
  cleanup: () => {
    console.log('🧹 Executando cleanup manual...');
    cleanup();
  }
};

// Adiciona comandos de debug ao console
console.log('🔧 Comandos de debug disponíveis:');
console.log('- debugPortfolio.runTests() - Executa testes completos');
console.log('- debugPortfolio.quickCheck() - Verificação rápida');
console.log('- debugPortfolio.info() - Informações da aplicação');
console.log('- debugPortfolio.state() - Estado atual');
console.log('- debugPortfolio.cleanup() - Limpeza manual'); 