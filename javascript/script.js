// Adiciona a classe 'fade-in' ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("fade-in");
});

// Adiciona a classe 'fade-out' ao clicar em links
document.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", e => {
    const href = link.getAttribute("href");

    if (href && href.startsWith("#")) return; // Ignora âncoras internas

    e.preventDefault();
    document.body.classList.add("fade-out");
    setTimeout(() => {
      window.location.href = href;
    }, 800); // Tempo deve corresponder ao CSS
  });
});

// Detecção de rolagem para animação de entrada
const animatedElements = document.querySelectorAll('.animated');

function handleScrollAnimation() {
  animatedElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 100) {
      element.classList.add('in-view');
    } else {
      element.classList.remove('in-view');
    }
  });
}

window.addEventListener('scroll', handleScrollAnimation);
handleScrollAnimation(); // Chama imediatamente para verificar elementos já visíveis

// Movimentação do cursor personalizado
const cursor = document.querySelector('.custom-cursor');

// Atualiza a posição do cursor
document.addEventListener('mousemove', (e) => {
  cursor.style.left = `${e.pageX}px`;
  cursor.style.top = `${e.pageY}px`;
});

// Detecta hover sobre elementos e aumenta o cursor
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('custom-cursor-hover'); // Aumenta o cursor
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('custom-cursor-hover'); // Volta ao tamanho normal
  });
});
