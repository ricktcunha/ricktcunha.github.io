// Briefing Form Interactive Script
// 
// MAILTO FUNCTIONALITY:
// Este formulário usa mailto: para enviar os dados diretamente para ricktcunha@gmail.com
// O navegador abrirá o cliente de email padrão do usuário com os dados pré-preenchidos
// 
// TESTANDO:
// 1. Abra o Console do navegador (F12) para ver os logs de debug
// 2. Preencha todos os campos obrigatórios (marcados com *)
// 3. Ao clicar em "Enviar Briefing", verifique:
//    - Console mostrará todos os dados coletados
//    - Cliente de email será aberto com subject e body preenchidos
//    - Mensagem de sucesso será exibida na tela
//
// ÍCONES:
// Usando Lucide Icons (https://lucide.dev) - ícones minimalistas e flat
//

document.addEventListener('DOMContentLoaded', function() {
  // Estado do formulário
  let currentStep = 1;
  const totalSteps = 5;
  let selectedProjectTypes = [];
  let selectedColors = [];

  // Elementos DOM
  const form = document.getElementById('briefingForm');
  const btnNext = document.getElementById('btnNext');
  const btnPrev = document.getElementById('btnPrev');
  const btnSubmit = document.getElementById('btnSubmit');
  const progressFill = document.getElementById('progressFill');
  const successMessage = document.getElementById('successMessage');

  // Project Type Cards
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('click', function() {
      const type = this.dataset.type;
      this.classList.toggle('selected');
      
      if (this.classList.contains('selected')) {
        if (!selectedProjectTypes.includes(type)) {
          selectedProjectTypes.push(type);
        }
      } else {
        selectedProjectTypes = selectedProjectTypes.filter(t => t !== type);
      }
      
      updateConditionalSections();
    });
  });

  // Atualizar seções condicionais
  function updateConditionalSections() {
    const hasSite = selectedProjectTypes.includes('site');
    const hasMarca = selectedProjectTypes.includes('marca');

    // Step 2 - Detalhes
    document.getElementById('siteDetails').style.display = hasSite ? 'block' : 'none';
    document.getElementById('marcaDetails').style.display = hasMarca ? 'block' : 'none';

    // Step 4 - Funcionalidades
    document.getElementById('siteFuncionalidades').style.display = hasSite ? 'block' : 'none';
    document.getElementById('marcaAplicacoes').style.display = hasMarca ? 'block' : 'none';

    // Step 5 - Conteúdo
    document.getElementById('siteConteudo').style.display = hasSite ? 'block' : 'none';
    document.getElementById('marcaConteudo').style.display = hasMarca ? 'block' : 'none';

    // Atualizar campos obrigatórios
    updateRequiredFields();
  }

  // Atualizar campos obrigatórios baseado na seleção
  function updateRequiredFields() {
    const hasSite = selectedProjectTypes.includes('site');
    const hasMarca = selectedProjectTypes.includes('marca');

    // Site fields
    const siteFields = ['objetivoSite', 'publicoAlvoSite'];
    siteFields.forEach(id => {
      const field = document.getElementById(id);
      if (field) {
        field.required = hasSite;
      }
    });

    // Marca fields
    const marcaFields = ['nomeMarca', 'segmentoMarca'];
    marcaFields.forEach(id => {
      const field = document.getElementById(id);
      if (field) {
        field.required = hasMarca;
      }
    });
  }

  // Color Picker
  const colorOptions = document.querySelectorAll('.color-option');
  const selectedColorsContainer = document.getElementById('selectedColors');
  const customColorPicker = document.getElementById('customColorPicker');

  colorOptions.forEach(option => {
    option.addEventListener('click', function() {
      const color = this.dataset.color;
      this.classList.toggle('selected');
      
      if (this.classList.contains('selected')) {
        if (!selectedColors.includes(color)) {
          selectedColors.push(color);
        }
      } else {
        selectedColors = selectedColors.filter(c => c !== color);
      }
      
      updateSelectedColors();
    });
  });

  // Custom Color Picker (Conta-gotas)
  if (customColorPicker) {
    customColorPicker.addEventListener('change', function() {
      const color = this.value.toUpperCase();
      
      // Adicionar cor se não estiver na lista
      if (!selectedColors.includes(color)) {
        selectedColors.push(color);
        updateSelectedColors();
      }
    });
  }

  function updateSelectedColors() {
    selectedColorsContainer.innerHTML = '';
    selectedColors.forEach(color => {
      const tag = document.createElement('div');
      tag.className = 'selected-color-tag';
      tag.innerHTML = `
        <span class="color-preview" style="background: ${color};"></span>
        <span>${color}</span>
      `;
      selectedColorsContainer.appendChild(tag);
    });
  }

  // Adicionar referências dinamicamente
  let referenciaCount = 0;
  document.querySelector('.btn-add-ref').addEventListener('click', function() {
    referenciaCount++;
    const container = document.querySelector('.referencias-container');
    const newInput = document.createElement('div');
    newInput.className = 'referencia-input-group';
    newInput.innerHTML = `
      <input type="url" class="referencia-input" placeholder="https://exemplo.com" data-index="${referenciaCount}">
      <button type="button" class="btn-add-ref" onclick="this.parentElement.remove()">−</button>
    `;
    container.appendChild(newInput);
    
    // Reinicializar ícones Lucide se disponível
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  });

  // Character counters
  const textareas = document.querySelectorAll('textarea[maxlength]');
  textareas.forEach(textarea => {
    const counter = textarea.nextElementSibling;
    if (counter && counter.classList.contains('char-counter')) {
      const countSpan = counter.querySelector('.char-count');
      
      textarea.addEventListener('input', function() {
        countSpan.textContent = this.value.length;
        
        if (this.value.length > this.maxLength * 0.9) {
          countSpan.style.color = 'var(--p-01)';
        } else {
          countSpan.style.color = 'var(--p-02)';
        }
      });
    }
  });

  // Input validation icons
  const inputs = document.querySelectorAll('input[required], textarea[required]');
  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      if (this.validity.valid && this.value.trim() !== '') {
        this.style.borderColor = 'var(--p-02)';
      } else if (this.value.trim() !== '') {
        this.style.borderColor = 'var(--c-05)';
      }
    });
  });

  // Outras funcionalidades checkbox
  const outrasFuncCheckbox = document.getElementById('outrasFunc');
  const outrasFuncContainer = document.getElementById('outrasFuncContainer');

  if (outrasFuncCheckbox) {
    outrasFuncCheckbox.addEventListener('change', function() {
      outrasFuncContainer.style.display = this.checked ? 'block' : 'none';
    });
  }

  // Navegação entre steps
  btnNext.addEventListener('click', function() {
    if (validateCurrentStep()) {
      if (currentStep < totalSteps) {
        goToStep(currentStep + 1);
      }
    }
  });

  btnPrev.addEventListener('click', function() {
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    }
  });

  function goToStep(step) {
    // Ocultar step atual
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('active');
    document.querySelector(`.step[data-step="${currentStep}"]`).classList.remove('active');
    document.querySelector(`.step[data-step="${currentStep}"]`).classList.add('completed');

    // Mostrar novo step
    currentStep = step;
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add('active');
    document.querySelector(`.step[data-step="${currentStep}"]`).classList.add('active');

    // Atualizar progress bar
    const progress = (currentStep / totalSteps) * 100;
    progressFill.style.width = progress + '%';

    // Atualizar botões
    btnPrev.style.display = currentStep > 1 ? 'flex' : 'none';
    
    if (currentStep === totalSteps) {
      btnNext.style.display = 'none';
      btnSubmit.style.display = 'flex';
      generatePreview();
    } else {
      btnNext.style.display = 'flex';
      btnSubmit.style.display = 'none';
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Validação
  function validateCurrentStep() {
    const currentStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    const requiredFields = currentStepElement.querySelectorAll('[required]');
    let isValid = true;

    // Step 2: Validar se pelo menos um tipo de projeto foi selecionado
    if (currentStep === 2) {
      if (selectedProjectTypes.length === 0) {
        alert('Por favor, selecione pelo menos um tipo de projeto (Site ou Marca).');
        return false;
      }

      // Validar radio buttons do site
      if (selectedProjectTypes.includes('site')) {
        const tipoSiteSelected = currentStepElement.querySelector('input[name="tipoSite"]:checked');
        if (!tipoSiteSelected) {
          alert('Por favor, selecione o tipo de site desejado.');
          return false;
        }
      }
    }

    // Step 3: Validar se pelo menos um estilo foi selecionado
    if (currentStep === 3) {
      const estilosChecked = currentStepElement.querySelectorAll('input[name="estilo"]:checked');
      if (estilosChecked.length === 0) {
        alert('Por favor, selecione pelo menos um estilo visual.');
        return false;
      }
    }

    // Validar campos obrigatórios visíveis
    requiredFields.forEach(field => {
      // Verificar se o campo está visível (não está em uma seção oculta)
      const isVisible = field.offsetParent !== null;
      
      if (isVisible) {
        if (!field.validity.valid || field.value.trim() === '') {
          field.style.borderColor = '#ff4444';
          isValid = false;
          
          // Focus no primeiro campo inválido
          if (isValid === false && !field.classList.contains('focused-invalid')) {
            field.classList.add('focused-invalid');
            field.focus();
          }
        } else {
          field.style.borderColor = 'var(--p-02)';
          field.classList.remove('focused-invalid');
        }
      }
    });

    if (!isValid) {
      alert('Por favor, preencha todos os campos obrigatórios (*).');
    }

    return isValid;
  }

  // Gerar preview do briefing
  function generatePreview() {
    const previewContent = document.getElementById('previewContent');
    let html = '';

    // Informações pessoais
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const empresa = document.getElementById('empresa').value;
    const segmento = document.getElementById('segmento').value;

    html += '<div class="preview-item">';
    html += '<strong>Dados de Contato:</strong><br>';
    html += `Nome: ${nome}<br>`;
    html += `Email: ${email}<br>`;
    html += `WhatsApp: ${telefone}<br>`;
    if (empresa) html += `Empresa: ${empresa}<br>`;
    if (segmento) html += `Segmento: ${segmento}`;
    html += '</div>';

    // Tipo de projeto
    html += '<div class="preview-item">';
    html += '<strong>Tipo de Projeto:</strong><br>';
    html += selectedProjectTypes.map(type => 
      type === 'site' ? '🌐 Site' : '🎨 Marca'
    ).join(', ');
    html += '</div>';

    // Detalhes do Site
    if (selectedProjectTypes.includes('site')) {
      html += '<div class="preview-item">';
      html += '<strong>Detalhes do Site:</strong><br>';
      
      const tipoSite = document.querySelector('input[name="tipoSite"]:checked');
      if (tipoSite) html += `Tipo: ${tipoSite.value}<br>`;
      
      const nomeProjeto = document.getElementById('nomeProjeto').value;
      if (nomeProjeto) html += `Nome: ${nomeProjeto}<br>`;
      
      const objetivoSite = document.getElementById('objetivoSite').value;
      if (objetivoSite) html += `Objetivo: ${objetivoSite}<br>`;
      
      const publicoAlvoSite = document.getElementById('publicoAlvoSite').value;
      if (publicoAlvoSite) html += `Público-alvo: ${publicoAlvoSite}<br>`;
      
      const prazoSite = document.getElementById('prazoSite').value;
      if (prazoSite) html += `Prazo: ${prazoSite}`;
      
      html += '</div>';
    }

    // Detalhes da Marca
    if (selectedProjectTypes.includes('marca')) {
      html += '<div class="preview-item">';
      html += '<strong>Detalhes da Marca:</strong><br>';
      
      const nomeMarca = document.getElementById('nomeMarca').value;
      if (nomeMarca) html += `Nome: ${nomeMarca}<br>`;
      
      const valoresMarca = document.getElementById('valoresMarca').value;
      if (valoresMarca) html += `Valores: ${valoresMarca}<br>`;
      
      const segmentoMarca = document.getElementById('segmentoMarca').value;
      if (segmentoMarca) html += `Segmento: ${segmentoMarca}<br>`;
      
      const prazoMarca = document.getElementById('prazoMarca').value;
      if (prazoMarca) html += `Prazo: ${prazoMarca}`;
      
      html += '</div>';
    }

    // Estilo Visual
    const estilos = Array.from(document.querySelectorAll('input[name="estilo"]:checked'))
      .map(cb => cb.value);
    
    if (estilos.length > 0) {
      html += '<div class="preview-item">';
      html += '<strong>Estilo Visual:</strong><br>';
      html += estilos.join(', ');
      html += '</div>';
    }

    // Cores
    if (selectedColors.length > 0) {
      html += '<div class="preview-item">';
      html += '<strong>Cores Preferidas:</strong><br>';
      html += selectedColors.map(color => 
        `<span style="display: inline-block; width: 20px; height: 20px; background: ${color}; border-radius: 50%; margin-right: 5px; border: 2px solid var(--c-01);"></span>`
      ).join('');
      html += '</div>';
    }

    // Referências
    const referencias = Array.from(document.querySelectorAll('.referencia-input'))
      .map(input => input.value)
      .filter(val => val.trim() !== '');
    
    if (referencias.length > 0) {
      html += '<div class="preview-item">';
      html += '<strong>Referências:</strong><br>';
      referencias.forEach(ref => {
        html += `<a href="${ref}" target="_blank" style="color: var(--p-02);">${ref}</a><br>`;
      });
      html += '</div>';
    }

    // Funcionalidades do Site
    if (selectedProjectTypes.includes('site')) {
      const funcionalidades = Array.from(document.querySelectorAll('input[name="funcionalidades"]:checked'))
        .map(cb => cb.value);
      
      if (funcionalidades.length > 0) {
        html += '<div class="preview-item">';
        html += '<strong>Funcionalidades do Site:</strong><br>';
        html += funcionalidades.join(', ');
        html += '</div>';
      }
    }

    // Aplicações da Marca
    if (selectedProjectTypes.includes('marca')) {
      const aplicacoes = Array.from(document.querySelectorAll('input[name="aplicacoesMarca"]:checked'))
        .map(cb => cb.value);
      
      if (aplicacoes.length > 0) {
        html += '<div class="preview-item">';
        html += '<strong>Aplicações da Marca:</strong><br>';
        html += aplicacoes.join(', ');
        html += '</div>';
      }
    }

    // Informações adicionais
    const infoAdicionais = document.getElementById('informacoesAdicionais').value;
    if (infoAdicionais) {
      html += '<div class="preview-item">';
      html += '<strong>Informações Adicionais:</strong><br>';
      html += infoAdicionais;
      html += '</div>';
    }

    previewContent.innerHTML = html;
  }

  // Enviar formulário
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!validateCurrentStep()) {
      return;
    }

    // Preparar dados para o mailto
    const formData = collectFormData();
    const emailBody = formatEmailBody(formData);
    const subject = `🎨 Novo Briefing - ${formData.nome}`;
    
    // Debug: Mostrar dados no console
    console.log('📋 Dados do Briefing:', formData);
    console.log('📧 Email Subject:', subject);
    console.log('📝 Email Body Preview:', emailBody.substring(0, 200) + '...');
    
    // Criar mailto link
    const mailtoLink = `mailto:ricktcunha@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Verificar tamanho do link (alguns clientes de email têm limites)
    if (mailtoLink.length > 2000) {
      console.warn('⚠️ Aviso: O link mailto é longo (' + mailtoLink.length + ' caracteres). Alguns clientes de email podem ter problemas.');
    }
    
    // Abrir cliente de email
    window.location.href = mailtoLink;
    
    // Mostrar mensagem de sucesso após um pequeno delay
    setTimeout(() => {
      document.querySelector('.briefing-form').style.display = 'none';
      document.querySelector('.progress-container').style.display = 'none';
      document.querySelector('.briefing-header').style.display = 'none';
      successMessage.style.display = 'block';
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500);
  });

  // Coletar dados do formulário
  function collectFormData() {
    const data = {
      // Dados pessoais
      nome: document.getElementById('nome').value,
      email: document.getElementById('email').value,
      telefone: document.getElementById('telefone').value,
      empresa: document.getElementById('empresa').value,
      segmento: document.getElementById('segmento').value,
      
      // Tipo de projeto
      tiposProjeto: selectedProjectTypes,
      
      // Site
      tipoSite: document.querySelector('input[name="tipoSite"]:checked')?.value || '',
      nomeProjeto: document.getElementById('nomeProjeto').value,
      objetivoSite: document.getElementById('objetivoSite').value,
      publicoAlvoSite: document.getElementById('publicoAlvoSite').value,
      prazoSite: document.getElementById('prazoSite').value,
      
      // Marca
      nomeMarca: document.getElementById('nomeMarca').value,
      valoresMarca: document.getElementById('valoresMarca').value,
      segmentoMarca: document.getElementById('segmentoMarca').value,
      prazoMarca: document.getElementById('prazoMarca').value,
      referenciaMarcas: document.getElementById('referenciaMarcas').value,
      
      // Estilo
      estilos: Array.from(document.querySelectorAll('input[name="estilo"]:checked')).map(cb => cb.value),
      cores: selectedColors,
      referencias: Array.from(document.querySelectorAll('.referencia-input')).map(input => input.value).filter(val => val.trim() !== ''),
      
      // Funcionalidades
      funcionalidades: Array.from(document.querySelectorAll('input[name="funcionalidades"]:checked')).map(cb => cb.value),
      outrasFuncionalidades: document.getElementById('outrasFuncionalidades').value,
      aplicacoesMarca: Array.from(document.querySelectorAll('input[name="aplicacoesMarca"]:checked')).map(cb => cb.value),
      
      // Conteúdo
      possuiLogo: document.getElementById('possuiLogo')?.checked || false,
      possuiFotos: document.getElementById('possuiFotos')?.checked || false,
      possuiTextos: document.getElementById('possuiTextos')?.checked || false,
      nomeDefinido: document.getElementById('nomeDefinido')?.checked || false,
      precisaSlogan: document.getElementById('precisaSlogan')?.checked || false,
      
      // Informações adicionais
      informacoesAdicionais: document.getElementById('informacoesAdicionais').value
    };
    
    return data;
  }

  // Formatar corpo do email
  function formatEmailBody(data) {
    let body = `NOVO BRIEFING DE PROJETO\n\n`;
    body += `═══════════════════════════════════════\n\n`;
    
    // Dados de Contato
    body += `📋 DADOS DE CONTATO\n\n`;
    body += `Nome: ${data.nome}\n`;
    body += `Email: ${data.email}\n`;
    body += `WhatsApp: ${data.telefone}\n`;
    if (data.empresa) body += `Empresa: ${data.empresa}\n`;
    if (data.segmento) body += `Segmento: ${data.segmento}\n`;
    body += `\n═══════════════════════════════════════\n\n`;
    
    // Tipo de Projeto
    body += `🎯 TIPO DE PROJETO\n\n`;
    body += data.tiposProjeto.map(type => {
      return type === 'site' ? '🌐 Site' : '🎨 Marca';
    }).join('\n');
    body += `\n\n═══════════════════════════════════════\n\n`;
    
    // Detalhes do Site
    if (data.tiposProjeto.includes('site')) {
      body += `🌐 DETALHES DO SITE\n\n`;
      if (data.tipoSite) body += `Tipo: ${data.tipoSite}\n`;
      if (data.nomeProjeto) body += `Nome do Projeto: ${data.nomeProjeto}\n`;
      if (data.objetivoSite) body += `Objetivo: ${data.objetivoSite}\n`;
      if (data.publicoAlvoSite) body += `Público-alvo: ${data.publicoAlvoSite}\n`;
      if (data.prazoSite) body += `Prazo: ${data.prazoSite}\n`;
      body += `\n═══════════════════════════════════════\n\n`;
    }
    
    // Detalhes da Marca
    if (data.tiposProjeto.includes('marca')) {
      body += `🎨 DETALHES DA MARCA\n\n`;
      if (data.nomeMarca) body += `Nome da Marca: ${data.nomeMarca}\n`;
      if (data.valoresMarca) body += `Valores: ${data.valoresMarca}\n`;
      if (data.segmentoMarca) body += `Segmento: ${data.segmentoMarca}\n`;
      if (data.prazoMarca) body += `Prazo: ${data.prazoMarca}\n`;
      if (data.referenciaMarcas) body += `Referências: ${data.referenciaMarcas}\n`;
      body += `\n═══════════════════════════════════════\n\n`;
    }
    
    // Estilo Visual
    if (data.estilos.length > 0) {
      body += `✨ ESTILO VISUAL\n\n`;
      body += data.estilos.join(', ') + '\n';
      body += `\n═══════════════════════════════════════\n\n`;
    }
    
    // Cores
    if (data.cores.length > 0) {
      body += `🎨 CORES PREFERIDAS\n\n`;
      body += data.cores.join(', ') + '\n';
      body += `\n═══════════════════════════════════════\n\n`;
    }
    
    // Referências
    if (data.referencias.length > 0) {
      body += `🔗 REFERÊNCIAS\n\n`;
      data.referencias.forEach((ref, index) => {
        body += `${index + 1}. ${ref}\n`;
      });
      body += `\n═══════════════════════════════════════\n\n`;
    }
    
    // Funcionalidades do Site
    if (data.tiposProjeto.includes('site') && data.funcionalidades.length > 0) {
      body += `⚙️ FUNCIONALIDADES DO SITE\n\n`;
      data.funcionalidades.forEach(func => {
        body += `• ${func}\n`;
      });
      if (data.outrasFuncionalidades) {
        body += `\nOutras: ${data.outrasFuncionalidades}\n`;
      }
      body += `\n═══════════════════════════════════════\n\n`;
    }
    
    // Aplicações da Marca
    if (data.tiposProjeto.includes('marca') && data.aplicacoesMarca.length > 0) {
      body += `📦 APLICAÇÕES DA MARCA\n\n`;
      data.aplicacoesMarca.forEach(app => {
        body += `• ${app}\n`;
      });
      body += `\n═══════════════════════════════════════\n\n`;
    }
    
    // Conteúdo
    if (data.tiposProjeto.includes('site')) {
      body += `📁 CONTEÚDO\n\n`;
      body += `Possui logo? ${data.possuiLogo ? 'Sim' : 'Não'}\n`;
      body += `Possui fotos profissionais? ${data.possuiFotos ? 'Sim' : 'Não'}\n`;
      body += `Possui textos prontos? ${data.possuiTextos ? 'Sim' : 'Não'}\n`;
      body += `\n═══════════════════════════════════════\n\n`;
    }
    
    if (data.tiposProjeto.includes('marca')) {
      body += `📝 SOBRE A MARCA\n\n`;
      body += `Nome definido? ${data.nomeDefinido ? 'Sim' : 'Não'}\n`;
      body += `Precisa de slogan? ${data.precisaSlogan ? 'Sim' : 'Não'}\n`;
      body += `\n═══════════════════════════════════════\n\n`;
    }
    
    // Informações Adicionais
    if (data.informacoesAdicionais) {
      body += `💬 INFORMAÇÕES ADICIONAIS\n\n`;
      body += data.informacoesAdicionais + '\n';
      body += `\n═══════════════════════════════════════\n\n`;
    }
    
    body += `\nBriefing enviado em ${new Date().toLocaleString('pt-BR')}\n`;
    
    return body;
  }
});

