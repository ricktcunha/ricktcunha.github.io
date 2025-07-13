// ==============================================
// MÓDULO: Configurações Globais
// ==============================================
// Versão: 1.0.0
// Descrição: Configurações centralizadas da aplicação

/**
 * Configurações globais da aplicação
 * @type {Object}
 */
export const CONFIG = {
  // Animações
  ANIMATION_DELAY: 800,
  SCROLL_OFFSET: 100,
  LIGHTBOX_TIMEOUT: 300,
  LIGHTBOX_EXPAND_DELAY: 10,
  
  // Performance
  DEBOUNCE_DELAY: 16, // ~60fps
  
  // Seletores DOM
  SELECTORS: {
    HAMBURGER: "#hamburger",
    MENU: ".header-menu",
    CURSOR: ".custom-cursor",
    LIGHTBOX: "#lightbox",
    LIGHTBOX_IMAGE: "#lightbox img",
    ANIMATED: ".animated",
    IMAGES: ".imagem-projeto, .imagem-projeto-galeria",
    HOVER_ELEMENTS: "a, button"
  },
  
  // Classes CSS
  CLASSES: {
    ACTIVE: "active",
    FADE_IN: "fade-in",
    FADE_OUT: "fade-out",
    IN_VIEW: "in-view",
    CURSOR_HOVER: "custom-cursor-hover",
    LIGHTBOX_OPEN: "open",
    POSTAGEM: "postagem",
    IMAGEM_PROJETO: "imagem-projeto"
  }
};

/**
 * Estado global da aplicação
 * @type {Object}
 */
export const APP_STATE = {
  currentImage: null,
  isLightboxOpen: false,
  isMenuOpen: false
}; 