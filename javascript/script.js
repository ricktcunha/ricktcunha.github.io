// ---------------------------
// Seção 1: Dinâmica de Tema (Comentado pois não está sendo utilizado)
// ---------------------------
/*
const toggleButton = document.getElementById('toggle-theme');
toggleButton.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark-theme');
});
*/

// ---------------------------
// Seção 2: Menu Hamburguer
// ---------------------------
// const hamburger = document.getElementById("hamburger");
// const menu = document.querySelector(".header-menu");

// Função para alternar o menu
// function toggleMenu() {
//   menu.classList.toggle("active");
//   hamburger.classList.toggle("active");
// }

// if (hamburger && menu) {
//   hamburger.addEventListener("click", toggleMenu);
// }

// ---------------------------
// Seção 3: Efeitos de Fade ao Carregar a Página e Clicar nos Links
// ---------------------------
// Adiciona a classe 'fade-in' ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("fade-in");
});

// Adiciona a classe 'fade-out' ao clicar em links
document.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");

    // Ignora âncoras internas e links que abrem em nova aba
    if (href && (href.startsWith("#") || link.target === "_blank")) return;

    e.preventDefault(); // Impede o comportamento padrão
    document.body.classList.add("fade-out");
    setTimeout(() => {
      window.location.href = href;
    }, 800); // Tempo deve corresponder ao CSS
  });
});

// ---------------------------
// Seção 4: Animação de Rolagem
// ---------------------------
const animatedElements = document.querySelectorAll(".animated");

function handleScrollAnimation() {
  animatedElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    element.classList.toggle("in-view", elementTop < windowHeight - 100);
  });
}

window.addEventListener("scroll", handleScrollAnimation);
handleScrollAnimation(); // Chama imediatamente para verificar elementos já visíveis

// ---------------------------
// Seção 5: Cursor Customizado
// ---------------------------
const cursor = document.querySelector(".custom-cursor");

// Atualiza a posição do cursor considerando a rolagem da página
if (cursor) {
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });

  // Detecta hover sobre elementos e aumenta o cursor
  const hoverElements = document.querySelectorAll("a, button");

  hoverElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("custom-cursor-hover");
    });
    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("custom-cursor-hover");
    });
  });
}

// ---------------------------
// Seção 6: Lightbox para Imagens
// ---------------------------
const images = document.querySelectorAll(".imagem-projeto, .imagem-projeto-galeria");
const lightbox = document.getElementById("lightbox");
const lightboxImage = lightbox ? lightbox.querySelector("img") : null;

let currentImage = null;

if (lightbox && lightboxImage) {
  // Função para abrir o lightbox
  function openLightbox(e) {
    lightboxImage.src = e.target.src;
    lightbox.classList.add("open");



    // Reseta as classes anteriores
    lightboxImage.classList.remove("postagem", "imagem-projeto");

    // Aplica a classe correta com base no tipo de imagem
    lightboxImage.classList.add(e.target.classList.contains("postagem") ? "postagem" : "imagem-projeto");

    // Expande a imagem
    setTimeout(() => {
      lightboxImage.classList.add("open");
    }, 10);

    currentImage = e.target;
  }

  // Função para fechar o lightbox
  function closeLightbox(e) {
    if (e.target === lightbox || e.target === lightboxImage) {
      lightboxImage.classList.remove("open");
      setTimeout(() => {
        lightbox.classList.remove("open");
        lightboxImage.src = "";
        currentImage = null;
        lightboxImage.classList.remove("postagem", "imagem-projeto");
      }, 300);
    }
  }

  // Função para navegação
  function navigateLightbox(e) {
    if (!lightbox.classList.contains("open")) return;

    let nextImage = null;
    if (e.key === "ArrowRight") {
      nextImage = getNextImage();
    } else if (e.key === "ArrowLeft") {
      nextImage = getPreviousImage();
    }

    if (nextImage) {
      lightboxImage.src = nextImage.src;
      currentImage = nextImage;
    }
  }

  // Funções para pegar a próxima ou anterior imagem
  function getNextImage() {
    const index = Array.from(images).indexOf(currentImage);
    return index < images.length - 1 ? images[index + 1] : null;
  }

  function getPreviousImage() {
    const index = Array.from(images).indexOf(currentImage);
    return index > 0 ? images[index - 1] : null;
  }

  // Eventos
  images.forEach((image) => image.addEventListener("click", openLightbox));
  lightbox.addEventListener("click", closeLightbox);
  document.addEventListener("keydown", navigateLightbox);
}
