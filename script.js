document.addEventListener("DOMContentLoaded", () => {
  // 1. Menu Mobile
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  // Fechar menu ao clicar em um link
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });

  // 2. Filtro de Instituições (Curitiba)
  const tabBtns = document.querySelectorAll(".tab-btn");
  const instCards = document.querySelectorAll(".inst-card");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      instCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filter === "todos" || filter === category) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });

  // 3. Quiz Interativo para Visitantes da Feira
  const questions = [
    {
      question: "1. Como você reage quando vê um aparelho ou sistema eletrônico funcionando?",
      options: [
        { text: "Tenho curiosidade de saber como a energia e os circuitos fazem aquilo funcionar.", score: 2 },
        { text: "Gosto de entender a lógica por trás da automação e tecnologia.", score: 2 },
        { text: "Só me preocupo em usar no dia a dia.", score: 0 }
      ]
    },
    {
      question: "2. Qual ambiente de trabalho mais combina com você?",
      options: [
        { text: "Indústrias, projetos de energia renovável e laboratórios tecnológicos.", score: 2 },
        { text: "Obras, planejamento técnico e trabalho prático em equipe.", score: 2 },
        { text: "Escritório administrativo sem contato com tecnologia ou máquinas.", score: 0 }
      ]
    },
    {
      question: "3. O que você mais valoriza em uma profissão?",
      options: [
        { text: "Alta empregabilidade, atuação prática e foco no futuro da energia.", score: 2 },
        { text: "Possibilidade de começar com curso técnico e evoluir para Engenharia.", score: 2 },
        { text: "Áreas totalmente voltadas para humanas ou saúde.", score: 0 }
      ]
    }
  ];

  let currentQuestion = 0;
  let totalScore = 0;

  const questionText = document.getElementById("questionText");
  const optionsContainer = document.getElementById("optionsContainer");
  const progressText = document.getElementById("progressText");
  const quizContainer = document.getElementById("quizContainer");
  const quizResult = document.getElementById("quizResult");
  const resultTitle = document.getElementById("resultTitle");
  const resultDesc = document.getElementById("resultDesc");
  const restartBtn = document.getElementById("restartQuiz");

  function loadQuestion() {
    const q = questions[currentQuestion];
    questionText.textContent = q.question;
    progressText.textContent = `Pergunta ${currentQuestion + 1} de ${questions.length}`;
    optionsContainer.innerHTML = "";

    q.options.forEach((opt) => {
      const button = document.createElement("button");
      button.className = "option-btn";
      button.textContent = opt.text;
      button.addEventListener("click", () => handleAnswer(opt.score));
      optionsContainer.appendChild(button);
    });
  }

  function handleAnswer(score) {
    totalScore += score;
    currentQuestion++;

    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }

  function showResult() {
    quizContainer.style.display = "none";
    quizResult.classList.remove("hidden");

    if (totalScore >= 4) {
      resultTitle.textContent = "Alta Afinidade com Eletrotécnica!";
      resultDesc.textContent =
        "Você tem raciocínio lógico, interesse por tecnologia e perfil prático. A carreira de Eletrotécnico (e futuramente Engenharia Elétrica) combina muito com você!";
    } else {
      resultTitle.textContent = "Perfil Explorador!";
      resultDesc.textContent =
        "Mesmo que sua área principal seja outra, entender como a energia e a automação movem o mundo é um diferencial enorme. Converse com o Nicolas para saber mais!";
    }
  }

  restartBtn.addEventListener("click", () => {
    currentQuestion = 0;
    totalScore = 0;
    quizResult.classList.add("hidden");
    quizContainer.style.display = "block";
    loadQuestion();
  });

  loadQuestion();
});
