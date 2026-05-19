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

const questionIndicator = document.getElementById('question-indicator');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const scoreCounter = document.getElementById('score-counter');
const progressBar = document.getElementById('progress-bar');

const feedbackCard = document.getElementById('feedback-card');
const feedbackTitle = document.getElementById('feedback-title');
const feedbackText = document.getElementById('feedback-text');
const feedbackIcon = document.getElementById('feedback-icon');

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', handleNextBtnAction);
restartBtn.addEventListener('click', restartQuiz);
hintBtn.addEventListener('click', toggleHint);

function startQuiz() {
    welcomeScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    loadQuestion();
}

function loadQuestion() {
    isSubmitted = false;
    selectedOptionIdx = null;
    hintBox.classList.add('hidden');
    feedbackCard.classList.add('hidden');

    const currentQuestion = quizData[currentQuestionIdx];

    questionIndicator.textContent = `Pregunta ${currentQuestionIdx + 1} de ${quizData.length}`;
    questionText.textContent = currentQuestion.question;
    hintText.textContent = currentQuestion.hint;

    optionsContainer.innerHTML = '';
    currentQuestion.options.forEach((option, idx) => {
        const button = document.createElement('button');
        button.className = `w-full text-left p-4 rounded-2xl border border-slate-700 bg-slate-800/40 hover:bg-slate-700/50 hover:border-slate-600 focus:outline-none option-transition flex items-start gap-3.5 group`;
        button.innerHTML = `
            <span class="w-6 h-6 flex-shrink-0 bg-slate-700 text-slate-300 font-bold rounded-lg text-xs flex items-center justify-center border border-slate-600 group-hover:bg-slate-600 group-hover:text-slate-200 option-transition">${getLetter(idx)}</span>
            <span class="text-slate-300 group-hover:text-slate-100 text-sm sm:text-base font-medium">${option.text}</span>
        `;
        button.addEventListener('click', () => selectOption(idx, button));
        optionsContainer.appendChild(button);
    });

    nextBtn.disabled = true;
    nextBtn.innerHTML = `
        <span>Comprobar respuesta</span>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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

    const buttons = optionsContainer.querySelectorAll('button');
    buttons.forEach((btn, i) => {
        const indicator = btn.querySelector('span');
        if (i === idx) {
            btn.className = `w-full text-left p-4 rounded-2xl border-2 border-indigo-500 bg-indigo-500/10 focus:outline-none option-transition flex items-start gap-3.5`;
            indicator.className = `w-6 h-6 flex-shrink-0 bg-indigo-500 text-white font-bold rounded-lg text-xs flex items-center justify-center`;
        } else {
            btn.className = `w-full text-left p-4 rounded-2xl border border-slate-700 bg-slate-800/40 hover:bg-slate-700/50 hover:border-slate-600 focus:outline-none option-transition flex items-start gap-3.5 group`;
            indicator.className = `w-6 h-6 flex-shrink-0 bg-slate-700 text-slate-300 font-bold rounded-lg text-xs flex items-center justify-center border border-slate-600 group-hover:bg-slate-600 group-hover:text-slate-200 option-transition`;
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

    const buttons = optionsContainer.querySelectorAll('button');
    buttons.forEach(btn => btn.disabled = true);

    buttons.forEach((btn, i) => {
        const isCorrectOption = currentQuestion.options[i].isCorrect;
        const isSelected = i === selectedOptionIdx;
        const indicator = btn.querySelector('span');

        if (isCorrectOption) {
            btn.className = `w-full text-left p-4 rounded-2xl border-2 border-emerald-500 bg-emerald-500/15 focus:outline-none option-transition flex items-start gap-3.5`;
            indicator.className = `w-6 h-6 flex-shrink-0 bg-emerald-500 text-white font-bold rounded-lg text-xs flex items-center justify-center`;
        } else if (isSelected && !isCorrectOption) {
            btn.className = `w-full text-left p-4 rounded-2xl border-2 border-rose-500 bg-rose-500/15 focus:outline-none option-transition flex items-start gap-3.5`;
            indicator.className = `w-6 h-6 flex-shrink-0 bg-rose-500 text-white font-bold rounded-lg text-xs flex items-center justify-center`;
        } else {
            btn.className = `w-full text-left p-4 rounded-2xl border border-slate-800 bg-slate-800/20 opacity-40 focus:outline-none option-transition flex items-start gap-3.5`;
            indicator.className = `w-6 h-6 flex-shrink-0 bg-slate-800 text-slate-600 font-bold rounded-lg text-xs flex items-center justify-center border border-slate-700`;
        }
    });

    feedbackCard.classList.remove('hidden');
    if (selectedOption.isCorrect) {
        score++;
        scoreCounter.textContent = score;
        feedbackCard.className = "mb-6 p-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 flex gap-3";
        feedbackTitle.className = "text-sm font-bold uppercase tracking-wider text-emerald-400";
        feedbackTitle.textContent = "¡Correcto!";
        feedbackIcon.innerHTML = `
            <div class="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
                </svg>
            </div>
        `;
    } else {
        feedbackCard.className = "mb-6 p-4 rounded-2xl border border-rose-500/30 bg-rose-500/10 flex gap-3";
        feedbackTitle.className = "text-sm font-bold uppercase tracking-wider text-rose-400";
        feedbackTitle.textContent = "Incorrecto";
        feedbackIcon.innerHTML = `
            <div class="w-8 h-8 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </div>
        `;
    }
    feedbackText.textContent = selectedOption.rationale;

    const isLast = currentQuestionIdx === quizData.length - 1;
    nextBtn.innerHTML = `
        <span>${isLast ? "Ver Resultados" : "Siguiente pregunta"}</span>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
        </svg>
    `;
}

function showResults() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');

    progressBar.style.width = `100%`;

    const percent = Math.round((score / quizData.length) * 100);
    document.getElementById('final-score').textContent = `${score}/${quizData.length}`;
    document.getElementById('final-percent').textContent = `${percent}%`;

    const badgeContainer = document.getElementById('badge-container');
    const resultTitle = document.getElementById('result-title');
    const resultSubtitle = document.getElementById('result-subtitle');

    if (percent === 100) {
        badgeContainer.className = "w-24 h-24 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto mb-6 border-2 border-amber-500/20 animate-bounce";
        badgeContainer.innerHTML = `
            <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
        `;
        resultTitle.textContent = "🏆 ¡Perfecto! Maestro de Datos";
        resultSubtitle.textContent = "Has contestado de forma impeccable. Ya dominas a la perfección cómo asignar e interpretar tipos de datos en pseudocódigo.";
    } else if (percent >= 70) {
        badgeContainer.className = "w-24 h-24 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-6 border-2 border-emerald-500/20";
        badgeContainer.innerHTML = `
            <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
        `;
        resultTitle.textContent = "🎉 ¡Excelente trabajo!";
        resultSubtitle.textContent = "Tienes un entendimiento muy sólido sobre los tipos de datos lógicos, numéricos y textuales. ¡Sigue así!";
    } else {
        badgeContainer.className = "w-24 h-24 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto mb-6 border-2 border-rose-500/20";
        badgeContainer.innerHTML = `
            <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
        `;
        resultTitle.textContent = "💡 Buen intento";
        resultSubtitle.textContent = "Es un gran comienzo, pero te recomendamos revisar las explicaciones y volver a intentarlo para reforzar tus habilidades algorítmicas.";
    }
}

function restartQuiz() {
    currentQuestionIdx = 0;
    score = 0;
    scoreCounter.textContent = "0";
    resultScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    loadQuestion();
}

function toggleHint() {
    hintBox.classList.toggle('hidden');
}

function getLetter(idx) {
    return String.fromCharCode(65 + idx);
}