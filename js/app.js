let currentQuestionIdx = 0;
let score = 0;
let selectedOptionIdx = null;
let isSubmitted = false;

const welcomeScreen = document.getElementById('welcome-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const hintBtn = document.getElementById('hint-btn');
const hintBox = document.getElementById('hint-box');
const hintText = document.getElementById('hint-text');
const themeToggle = document.getElementById('theme-toggle');

const questionIndicator = document.getElementById('question-indicator');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const scoreCounter = document.getElementById('score-counter');
const progressBar = document.getElementById('progress-bar');

const feedbackCard = document.getElementById('feedback-card');
const feedbackTitle = document.getElementById('feedback-title');
const feedbackText = document.getElementById('feedback-text');
const feedbackIcon = document.getElementById('feedback-icon');

const moonIcon = document.getElementById('moon-icon');
const sunIcon = document.getElementById('sun-icon');
const faviconLink = document.getElementById('favicon-link');

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', handleNextBtnAction);
restartBtn.addEventListener('click', restartQuiz);
hintBtn.addEventListener('click', toggleHint);
themeToggle.addEventListener('click', toggleTheme);

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        setLightTheme();
    } else {
        setDarkTheme();
    }
}

function toggleTheme() {
    const isDark = document.body.classList.contains('dark');
    if (isDark) {
        setLightTheme();
        localStorage.setItem('theme', 'light');
    } else {
        setDarkTheme();
        localStorage.setItem('theme', 'dark');
    }
}

function setDarkTheme() {
    document.body.classList.add('dark');
    moonIcon.classList.remove('hidden');
    sunIcon.classList.add('hidden');
    faviconLink.setAttribute('href', 'img/favicon-dark.svg');
}

function setLightTheme() {
    document.body.classList.remove('dark');
    moonIcon.classList.add('hidden');
    sunIcon.classList.remove('hidden');
    faviconLink.setAttribute('href', 'img/favicon.svg');
}

initTheme();

function startQuiz() {
    welcomeScreen.classList.add('hidden');
    welcomeScreen.classList.remove('active');
    quizScreen.classList.remove('hidden');
    quizScreen.classList.add('active');
    loadQuestion();
}

function loadQuestion() {
    isSubmitted = false;
    selectedOptionIdx = null;
    hintBox.classList.remove('show');
    feedbackCard.classList.remove('show');

    const currentQuestion = quizData[currentQuestionIdx];

    questionIndicator.textContent = `Pregunta ${currentQuestionIdx + 1} de ${quizData.length}`;
    questionText.textContent = currentQuestion.question;
    hintText.textContent = currentQuestion.hint;

    optionsContainer.innerHTML = '';
    currentQuestion.options.forEach((option, idx) => {
        const button = document.createElement('button');
        button.className = 'option';
        button.innerHTML = `
            <span class="option-letter">${getLetter(idx)}</span>
            <span class="option-text">${option.text}</span>
        `;
        button.addEventListener('click', () => selectOption(idx, button));
        optionsContainer.appendChild(button);
    });

    nextBtn.disabled = true;
    nextBtn.innerHTML = `
        <span>Comprobar respuesta</span>
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
    `;

    const progressPercent = ((currentQuestionIdx) / quizData.length) * 100;
    progressBar.style.width = `${progressPercent}%`;
}

function selectOption(idx, optionButton) {
    if (isSubmitted) return;

    selectedOptionIdx = idx;
    nextBtn.disabled = false;

    const buttons = optionsContainer.querySelectorAll('.option');
    buttons.forEach((btn, i) => {
        btn.classList.remove('selected', 'disabled');
        if (i === idx) {
            btn.classList.add('selected');
        }
    });
}

function handleNextBtnAction() {
    if (!isSubmitted) {
        checkAnswer();
    } else {
        currentQuestionIdx++;
        if (currentQuestionIdx < quizData.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }
}

function checkAnswer() {
    isSubmitted = true;
    const currentQuestion = quizData[currentQuestionIdx];
    const selectedOption = currentQuestion.options[selectedOptionIdx];

    const buttons = optionsContainer.querySelectorAll('.option');
    buttons.forEach(btn => {
        btn.classList.add('disabled');
        btn.classList.remove('selected');
    });

    buttons.forEach((btn, i) => {
        const isCorrectOption = currentQuestion.options[i].isCorrect;
        const isSelected = i === selectedOptionIdx;
        const letterSpan = btn.querySelector('.option-letter');

        if (isCorrectOption) {
            btn.classList.add('correct');
        } else if (isSelected && !isCorrectOption) {
            btn.classList.add('incorrect');
        }
    });

    feedbackCard.classList.add('show');
    if (selectedOption.isCorrect) {
        score++;
        scoreCounter.textContent = score;
        feedbackCard.classList.remove('incorrect');
        feedbackCard.classList.add('correct');
        feedbackTitle.textContent = "¡Correcto!";
        feedbackIcon.innerHTML = `
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
            </svg>
        `;
    } else {
        feedbackCard.classList.remove('correct');
        feedbackCard.classList.add('incorrect');
        feedbackTitle.textContent = "Incorrecto";
        feedbackIcon.innerHTML = `
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
        `;
    }
    feedbackText.textContent = selectedOption.rationale;

    const isLast = currentQuestionIdx === quizData.length - 1;
    nextBtn.innerHTML = `
        <span>${isLast ? "Ver Resultados" : "Siguiente pregunta"}</span>
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
        </svg>
    `;
}

function showResults() {
    quizScreen.classList.add('hidden');
    quizScreen.classList.remove('active');
    resultScreen.classList.remove('hidden');
    resultScreen.classList.add('active');

    progressBar.style.width = `100%`;

    const percent = Math.round((score / quizData.length) * 100);
    document.getElementById('final-score').textContent = `${score}/${quizData.length}`;
    document.getElementById('final-percent').textContent = `${percent}%`;

    const badgeContainer = document.getElementById('badge-container');
    const resultTitle = document.getElementById('result-title');
    const resultSubtitle = document.getElementById('result-subtitle');

    if (percent === 100) {
        badgeContainer.className = 'badge perfect';
        badgeContainer.innerHTML = `
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
        `;
        resultTitle.textContent = "¡Perfecto! Maestro de Datos";
        resultSubtitle.textContent = "Has contestado de forma impeccable. Ya dominas a la perfección cómo asignar e interpretar tipos de datos en pseudocódigo.";
    } else if (percent >= 70) {
        badgeContainer.className = 'badge excellent';
        badgeContainer.innerHTML = `
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
        `;
        resultTitle.textContent = "¡Excelente trabajo!";
        resultSubtitle.textContent = "Tienes un entendimiento muy sólido sobre los tipos de datos lógicos, numéricos y textuales. ¡Sigue así!";
    } else {
        badgeContainer.className = 'badge good';
        badgeContainer.innerHTML = `
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
        `;
        resultTitle.textContent = "Buen intento";
        resultSubtitle.textContent = "Es un gran comienzo, pero te recomendamos revisar las explicaciones y volver a intentarlo para reforzar tus habilidades algorítmicas.";
    }
}

function restartQuiz() {
    currentQuestionIdx = 0;
    score = 0;
    scoreCounter.textContent = "0";
    resultScreen.classList.add('hidden');
    resultScreen.classList.remove('active');
    quizScreen.classList.remove('hidden');
    quizScreen.classList.add('active');
    loadQuestion();
}

function toggleHint() {
    hintBox.classList.toggle('show');
}

function getLetter(idx) {
    return String.fromCharCode(65 + idx);
}