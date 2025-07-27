// ==============================================
// MÓDULO: Navigation Dots
// ==============================================
// Versão: 1.0.0
// Descrição: Controle dos dots de navegação fullpage

/**
 * Inicializa o sistema de dots de navegação
 * @returns {void}
 */
export function initializeNavigationDots() {
  const dots = document.querySelectorAll('.navigation-dots .dot');
  
  // Detecta automaticamente as seções baseado nos data-section dos dots
  const sectionIds = Array.from(dots).map(dot => dot.getAttribute('data-section'));
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
  
  if (!dots.length || !sections.length) {
    console.warn('⚠️ Navigation dots: Elementos não encontrados');
    return;
  }



  // Adiciona event listeners aos dots
  dots.forEach(dot => {
    dot.addEventListener('click', handleDotClick);
  });

  // Adiciona observer para detectar seção ativa
  const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver(handleSectionIntersection, observerOptions);
  
  // Observa todas as seções
  sections.forEach(section => {
    observer.observe(section);
  });

  // Atualiza dots no scroll
  window.addEventListener('scroll', throttle(updateActiveDot, 100));

  console.log('🎯 Navigation dots inicializado');
}

/**
 * Manipula o clique nos dots
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
    const totalOffset = headerHeight
    
    // Calcula a posição da seção com o offset
    const sectionTop = targetSection.offsetTop - totalOffset;
    
    // Scroll suave para a seção com offset
    window.scrollTo({
      top: sectionTop,
      behavior: 'smooth'
    });

    // Atualiza dot ativo
    updateActiveDotBySection(sectionId);
  }
}

/**
 * Manipula a interseção das seções
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
 * Atualiza o dot ativo baseado na seção
 * @param {string} sectionId - ID da seção ativa
 * @returns {void}
 */
function updateActiveDotBySection(sectionId) {
  const dots = document.querySelectorAll('.navigation-dots .dot');
  
  dots.forEach(dot => {
    const dotSection = dot.getAttribute('data-section');
    
    if (dotSection === sectionId) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

/**
 * Atualiza o dot ativo baseado no scroll
 * @returns {void}
 */
function updateActiveDot() {
  const dots = document.querySelectorAll('.navigation-dots .dot');
  const sectionIds = Array.from(dots).map(dot => dot.getAttribute('data-section'));
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
  
  // Calcula o offset para considerar o header e padding
  const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
  const paddingTop = 80; // Mesmo espaçamento usado no clique
  const totalOffset = headerHeight + paddingTop;
  
  const scrollPosition = window.scrollY + window.innerHeight / 2;

  let activeSection = null;
  let minDistance = Infinity;

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const sectionTop = rect.top + window.scrollY;
    const sectionBottom = sectionTop + rect.height;
    const sectionCenter = sectionTop + rect.height / 2;
    
    // Ajusta a posição considerando o offset
    const adjustedSectionCenter = sectionCenter - totalOffset;
    const distance = Math.abs(scrollPosition - adjustedSectionCenter);
    
    if (distance < minDistance) {
      minDistance = distance;
      activeSection = section.id;
    }
  });

  if (activeSection) {
    updateActiveDotBySection(activeSection);
  }
}

/**
 * Função throttle para otimizar performance
 * @param {Function} func - Função a ser throttled
 * @param {number} delay - Delay em ms
 * @returns {Function} Função throttled
 */
function throttle(func, delay) {
  let timeoutId;
  let lastExecTime = 0;
  
  return function (...args) {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime > delay) {
      func.apply(this, args);
      lastExecTime = currentTime;
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
}

/**
 * Limpa os event listeners dos dots
 * @returns {void}
 */
export function cleanupNavigationDots() {
  const dots = document.querySelectorAll('.navigation-dots .dot');
  
  dots.forEach(dot => {
    dot.removeEventListener('click', handleDotClick);
  });

  window.removeEventListener('scroll', updateActiveDot);
  
  console.log('🧹 Navigation dots limpo');
} 