const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Mars"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Mark Twain", "William Shakespeare", "Charles Dickens", "Jane Austen"],
        answer: "William Shakespeare"
    },
    {
        question: "WHAT SHAPE IS THIS?",
        image: "https://i.ibb.co/tLB8QdN/coned.webp", // New image for the question
        options: ["Triangle", "Cylinder", "Cone", "Rectangle"],
        answer: "Cone"
    }
];

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const currentQuestion = questions[currentQuestionIndex];

    // Clear previous content
    questionElement.innerHTML = "";
    optionsElement.innerHTML = "";

    // Display question text
    questionElement.innerText = currentQuestion.question;

    // Check if there is an image and display it
    if (currentQuestion.image) {
        const img = document.createElement("img");
        img.src = currentQuestion.image;
        img.alt = "Question Image";
        img.className = "question-image";
        questionElement.appendChild(img);
    }

    // Create option buttons
    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.className = "option";
        button.onclick = () => selectOption(option);
        optionsElement.appendChild(button);
    });

    document.getElementById("next").classList.add("hidden");
}

function selectOption(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    const options = document.querySelectorAll(".option");

    options.forEach(option => {
        option.disabled = true;
        if (option.innerText === currentQuestion.answer) {
            option.classList.add("correct");
        } else if (option.innerText === selectedOption) {
            option.classList.add("wrong");
        }
    });

    if (selectedOption === currentQuestion.answer) {
        score++;
    }

    document.getElementById("next").classList.remove("hidden");
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    const resultElement = document.getElementById("result");
    resultElement.innerText = `Your score: ${score} out of ${questions.length}`;
    resultElement.classList.remove("hidden");
    document.getElementById("quiz-box").classList.add("hidden");
    document.getElementById("restart").classList.remove("hidden");
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("result").classList.add("hidden");
    document.getElementById("quiz-box").classList.remove("hidden");
    document.getElementById("restart").classList.add("hidden");
    loadQuestion();
}

loadQuestion();
