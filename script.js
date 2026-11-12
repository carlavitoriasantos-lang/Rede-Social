
/* =========================================
   UNIVERSO SOBRENATURAL
   THE VAMPIRE DIARIES + THE ORIGINALS
========================================= */


/* =========================================
   1. ENTRADA CINEMATOGRÁFICA
========================================= */

const intro = document.getElementById("intro");
const enterButton = document.getElementById("enterButton");

enterButton.addEventListener("click", function () {

    intro.classList.add("hidden");

    // Rola até o início do site
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================================
   2. MÚSICA DE FUNDO
========================================= */

const musicButton = document.getElementById("musicButton");
const backgroundMusic = document.getElementById("backgroundMusic");

let musicPlaying = false;

musicButton.addEventListener("click", function () {

    if (!musicPlaying) {

        backgroundMusic.play()
            .then(function () {

                musicPlaying = true;
                musicButton.textContent = "♫ Música: ON";

            })
            .catch(function () {

                alert("Não foi possível reproduzir a música. Confira o arquivo assets/musica.mp3.");

            });

    } else {

        backgroundMusic.pause();

        musicPlaying = false;
        musicButton.textContent = "♫ Música: OFF";

    }

});


/* =========================================
   3. MENU DE NAVEGAÇÃO
========================================= */

const menuLinks = document.querySelectorAll(".navbar a");

menuLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        menuLinks.forEach(function (item) {
            item.classList.remove("active");
        });

        link.classList.add("active");

    });

});


/* =========================================
   4. ANIMAÇÃO AO ROLAR A PÁGINA
========================================= */

const animatedElements = document.querySelectorAll(
    ".universe-card, .character-card, .info-box, .reflection, .pros-cons, .curiosity-card, .comparison-card"
);

const observer = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

        if (entry.isIntersecting) {

            entry.target.style.animation = "aparecer 1s ease forwards";

            observer.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.15
});

animatedElements.forEach(function (element) {

    element.style.opacity = "0";

    observer.observe(element);

});


/* =========================================
   5. BOTÃO VOLTAR AO TOPO
========================================= */

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", function () {

    if (window.scrollY > 400) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});

backToTop.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================================
   6. JOGO: O SEGREDO DOS IMORTAIS
========================================= */

const startGame = document.getElementById("startGame");
const gameArea = document.getElementById("gameArea");

const gameTitle = document.getElementById("gameTitle");
const gameStory = document.getElementById("gameStory");
const gameChoices = document.getElementById("gameChoices");

const gameChapter = document.getElementById("gameChapter");
const gamePoints = document.getElementById("gamePoints");
const gameFeedback = document.getElementById("gameFeedback");

let points = 0;
let chapter = 0;
let life = 3;
let inventory = [];


/* HISTÓRIA DO JOGO */

const chapters = [

    // CAPÍTULO 1
    {
        title: "O DESPERTAR",

        story: "Uma mensagem misteriosa chega até você. Ela diz que um antigo segredo ameaça Mystic Falls e Nova Orleans. Onde você deseja começar sua investigação?",

        choices: [

            {
                text: "🩸 Investigar Mystic Falls",

                points: 10,

                feedback: "Você chegou a Mystic Falls. Damon percebe sua presença e decide observar você.",

                next: 1
            },

            {
                text: "🌙 Investigar Nova Orleans",

                points: 10,

                feedback: "Você chegou a Nova Orleans. Klaus descobre que alguém está procurando um segredo da família Mikaelson.",

                next: 1
            }

        ]
    },


    // CAPÍTULO 2
    {
        title: "A ALIANÇA",

        story: "Você encontra dois caminhos. Uma pessoa oferece ajuda, mas você precisa decidir em quem confiar. Qual é sua escolha?",

        choices: [

            {
                text: "🦇 Confiar em Damon",

                points: 10,

                feedback: "Damon aceita ajudar, mas avisa que ninguém deve confiar completamente nos outros.",

                next: 2
            },

            {
                text: "👑 Confiar em Elijah",

                points: 15,

                feedback: "Elijah promete proteger você. Sua elegância esconde muitos segredos.",

                next: 2
            }

        ]
    },


    // CAPÍTULO 3
    {
        title: "O SEGREDO DAS BRUXAS",

        story: "Uma bruxa revela que o segredo só poderá ser descoberto por quem conhece o mundo sobrenatural. Qual criatura é considerada uma combinação de vampiro e lobisomem?",

        choices: [

            {
                text: "Uma bruxa",

                points: 0,

                feedback: "Resposta incorreta! Uma bruxa é uma criatura mágica.",

                next: 3
            },

            {
                text: "Um híbrido",

                points: 20,

                feedback: "Resposta correta! Klaus Mikaelson é um híbrido de vampiro e lobisomem.",

                next: 3
            },

            {
                text: "Um vampiro original",

                points: 0,

                feedback: "Resposta incorreta! Os Originais são os primeiros vampiros.",

                next: 3
            }

        ]
    },


    // CAPÍTULO 4
    {
        title: "O DESAFIO DA IMORTALIDADE",

        story: "Você encontra uma antiga mensagem: qual é o nome da família dos primeiros vampiros apresentados no universo de Diários de um Vampiro?",

        choices: [

            {
                text: "Salvatore",

                points: 0,

                feedback: "Não é essa! Os Salvatore são irmãos vampiros, mas não são a família dos primeiros vampiros.",

                next: 4
            },

            {
                text: "Mikaelson",

                points: 20,

                feedback: "Correto! A família Mikaelson é conhecida como a família dos Originais.",

                next: 4
            },

            {
                text: "Bennett",

                points: 0,

                feedback: "Não! A família Bennett é ligada à bruxaria.",

                next: 4
            }

        ]
    },


    // CAPÍTULO 5
    {
        title: "A ESCOLHA FINAL",

        story: "Você finalmente encontra o segredo. Uma magia antiga ameaça destruir os dois mundos. O que você decide fazer?",

        choices: [

            {
                text: "❤️ Salvar todos, mesmo com um grande sacrifício",

                points: 30,

                feedback: "Você escolheu proteger seus aliados. Sua coragem mudou o destino dos dois universos.",

                ending: "good"
            },

            {
                text: "🩸 Usar o poder para dominar os dois mundos",

                points: 5,

                feedback: "Você escolheu o poder. Agora todos temem seu nome.",

                ending: "dark"
            },

            {
                text: "🔮 Descobrir a origem da magia",

                points: 40,

                feedback: "Você descobriu uma verdade que ninguém conhecia. O segredo dos imortais finalmente foi revelado.",

                ending: "secret"
            }

        ]
    }

];


/* =========================================
   7. INICIAR JOGO
========================================= */

startGame.addEventListener("click", function () {

    points = 0;
    chapter = 0;
    life = 3;
    inventory = [];

    gameArea.classList.add("active");

    gameArea.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

    showChapter();

});


/* =========================================
   8. MOSTRAR CAPÍTULOS
========================================= */

function showChapter() {

    const current = chapters[chapter];

    gameTitle.textContent = current.title;

    gameStory.textContent = current.story;

    gameChapter.textContent = "CAPÍTULO " + (chapter + 1);

    gamePoints.textContent = points;

    gameFeedback.textContent = "";

    gameChoices.innerHTML = "";

    current.choices.forEach(function (choice) {

        const button = document.createElement("button");

        button.textContent = choice.text;

        button.addEventListener("click", function () {

            selectChoice(choice);

        });

        gameChoices.appendChild(button);

    });

}


/* =========================================
   9. ESCOLHER UMA RESPOSTA
========================================= */

function selectChoice(choice) {

    points += choice.points;

    gamePoints.textContent = points;

    gameFeedback.textContent = choice.feedback;

    // Adiciona uma pista ao inventário
    inventory.push(choice.text);

    // Bloqueia as opções após a escolha
    const buttons = gameChoices.querySelectorAll("button");

    buttons.forEach(function (button) {

        button.disabled = true;

        button.style.opacity = "0.5";

    });


    // Verifica se chegou ao final
    if (choice.ending) {

        setTimeout(function () {

            showEnding(choice.ending);

        }, 1500);

        return;

    }


    chapter = choice.next;

    const nextButton = document.createElement("button");

    nextButton.textContent = "CONTINUAR A AVENTURA";

    nextButton.addEventListener("click", function () {

        showChapter();

    });

    gameChoices.appendChild(nextButton);

}


/* =========================================
   10. FINAIS DA AVENTURA
========================================= */

function showEnding(ending) {

    gameChoices.innerHTML = "";

    gameChapter.textContent = "AVENTURA CONCLUÍDA";

    if (ending === "good") {

        gameTitle.textContent = "FINAL: O SACRIFÍCIO DOS HERÓIS";

        gameStory.textContent =
            "Você conseguiu salvar os dois universos! " +
            "Sua coragem e lealdade fizeram a diferença. " +
            "Mystic Falls e Nova Orleans estão em paz.";

    }

    else if (ending === "dark") {

        gameTitle.textContent = "FINAL: O REINADO DAS SOMBRAS";

        gameStory.textContent =
            "Você escolheu o poder acima de tudo. " +
            "Agora os dois universos estão sob seu domínio. " +
            "Mas será que valeu a pena?";

    }

    else if (ending === "secret") {

        gameTitle.textContent = "FINAL SECRETO: A VERDADE ETERNA";

        gameStory.textContent =
            "Você descobriu a origem da magia e revelou " +
            "o maior segredo dos imortais. " +
            "Uma nova história começa.";

    }


    const result = document.createElement("p");

    result.textContent = "Sua pontuação final: " + points + " pontos.";

    result.style.marginTop = "20px";

    result.style.color = "#d9b5e8";

    gameChoices.appendChild(result);


    const restartButton = document.createElement("button");

    restartButton.textContent = "JOGAR NOVAMENTE";

    restartButton.addEventListener("click", function () {

        points = 0;
        chapter = 0;
        life = 3;
        inventory = [];

        showChapter();

    });

    gameChoices.appendChild(restartButton);

}


/* =========================================
   11. EFEITO NOS BOTÕES
========================================= */

const allButtons = document.querySelectorAll("button");

allButtons.forEach(function (button) {

    button.addEventListener("mouseenter", function () {

        button.style.transition = "0.3s";

    });

});


/* =========================================
   FIM DO SCRIPT
   UNIVERSO SOBRENATURAL
========================================= */

console.log("🩸 Universo Sobrenatural carregado!");
console.log("🦇 Prepare-se para entrar no mundo dos imortais.");

const musicButton = document.getElementById("musicButton");
const backgroundMusic = document.getElementById("backgroundMusic");

musicButton.addEventListener("click", () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        musicButton.textContent = "🔇 Desligar música";
    } else {
        backgroundMusic.pause();
        musicButton.textContent = "🔊 Ligar música";
    }
});