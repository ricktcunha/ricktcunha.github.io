#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configurações
const HTML_FILES = [
  'index.html',
  'pages/contato.html',
  'pages/cv.html',
  'pages/design.html',
  'pages/dev.html',
  'pages/dev/dev-adubos-real.html',
  'pages/dev/dev-mandu-cultural.html',
  'pages/dev/dev-rick.html',
  'pages/idv.html',
  'pages/idv/idv-campotech.html',
  'pages/idv/idv-fernanda.html',
  'pages/idv/idv-lotus.html',
  'pages/idv/idv-medcenter.html',
  'pages/idv/idv-netexperts.html',
  'pages/idv/idv-ourotexas.html',
  'pages/idv/idv-rick.html',
  'pages/idv/idv-vinca.html',
  'pages/kv.html',
  'pages/motion-design.html',
  'pages/portfolio.html',
  'pages/postagens.html'
];

// Meta tags PWA para adicionar
const PWA_META_TAGS = `
  <meta name="theme-color" content="#8c3eef">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="apple-mobile-web-app-title" content="Rick Portfolio">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="application-name" content="Rick Portfolio">
  <meta name="msapplication-TileColor" content="#8c3eef">
  <meta name="msapplication-tap-highlight" content="no">
  <link rel="manifest" href="/public/manifest.json">
  <link rel="apple-touch-icon" href="public/assets/home/logos/rick_logo_branco_detalhe.svg">
`;

// Função para adicionar meta tags PWA
function addPWAMetaTags(filePath) {
  try {
    console.log(`📄 Processando: ${filePath}`);
    
    // Ler o arquivo
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Verificar se já tem manifest
    if (content.includes('manifest.json')) {
      console.log(`✅ ${filePath} já possui meta tags PWA`);
      return false;
    }
    
    // Encontrar a posição após o último meta tag ou link
    const headEndIndex = content.indexOf('</head>');
    if (headEndIndex === -1) {
      console.log(`❌ ${filePath} não possui tag </head>`);
      return false;
    }
    
    // Inserir as meta tags PWA antes de </head>
    const beforeHeadEnd = content.substring(0, headEndIndex);
    const afterHeadEnd = content.substring(headEndIndex);
    
    // Adicionar as meta tags PWA
    const newContent = beforeHeadEnd + '\n' + PWA_META_TAGS + afterHeadEnd;
    
    // Salvar o arquivo
    fs.writeFileSync(filePath, newContent, 'utf8');
    
    console.log(`✅ Meta tags PWA adicionadas em: ${filePath}`);
    return true;
    
  } catch (error) {
    console.error(`❌ Erro ao processar ${filePath}:`, error.message);
    return false;
  }
}

// Função principal
function main() {
  console.log('🚀 Adicionando meta tags PWA em todos os arquivos HTML...');
  console.log('=' .repeat(60));
  
  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;
  
  for (const file of HTML_FILES) {
    if (fs.existsSync(file)) {
      const result = addPWAMetaTags(file);
      if (result === true) {
        successCount++;
      } else if (result === false) {
        skipCount++;
      }
    } else {
      console.log(`⚠️ Arquivo não encontrado: ${file}`);
      errorCount++;
    }
  }
  
  console.log('\n📊 RESUMO:');
  console.log(`   • Arquivos processados: ${HTML_FILES.length}`);
  console.log(`   • Meta tags PWA adicionadas: ${successCount}`);
  console.log(`   • Arquivos que já tinham: ${skipCount}`);
  console.log(`   • Erros: ${errorCount}`);
  
  if (successCount > 0) {
    console.log('\n🎉 Processo concluído com sucesso!');
    console.log('💡 Agora todos os arquivos HTML têm suporte PWA.');
  } else {
    console.log('\nℹ️ Nenhuma alteração foi necessária.');
  }
}

// Executar o script
if (require.main === module) {
  main();
}

module.exports = { addPWAMetaTags, PWA_META_TAGS }; 