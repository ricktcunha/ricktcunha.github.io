// ==============================================
// MÓDULO: Navigation Dots Otimizado
// ==============================================
// Versão: 2.0.0 - Performance Optimized
// Descrição: Sistema de dots de navegação otimizado

import { CONFIG } from './config.js';
import { createIntersectionObserver, addEventListenerOptimized, throttle } from './utils.js';

let navigationObserver = null;
let scrollHandler = null;

/**
 * Inicializa o sistema de dots de navegação de forma otimizada
 * @returns {void}
 */
export function initializeNavigationDots() {
  const dots = document.querySelectorAll('.navigation-dots .dot');
  
  if (!dots.length) {
    console.warn('⚠️ Navigation dots: Elementos não encontrados');
    return;
  }

  // Detecta automaticamente as seções baseado nos data-section dos dots
  const sectionIds = Array.from(dots).map(dot => dot.getAttribute('data-section'));
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
  
  if (!sections.length) {
    console.warn('⚠️ Navigation dots: Seções não encontradas');
    return;
  }

  // Adiciona event listeners otimizados aos dots
  dots.forEach(dot => {
    addEventListenerOptimized(dot, 'click', handleDotClick);
  });

  // Usa Intersection Observer para detectar seção ativa
  const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
  };

  navigationObserver = createIntersectionObserver(handleSectionIntersection, observerOptions);
  
  // Observa todas as seções
  sections.forEach(section => {
    navigationObserver.observe(section);
  });

  // Atualiza dots no scroll com throttling
  scrollHandler = throttle(updateActiveDot, CONFIG.THROTTLE_DELAY);
  addEventListenerOptimized(window, 'scroll', scrollHandler, { passive: true });

  console.log('🎯 Navigation dots otimizado inicializado');
}

/**
 * Manipula o clique nos dots de forma otimizada
 * @param {Event} event - Evento de clique
 * @returns {void}
 */
function handleDotClick(event) {
  const dot = event.currentTarget;
  const sectionId = dot.getAttribute('data-section');
  const targetSection = document.getElementById(sectionId);

  if (targetSection) {
    // Calcula o offset para adicionar espaçamento
    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
    const totalOffset = headerHeight;
    
    // Calcula a posição da seção com o offset
    const sectionTop = targetSection.offsetTop - totalOffset;
    
    // Scroll suave para a seção com offset
    window.scrollTo({
      top: sectionTop,
      behavior: CONFIG.SCROLL_BEHAVIOR
    });

    // Atualiza dot ativo
    updateActiveDotBySection(sectionId);
  }
}

/**
 * Manipula a interseção das seções de forma otimizada
 * @param {IntersectionObserverEntry[]} entries - Entradas do observer
 * @returns {void}
 */
function handleSectionIntersection(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const sectionId = entry.target.id;
      updateActiveDotBySection(sectionId);
    }
  });
}

/**
 * Atualiza o dot ativo baseado na seção de forma otimizada
 * @param {string} sectionId - ID da seção ativa
 * @returns {void}
 */
function updateActiveDotBySection(sectionId) {
  const dots = document.querySelectorAll('.navigation-dots .dot');
  
  dots.forEach(dot => {
    const dotSectionId = dot.getAttribute('data-section');
    if (dotSectionId === sectionId) {
      dot.classList.add(CONFIG.CLASSES.ACTIVE);
    } else {
      dot.classList.remove(CONFIG.CLASSES.ACTIVE);
    }
  });
}

/**
 * Atualiza o dot ativo baseado na posição do scroll de forma otimizada
 * @returns {void}
 */
function updateActiveDot() {
  const dots = document.querySelectorAll('.navigation-dots .dot');
  const scrollPosition = window.scrollY + window.innerHeight / 2;
  
  let activeSectionId = null;
  
  dots.forEach(dot => {
    const sectionId = dot.getAttribute('data-section');
    const section = document.getElementById(sectionId);
    
    if (section) {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        activeSectionId = sectionId;
      }
    }
  });
  
  if (activeSectionId) {
    updateActiveDotBySection(activeSectionId);
  }
}

/**
 * Limpa o sistema de navigation dots
 * @returns {void}
 */
export function cleanupNavigationDots() {
  if (navigationObserver) {
    navigationObserver.disconnect();
    navigationObserver = null;
  }
  
  if (scrollHandler) {
    window.removeEventListener('scroll', scrollHandler);
    scrollHandler = null;
  }
  
  console.log('🧹 Navigation dots limpo');
} 