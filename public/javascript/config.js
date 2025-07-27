// ==============================================
// MÓDULO: Configurações Globais
// ==============================================
// Versão: 1.1.0
// Descrição: Configurações centralizadas da aplicação (fade removido)

/**
 * Configurações globais da aplicação
 * @type {Object}
 */
export const CONFIG = {
  // Animações
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
    HOVER_ELEMENTS: "a, button",
    LOADING_SCREEN: "#loading-screen"
  },
  
  // Classes CSS
  CLASSES: {
    ACTIVE: "active",
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