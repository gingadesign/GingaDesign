// anima fade-in do body
document.addEventListener("DOMContentLoaded", function () {
  document.body.classList.add("fade-in-body");

  // scroll infinito (ativa quando chega no fim)
  let loading = false;
  window.addEventListener("scroll", () => {
    if (loading) return;
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 160) {
      if (typeof window.loadMoreTrabalhos === "function") {
        loading = true;
        Promise.resolve(window.loadMoreTrabalhos()).finally(() => {
          loading = false;
        });
      }
    }
  });
});

// lista de imagens — ajuste os nomes/pasta conforme suas imagens
const imagensTrabalhos = [
  "Imagens/Holocausto.png",
  "Imagens/Escola Americana.png",
  "Imagens/Expo Ingá.png",
  "Imagens/Tropicalia.png",
  "Imagens/Debret.png"
];

// referência do container
const galeria = document.getElementById("galeriaTrabalhos");

// controle de índice e quantidade por carregamento
let indice = 0;
const qtdPorVez = 6;

// função principal de carregamento
function loadMoreTrabalhos() {
  if (!galeria) {
    console.warn("⚠️ Galeria não encontrada!");
    return;
  }

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < qtdPorVez && indice < imagensTrabalhos.length; i++) {
    const img = document.createElement("img");
    img.src = imagensTrabalhos[indice];
    img.alt = `Trabalho ${indice + 1}`;
    img.loading = "lazy";

    // rotação leve aleatória (entre -4 e 4 graus)
   
    img.classList.add("visible");
    fragment.appendChild(img);
    indice++;
  }

  galeria.appendChild(fragment);
}

// primeira leva
document.addEventListener("DOMContentLoaded", loadMoreTrabalhos);
window.loadMoreTrabalhos = loadMoreTrabalhos;
