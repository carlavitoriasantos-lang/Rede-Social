
// UNIVERSO SOBRENATURAL — INTERAÇÕES DO SITE (SEM MÚSICA)

// 1. TELA DE ENTRADA
const intro = document.getElementById("intro");
const enterButton = document.getElementById("enterButton");

document.body.classList.add("intro-open");

enterButton?.addEventListener("click", () => {
  intro.classList.add("hidden");
  document.body.classList.remove("intro-open");
});

// 2. MENU ADAPTADO PARA CELULAR
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle?.addEventListener("click", () => {
  const opened = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(opened));
  menuToggle.textContent = opened ? "×" : "☰";
});

mainNav?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    if (menuToggle) menuToggle.textContent = "☰";
  });
});

// 3. ANIMAÇÃO DAS SEÇÕES
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(item => {
  revealObserver.observe(item);
});

// 4. DESTAQUE DO MENU
const navLinks = document.querySelectorAll(".nav a");
const pageSections = document.querySelectorAll("main section[id]");

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    navLinks.forEach(link => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${entry.target.id}`
      );
    });
  });
}, { rootMargin: "-35% 0px -55% 0px" });

pageSections.forEach(section => {
  sectionObserver.observe(section);
});

// 5. GALERIA: AMPLIAR E FECHAR IMAGENS
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");

document.querySelectorAll(".gallery-item").forEach(button => {
  button.addEventListener("click", () => {
    const image = button.querySelector("img");

    lightboxImage.src = button.dataset.full || image.src;
    lightboxImage.alt = image.alt;

    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
  });
});

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  document.body.style.overflow = "";
}

lightboxClose?.addEventListener("click", closeLightbox);

lightbox?.addEventListener("click", event => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", event => {
  if (
    event.key === "Escape" &&
    lightbox.classList.contains("open")
  ) {
    closeLightbox();
  }
});

// 6. JOGO INTERATIVO: O SEGREDO DOS IMORTAIS

const gameElements = {
  chapter: document.getElementById("gameChapter"),
  points: document.getElementById("gamePoints"),
  progress: document.getElementById("gameProgress"),
  title: document.getElementById("gameTitle"),
  story: document.getElementById("gameStory"),
  choices: document.getElementById("gameChoices"),
  feedback: document.getElementById("gameFeedback"),
  restart: document.getElementById("restartGame")
};

// HISTÓRIA DO JOGO
const chapters = [
  {
    label: "CAPÍTULO 1 DE 5",
    title: "A Carta Misteriosa",
    story: "Você encontra uma carta antiga na porta de casa. Nela, há um símbolo que parece estar relacionado a Mystic Falls. O que você faz?",
    choices: [
      {
        text: "Investigar a biblioteca antiga",
        next: 1,
        points: 2,
        feedback: "Você encontra um livro com o mesmo símbolo. Uma pista importante!"
      },
      {
        text: "Procurar ajuda de alguém de confiança",
        next: 1,
        points: 1,
        feedback: "Com ajuda, você descobre que o símbolo pertence a uma família muito antiga."
      }
    ]
  },

  {
    label: "CAPÍTULO 2 DE 5",
    title: "O Símbolo Esquecido",
    story: "O livro revela que existe um objeto capaz de abrir uma passagem secreta. Você precisa encontrar a chave antes do anoitecer.",
    choices: [
      {
        text: "Seguir as marcas no mapa",
        next: 2,
        points: 2,
        feedback: "As marcas levam você até uma cripta escondida."
      },
      {
        text: "Examinar o símbolo com cuidado",
        next: 2,
        points: 1,
        feedback: "Você decifra uma mensagem: a verdade está sob a pedra."
      }
    ]
  },

  {
    label: "CAPÍTULO 3 DE 5",
    title: "A Cripta",
    story: "Na cripta, uma porta antiga está trancada. Há duas inscrições: coragem e sabedoria. Qual caminho você escolhe?",
    choices: [
      {
        text: "Escolher coragem e abrir a porta",
        next: 3,
        points: 1,
        feedback: "A porta range e se abre. Você entra, mas faz barulho."
      },
      {
        text: "Procurar um mecanismo escondido",
        next: 3,
        points: 2,
        feedback: "Você encontra uma alavanca escondida e abre a porta silenciosamente."
      }
    ]
  },

  {
    label: "CAPÍTULO 4 DE 5",
    title: "O Guardião",
    story: "Um guardião aparece e pergunta: o que mantém uma família unida mesmo nos momentos mais difíceis?",
    choices: [
      {
        text: "Poder e riqueza",
        next: 4,
        points: 0,
        feedback: "O guardião balança a cabeça. Talvez exista uma resposta mais importante."
      },
      {
        text: "Confiança, amor e lealdade",
        next: 4,
        points: 3,
        feedback: "O guardião sorri. Você compreendeu o verdadeiro segredo."
      }
    ]
  },

  {
    label: "CAPÍTULO 5 DE 5",
    title: "O Destino",
    story: "Você encontra o objeto misterioso. Ele pode trazer poder, mas também pode colocar muitas vidas em perigo. O que decide fazer?",
    choices: [
      {
        text: "Destruir o objeto para proteger todos",
        ending: "hero",
        points: 2,
        feedback: "Você escolheu proteger os outros, mesmo abrindo mão do poder."
      },
      {
        text: "Guardar o objeto e estudar seu poder",
        ending: "wise",
        points: 1,
        feedback: "Você decide agir com cautela e assume a responsabilidade pelo objeto."
      },
      {
        text: "Usar o objeto para conquistar poder",
        ending: "dark",
        points: 0,
        feedback: "O poder agora está em suas mãos, mas o preço pode ser alto."
      }
    ]
  }
];

// TRÊS FINAIS POSSÍVEIS
const endings = {
  hero: {
    title: "Final: O Coração do Herói",
    story: "Sua coragem protegeu todos. Você descobriu que a maior força não estava no objeto, mas na sua escolha."
  },

  wise: {
    title: "Final: O Guardião do Segredo",
    story: "Você escolheu conhecimento e responsabilidade. O objeto está protegido, mas uma nova missão pode começar."
  },

  dark: {
    title: "Final: A Sede de Poder",
    story: "Você conquistou o objeto, mas agora precisa enfrentar as consequências da sua decisão."
  }
};

let currentChapter = 0;
let score = 0;
let gameFinished = false;

// MOSTRA O CAPÍTULO ATUAL
function renderChapter() {
  const chapter = chapters[currentChapter];

  gameFinished = false;

  gameElements.chapter.textContent = chapter.label;
  gameElements.points.textContent = score;

  gameElements.progress.style.width =
    `${((currentChapter + 1) / chapters.length) * 100}%`;

  gameElements.title.textContent = chapter.title;
  gameElements.story.textContent = chapter.story;
  gameElements.feedback.textContent = "";

  gameElements.choices.replaceChildren();

  chapter.choices.forEach(choice => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "choice-button";
    button.textContent = choice.text;

    button.addEventListener("click", () => {
      selectChoice(choice);
    });

    gameElements.choices.appendChild(button);
  });
}

// PROCESSA A ESCOLHA DO JOGADOR
function selectChoice(choice) {
  if (gameFinished) return;

  score += choice.points || 0;

  gameElements.points.textContent = score;
  gameElements.feedback.textContent = choice.feedback;

  // EVITA CLIQUES REPETIDOS
  gameElements.choices.querySelectorAll("button").forEach(button => {
    button.disabled = true;
  });

  // VERIFICA SE O JOGADOR CHEGOU AO FINAL
  if (choice.ending) {
    gameFinished = true;

    const ending = endings[choice.ending];

    gameElements.chapter.textContent = "FIM DA AVENTURA";
    gameElements.progress.style.width = "100%";
    gameElements.title.textContent = ending.title;

    gameElements.story.textContent =
      `${ending.story} Sua pontuação final foi ${score} pontos.`;

    gameElements.choices.replaceChildren();

    gameElements.feedback.textContent =
      "A aventura terminou. Você pode jogar novamente e descobrir outro final.";

    return;
  }

  // AVANÇA PARA O PRÓXIMO CAPÍTULO
  window.setTimeout(() => {
    currentChapter = choice.next;
    renderChapter();
  }, 900);
}

// RECOMEÇA A AVENTURA
function restartGame() {
  currentChapter = 0;
  score = 0;
  gameFinished = false;

  renderChapter();
}

// BOTÃO DE RECOMEÇAR
gameElements.restart?.addEventListener("click", restartGame);

// INICIA O JOGO
renderChapter();
