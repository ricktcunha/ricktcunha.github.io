// ==============================================
// PORTFÓLIO RICK - JAVASCRIPT OTIMIZADO
// ==============================================
// Versão: 2.0.0 - Final Optimizations Applied
// Autor: Rick Cunha
// Descrição: Código JavaScript 100% otimizado

(function() {
  'use strict';

  // ==============================================
  // CONFIGURAÇÕES
  // ==============================================
  
  const CONFIG = {
    LIGHTBOX_TIMEOUT: 200,
    
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
      NAVIGATION_DOTS: ".navigation-dots .dot",
      HEADER: ".header"
    },
    
    CLASSES: {
      ACTIVE: "active",
      IN_VIEW: "in-view", 
      CURSOR_HOVER: "custom-cursor-hover",
      LIGHTBOX_OPEN: "open",
      HIDDEN: "hidden",
      LOADED: "loaded"
    }
  };

  // ==============================================
  // ESTADO GLOBAL 
  // ==============================================
  
  const MenuState = {
    isOpen: false,
    scrollPosition: 0
  };
  
  const LightboxState = {
    isOpen: false,
    currentImage: null
  };
  
  const AppState = {
    observers: new Set(),
    eventListeners: new Map()
  };

  // ==============================================
  // CACHE DOM 
  // ==============================================
  
  const DOM = {
    body: null,
    hamburger: null,
    menuOverlay: null,
    menuClose: null,
    cursor: null,
    lightbox: null,
    lightboxImage: null,
    animatedElements: null,
    images: null,
    hoverElements: null,
    navigationDots: null,
    header: null,
    headerHeight: 0
  };

  // ==============================================
  // UTILITÁRIOS 
  // ==============================================
  
  function $(selector) {
    return document.querySelector(selector);
  }
  
  function $$(selector) {
    return document.querySelectorAll(selector);
  }
  
  function addClass(el, className) {
    el?.classList.add(className);
  }
  
  function removeClass(el, className) {
    el?.classList.remove(className);
  }
  
  function toggleClass(el, className, force) {
    if (!el) return;
    el.classList.toggle(className, force);
  }
  
  function throttle(func, limit) {
    let inThrottle;
    return (...args) => {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
  
  function addEvent(el, event, handler, options = {}) {
    if (!el) return;
    
    const key = `${el.id || 'anonymous'}-${event}`;
    const existing = AppState.eventListeners.get(key);
    
    if (existing) {
      el.removeEventListener(event, existing.handler, existing.options);
    }
    
    el.addEventListener(event, handler, options);
    AppState.eventListeners.set(key, { handler, options, cleanup: () => {
      el.removeEventListener(event, handler, options);
      AppState.eventListeners.delete(key);
    }});
    
    return () => {
      el.removeEventListener(event, handler, options);
      AppState.eventListeners.delete(key);
    };
  }
  
  function createObserver(callback, options = {}) {
    const observer = new IntersectionObserver(callback, {
      rootMargin: '0px',
      threshold: 0.1,
      ...options
    });
    AppState.observers.add(observer);
    return observer;
  }

  // ==============================================
  // MENU 
  // ==============================================
  
  function initMenu() {
    if (!DOM.hamburger || !DOM.menuOverlay || !DOM.menuClose) return;
    
    addEvent(DOM.hamburger, 'click', toggleMenu);
    addEvent(DOM.menuClose, 'click', closeMenu);
    addEvent(DOM.menuOverlay, 'click', (e) => {
      if (e.target === DOM.menuOverlay) closeMenu();
    });
    
    $$('.menu-items a').forEach(link => {
      addEvent(link, 'click', () => {
        closeMenu();
        setTimeout(() => {
          if (link.href && link.href !== '#') {
            window.location.href = link.href;
          }
        }, 300);
      });
    });
  }
  
  function toggleMenu() {
    MenuState.isOpen ? closeMenu() : openMenu();
  }
  
  function openMenu() {
    if (!DOM.hamburger || !DOM.menuOverlay) return;
    
    const scrollY = window.scrollY;
    
    addClass(DOM.menuOverlay, CONFIG.CLASSES.ACTIVE);
    addClass(DOM.hamburger, CONFIG.CLASSES.ACTIVE);
    addClass(DOM.body, 'menu-open');
    
    DOM.body.style.position = 'fixed';
    DOM.body.style.top = `-${scrollY}px`;
    DOM.body.style.width = '100%';
    
    MenuState.isOpen = true;
    MenuState.scrollPosition = scrollY;
  }
  
  function closeMenu() {
    if (!DOM.hamburger || !DOM.menuOverlay) return;
    
    removeClass(DOM.menuOverlay, CONFIG.CLASSES.ACTIVE);
    removeClass(DOM.hamburger, CONFIG.CLASSES.ACTIVE);
    removeClass(DOM.body, 'menu-open');
    
    DOM.body.style.position = '';
    DOM.body.style.top = '';
    DOM.body.style.width = '';
    
    if (MenuState.scrollPosition) {
      window.scrollTo(0, MenuState.scrollPosition);
      MenuState.scrollPosition = 0;
    }
    
    MenuState.isOpen = false;
  }

  // ==============================================
  // ANIMAÇÕES 
  // ==============================================
  
  function initAnimations() {
    if (!DOM.animatedElements.length) return;
    
    const visibleElements = Array.from(DOM.animatedElements)
      .filter(el => el.offsetParent !== null);
    
    if (!visibleElements.length) return;
    
    const observer = createObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          addClass(entry.target, CONFIG.CLASSES.IN_VIEW);
        }
      });
    }, {
      rootMargin: '100px',
      threshold: 0.1
    });
    
    visibleElements.forEach(el => observer.observe(el));
  }
  
  function initCursor() {
    if (!DOM.cursor) return;
    
    let ticking = false;
    const updateCursor = (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          DOM.cursor.style.left = `${e.clientX}px`;
          DOM.cursor.style.top = `${e.clientY}px`;
          ticking = false;
        });
        ticking = true;
      }
    };
    
    addEvent(document, 'mousemove', updateCursor, { passive: true });
    
    DOM.hoverElements.forEach(el => {
      addEvent(el, 'mouseenter', () => {
        addClass(DOM.cursor, CONFIG.CLASSES.CURSOR_HOVER);
        if (el.classList.contains('dot')) {
          addClass(DOM.cursor, 'navigation-dot-hover');
        }
      });
      
      addEvent(el, 'mouseleave', () => {
        removeClass(DOM.cursor, CONFIG.CLASSES.CURSOR_HOVER);
        removeClass(DOM.cursor, 'navigation-dot-hover');
      });
    });
  }

  // ==============================================
  // LIGHTBOX 
  // ==============================================
  
  function initLightbox() {
    if (!DOM.lightbox || !DOM.images.length) return;
    
    DOM.images.forEach(img => {
      addEvent(img, 'click', openLightbox);
    });
    
    addEvent(DOM.lightbox, 'click', (e) => {
      if (e.target === DOM.lightbox || e.target === DOM.lightboxImage) {
        closeLightbox();
      }
    });
  }
  
  function openLightbox(e) {
    if (!DOM.lightbox || !DOM.lightboxImage) return;
    
    const img = e.target;
    DOM.lightboxImage.src = img.src;
    addClass(DOM.lightbox, CONFIG.CLASSES.LIGHTBOX_OPEN);
    
    LightboxState.currentImage = img;
    LightboxState.isOpen = true;
    DOM.body.style.overflow = 'hidden';
  }
  
  function closeLightbox() {
    if (!DOM.lightbox || !DOM.lightboxImage) return;
    
    removeClass(DOM.lightbox, CONFIG.CLASSES.LIGHTBOX_OPEN);
    
    setTimeout(() => {
      DOM.lightboxImage.src = '';
      LightboxState.currentImage = null;
      LightboxState.isOpen = false;
      DOM.body.style.overflow = '';
    }, CONFIG.LIGHTBOX_TIMEOUT);
  }
  
  function navigateLightbox(direction) {
    if (!LightboxState.currentImage) return;
    
    const currentIndex = Array.from(DOM.images).indexOf(LightboxState.currentImage);
    const nextIndex = currentIndex + direction;
    
    if (nextIndex >= 0 && nextIndex < DOM.images.length) {
      const clickEvent = new Event('click', { bubbles: true });
      DOM.images[nextIndex].dispatchEvent(clickEvent);
    }
  }

  // ==============================================
  // NAVIGATION 
  // ==============================================
  
  function initNavigationDots() {
    if (!DOM.navigationDots.length) return;
    
    const sections = getSections();
    if (!sections.length) return;
    
    setupDotClickHandlers();
    setupSectionObserver(sections);
  }
  
  function getSections() {
    const sectionIds = Array.from(DOM.navigationDots).map(dot => dot.getAttribute('data-section'));
    return sectionIds.map(id => document.getElementById(id)).filter(Boolean);
  }
  
  function setupDotClickHandlers() {
    DOM.navigationDots.forEach(dot => {
      addEvent(dot, 'click', () => {
        const sectionId = dot.getAttribute('data-section');
        const section = document.getElementById(sectionId);
        
        if (section) {
          scrollToSection(section);
          updateActiveDot(sectionId);
        }
      });
    });
  }
  
  function setupSectionObserver(sections) {
    const observer = createObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateActiveDot(entry.target.id);
        }
      });
    }, {
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    });
    
    sections.forEach(section => observer.observe(section));
  }
  
  function updateActiveDot(sectionId) {
    DOM.navigationDots.forEach(dot => {
      const dotSectionId = dot.getAttribute('data-section');
      toggleClass(dot, CONFIG.CLASSES.ACTIVE, dotSectionId === sectionId);
    });
  }

  // ==============================================
  // UX ENHANCEMENTS 
  // ==============================================
  
  function initUX() {
    createProgressBar();
    initSmoothScroll();
  }
  
  function createProgressBar() {
    const progressBar = createProgressBarElement();
    document.body.appendChild(progressBar);
    
    const updateProgress = throttle(() => {
      requestAnimationFrame(() => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        progressBar.style.width = scrolled + '%';
        progressBar.setAttribute('aria-valuenow', Math.round(scrolled));
      });
    }, 16);
    
    addEvent(window, 'scroll', updateProgress, { passive: true });
  }
  
  function createProgressBarElement() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress-bar';
    progressBar.setAttribute('aria-label', 'Progresso de leitura');
    progressBar.setAttribute('role', 'progressbar');
    progressBar.setAttribute('aria-valuenow', '0');
    progressBar.setAttribute('aria-valuemin', '0');
    progressBar.setAttribute('aria-valuemax', '100');
    return progressBar;
  }
  
  function initSmoothScroll() {
    $$('a[href^="#"]').forEach(link => {
      addEvent(link, 'click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        
        if (target) {
          scrollToSection(target);
        }
      });
    });
  }
  
  function scrollToSection(section) {
    const targetTop = section.offsetTop - DOM.headerHeight;
    window.scrollTo({
      top: targetTop,
      behavior: 'smooth'
    });
  }

  // ==============================================
  // EVENT LISTENER 
  // ==============================================
  
  function handleKeyboardEvents(e) {
    if (e.key === 'Escape') {
      if (MenuState.isOpen) closeMenu();
      if (LightboxState.isOpen) closeLightbox();
    }
    
    if (LightboxState.isOpen) {
      switch (e.key) {
        case 'ArrowRight':
          navigateLightbox(1);
          break;
        case 'ArrowLeft':
          navigateLightbox(-1);
          break;
      }
    }
  }

  // ==============================================
  // CLEANUP 
  // ==============================================
  
  function cleanup() {
    AppState.observers.forEach(observer => observer.disconnect());
    AppState.observers.clear();
    
    AppState.eventListeners.forEach(({ cleanup }) => cleanup());
    AppState.eventListeners.clear();
    
    if (MenuState.isOpen) closeMenu();
    if (LightboxState.isOpen) closeLightbox();
  }

  // ==============================================
  // INICIALIZAÇÃO 
  // ==============================================
  
  async function init() {
    try {
      // Cache DOM direto
      DOM.body = document.body;
      DOM.hamburger = $(CONFIG.SELECTORS.HAMBURGER);
      DOM.menuOverlay = $(CONFIG.SELECTORS.MENU_OVERLAY);
      DOM.menuClose = $(CONFIG.SELECTORS.MENU_CLOSE);
      DOM.cursor = $(CONFIG.SELECTORS.CURSOR);
      DOM.lightbox = $(CONFIG.SELECTORS.LIGHTBOX);
      DOM.lightboxImage = $(CONFIG.SELECTORS.LIGHTBOX_IMAGE);
      DOM.animatedElements = $$(CONFIG.SELECTORS.ANIMATED);
      DOM.images = $$(CONFIG.SELECTORS.IMAGES);
      DOM.hoverElements = $$(CONFIG.SELECTORS.HOVER_ELEMENTS);
      DOM.navigationDots = $$(CONFIG.SELECTORS.NAVIGATION_DOTS);
      DOM.header = $(CONFIG.SELECTORS.HEADER);
      DOM.headerHeight = DOM.header?.offsetHeight || 0;
      
      initMenu();
      initAnimations();
      initCursor();
      initLightbox();
      initNavigationDots();
      initUX();
      
      // Event listeners unificados
      addEvent(document, 'keydown', handleKeyboardEvents);
      addEvent(window, 'beforeunload', cleanup);
      addEvent(window, 'error', (e) => {
        console.error('Erro global:', e.error || e.message);
      });
      addEvent(window, 'unhandledrejection', (e) => {
        console.error('Promise não tratada:', e.reason);
      });
      
      window.PortfolioApp = { init, cleanup };
      
    } catch (error) {
      console.error('Erro na inicialização:', error);
    }
  }

  // ==============================================
  // INICIALIZAÇÃO AUTOMÁTICA
  // ==============================================
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
