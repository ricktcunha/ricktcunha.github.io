const fs = require('fs');
const path = require('path');

console.log('📱 ANALISANDO E CORRIGINDO RESPONSIVIDADE DO SITE');
console.log('=' .repeat(60));

// 1. Primeiro, vou adicionar breakpoints responsivos globais
function addGlobalResponsiveBreakpoints() {
    const variablesPath = 'public/css/base/variables.css';
    let content = fs.readFileSync(variablesPath, 'utf8');
    
    // Adicionar breakpoints responsivos
    const responsiveBreakpoints = `
/* Breakpoints responsivos */
:root {
  --mobile: 480px;
  --tablet: 768px;
  --desktop: 1024px;
  --large-desktop: 1200px;
  
  /* Espaçamentos responsivos */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;
  --spacing-xxl: 5rem;
  
  /* Tamanhos de fonte responsivos */
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 2rem;
  --font-size-4xl: 2.5rem;
  --font-size-5xl: 3rem;
  --font-size-6xl: 4rem;
}

/* Media queries globais */
@media (max-width: 480px) {
  :root {
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
    --spacing-xxl: 3rem;
    --font-size-4xl: 2rem;
    --font-size-5xl: 2.5rem;
    --font-size-6xl: 3rem;
  }
}

@media (max-width: 768px) {
  :root {
    --spacing-xl: 2.5rem;
    --spacing-xxl: 4rem;
    --font-size-5xl: 2.75rem;
    --font-size-6xl: 3.5rem;
  }
}

`;

    // Inserir após as variáveis existentes
    content = content.replace('/* Tema escuro */', `${responsiveBreakpoints}\n/* Tema escuro */`);
    fs.writeFileSync(variablesPath, content, 'utf8');
    console.log('✅ Breakpoints responsivos globais adicionados');
}

// 2. Corrigir problemas no header
function fixHeaderResponsiveness() {
    const headerPath = 'public/css/layout/header.css';
    let content = fs.readFileSync(headerPath, 'utf8');
    
    // Melhorar responsividade do header
    const improvedHeader = `
/* Estilo do header */
.header {
  display: flex;
  max-width: var(--large-desktop);
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-xl);
  position: relative;
  z-index: 1;
}

/* Estilo do menu */
.header-menu {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-lg);
}

.header-menu a {
  transition: 0.5s;
  text-align: center;
  margin: 1.8rem 0rem 1.8rem 3.6rem;
  text-decoration: none;
  color: var(--c-02);
  font-size: var(--font-size-base);
  transition: color 0.3s ease;
  display: block;
  position: relative;
}

.header-menu a:hover {
  color: var(--p-01);
}

.header-menu a::after {
  content: "";
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0%;
  height: 1px;
  background-color: var(--p-01);
  transition: width 0.3s ease;
}

.header-menu a:hover::after {
  width: 100%;
}

.logo-branco-detalhado {
  height: 1.5rem;
  transition: 0.5s;
}

.logo-branco-detalhado:hover {
  filter: drop-shadow(0 0 15px var(--p-02));
}

/* Estilo do ícone de hambúrguer */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
  justify-self: end;
  z-index: 2;
}

.hamburger .line {
  width: 30px;
  height: 2px;
  background-color: var(--c-02);
  border-radius: 2px;
  transition: transform 0.3s ease, opacity 0.3s ease, background-color 0.3s ease;
}

/* Transformação do ícone de hambúrguer para "X" */
.hamburger.active .line:nth-child(1) {
  transform: translateY(6px) rotate(45deg);
}

.hamburger.active .line:nth-child(2) {
  opacity: 0;
}

.hamburger.active .line:nth-child(3) {
  transform: translateY(-6px) rotate(-45deg);
}

/* Responsividade melhorada */
@media (max-width: 768px) {
  .header {
    padding: var(--spacing-lg);
  }
  
  .header-menu {
    max-height: 0;
    width: 12rem;
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr 1fr;
    background-color: var(--c-07);
    z-index: 3;
    transition: 0.5s;
    position: relative;
    gap: 0;
  }
  
  .header-menu.active {
    max-height: 400px;
    width: 12rem;
    margin-top: var(--spacing-lg);
    padding: var(--spacing-lg) var(--spacing-sm);
    border: 1px solid var(--p-03);
    border-radius: 0.5rem;
    filter: drop-shadow(0 0 30px rgba(140, 62, 239, 0.3));
  }
  
  .header-menu a {
    padding: var(--spacing-sm) 0;
    margin: 0;
    font-size: var(--font-size-base);
  }
  
  .header-menu.active a {
    margin: 0;
    padding: var(--spacing-sm);
  }
  
  .hamburger {
    display: flex;
    align-items: center;
  }
}

@media (max-width: 480px) {
  .header {
    padding: var(--spacing-md);
    gap: var(--spacing-lg);
  }
  
  .logo-branco-detalhado {
    height: 1.2rem;
  }
  
  .hamburger .line {
    width: 25px;
  }
}

/* Ajustes no hambúrguer quando ativo */
.hamburger.active .line {
  background-color: var(--p-02);
}
`;

    fs.writeFileSync(headerPath, improvedHeader, 'utf8');
    console.log('✅ Header responsivo corrigido');
}

// 3. Corrigir banner principal
function fixBannerResponsiveness() {
    const bannerPath = 'public/css/sections/banner.css';
    let content = fs.readFileSync(bannerPath, 'utf8');
    
    const improvedBanner = `
.banner-home {
  padding: 0 var(--spacing-xl);
  display: grid;
  grid-template-columns: 1.5fr 2fr;
  max-width: var(--large-desktop);
  margin: 0 auto;
  gap: var(--spacing-xxl);
}

.rick-retrato-dev {
  display: grid;
  grid-template-columns: auto auto;
  background-color: var(--c-08);
  justify-self: center;
  justify-self: start;
  align-items: center;
  align-self: center;
  align-content: center;
  gap: var(--spacing-sm);
  width: 13rem;
  padding: var(--spacing-lg) var(--spacing-xl);
  border-radius: 0.5rem;
}

.ajudo-marcas {
  align-content: center;
  padding-left: var(--spacing-xxl);
}

.video-background {
  width: 100%;
  height: 30rem;
  object-fit: cover;
  padding-top: 10rem;
}

.experiências-digitais {
  align-content: center;
  padding-left: var(--spacing-xxl);
}

/* Responsividade melhorada */
@media (max-width: 1200px) {
  .experiências-digitais {
    align-content: center;
    padding-left: 0;
  }
}

@media (max-width: 900px) {
  .banner-home {
    padding: 0 var(--spacing-xl);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
  }

  .experiências-digitais {
    align-content: center;
    padding-left: 0;
  }
  
  .rick-retrato-dev {
    justify-self: center;
    width: 100%;
    max-width: 15rem;
  }
}

@media (max-width: 768px) {
  .banner-home {
    padding: 0 var(--spacing-lg);
    gap: var(--spacing-md);
  }
  
  .video-background {
    height: 20rem;
    padding-top: 8rem;
  }
}

@media (max-width: 480px) {
  .banner-home {
    padding: 0 var(--spacing-md);
    gap: var(--spacing-sm);
  }
  
  .video-background {
    width: 100%;
    height: 10rem;
    object-fit: cover;
    padding-top: 5rem;
  }
  
  .rick-retrato-dev {
    width: 100%;
    max-width: 12rem;
    padding: var(--spacing-md) var(--spacing-lg);
  }
  
  .section-nome-projeto {
    margin-top: var(--spacing-lg) !important;
  }
}
`;

    fs.writeFileSync(bannerPath, improvedBanner, 'utf8');
    console.log('✅ Banner responsivo corrigido');
}

// 4. Corrigir seções de projetos
function fixProjectsResponsiveness() {
    const projectsPath = 'public/css/sections/projects.css';
    let content = fs.readFileSync(projectsPath, 'utf8');
    
    const improvedProjects = `
.section-nome-projeto {
  display: grid;
  max-width: var(--large-desktop);
  margin: var(--spacing-xxl) auto;
  padding: 0 var(--spacing-xl);
}

.nome-projeto {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--spacing-md);
}

.imagem-projeto {
  border: 2px solid var(--c-06);
  border-radius: 0.5rem;
  max-width: var(--large-desktop);
  margin: 0 auto;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transition: 0.5s;
}

.imagem-projeto-video {
  border: 2px solid var(--c-06);
  border-radius: 0.5rem;
  max-width: var(--large-desktop);
  margin: 0 auto;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transition: 0.5s;
}

.imagem-projeto-direcionamento {
  border: 2px solid var(--c-06);
  border-radius: 0.5rem;
  max-width: var(--large-desktop);
  margin: 0 auto;
  width: 100%;
  aspect-ratio: 16 / 9;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transition: 0.5s;
}

.hover-projetos:hover .imagem-projeto,
.hover-projetos:hover .imagem-projeto-direcionamento {
  box-shadow: 0 0 90rem 4px rgba(140, 62, 239, 0.25);
  border: 2px solid var(--p-03);
  position: relative;
  z-index: 10;
}

.imagem-projeto img,
.imagem-projeto-direcionamento img {
  transition: transform 0.3s ease;
  object-fit: contain;
  max-width: 100%;
  max-height: 100%;
}

.imagem-interna {
  width: 100%;
  height: 100%;
  scale: calc(1.2);
  object-fit: cover;
  object-position: center;
}

.hover-projetos:hover .imagem-projeto img,
.hover-projetos:hover .imagem-projeto-direcionamento img {
  transform: scale(1.06);
}

.hover-projetos .imagem-projeto img,
.hover-projetos .imagem-projeto-direcionamento img {
  transform: scale(1.02);
}

.texto-botao-seta {
  display: inline-flex;
  align-items: center;
  padding: var(--spacing-sm) var(--spacing-lg);
  border: 2px solid var(--c-06);
  border-radius: 3rem;
  color: var(--c-04);
  background-color: var(--c-09);
  text-decoration: none;
  transition: all 0.5s ease;
  position: relative;
}

.texto-botao-seta .texto {
  margin: 0;
  transition: color 0.5s ease;
  z-index: 1;
}

.texto-botao-seta:hover .texto {
  color: var(--p-02);
}

.texto-botao-seta:hover {
  border: 2px solid var(--p-03);
  background-color: var(--c-08);
  color: var(--p-02);
}

.seta-container {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.5s ease-in-out;
  border-radius: 50%;
  margin-left: var(--spacing-sm);
}

.seta-icone {
  width: 1.1rem;
  fill: var(--c-05);
  transition: fill 0.5s ease, transform 0.5s ease-in-out;
}

.texto-botao-seta:hover .seta-icone {
  fill: var(--p-02);
  transform: translateX(0.5rem);
}

/* Responsividade melhorada */
@media (max-width: 768px) {
  .section-nome-projeto {
    margin: var(--spacing-xxl) auto;
    padding: 0 var(--spacing-lg);
  }
  
  .nome-projeto {
    flex-direction: column;
    gap: var(--spacing-sm);
  }
}

@media (max-width: 480px) {
  .section-nome-projeto {
    display: grid;
    max-width: var(--large-desktop);
    margin: var(--spacing-xxl) auto;
    padding: 0 var(--spacing-md);
  }

  .texto-botao-seta {
    padding: 0.6rem 1.3rem;
    border: 2px solid var(--c-06);
    font-size: var(--font-size-sm);
  }
  
  .seta-icone {
    width: 1rem;
  }
}
`;

    fs.writeFileSync(projectsPath, improvedProjects, 'utf8');
    console.log('✅ Seções de projetos responsivas corrigidas');
}

// 5. Corrigir portfolio principal
function fixPortfolioResponsiveness() {
    const portfolioPath = 'public/css/pages/portfolio-main.css';
    let content = fs.readFileSync(portfolioPath, 'utf8');
    
    const improvedPortfolio = `
.video-background-header {
  width: 100%;
  height: 2rem;
  object-fit: cover;
}

.banner-portfolio {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: var(--spacing-xl);
  max-width: var(--large-desktop);
  padding: 0 var(--spacing-xl);
  margin: var(--spacing-xl) auto;
}

.port-trabalhos {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.port-trabalhos h3 {
  font-size: var(--font-size-6xl);
}

.port-port {
  font-size: var(--font-size-lg);
  color: var(--c-04);
}

.trabalhos-box-texto {
  padding: var(--spacing-sm) var(--spacing-lg);
  border: 1.5px solid transparent;
  border-radius: 3rem;
  color: var(--c-04);
  align-self: start;
  position: relative;
  background: linear-gradient(var(--c-07), var(--c-07)) padding-box,
    linear-gradient(45deg, #ff6f61, #6f61ff, #61ff6f, #6f61ff) border-box;
  background-clip: padding-box, border-box;
  background-size: 400% 400%;
  animation: stroke-loop 5s linear infinite;
}

@keyframes stroke-loop {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.nav-port-lista {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.nav-fora-port {
  display: flex;
  gap: 10rem;
  justify-self: end;
}

.nav-fora-port a {
  display: block;
  max-width: max-content;
}

.nav-dev {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.nav-desing {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.nav-portfolio {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.nav-fora-port div a p {
  transition: 0.5s;
  display: flex;
}

.nav-fora-port a :hover {
  color: var(--p-02);
}

.section-nome-projeto-sequencia {
  display: grid;
  max-width: var(--large-desktop);
  margin: var(--spacing-xl) auto;
  padding: 0 var(--spacing-xl);
}

.topo-ver-mais {
  display: flex;
  gap: var(--spacing-xl);
  justify-content: space-between;
}

/* Responsividade melhorada */
@media (max-width: 1024px) {
  .port-trabalhos h3 {
    font-size: var(--font-size-5xl);
  }
  
  .nav-fora-port {
    gap: 5rem;
  }
  
  .banner-portfolio {
    padding: 0 var(--spacing-lg);
  }
}

@media (max-width: 768px) {
  .banner-portfolio {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xl);
    padding: var(--spacing-lg);
  }
  
  .section-nome-projeto-sequencia {
    margin: var(--spacing-xxl) auto;
    padding: 0 var(--spacing-lg);
  }
  
  .topo-ver-mais {
    flex-direction: column-reverse;
    gap: 0;
  }
  
  .port-trabalhos {
    gap: var(--spacing-sm);
  }
  
  .nav-fora-port {
    gap: var(--spacing-lg);
    justify-self: start;
  }
}

@media (max-width: 480px) {
  .port-trabalhos {
    gap: var(--spacing-sm);
  }
  
  .section-nome-projeto-sequencia {
    margin: var(--spacing-lg) 0;
    margin-bottom: 0 !important;
  }
  
  .trabalhos-box-texto {
    padding: 0.5rem 1rem;
    font-size: var(--font-size-xs) !important;
    border: 1px solid transparent;
  }
  
  .nav-fora-port {
    gap: var(--spacing-lg);
  }
  
  .projetos-padding .botao-direcionamento-centro {
    padding-bottom: var(--spacing-xxl);
  }
  
  .banner-portfolio {
    padding: var(--spacing-md);
    gap: var(--spacing-lg);
  }
}
`;

    fs.writeFileSync(portfolioPath, improvedPortfolio, 'utf8');
    console.log('✅ Portfolio responsivo corrigido');
}

// 6. Adicionar meta viewport correto em todos os HTMLs
function fixViewportMeta() {
    const htmlFiles = [
        'index.html',
        'pages/portfolio.html',
        'pages/cv.html',
        'pages/contato.html',
        'pages/design.html',
        'pages/kv.html',
        'pages/motion-design.html',
        'pages/postagens.html',
        'pages/dev.html',
        'pages/idv.html',
        'pages/dev/dev-adubos-real.html',
        'pages/dev/dev-mandu-cultural.html',
        'pages/dev/dev-rick.html',
        'pages/idv/idv-rick.html',
        'pages/idv/idv-vinca.html',
        'pages/idv/idv-ourotexas.html',
        'pages/idv/idv-medcenter.html',
        'pages/idv/idv-netexperts.html',
        'pages/idv/idv-campotech.html',
        'pages/idv/idv-fernanda.html',
        'pages/idv/idv-lotus.html'
    ];
    
    htmlFiles.forEach(file => {
        if (fs.existsSync(file)) {
            let content = fs.readFileSync(file, 'utf8');
            
            // Verificar se já tem viewport meta
            if (!content.includes('viewport')) {
                content = content.replace(
                    '<meta charset="UTF-8">',
                    '<meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">'
                );
                fs.writeFileSync(file, content, 'utf8');
                console.log(`✅ Viewport meta adicionado em ${file}`);
            }
        }
    });
}

// 7. Criar arquivo CSS responsivo global
function createGlobalResponsiveCSS() {
    const globalResponsive = `
/* ===== RESPONSIVIDADE GLOBAL ===== */

/* Reset responsivo */
* {
  box-sizing: border-box;
}

html {
  font-size: 16px;
  scroll-behavior: smooth;
}

body {
  overflow-x: hidden;
  width: 100%;
}

/* Container responsivo */
.container {
  max-width: var(--large-desktop);
  margin: 0 auto;
  padding: 0 var(--spacing-xl);
}

/* Grid responsivo */
.grid {
  display: grid;
  gap: var(--spacing-lg);
}

.grid-2 {
  grid-template-columns: repeat(2, 1fr);
}

.grid-3 {
  grid-template-columns: repeat(3, 1fr);
}

.grid-4 {
  grid-template-columns: repeat(4, 1fr);
}

/* Flex responsivo */
.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.flex-wrap {
  flex-wrap: wrap;
}

/* Espaçamentos responsivos */
.p-responsive {
  padding: var(--spacing-lg);
}

.m-responsive {
  margin: var(--spacing-lg);
}

/* Texto responsivo */
.text-responsive {
  font-size: var(--font-size-base);
  line-height: 1.6;
}

/* Imagens responsivas */
.img-responsive {
  max-width: 100%;
  height: auto;
  display: block;
}

/* Botões responsivos */
.btn-responsive {
  padding: var(--spacing-sm) var(--spacing-lg);
  font-size: var(--font-size-base);
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

/* Media queries responsivas */
@media (max-width: 1024px) {
  .container {
    padding: 0 var(--spacing-lg);
  }
  
  .grid-4 {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 var(--spacing-md);
  }
  
  .grid-3,
  .grid-4 {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .flex {
    flex-direction: column;
  }
  
  .p-responsive {
    padding: var(--spacing-md);
  }
  
  .m-responsive {
    margin: var(--spacing-md);
  }
}

@media (max-width: 480px) {
  .grid-2,
  .grid-3,
  .grid-4 {
    grid-template-columns: 1fr;
  }
  
  .container {
    padding: 0 var(--spacing-sm);
  }
  
  .p-responsive {
    padding: var(--spacing-sm);
  }
  
  .m-responsive {
    margin: var(--spacing-sm);
  }
  
  .text-responsive {
    font-size: var(--font-size-sm);
  }
  
  .btn-responsive {
    padding: var(--spacing-xs) var(--spacing-md);
    font-size: var(--font-size-sm);
  }
}

/* Utilitários responsivos */
.hidden-mobile {
  display: block;
}

.hidden-desktop {
  display: none;
}

@media (max-width: 768px) {
  .hidden-mobile {
    display: none;
  }
  
  .hidden-desktop {
    display: block;
  }
}

/* Animações responsivas */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Melhorias de acessibilidade */
@media (max-width: 768px) {
  /* Aumentar área de toque */
  button, a, input, select, textarea {
    min-height: 44px;
    min-width: 44px;
  }
  
  /* Melhorar contraste em telas pequenas */
  .texto-cinza {
    color: var(--c-05);
  }
}
`;

    fs.writeFileSync('public/css/base/responsive.css', globalResponsive, 'utf8');
    console.log('✅ CSS responsivo global criado');
}

// 8. Atualizar main.css para incluir o CSS responsivo
function updateMainCSS() {
    const mainCSSPath = 'public/css/main.css';
    let content = fs.readFileSync(mainCSSPath, 'utf8');
    
    // Adicionar import do CSS responsivo
    content = content.replace(
        '@import "base/reset.css";',
        '@import "base/reset.css";\n@import "base/responsive.css";'
    );
    
    fs.writeFileSync(mainCSSPath, content, 'utf8');
    console.log('✅ Main.css atualizado com CSS responsivo');
}

// Executar todas as correções
console.log('\n🔧 APLICANDO CORREÇÕES DE RESPONSIVIDADE...\n');

addGlobalResponsiveBreakpoints();
fixHeaderResponsiveness();
fixBannerResponsiveness();
fixProjectsResponsiveness();
fixPortfolioResponsiveness();
fixViewportMeta();
createGlobalResponsiveCSS();
updateMainCSS();

console.log('\n🎉 RESPONSIVIDADE CORRIGIDA COM SUCESSO!');
console.log('\n📋 RESUMO DAS CORREÇÕES:');
console.log('✅ Breakpoints responsivos globais adicionados');
console.log('✅ Header com menu hambúrguer responsivo');
console.log('✅ Banner principal adaptável');
console.log('✅ Seções de projetos responsivas');
console.log('✅ Portfolio com layout flexível');
console.log('✅ Meta viewport em todos os HTMLs');
console.log('✅ CSS responsivo global criado');
console.log('✅ Utilitários responsivos adicionados');
console.log('✅ Melhorias de acessibilidade mobile'); 