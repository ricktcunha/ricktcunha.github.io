// Adiciona a classe 'fade-in' ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("fade-in");
});

// Adiciona a classe 'fade-out' ao clicar em links
document.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", (e) => {
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
const animatedElements = document.querySelectorAll(".animated");

function handleScrollAnimation() {
  animatedElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 100) {
      element.classList.add("in-view");
    } else {
      element.classList.remove("in-view");
    }
  });
}

window.addEventListener("scroll", handleScrollAnimation);
handleScrollAnimation(); // Chama imediatamente para verificar elementos já visíveis

// Seleciona o elemento do cursor
const cursor = document.querySelector(".custom-cursor");

// Atualiza a posição do cursor considerando a rolagem da página
document.addEventListener("mousemove", (e) => {
  const x = e.clientX; // Obtém a posição horizontal do mouse
  const y = e.clientY; // Obtém a posição vertical do mouse

  // Atualiza a posição do cursor
  cursor.style.left = `${x}px`;
  cursor.style.top = `${y}px`;
});

// Detecta hover sobre elementos e aumenta o cursor
document.querySelectorAll("a, button").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.classList.add("custom-cursor-hover"); // Aumenta o cursor
  });
  el.addEventListener("mouseleave", () => {
    cursor.classList.remove("custom-cursor-hover"); // Volta ao tamanho normal
  });
});

// Seleciona as imagens das postagens com as classes 'imagem-projeto' e 'imagem-projeto-galeria'
const images = document.querySelectorAll(
  ".imagem-projeto, .imagem-projeto-galeria"
);
const lightbox = document.getElementById("lightbox");
const lightboxImage = lightbox.querySelector("img");

// Variável para armazenar a imagem atual
let currentImage = null;

// Adiciona um evento de clique nas imagens
images.forEach((image) => {
  image.addEventListener("click", (e) => {
    // Define a imagem no lightbox
    lightboxImage.src = e.target.src;
    lightbox.classList.add("open");

    // Reseta as classes anteriores
    lightboxImage.classList.remove("postagem", "imagem-projeto");

    // Aplica a classe correta com base no tipo de imagem
    if (e.target.classList.contains("postagem")) {
      lightboxImage.classList.add("postagem");
    } else if (e.target.classList.contains("imagem-projeto")) {
      lightboxImage.classList.add("imagem-projeto");
    }

    // Expande a imagem
    setTimeout(() => {
      lightboxImage.classList.add("open");
    }, 10);

    currentImage = e.target; // Define a imagem atual
  });
});

// Fecha o lightbox ou reduz a imagem quando clicar no fundo ou na imagem
lightbox.addEventListener("click", (e) => {
  // Verifica se a área clicada foi o fundo ou a própria imagem
  if (e.target === lightbox || e.target === lightboxImage) {
    lightboxImage.classList.remove("open"); // Remove a classe que expande a imagem

    // Aguarda a transição de redução antes de fechar o lightbox
    setTimeout(() => {
      lightbox.classList.remove("open");
      lightboxImage.src = ""; // Limpa a imagem
      currentImage = null; // Reseta a imagem atual
      lightboxImage.classList.remove("postagem", ""); // Remove a classe 'postagem' ao fechar
    }, 300); // Tempo de transição
  }
});
