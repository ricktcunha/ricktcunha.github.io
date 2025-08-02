// ==============================================
// SISTEMA DE TESTES DE PERFORMANCE
// ==============================================
// Versão: 1.0.0
// Descrição: Testes automatizados de performance

import { CONFIG, APP_STATE, PERFORMANCE_CACHE } from './config.js';
import { DOM_CACHE, cleanupAll } from './utils.js';

/**
 * Classe principal para testes de performance
 */
class PerformanceTester {
  constructor() {
    this.results = {
      loadTime: 0,
      fps: 0,
      memoryUsage: 0,
      eventListeners: 0,
      domQueries: 0,
      animations: 0,
      errors: []
    };
    this.startTime = 0;
    this.frameCount = 0;
    this.lastTime = 0;
  }

  /**
   * Executa todos os testes de performance
   */
  async runAllTests() {
    console.log('🧪 Iniciando testes de performance...');
    
    try {
      // Teste 1: Tempo de carregamento
      await this.testLoadTime();
      
      // Teste 2: FPS
      await this.testFPS();
      
      // Teste 3: Uso de memória
      this.testMemoryUsage();
      
      // Teste 4: Event listeners
      this.testEventListeners();
      
      // Teste 5: Queries DOM
      this.testDOMQueries();
      
      // Teste 6: Animações
      this.testAnimations();
      
      // Teste 7: Intersection Observer
      this.testIntersectionObserver();
      
      // Teste 8: Lazy Loading
      this.testLazyLoading();
      
      // Teste 9: Cleanup
      this.testCleanup();
      
      // Exibe resultados
      this.displayResults();
      
    } catch (error) {
      console.error('❌ Erro durante testes:', error);
      this.results.errors.push(error.message);
    }
  }

  /**
   * Testa tempo de carregamento
   */
  async testLoadTime() {
    console.log('⏱️ Testando tempo de carregamento...');
    
    this.startTime = performance.now();
    
    // Simula carregamento de recursos
    await this.simulateResourceLoading();
    
    this.results.loadTime = performance.now() - this.startTime;
    
    console.log(`✅ Tempo de carregamento: ${this.results.loadTime.toFixed(2)}ms`);
  }

  /**
   * Testa FPS
   */
  async testFPS() {
    console.log('🎯 Testando FPS...');
    
    let frameCount = 0;
    const startTime = performance.now();
    
    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - startTime < 1000) {
        requestAnimationFrame(measureFPS);
      } else {
        this.results.fps = frameCount;
        console.log(`✅ FPS: ${this.results.fps}`);
      }
    };
    
    requestAnimationFrame(measureFPS);
    
    // Aguarda 1 segundo para medição
    await new Promise(resolve => setTimeout(resolve, 1100));
  }

  /**
   * Testa uso de memória
   */
  testMemoryUsage() {
    console.log('💾 Testando uso de memória...');
    
    if ('memory' in performance) {
      this.results.memoryUsage = performance.memory.usedJSHeapSize / 1024 / 1024; // MB
      console.log(`✅ Uso de memória: ${this.results.memoryUsage.toFixed(2)}MB`);
    } else {
      console.log('⚠️ API de memória não disponível');
      this.results.memoryUsage = 'N/A';
    }
  }

  /**
   * Testa event listeners
   */
  testEventListeners() {
    console.log('🎧 Testando event listeners...');
    
    this.results.eventListeners = APP_STATE.eventListeners.size;
    console.log(`✅ Event listeners ativos: ${this.results.eventListeners}`);
    
    // Verifica se há listeners duplicados
    const allListeners = document.querySelectorAll('*');
    let totalListeners = 0;
    
    allListeners.forEach(element => {
      // Estimativa baseada em propriedades do elemento
      if (element.onclick) totalListeners++;
      if (element.onmouseover) totalListeners++;
      if (element.onmouseout) totalListeners++;
      if (element.onscroll) totalListeners++;
    });
    
    console.log(`📊 Total estimado de listeners: ${totalListeners}`);
  }

  /**
   * Testa queries DOM
   */
  testDOMQueries() {
    console.log('🔍 Testando queries DOM...');
    
    this.results.domQueries = PERFORMANCE_CACHE.domQueries.size;
    console.log(`✅ Queries em cache: ${this.results.domQueries}`);
    
    // Testa performance de queries
    const startTime = performance.now();
    
    // Simula múltiplas queries
    for (let i = 0; i < 100; i++) {
      document.querySelector('.animated');
      document.querySelectorAll('img');
      document.getElementById('top');
    }
    
    const queryTime = performance.now() - startTime;
    console.log(`⏱️ Tempo para 100 queries: ${queryTime.toFixed(2)}ms`);
  }

  /**
   * Testa animações
   */
  testAnimations() {
    console.log('🎬 Testando animações...');
    
    const animatedElements = document.querySelectorAll('.animated');
    this.results.animations = animatedElements.length;
    
    console.log(`✅ Elementos animados: ${this.results.animations}`);
    
    // Verifica se Intersection Observer está funcionando
    const inViewElements = document.querySelectorAll('.animated.in-view');
    console.log(`👁️ Elementos em view: ${inViewElements.length}`);
    
    // Testa performance de animações
    const startTime = performance.now();
    
    animatedElements.forEach(element => {
      element.style.transform = 'translateY(0)';
      element.style.opacity = '1';
    });
    
    const animationTime = performance.now() - startTime;
    console.log(`⏱️ Tempo para aplicar animações: ${animationTime.toFixed(2)}ms`);
  }

  /**
   * Testa Intersection Observer
   */
  testIntersectionObserver() {
    console.log('👁️ Testando Intersection Observer...');
    
    const observers = APP_STATE.observers.size;
    console.log(`✅ Observers ativos: ${observers}`);
    
    // Verifica se Intersection Observer está disponível
    if ('IntersectionObserver' in window) {
      console.log('✅ Intersection Observer disponível');
    } else {
      console.log('❌ Intersection Observer não disponível');
      this.results.errors.push('Intersection Observer não suportado');
    }
  }

  /**
   * Testa lazy loading
   */
  testLazyLoading() {
    console.log('🖼️ Testando lazy loading...');
    
    const images = document.querySelectorAll('img');
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    console.log(`📊 Total de imagens: ${images.length}`);
    console.log(`🖼️ Imagens com lazy loading: ${lazyImages.length}`);
    
    // Verifica se imagens críticas carregaram
    const criticalImages = document.querySelectorAll('img[src*="home"], img[src*="logo"], img[src*="rick"]');
    let loadedCritical = 0;
    
    criticalImages.forEach(img => {
      if (img.complete) loadedCritical++;
    });
    
    console.log(`✅ Imagens críticas carregadas: ${loadedCritical}/${criticalImages.length}`);
  }

  /**
   * Testa cleanup
   */
  testCleanup() {
    console.log('🧹 Testando cleanup...');
    
    const initialListeners = APP_STATE.eventListeners.size;
    const initialObservers = APP_STATE.observers.size;
    
    // Simula cleanup
    cleanupAll();
    
    const finalListeners = APP_STATE.eventListeners.size;
    const finalObservers = APP_STATE.observers.size;
    
    console.log(`📊 Event listeners: ${initialListeners} → ${finalListeners}`);
    console.log(`📊 Observers: ${initialObservers} → ${finalObservers}`);
    
    if (finalListeners === 0 && finalObservers === 0) {
      console.log('✅ Cleanup funcionando corretamente');
    } else {
      console.log('❌ Cleanup com problemas');
      this.results.errors.push('Cleanup não funcionou corretamente');
    }
  }

  /**
   * Simula carregamento de recursos
   */
  async simulateResourceLoading() {
    const promises = [];
    
    // Simula carregamento de imagens
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (!img.complete) {
        promises.push(new Promise(resolve => {
          img.addEventListener('load', resolve, { once: true });
          img.addEventListener('error', resolve, { once: true });
        }));
      }
    });
    
    // Simula carregamento de vídeos
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
      promises.push(new Promise(resolve => {
        video.addEventListener('canplay', resolve, { once: true });
        video.addEventListener('error', resolve, { once: true });
      }));
    });
    
    // Aguarda todos os recursos ou timeout
    await Promise.race([
      Promise.all(promises),
      new Promise(resolve => setTimeout(resolve, 3000))
    ]);
  }

  /**
   * Exibe resultados dos testes
   */
  displayResults() {
    console.log('\n📊 RESULTADOS DOS TESTES DE PERFORMANCE');
    console.log('==========================================');
    
    const results = {
      '⏱️ Tempo de Carregamento': `${this.results.loadTime.toFixed(2)}ms`,
      '🎯 FPS': `${this.results.fps}`,
      '💾 Uso de Memória': typeof this.results.memoryUsage === 'number' 
        ? `${this.results.memoryUsage.toFixed(2)}MB` 
        : this.results.memoryUsage,
      '🎧 Event Listeners': this.results.eventListeners,
      '🔍 Queries DOM': this.results.domQueries,
      '🎬 Elementos Animados': this.results.animations
    };
    
    console.table(results);
    
    if (this.results.errors.length > 0) {
      console.log('\n❌ ERROS ENCONTRADOS:');
      this.results.errors.forEach(error => {
        console.log(`- ${error}`);
      });
    }
    
    // Avaliação de performance
    this.evaluatePerformance();
  }

  /**
   * Avalia a performance geral
   */
  evaluatePerformance() {
    console.log('\n🏆 AVALIAÇÃO DE PERFORMANCE');
    console.log('============================');
    
    let score = 0;
    const maxScore = 100;
    
    // Avalia tempo de carregamento (30 pontos)
    if (this.results.loadTime < 2000) {
      score += 30;
      console.log('✅ Tempo de carregamento: EXCELENTE');
    } else if (this.results.loadTime < 3000) {
      score += 20;
      console.log('✅ Tempo de carregamento: BOM');
    } else if (this.results.loadTime < 5000) {
      score += 10;
      console.log('⚠️ Tempo de carregamento: REGULAR');
    } else {
      console.log('❌ Tempo de carregamento: RUIM');
    }
    
    // Avalia FPS (25 pontos)
    if (this.results.fps >= 55) {
      score += 25;
      console.log('✅ FPS: EXCELENTE');
    } else if (this.results.fps >= 45) {
      score += 20;
      console.log('✅ FPS: BOM');
    } else if (this.results.fps >= 30) {
      score += 10;
      console.log('⚠️ FPS: REGULAR');
    } else {
      console.log('❌ FPS: RUIM');
    }
    
    // Avalia event listeners (20 pontos)
    if (this.results.eventListeners <= 50) {
      score += 20;
      console.log('✅ Event Listeners: EXCELENTE');
    } else if (this.results.eventListeners <= 100) {
      score += 15;
      console.log('✅ Event Listeners: BOM');
    } else if (this.results.eventListeners <= 200) {
      score += 10;
      console.log('⚠️ Event Listeners: REGULAR');
    } else {
      console.log('❌ Event Listeners: RUIM');
    }
    
    // Avalia queries DOM (15 pontos)
    if (this.results.domQueries <= 20) {
      score += 15;
      console.log('✅ Queries DOM: EXCELENTE');
    } else if (this.results.domQueries <= 50) {
      score += 10;
      console.log('✅ Queries DOM: BOM');
    } else {
      console.log('⚠️ Queries DOM: REGULAR');
    }
    
    // Avalia erros (10 pontos)
    if (this.results.errors.length === 0) {
      score += 10;
      console.log('✅ Sem erros: EXCELENTE');
    } else {
      console.log(`❌ ${this.results.errors.length} erro(s) encontrado(s)`);
    }
    
    // Resultado final
    console.log('\n🎯 PONTUAÇÃO FINAL');
    console.log('===================');
    console.log(`Score: ${score}/${maxScore}`);
    
    if (score >= 90) {
      console.log('🏆 PERFORMANCE: EXCELENTE!');
    } else if (score >= 75) {
      console.log('🥇 PERFORMANCE: MUITO BOA!');
    } else if (score >= 60) {
      console.log('🥈 PERFORMANCE: BOA');
    } else if (score >= 40) {
      console.log('🥉 PERFORMANCE: REGULAR');
    } else {
      console.log('❌ PERFORMANCE: PRECISA DE MELHORIAS');
    }
  }
}

/**
 * Função para executar testes de performance
 */
export async function runPerformanceTests() {
  const tester = new PerformanceTester();
  await tester.runAllTests();
  return tester.results;
}

/**
 * Função para testes rápidos
 */
export function quickPerformanceCheck() {
  console.log('⚡ VERIFICAÇÃO RÁPIDA DE PERFORMANCE');
  console.log('====================================');
  
  // Verifica se a aplicação está inicializada
  if (window.PortfolioApp && window.PortfolioApp.isInitialized) {
    console.log('✅ Aplicação inicializada');
  } else {
    console.log('❌ Aplicação não inicializada');
  }
  
  // Verifica event listeners
  console.log(`🎧 Event listeners: ${APP_STATE.eventListeners.size}`);
  
  // Verifica observers
  console.log(`👁️ Observers: ${APP_STATE.observers.size}`);
  
  // Verifica cache DOM
  console.log(`🔍 Cache DOM: ${PERFORMANCE_CACHE.domQueries.size} queries`);
  
  // Verifica FPS
  let frameCount = 0;
  const startTime = performance.now();
  
  const measureQuickFPS = () => {
    frameCount++;
    const currentTime = performance.now();
    
    if (currentTime - startTime < 500) {
      requestAnimationFrame(measureQuickFPS);
    } else {
      const fps = frameCount * 2; // Multiplica por 2 pois mediu por 500ms
      console.log(`🎯 FPS estimado: ${fps}`);
      
      if (fps >= 55) {
        console.log('✅ Performance: EXCELENTE');
      } else if (fps >= 45) {
        console.log('✅ Performance: BOA');
      } else {
        console.log('⚠️ Performance: PRECISA DE MELHORIAS');
      }
    }
  };
  
  requestAnimationFrame(measureQuickFPS);
}

// Exporta para uso global
window.PerformanceTester = PerformanceTester;
window.runPerformanceTests = runPerformanceTests;
window.quickPerformanceCheck = quickPerformanceCheck; 