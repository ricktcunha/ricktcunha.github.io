/**
 * Sistema de Melhorias do Site
 * Gerencia: Toggle de Tema, Sidebar de Navegação e Loading Screen
 */

class SiteEnhancements {
  constructor() {
    this.currentTheme = 'dark';
    this.isLoading = true;
    this.sections = [];
    this.currentSection = 'home';
    
    this.init();
  }

  init() {
    this.setupTheme();
    this.setupNavigation();
    this.setupLoading();
    this.setupEventListeners();
  }

  // ===== SISTEMA DE TEMA =====
  setupTheme() {
    // Recupera tema salvo ou detecta preferência do sistema
    const savedTheme = localStorage.getItem('site-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    this.currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    this.applyTheme();
  }

  applyTheme() {
    const body = document.body;
    
    if (this.currentTheme === 'light') {
      body.classList.add('light-theme');
    } else {
      body.classList.remove('light-theme');
    }
    
    // Salva preferência
    localStorage.setItem('site-theme', this.currentTheme);
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme();
  }

  // ===== SIDEBAR DE NAVEGAÇÃO =====
  setupNavigation() {
    // Detecta a página atual
    const currentPage = this.detectCurrentPage();
    
    // Define as seções baseadas na página atual
    this.sections = this.getPageSections(currentPage);
    
    // Popula a sidebar com os dots apropriados
    this.populateSidebar();
    
    // Adiciona scroll spy
    this.setupScrollSpy();
  }

  detectCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop();
    
    if (filename === 'index.html' || filename === '') {
      return 'home';
    } else if (filename === 'curriculo.html') {
      return 'curriculo';
    } else if (filename === 'portfolio_principais_trabalhos.html') {
      return 'portfolio-principais';
    } else if (filename.startsWith('identidade-visual-')) {
      return 'identidade-visual';
    } else if (filename.startsWith('portfolio-dev')) {
      return 'portfolio-dev';
    } else if (filename === 'portfolio_marcas.html') {
      return 'portfolio-marcas';
    } else if (filename === 'portfolio-designer-grafico.html') {
      return 'portfolio-designer';
    } else if (filename === 'contato.html') {
      return 'contato';
    }
    
    return 'home'; // fallback
  }

  getPageSections(pageType) {
    const sections = [];
    
    switch (pageType) {
      case 'home':
        sections.push(
          { id: 'home', element: document.getElementById('home') },
          { id: 'desenvolvimento', element: document.getElementById('desenvolvimento') },
          { id: 'marcas', element: document.getElementById('marcas') },
          { id: 'key-visual', element: document.getElementById('key-visual') },
          { id: 'postagens', element: document.getElementById('postagens') },
          { id: 'solucoes', element: document.getElementById('solucoes') },
          { id: 'tecnologias', element: document.getElementById('tecnologias') }
        );
        break;
        
      case 'curriculo':
        sections.push(
          { id: 'sobre', element: document.getElementById('sobre') },
          { id: 'formacao', element: document.getElementById('formacao') },
          { id: 'certificados', element: document.getElementById('certificados') },
          { id: 'experiencia', element: document.getElementById('experiencia') }
        );
        break;
        
      case 'portfolio-principais':
        sections.push(
          { id: 'desenvolvimento', element: document.querySelector('.section-nome-projeto:nth-of-type(1)') },
          { id: 'key-visual', element: document.querySelector('.section-nome-projeto:nth-of-type(2)') },
          { id: 'postagens', element: document.querySelector('.section-nome-projeto:nth-of-type(3)') },
          { id: 'marcas', element: document.querySelector('.section-nome-projeto-sequencia') }
        );
        break;
        
      case 'identidade-visual':
        sections.push(
          { id: 'projeto', element: document.querySelector('.section-nome-projeto') },
          { id: 'galeria', element: document.querySelector('.galeria') }
        );
        break;
        
      case 'portfolio-dev':
        sections.push(
          { id: 'projeto', element: document.querySelector('.section-nome-projeto') },
          { id: 'galeria', element: document.querySelector('.galeria') }
        );
        break;
        
      case 'portfolio-marcas':
        sections.push(
          { id: 'marcas', element: document.querySelector('.portfolio-marcas') },
          { id: 'galeria', element: document.querySelector('.galeria-marcas') }
        );
        break;
        
      case 'portfolio-designer':
        sections.push(
          { id: 'key-visual', element: document.querySelector('.section-nome-projeto') },
          { id: 'motion-design', element: document.querySelector('.section-nome-projeto:nth-of-type(2)') },
          { id: 'postagens', element: document.querySelector('.section-nome-projeto:nth-of-type(3)') }
        );
        break;
        
      case 'contato':
        sections.push(
          { id: 'contato', element: document.querySelector('.contato-section') },
          { id: 'formulario', element: document.querySelector('.formulario-contato') }
        );
        break;
    }
    
    return sections.filter(section => section.element); // Remove seções não encontradas
  }

  populateSidebar() {
    const sidebar = document.getElementById('navigationSidebar');
    if (!sidebar) return;
    
    // Remove dots existentes (exceto o "top")
    const existingDots = sidebar.querySelectorAll('.nav-dot:not([data-section="top"])');
    existingDots.forEach(dot => dot.remove());
    
    // Adiciona dots para cada seção
    this.sections.forEach((section, index) => {
      const dot = document.createElement('div');
      dot.className = 'nav-dot';
      dot.setAttribute('data-section', section.id);
      dot.setAttribute('title', this.getSectionTitle(section.id));
      
      const tooltip = document.createElement('span');
      tooltip.className = 'nav-tooltip';
      tooltip.textContent = this.getSectionTitle(section.id);
      
      dot.appendChild(tooltip);
      sidebar.appendChild(dot);
    });
  }

  getSectionTitle(sectionId) {
    const titles = {
      // Home
      'home': 'Home',
      'desenvolvimento': 'Desenvolvimento',
      'marcas': 'Marcas',
      'key-visual': 'Key Visual',
      'postagens': 'Postagens',
      'solucoes': 'Soluções',
      'tecnologias': 'Tecnologias',
      
      // Currículo
      'sobre': 'Sobre',
      'formacao': 'Formação',
      'certificados': 'Certificados',
      'experiencia': 'Experiência',
      
      // Portfólio
      'projeto': 'Projeto',
      'galeria': 'Galeria',
      'motion-design': 'Motion Design',
      
      // Contato
      'contato': 'Contato',
      'formulario': 'Formulário'
    };
    
    return titles[sectionId] || sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
  }

  setupScrollSpy() {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.updateActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    // Observa todas as seções
    this.sections.forEach(section => {
      if (section.element) {
        observer.observe(section.element);
      }
    });
  }

  updateActiveSection(sectionId) {
    // Remove classe ativa de todos os dots
    document.querySelectorAll('.nav-dot').forEach(dot => {
      dot.classList.remove('active');
    });

    // Adiciona classe ativa ao dot correspondente
    const activeDot = document.querySelector(`[data-section="${sectionId}"]`);
    if (activeDot) {
      activeDot.classList.add('active');
      this.currentSection = sectionId;
    }
  }

  // ===== ANIMAÇÃO DE LOADING =====
  setupLoading() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (!loadingScreen) return;
    // Simula tempo de carregamento mínimo
    const minLoadTime = 2000;
    const startTime = Date.now();
    const hideLoading = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadTime - elapsedTime);
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
        // Remove completamente após a transição
        setTimeout(() => {
          if (loadingScreen.parentNode) {
            loadingScreen.remove();
          }
        }, 600);
        this.isLoading = false;
      }, remainingTime);
    };
    // Esconde loading quando página estiver carregada
    if (document.readyState === 'complete') {
      hideLoading();
    } else {
      window.addEventListener('load', hideLoading);
    }
  }

  scrollToSection(sectionId) {
    if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const section = document.getElementById(sectionId);
    if (section) {
      const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
      const targetPosition = section.offsetTop - headerHeight - 20;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }

  // Removido: setupLoading()

  // ===== EVENT LISTENERS =====
  setupEventListeners() {
    // Toggle de tema
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    // Navegação da sidebar
    document.querySelectorAll('.nav-dot').forEach(dot => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = dot.getAttribute('data-section');
        this.scrollToSection(sectionId);
      });
    });

    // Navegação por teclado
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        // Fecha qualquer modal ou menu aberto
        document.querySelectorAll('.nav-dot').forEach(dot => {
          dot.classList.remove('active');
        });
      }
    });

    // Resize handler para responsividade
    window.addEventListener('resize', () => {
      // Recalcula posições se necessário
      this.updateActiveSection(this.currentSection);
    });
  }
}

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
  // Aguarda um pouco para garantir que todos os elementos estejam carregados
  setTimeout(() => {
    new SiteEnhancements();
  }, 100);
});

// Fallback para casos onde o DOM já está carregado
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      new SiteEnhancements();
    }, 100);
  });
} else {
  setTimeout(() => {
    new SiteEnhancements();
  }, 100);
} 