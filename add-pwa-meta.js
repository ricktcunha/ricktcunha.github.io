#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configurações
const HTML_FILES = [
  'index.html',
  'contato.html',
  'cv.html',
  'design.html',
  'dev.html',
  'dev-adubos-real.html',
  'dev-mandu-cultural.html',
  'dev-rick.html',
  'idv.html',
  'idv-campotech.html',
  'idv-fernanda.html',
  'idv-lotus.html',
  'idv-medcenter.html',
  'idv-netexperts.html',
  'idv-ourotexas.html',
  'idv-rick.html',
  'idv-vinca.html',
  'kv.html',
  'motion-design.html',
  'portfolio.html',
  'postagens.html'
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
  <link rel="manifest" href="/manifest.json">
  <link rel="apple-touch-icon" href="assets/home/logos/rick_logo_branco_detalhe.svg">
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