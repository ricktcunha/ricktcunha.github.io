// ==============================================
// PORTFÓLIO RICK - JAVASCRIPT OTIMIZADO
// ==============================================
// Versão: 4.0.0 - Simplified & Optimized
// Autor: Rick Cunha
// Descrição: Código JavaScript limpo, consistente e funcional

(function() {
  'use strict';

  // ==============================================
  // CONFIGURAÇÕES
  // ==============================================
  
  const CONFIG = {
    DEBOUNCE_DELAY: 16,
    THROTTLE_DELAY: 100,
    SCROLL_OFFSET: 100,
    ANIMATION_DURATION: 300,
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
      PROGRESS_BAR: ".reading-progress-bar"
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
  
  const STATE = {
    isMenuOpen: false,
    isLightboxOpen: false,
    currentImage: null,
    scrollPosition: 0,
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
    navigationDots: null
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
  
  function debounce(func, wait) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
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
    const existing = STATE.eventListeners.get(key);
    
    if (existing) {
      el.removeEventListener(event, existing, options);
    }
    
    el.addEventListener(event, handler, options);
    STATE.eventListeners.set(key, handler);
    
    return () => {
      el.removeEventListener(event, handler, options);
      STATE.eventListeners.delete(key);
    };
  }
  
  function createObserver(callback, options = {}) {
    const observer = new IntersectionObserver(callback, {
      rootMargin: '0px',
      threshold: 0.1,
      ...options
    });
    STATE.observers.add(observer);
    return observer;
  }

  // ==============================================
  // INICIALIZAÇÃO DOM
  // ==============================================
  
  function initDOM() {
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
    addEvent(document, 'keydown', (e) => {
      if (e.key === 'Escape' && STATE.isMenuOpen) closeMenu();
    });
    
    // Links do menu
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
    STATE.isMenuOpen ? closeMenu() : openMenu();
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
    
    STATE.isMenuOpen = true;
    STATE.scrollPosition = scrollY;
  }
  
  function closeMenu() {
    if (!DOM.hamburger || !DOM.menuOverlay) return;
    
    removeClass(DOM.menuOverlay, CONFIG.CLASSES.ACTIVE);
    removeClass(DOM.hamburger, CONFIG.CLASSES.ACTIVE);
    removeClass(DOM.body, 'menu-open');
    
    DOM.body.style.position = '';
    DOM.body.style.top = '';
    DOM.body.style.width = '';
    
    if (STATE.scrollPosition) {
      window.scrollTo(0, STATE.scrollPosition);
      STATE.scrollPosition = 0;
    }
    
    STATE.isMenuOpen = false;
  }

  // ==============================================
  // ANIMAÇÕES
  // ==============================================
  
  function initAnimations() {
    if (!DOM.animatedElements.length) return;
    
    const observer = createObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          addClass(entry.target, CONFIG.CLASSES.IN_VIEW);
        }
      });
    }, {
      rootMargin: `${CONFIG.SCROLL_OFFSET}px`,
      threshold: 0.1
    });
    
    DOM.animatedElements.forEach(el => observer.observe(el));
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
    
    addEvent(document, 'keydown', (e) => {
      if (!STATE.isLightboxOpen) return;
      
      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowRight':
          navigateLightbox(1);
          break;
        case 'ArrowLeft':
          navigateLightbox(-1);
          break;
      }
    });
  }
  
  function openLightbox(e) {
    if (!DOM.lightbox || !DOM.lightboxImage) return;
    
    const img = e.target;
    DOM.lightboxImage.src = img.src;
    addClass(DOM.lightbox, CONFIG.CLASSES.LIGHTBOX_OPEN);
    
    STATE.currentImage = img;
    STATE.isLightboxOpen = true;
    DOM.body.style.overflow = 'hidden';
  }
  
  function closeLightbox() {
    if (!DOM.lightbox || !DOM.lightboxImage) return;
    
    removeClass(DOM.lightbox, CONFIG.CLASSES.LIGHTBOX_OPEN);
    
    setTimeout(() => {
      DOM.lightboxImage.src = '';
      STATE.currentImage = null;
      STATE.isLightboxOpen = false;
      DOM.body.style.overflow = '';
    }, CONFIG.LIGHTBOX_TIMEOUT);
  }
  
  function navigateLightbox(direction) {
    if (!STATE.currentImage) return;
    
    const currentIndex = Array.from(DOM.images).indexOf(STATE.currentImage);
    const nextIndex = currentIndex + direction;
    
    if (nextIndex >= 0 && nextIndex < DOM.images.length) {
      const clickEvent = new Event('click', { bubbles: true });
      DOM.images[nextIndex].dispatchEvent(clickEvent);
    }
  }



  // ==============================================
  // NAVIGATION DOTS
  // ==============================================
  
  function initNavigationDots() {
    if (!DOM.navigationDots.length) return;
    
    const dots = DOM.navigationDots;
    const sectionIds = Array.from(dots).map(dot => dot.getAttribute('data-section'));
    const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
    
    if (!sections.length) return;
    
    dots.forEach(dot => {
      addEvent(dot, 'click', () => {
        const sectionId = dot.getAttribute('data-section');
        const section = document.getElementById(sectionId);
        
        if (section) {
          const headerHeight = $('.header')?.offsetHeight || 0;
          const targetTop = section.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetTop,
            behavior: 'smooth'
          });
          
          updateActiveDot(sectionId);
        }
      });
    });
    
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
    initKeyboardNav();
  }
  
  function createProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress-bar';
    progressBar.setAttribute('aria-label', 'Progresso de leitura');
    progressBar.setAttribute('role', 'progressbar');
    progressBar.setAttribute('aria-valuenow', '0');
    progressBar.setAttribute('aria-valuemin', '0');
    progressBar.setAttribute('aria-valuemax', '100');
    
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
  
  function initSmoothScroll() {
    $$('a[href^="#"]').forEach(link => {
      addEvent(link, 'click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        
        if (target) {
          const headerHeight = $('.header')?.offsetHeight || 0;
          const targetTop = target.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }
  
  function initKeyboardNav() {
    addEvent(document, 'keydown', (e) => {
      if (e.key === 'Escape' && STATE.isMenuOpen) {
        closeMenu();
      }
    });
  }

  // ==============================================
  // CLEANUP
  // ==============================================
  
  function cleanup() {
    STATE.observers.forEach(observer => observer.disconnect());
    STATE.observers.clear();
    STATE.eventListeners.clear();
    
    if (STATE.isMenuOpen) closeMenu();
    if (STATE.isLightboxOpen) closeLightbox();
  }

  // ==============================================
  // INICIALIZAÇÃO
  // ==============================================
  
  async function init() {
    try {
      initDOM();
      initMenu();
      initAnimations();
      initCursor();
      initLightbox();
      initNavigationDots();
      initUX();
      
      // API global
      window.PortfolioApp = { init, cleanup };
      
    } catch (error) {
      console.error('Erro na inicialização:', error);
    }
  }

  // ==============================================
  // EVENT LISTENERS
  // ==============================================
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  window.addEventListener('beforeunload', cleanup);
  
  window.addEventListener('error', (e) => {
    console.error('Erro global:', e.error || e.message);
  });
  
  window.addEventListener('unhandledrejection', (e) => {
    console.error('Promise não tratada:', e.reason);
  });

})();
