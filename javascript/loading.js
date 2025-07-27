// ==============================================
// MÓDULO: Tela de Loading
// ==============================================
// Versão: 1.0.0
// Descrição: Gerencia a tela de loading inicial

import { CONFIG } from './config.js';
import { DOM_CACHE, addClass } from './utils.js';

/**
 * Inicializa a tela de loading
 * @returns {Promise<void>}
 */
export function initializeLoadingScreen() {
  const loadingScreen = DOM_CACHE.loadingScreen;
  
  if (!loadingScreen) {
    console.warn('Tela de loading não encontrada');
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    // Verifica se já está tudo carregado
    if (isEverythingLoaded()) {
      console.log('✅ Tudo já carregado, removendo tela de loading...');
      hideLoadingScreen(loadingScreen);
      resolve();
      return;
    }

    console.log('🔄 Aguardando carregamento de recursos...');
    
    // Aguarda todos os recursos carregarem
    Promise.all([
      waitForImages(),
      waitForVideos(),
      waitForDOMReady()
    ]).then(() => {
      console.log('✅ Recursos carregados, finalizando loading...');
      hideLoadingScreen(loadingScreen);
      resolve();
    }).catch(() => {
      console.log('⚠️ Erro no carregamento, finalizando loading...');
      hideLoadingScreen(loadingScreen);
      resolve();
    });

    // Fallback: se demorar muito, remove a tela de loading
    setTimeout(() => {
      if (loadingScreen.parentNode) {
        console.log('⏰ Timeout: removendo tela de loading...');
        hideLoadingScreen(loadingScreen);
        resolve();
      }
    }, 5000); // 5 segundos máximo
  });
}

/**
 * Aguarda todas as imagens carregarem
 * @returns {Promise<void>}
 */
function waitForImages() {
  const images = document.querySelectorAll('img');
  const imagePromises = Array.from(images).map(img => {
    if (img.complete) {
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      img.addEventListener('load', resolve, { once: true });
      img.addEventListener('error', resolve, { once: true });
    });
  });
  
  return Promise.all(imagePromises);
}

/**
 * Aguarda todos os vídeos carregarem
 * @returns {Promise<void>}
 */
function waitForVideos() {
  const videos = document.querySelectorAll('video');
  const videoPromises = Array.from(videos).map(video => {
    return new Promise((resolve) => {
      if (video.readyState >= 2) { // HAVE_CURRENT_DATA
        resolve();
      } else {
        video.addEventListener('canplay', resolve, { once: true });
        video.addEventListener('error', resolve, { once: true });
      }
    });
  });
  
  return Promise.all(videoPromises);
}

/**
 * Verifica se todos os recursos já estão carregados
 * @returns {boolean} True se tudo está carregado
 */
function isEverythingLoaded() {
  // Verifica se o DOM está completo
  if (document.readyState !== 'complete') {
    return false;
  }

  // Verifica se todas as imagens estão carregadas
  const images = document.querySelectorAll('img');
  for (let img of images) {
    if (!img.complete) {
      return false;
    }
  }

  // Verifica se todos os vídeos estão prontos
  const videos = document.querySelectorAll('video');
  for (let video of videos) {
    if (video.readyState < 2) { // HAVE_CURRENT_DATA
      return false;
    }
  }

  return true;
}

/**
 * Aguarda o DOM estar completamente pronto
 * @returns {Promise<void>}
 */
function waitForDOMReady() {
  return new Promise((resolve) => {
    if (document.readyState === 'complete') {
      resolve();
    } else {
      window.addEventListener('load', resolve, { once: true });
    }
  });
}

/**
 * Esconde a tela de loading com animação
 * @param {HTMLElement} loadingScreen - Elemento da tela de loading
 * @returns {void}
 */
function hideLoadingScreen(loadingScreen) {
  // Se tudo já estava carregado, remove imediatamente
  if (isEverythingLoaded()) {
    if (loadingScreen.parentNode) {
      loadingScreen.parentNode.removeChild(loadingScreen);
    }
    console.log('✅ Tela de loading removida (tudo já carregado)');
    return;
  }

  // Caso contrário, faz a animação de fade out
  addClass(loadingScreen, 'hidden');
  
  // Remove a tela de loading do DOM após a animação
  setTimeout(() => {
    if (loadingScreen.parentNode) {
      loadingScreen.parentNode.removeChild(loadingScreen);
    }
  }, 800); // Tempo da transição CSS
  
  console.log('✅ Tela de loading finalizada');
} 