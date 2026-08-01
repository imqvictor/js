const players = JSON.parse(localStorage.getItem('players')) || [];
const nameInput = document.getElementById('nameInput');
const selectCategory = document.getElementById('selectCategory');
const selectDifficulty = document.getElementById('selectDifficulty');
const selectNumber = document.getElementById('selectNumber');
const questionCounter = document.getElementById('questionCounter');
const question = document.getElementById('question');
const time = document.getElementById('time');
const nextQuiz = document.getElementById('nextQuiz');
const quizFinished = document.getElementById('quizFinished');
const name = document.getElementById('name');
let score = document.getElementById('score');
const performance = document.getElementById('performance');
const percentageElement = document.getElementById('percentage');
const playAgainBtn = document.getElementById('playagain')
const startBtn = document.getElementById('startBtn');
const fm1 = document.getElementById('fm1');
let timeLeft = 20;
let timer = null;
let currentPlayerName = "";
let currentCategory = "";
let currentDifficulty = "";

startBtn.addEventListener('click', startQuiz);

function startQuiz() {

    const playerName = nameInput.value.trim();
    if (playerName === "") {
        alert("please eneter name");
        return;
    }

    const quizCategory = selectCategory.value.trim();
    if (quizCategory === "") {
        alert("please select category");
        return;
    }

    const difficulty = selectDifficulty.value.trim();
    if (difficulty === "") {
        alert("please select the difficulty");
        return;
    }

    const nOfQuiz = selectNumber.value.trim();
    if (nOfQuiz === "") {
        alert("please select a number");
        return;
    }

    currentPlayerName = playerName;
    currentCategory = quizCategory;
    currentDifficulty = difficulty;

    nameInput.value = "";
    selectCategory.value = "";
    selectDifficulty.value = "";
    selectNumber.value = "";


    document.querySelector('.start-screen').hidden = true;
    document.querySelector('.quiz-screen').hidden = false;

    currentQuestionIndex = 0;
    playerScore = 0;
    displayQuestions();

}

const questions = [
    {
        question: "What is the capital of Kenya?",
        options: ["Nairobi", "Kampala", "Dodoma", "Kigali"],
        answer: "Nairobi"
    },
    {
        question: "Which language runs in the browser?",
        options: ["Java", "Python", "JavaScript", "C#"],
        answer: "JavaScript"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Venus", "Jupiter"],
        answer: "Mars"
    }
];

let currentQuestionIndex = 0;
let playerScore = 0;


function displayQuestions() {
    nextQuiz.disabled = false;
    const current = questions[currentQuestionIndex];

    question.textContent = current.question;
    questionCounter.textContent = `Question ${currentQuestionIndex + 1} out of ${questions.length}`;

    fm1.innerHTML = "";

    current.options.forEach((questionOption, index) => {
        const inputRadio = document.createElement('input');
        inputRadio.type = 'radio';
        inputRadio.name = 'quizOptions';
        inputRadio.id = `options${index}`;
        inputRadio.value = questionOption;

        const label = document.createElement('label');
        label.htmlFor = `options${index}`;
        label.textContent = questionOption;


        fm1.appendChild(inputRadio);
        fm1.appendChild(label);
        fm1.appendChild(document.createElement('br'));
    })
    startTimer();
}


nextQuiz.addEventListener('click', nextQuestion);

function nextQuestion(timeExpired = false) {

    const selectedOption = document.querySelector('input[name=quizOptions]:checked');


    if (!selectedOption && !timeExpired) {
        alert("please select an option");
        return;
    }

    nextQuiz.disabled = true;
    clearInterval(timer);

    const current = questions[currentQuestionIndex];

    if (selectedOption && selectedOption.value === current.answer) {
        playerScore++;
    }
    currentQuestionIndex++;

    const percentage = (playerScore / questions.length) * 100;
    const percentageNum = Math.floor(percentage);
    console.log(score);

    if (currentQuestionIndex < questions.length) {
        displayQuestions();
    } else {
        document.querySelector('.quiz-screen').hidden = true;
        document.querySelector('.result-screen').hidden = false;


        score.textContent = `${playerScore}/${questions.length}`;
        percentageElement.textContent = `${percentageNum}%`;

        //perfomance


        const player = {
            name: currentPlayerName,
            category: currentCategory,
            difficulty: currentDifficulty,
            score: playerScore,
            totalQuestions: questions.length,
            percentage: percentageNum,
            date: new Date().toLocaleDateString()
        };
        players.push(player);
        localStorage.setItem('players', JSON.stringify(players));

    }

}

playAgainBtn.addEventListener('click', () => {
    currentQuestionIndex = 0;
    playerScore = 0;


    document.querySelector('.start-screen').hidden = false;
    document.querySelector('.result-screen').hidden = true;

});

function startTimer() {
    clearInterval(timer);

    timeLeft = 20;
    time.textContent = `${timeLeft}s`;

    timer = setInterval(() => {
        timeLeft--;
        time.textContent = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            nextQuiz.disabled = true;
            clearInterval(timer);
            nextQuestion(true);
        }
    }, 1000);
}
