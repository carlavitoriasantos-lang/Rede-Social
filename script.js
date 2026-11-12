
// UNIVERSO SOBRENATURAL — INTERAÇÕES (SEM MÚSICA)

const intro = document.getElementById('intro');
const enterButton = document.getElementById('enterButton');
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

// ENTRADA DO SITE
if (enterButton && intro) {
  enterButton.addEventListener('click', () => {
    intro.classList.add('hidden');
    document.body.classList.remove('locked');

    document.getElementById('inicio')
      ?.scrollIntoView({ behavior: 'smooth' });
  });
}

// MENU PARA CELULARES
if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');

    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.textContent = isOpen ? '×' : '☰';
  });

  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.textContent = '☰';
    });
  });
}

// ANIMAÇÃO DOS ELEMENTOS AO APARECER NA TELA
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach(element => {
  revealObserver.observe(element);
});

// DESTACA O LINK DA SEÇÃO ATUAL
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav a');

const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${entry.target.id}`
          );
        });
      }
    });
  },
  { rootMargin: '-35% 0px -55% 0px' }
);

sections.forEach(section => {
  sectionObserver.observe(section);
});

// JOGO: O SEGREDO DOS IMORTAIS
const game = {
  chapter: 0,
  points: 0,
  title: document.getElementById('gameTitle'),
  story: document.getElementById('gameStory'),
  choices: document.getElementById('gameChoices'),
  chapterLabel: document.getElementById('gameChapter'),
  pointsLabel: document.getElementById('gamePoints'),
  feedback: document.getElementById('gameFeedback'),
  restart: document.getElementById('restartGame')
};

// HISTÓRIA E ESCOLHAS DO JOGO
const adventure = [
  {
    label: 'CAPÍTULO 1 — A CARTA',
    title: 'Uma carta misteriosa',
    story: 'Você encontra uma carta antiga na porta de casa. Nela, há um símbolo ligado a Mystic Falls. O que você faz?',
    choices: [
      {
        text: 'Investigar a biblioteca antiga',
        next: 1,
        points: 2,
        feedback: 'Você encontra um livro com o mesmo símbolo. Uma pista importante!'
      },
      {
        text: 'Procurar ajuda de uma pessoa de confiança',
        next: 1,
        points: 1,
        feedback: 'Com ajuda, você descobre que o símbolo pertence a uma família muito antiga.'
      }
    ]
  },

  {
    label: 'CAPÍTULO 2 — O SÍMBOLO',
    title: 'Um segredo escondido',
    story: 'O livro revela que existe um objeto capaz de abrir uma passagem secreta. Você precisa encontrar a chave antes do anoitecer.',
    choices: [
      {
        text: 'Seguir as marcas no mapa',
        next: 2,
        points: 2,
        feedback: 'As marcas levam você até uma cripta escondida.'
      },
      {
        text: 'Examinar o símbolo com cuidado',
        next: 2,
        points: 1,
        feedback: 'Você decifra uma mensagem: “a verdade está sob a pedra”.'
      }
    ]
  },

  {
    label: 'CAPÍTULO 3 — A CRIPTA',
    title: 'A porta de pedra',
    story: 'Na cripta, uma porta antiga está trancada. Há duas inscrições: “coragem” e “sabedoria”. Qual caminho você escolhe?',
    choices: [
      {
        text: 'Escolher coragem e abrir a porta',
        next: 3,
        points: 1,
        feedback: 'A porta range e se abre. Você entra, mas faz barulho.'
      },
      {
        text: 'Usar a pista e procurar um mecanismo',
        next: 3,
        points: 2,
        feedback: 'Você encontra uma alavanca escondida e abre a porta silenciosamente.'
      }
    ]
  },

  {
    label: 'CAPÍTULO 4 — A REVELAÇÃO',
    title: 'O guardião',
    story: 'Um guardião aparece e diz que só permitirá sua passagem se você responder: o que mantém uma família unida mesmo nos momentos difíceis?',
    choices: [
      {
        text: 'Poder e riqueza',
        next: 4,
        points: 0,
        feedback: 'O guardião balança a cabeça. Talvez exista uma resposta mais importante.'
      },
      {
        text: 'Confiança, amor e lealdade',
        next: 4,
        points: 3,
        feedback: 'O guardião sorri. Você compreendeu o verdadeiro segredo.'
      }
    ]
  },

  {
    label: 'CAPÍTULO 5 — O DESTINO',
    title: 'A escolha final',
    story: 'Você encontra o objeto misterioso. Ele pode trazer poder, mas também pode colocar muitas vidas em perigo. O que decide fazer?',
    choices: [
      {
        text: 'Destruir o objeto para proteger todos',
        ending: 'hero',
        points: 2,
        feedback: 'Você escolheu proteger os outros, mesmo abrindo mão do poder.'
      },
      {
        text: 'Guardar o objeto e estudar seu poder',
        ending: 'wise',
        points: 1,
        feedback: 'Você decide agir com cautela e assume a responsabilidade pelo objeto.'
      },
      {
        text: 'Usar o objeto para conquistar poder',
        ending: 'dark',
        points: 0,
        feedback: 'O poder agora está em suas mãos, mas o preço pode ser alto.'
      }
    ]
  }
];

// MOSTRA O CAPÍTULO ATUAL
function renderGame() {
  const step = adventure[game.chapter];

  game.chapterLabel.textContent = step.label;
  game.title.textContent = step.title;
  game.story.textContent = step.story;
  game.pointsLabel.textContent = game.points;
  game.feedback.textContent = '';
  game.choices.innerHTML = '';

  step.choices.forEach(choice => {
    const button = document.createElement('button');

    button.className = 'choice-button';
    button.type = 'button';
    button.textContent = choice.text;

    button.addEventListener('click', () => {
      chooseGameOption(choice);
    });

    game.choices.appendChild(button);
  });
}

// PROCESSA A ESCOLHA DO JOGADOR
function chooseGameOption(choice) {
  game.points += choice.points || 0;
  game.pointsLabel.textContent = game.points;
  game.feedback.textContent = choice.feedback || '';

  // SE O JOGADOR CHEGOU AO FINAL
  if (choice.ending) {
    const endings = {
      hero: 'FINAL: O CORAÇÃO DO HERÓI — Sua coragem protegeu todos. A maior força não era o objeto, mas sua escolha.',
      wise: 'FINAL: O GUARDIÃO DO SEGREDO — Você escolheu conhecimento e responsabilidade. Uma nova missão começa.',
      dark: 'FINAL: A SEDE DE PODER — Você conquistou o objeto, mas agora precisa enfrentar as consequências.'
    };

    game.chapterLabel.textContent = 'FIM DA AVENTURA';
    game.title.textContent = endings[choice.ending];
    game.story.textContent =
      `Sua pontuação final foi ${game.points}. Obrigado por jogar!`;

    game.choices.innerHTML = '';
    return;
  }

  // EVITA QUE O JOGADOR CLIQUE VÁRIAS VEZES
  game.choices.querySelectorAll('button').forEach(button => {
    button.disabled = true;
  });

  window.setTimeout(() => {
    game.chapter = choice.next;
    renderGame();
  }, 1100);
}

// REINICIA O JOGO
function restartGame() {
  game.chapter = 0;
  game.points = 0;
  renderGame();
}

if (game.restart) {
  game.restart.addEventListener('click', restartGame);
}

if (game.title && game.story && game.choices) {
  renderGame();
}

// A TELA INICIAL FICA ABERTA ATÉ O CLIQUE NO BOTÃO
document.body.classList.add('locked');
