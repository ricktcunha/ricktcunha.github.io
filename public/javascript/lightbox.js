// ==============================================
// MÓDULO: Lightbox
// ==============================================
// Versão: 1.0.0
// Descrição: Sistema completo de visualização de imagens

import { CONFIG, APP_STATE } from './config.js';
import { DOM_CACHE, addClass, removeClass } from './utils.js';

/**
 * Abre o lightbox com a imagem selecionada
 * @param {Event} e - Evento de clique
 * @returns {void}
 */
export function openLightbox(e) {
  if (!DOM_CACHE.lightbox || !DOM_CACHE.lightboxImage) {
    console.warn('Elementos do lightbox não encontrados');
    return;
  }

  const targetImage = e.target;
  
  // Define a imagem no lightbox
  DOM_CACHE.lightboxImage.src = targetImage.src;
  addClass(DOM_CACHE.lightbox, CONFIG.CLASSES.LIGHTBOX_OPEN);

  // Aplica classe correta baseada no tipo de imagem
  removeClass(DOM_CACHE.lightboxImage, CONFIG.CLASSES.POSTAGEM, CONFIG.CLASSES.IMAGEM_PROJETO);
  const imageClass = targetImage.classList.contains(CONFIG.CLASSES.POSTAGEM) 
    ? CONFIG.CLASSES.POSTAGEM 
    : CONFIG.CLASSES.IMAGEM_PROJETO;
  addClass(DOM_CACHE.lightboxImage, imageClass);

  // Expande a imagem com delay
  setTimeout(() => {
    addClass(DOM_CACHE.lightboxImage, CONFIG.CLASSES.LIGHTBOX_OPEN);
  }, CONFIG.LIGHTBOX_EXPAND_DELAY);

  // Atualiza estado
  APP_STATE.currentImage = targetImage;
  APP_STATE.isLightboxOpen = true;
  
  // Previne scroll do body
  document.body.style.overflow = 'hidden';
}

/**
 * Fecha o lightbox
 * @param {Event} e - Evento de clique
 * @returns {void}
 */
export function closeLightbox(e) {
  if (!DOM_CACHE.lightbox || !DOM_CACHE.lightboxImage) return;
  if (e.target !== DOM_CACHE.lightbox && e.target !== DOM_CACHE.lightboxImage) return;

  removeClass(DOM_CACHE.lightboxImage, CONFIG.CLASSES.LIGHTBOX_OPEN);
  
  setTimeout(() => {
    removeClass(DOM_CACHE.lightbox, CONFIG.CLASSES.LIGHTBOX_OPEN);
    DOM_CACHE.lightboxImage.src = "";
    removeClass(DOM_CACHE.lightboxImage, CONFIG.CLASSES.POSTAGEM, CONFIG.CLASSES.IMAGEM_PROJETO);
    
    // Reseta estado
    APP_STATE.currentImage = null;
    APP_STATE.isLightboxOpen = false;
    
    // Restaura scroll do body
    document.body.style.overflow = '';
  }, CONFIG.LIGHTBOX_TIMEOUT);
}

/**
 * Navega entre imagens no lightbox usando teclado
 * @param {KeyboardEvent} e - Evento de tecla
 * @returns {void}
 */
export function navigateLightbox(e) {
  if (!APP_STATE.isLightboxOpen) return;

  let nextImage = null;
  const currentIndex = Array.from(DOM_CACHE.images).indexOf(APP_STATE.currentImage);

  switch (e.key) {
    case "ArrowRight":
      nextImage = currentIndex < DOM_CACHE.images.length - 1 
        ? DOM_CACHE.images[currentIndex + 1] 
        : null;
      break;
    case "ArrowLeft":
      nextImage = currentIndex > 0 
        ? DOM_CACHE.images[currentIndex - 1] 
        : null;
      break;
    case "Escape":
      closeLightbox({ target: DOM_CACHE.lightbox });
      return;
    default:
      return;
  }

  if (nextImage) {
    DOM_CACHE.lightboxImage.src = nextImage.src;
    APP_STATE.currentImage = nextImage;
  }
}

/**
 * Inicializa o sistema de lightbox
 * @returns {void}
 */
export function initializeLightbox() {
  if (!DOM_CACHE.lightbox || !DOM_CACHE.lightboxImage) {
    console.warn('Elementos do lightbox não encontrados');
    return;
  }

  if (!DOM_CACHE.images.length) {
    console.warn('Nenhuma imagem encontrada para o lightbox');
    return;
  }

  // Adiciona event listeners
  DOM_CACHE.images.forEach((image) => {
    image.addEventListener("click", openLightbox);
  });
  
  DOM_CACHE.lightbox.addEventListener("click", closeLightbox);
  document.addEventListener("keydown", navigateLightbox);
  
  console.log(`Lightbox inicializado para ${DOM_CACHE.images.length} imagens`);
}

/**
 * Obtém a próxima imagem na sequência
 * @returns {Element|null} Próxima imagem ou null
 */
export function getNextImage() {
  if (!APP_STATE.currentImage) return null;
  
  const currentIndex = Array.from(DOM_CACHE.images).indexOf(APP_STATE.currentImage);
  return currentIndex < DOM_CACHE.images.length - 1 
    ? DOM_CACHE.images[currentIndex + 1] 
    : null;
}

/**
 * Obtém a imagem anterior na sequência
 * @returns {Element|null} Imagem anterior ou null
 */
export function getPreviousImage() {
  if (!APP_STATE.currentImage) return null;
  
  const currentIndex = Array.from(DOM_CACHE.images).indexOf(APP_STATE.currentImage);
  return currentIndex > 0 
    ? DOM_CACHE.images[currentIndex - 1] 
    : null;
} 