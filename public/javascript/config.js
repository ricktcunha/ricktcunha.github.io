// ==============================================
// MÓDULO: Configurações Globais Otimizadas
// ==============================================
// Versão: 2.0.0 - Performance Optimized
// Descrição: Configurações centralizadas otimizadas para performance

/**
 * Configurações globais da aplicação otimizadas
 * @type {Object}
 */
export const CONFIG = {
  // Performance
  DEBOUNCE_DELAY: 16, // ~60fps
  THROTTLE_DELAY: 100, // Para scroll events
  LAZY_LOAD_OFFSET: 200, // Pixels antes do elemento aparecer
  ANIMATION_DURATION: 300,
  
  // Lightbox
  LIGHTBOX_TIMEOUT: 200,
  LIGHTBOX_EXPAND_DELAY: 10,
  
  // Scroll
  SCROLL_OFFSET: 100,
  SCROLL_BEHAVIOR: 'smooth',
  
  // Seletores DOM otimizados
  SELECTORS: {
    HAMBURGER: "#hamburger",
    MENU_OVERLAY: "#menuOverlay",
    MENU_CLOSE: "#menuClose",
    CURSOR: ".custom-cursor",
    LIGHTBOX: "#lightbox",
    LIGHTBOX_IMAGE: "#lightbox img",
    ANIMATED: ".animated",
    IMAGES: ".imagem-projeto, .imagem-projeto-galeria",
    HOVER_ELEMENTS: "a, button, .navigation-dots .dot",
    LOADING_SCREEN: "#loading-screen",
    NAVIGATION_DOTS: ".navigation-dots .dot",
    PROGRESS_BAR: ".reading-progress-bar"
  },
  
  // Classes CSS
  CLASSES: {
    ACTIVE: "active",
    IN_VIEW: "in-view",
    CURSOR_HOVER: "custom-cursor-hover",
    LIGHTBOX_OPEN: "open",
    POSTAGEM: "postagem",
    IMAGEM_PROJETO: "imagem-projeto",
    HIDDEN: "hidden",
    LOADED: "loaded",
    LAZY: "lazy"
  },
  
  // Breakpoints para responsividade
  BREAKPOINTS: {
    MOBILE: 768,
    TABLET: 1024,
    DESKTOP: 1200
  }
};

/**
 * Estado global da aplicação otimizado
 * @type {Object}
 */
export const APP_STATE = {
  currentImage: null,
  isLightboxOpen: false,
  isMenuOpen: false,
  scrollPosition: 0,
  isInitialized: false,
  observers: new Set(),
  eventListeners: new Map()
};

/**
 * Cache de performance
 * @type {Object}
 */
export const PERFORMANCE_CACHE = {
  lastScrollTime: 0,
  lastResizeTime: 0,
  imageLoadPromises: new Map(),
  domQueries: new Map()
}; 