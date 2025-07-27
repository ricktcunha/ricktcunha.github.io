// ==============================================
// MÓDULO: Melhorias de UX Avançadas
// ==============================================
// Versão: 1.0.0
// Descrição: Implementa melhorias de experiência do usuário

import { CONFIG } from './config.js';
import { DOM_CACHE, addClass, removeClass } from './utils.js';

/**
 * Classe principal para gerenciar melhorias de UX
 */
class UXEnhancements {
  constructor() {
    this.progressBar = null;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchEndX = 0;
    this.touchEndY = 0;
    this.isKeyboardNavigation = false;
    this.parallaxElements = [];
    this.lazyImages = [];
    this.init();
  }

  /**
   * Inicializa todas as melhorias de UX
   */
  init() {
    console.log('🚀 Inicializando melhorias de UX...');
    
    this.createProgressBar();
    this.initScrollSuave();
    this.initParallaxEffects();
    this.initLazyLoading();
    this.initTouchGestures();
    this.initKeyboardNavigation();
    this.initARIALabels();
    this.initServiceWorker();
    
    console.log('✅ Melhorias de UX inicializadas');
  }

  /**
   * Cria a barra de progresso de leitura
   */
  createProgressBar() {
    this.progressBar = document.createElement('div');
    this.progressBar.className = 'reading-progress-bar';
    this.progressBar.setAttribute('aria-label', 'Progresso de leitura da página');
    this.progressBar.setAttribute('role', 'progressbar');
    this.progressBar.setAttribute('aria-valuenow', '0');
    this.progressBar.setAttribute('aria-valuemin', '0');
    this.progressBar.setAttribute('aria-valuemax', '100');
    
    document.body.appendChild(this.progressBar);
    
    // Usa throttling para melhor performance no scroll
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updateProgressBar();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /**
   * Atualiza a barra de progresso
   */
  updateProgressBar() {
    // Usa requestAnimationFrame para melhor performance
    if (!this.progressBar) return;
    
    requestAnimationFrame(() => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      
      this.progressBar.style.width = scrolled + '%';
      this.progressBar.setAttribute('aria-valuenow', Math.round(scrolled));
    });
  }

  /**
   * Inicializa scroll suave
   */
  initScrollSuave() {
    // Scroll suave já está implementado via CSS
    // Adiciona comportamento adicional para links internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  /**
   * Inicializa efeitos parallax
   */
  initParallaxEffects() {
    // Parallax removido conforme solicitado
    console.log('ℹ️ Efeitos parallax desabilitados');
  }

  /**
   * Inicializa lazy loading de imagens
   */
  initLazyLoading() {
    this.lazyImages = document.querySelectorAll('img[data-src]');
    
    if (this.lazyImages.length === 0) {
      // Se não há imagens com data-src, converte todas as imagens para lazy loading
      const allImages = document.querySelectorAll('img:not([src*="data:image"])');
      allImages.forEach((img, index) => {
        if (index > 2) { // Primeiras 3 imagens carregam normalmente
          img.setAttribute('data-src', img.src);
          img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB2aWV3Qm94PSIwIDAgMSAxIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmMGYwZjAiLz48L3N2Zz4=';
          img.classList.add('lazy-image');
        }
      });
      this.lazyImages = document.querySelectorAll('img[data-src]');
    }

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.1
    });

    this.lazyImages.forEach(img => imageObserver.observe(img));
  }

  /**
   * Inicializa gestos de toque
   */
  initTouchGestures() {
    // Desabilita gestos de toque em mobile para evitar conflitos com scroll
    if (window.innerWidth <= 768) {
      console.log('ℹ️ Gestos de toque desabilitados em mobile para melhor performance');
      return;
    }

    document.addEventListener('touchstart', (e) => {
      this.touchStartX = e.changedTouches[0].screenX;
      this.touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.touchEndY = e.changedTouches[0].screenY;
      this.handleSwipe();
    }, { passive: true });
  }

  /**
   * Processa gestos de swipe
   */
  handleSwipe() {
    const diffX = this.touchStartX - this.touchEndX;
    const diffY = this.touchStartY - this.touchEndY;
    const minSwipeDistance = 50;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > minSwipeDistance) {
      // Swipe horizontal
      if (diffX > 0) {
        // Swipe esquerda - próximo
        this.handleSwipeLeft();
      } else {
        // Swipe direita - anterior
        this.handleSwipeRight();
      }
    } else if (Math.abs(diffY) > minSwipeDistance) {
      // Swipe vertical
      if (diffY > 0) {
        // Swipe cima
        this.handleSwipeUp();
      } else {
        // Swipe baixo
        this.handleSwipeDown();
      }
    }
  }

  /**
   * Handlers para diferentes direções de swipe
   */
  handleSwipeLeft() {
    // Navegar para próxima página ou próximo item
    const nextButton = document.querySelector('[data-next]');
    if (nextButton) {
      nextButton.click();
    }
  }

  handleSwipeRight() {
    // Navegar para página anterior ou item anterior
    const prevButton = document.querySelector('[data-prev]');
    if (prevButton) {
      prevButton.click();
    }
  }

  handleSwipeUp() {
    // Scroll para cima
    window.scrollBy({
      top: -100,
      behavior: 'smooth'
    });
  }

  handleSwipeDown() {
    // Scroll para baixo
    window.scrollBy({
      top: 100,
      behavior: 'smooth'
    });
  }

  /**
   * Inicializa navegação por teclado
   */
  initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        this.isKeyboardNavigation = true;
        addClass(document.body, 'keyboard-navigation');
      }
    });

    document.addEventListener('mousedown', () => {
      if (this.isKeyboardNavigation) {
        this.isKeyboardNavigation = false;
        removeClass(document.body, 'keyboard-navigation');
      }
    });

    // Navegação por teclado adicional (desabilitada em mobile)
    if (window.innerWidth > 768) {
      document.addEventListener('keydown', (e) => {
        switch (e.key) {
          case 'ArrowUp':
            e.preventDefault();
            window.scrollBy({ top: -100, behavior: 'smooth' });
            break;
          case 'ArrowDown':
            e.preventDefault();
            window.scrollBy({ top: 100, behavior: 'smooth' });
            break;
          case 'Home':
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            break;
          case 'End':
            e.preventDefault();
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            break;
        }
      });
    }
  }

  /**
   * Inicializa ARIA labels e roles
   */
  initARIALabels() {
    // Adiciona roles e labels para elementos interativos
    const buttons = document.querySelectorAll('button, .hamburger, [role="button"]');
    buttons.forEach(button => {
      if (!button.getAttribute('aria-label')) {
        const text = button.textContent.trim() || button.title;
        if (text) {
          button.setAttribute('aria-label', text);
        }
      }
    });

    // Adiciona roles para elementos de navegação
    const navs = document.querySelectorAll('nav');
    navs.forEach(nav => {
      if (!nav.getAttribute('role')) {
        nav.setAttribute('role', 'navigation');
      }
    });

    // Adiciona roles para listas
    const lists = document.querySelectorAll('ul, ol');
    lists.forEach(list => {
      if (!list.getAttribute('role')) {
        list.setAttribute('role', 'list');
      }
    });

    // Adiciona roles para itens de lista
    const listItems = document.querySelectorAll('li');
    listItems.forEach(item => {
      if (!item.getAttribute('role')) {
        item.setAttribute('role', 'listitem');
      }
    });

    // Skip links removidos conforme solicitado
  }



  /**
   * Inicializa Service Worker
   */
  initServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('✅ Service Worker registrado:', registration);
          })
          .catch(error => {
            console.log('❌ Falha no registro do Service Worker:', error);
          });
      });
    }
  }

  /**
   * Atualiza elementos parallax
   */
  updateParallax() {
    // Parallax removido conforme solicitado
  }

  /**
   * Limpa recursos
   */
  destroy() {
    // Remove event listeners se necessário
    window.removeEventListener('scroll', this.updateProgressBar);
    console.log('🧹 Recursos de UX limpos');
  }
}

// Exporta a classe
export { UXEnhancements };

// Cria instância global
let uxEnhancements = null;

/**
 * Inicializa as melhorias de UX
 */
export function initializeUXEnhancements() {
  if (!uxEnhancements) {
    uxEnhancements = new UXEnhancements();
  }
  return uxEnhancements;
}

/**
 * Limpa as melhorias de UX
 */
export function cleanupUXEnhancements() {
  if (uxEnhancements) {
    uxEnhancements.destroy();
    uxEnhancements = null;
  }
} 