// Quiz Questions

const questions = [

    {
        question: "What does HTML stand for?",

        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyper Tool Markup Language",
            "Home Tool Markup Language"
        ],

        answer: "Hyper Text Markup Language"
    },


    {
        question: "Which language is used to style a webpage?",

        options: [
            "HTML",
            "CSS",
            "Python",
            "SQL"
        ],

        answer: "CSS"
    },


    {
        question: "Which language is used to add interactivity to webpages?",

        options: [
            "HTML",
            "CSS",
            "JavaScript",
            "SQL"
        ],

        answer: "JavaScript"
    },


    {
        question: "Which keyword is used to declare a variable in JavaScript?",

        options: [
            "var",
            "variable",
            "int",
            "string"
        ],

        answer: "var"
    },


    {
        question: "Which method adds an item to the end of an array?",

        options: [
            "push()",
            "pop()",
            "shift()",
            "remove()"
        ],

        answer: "push()"
    },


    {
        question: "Which method is used to select an HTML element by ID?",

        options: [
            "getElementById()",
            "getElement()",
            "selectById()",
            "findId()"
        ],

        answer: "getElementById()"
    },


    {
        question: "Which symbol is used for a single-line comment in JavaScript?",

        options: [
            "//",
            "/* */",
            "#",
            "<!-- -->"
        ],

        answer: "//"
    },


    {
        question: "Which data structure stores multiple values in JavaScript?",

        options: [
            "Array",
            "String",
            "Number",
            "Boolean"
        ],

        answer: "Array"
    },


    {
        question: "Which function converts a string to an integer?",

        options: [
            "parseInt()",
            "parseString()",
            "toInteger()",
            "integer()"
        ],

        answer: "parseInt()"
    },


    {
        question: "Which browser storage can store data locally?",

        options: [
            "localStorage",
            "sessionFile",
            "browserData",
            "webMemory"
        ],

        answer: "localStorage"
    }

];


// Get HTML elements

const quizSection =
    document.getElementById("quizSection");

const resultSection =
    document.getElementById("resultSection");

const questionNumber =
    document.getElementById("questionNumber");

const questionElement =
    document.getElementById("question");

const optionsElement =
    document.getElementById("options");

const nextButton =
    document.getElementById("nextButton");

const timerElement =
    document.getElementById("timer");

const finalScore =
    document.getElementById("finalScore");

const resultMessage =
    document.getElementById("resultMessage");

const restartButton =
    document.getElementById("restartButton");


// Quiz variables

let currentQuestion = 0;

let score = 0;

let selectedAnswer = "";

let timeLeft = 30;

let timer;


// Start quiz

startQuiz();


// Start quiz function

function startQuiz() {

    currentQuestion = 0;

    score = 0;

    selectedAnswer = "";

    timeLeft = 30;


    quizSection.style.display = "block";

    resultSection.style.display = "none";


    startTimer();

    showQuestion();

}


// Show question

function showQuestion() {

    selectedAnswer = "";

    optionsElement.innerHTML = "";


    const current =
        questions[currentQuestion];


    questionNumber.textContent =
        "Question " +
        (currentQuestion + 1) +
        "/" +
        questions.length;


    questionElement.textContent =
        current.question;


    current.options.forEach(
        function(option) {

            const optionElement =
                document.createElement("div");


            optionElement.textContent =
                option;


            optionElement.className =
                "option";


            optionElement.addEventListener(
                "click",
                function() {

                    selectOption(
                        optionElement,
                        option
                    );

                }
            );


            optionsElement.appendChild(
                optionElement
            );

        }
    );

}


// Select option

function selectOption(
    optionElement,
    option
) {

    // Remove previous selection

    const allOptions =
        document.querySelectorAll(".option");


    allOptions.forEach(
        function(item) {

            item.classList.remove("selected");

        }
    );


    // Select clicked option

    optionElement.classList.add("selected");


    selectedAnswer = option;

}


// Next button

nextButton.addEventListener(
    "click",
    function() {

        if (selectedAnswer === "") {

            alert("Please select an answer.");

            return;

        }


        // Check answer

        if (
            selectedAnswer ===
            questions[currentQuestion].answer
        ) {

            score++;

        }


        // Move to next question

        currentQuestion++;


        // Check if quiz is finished

        if (
            currentQuestion >=
            questions.length
        ) {

            endQuiz();

        } else {

            showQuestion();

        }

    }
);


// Start timer

function startTimer() {

    clearInterval(timer);


    timerElement.textContent =
        "Time: " + timeLeft;


    timer =
        setInterval(
            function() {

                timeLeft--;


                timerElement.textContent =
                    "Time: " + timeLeft;


                if (timeLeft <= 0) {

                    clearInterval(timer);

                    endQuiz();

                }

            },
            1000
        );

}


// End quiz

function endQuiz() {

    clearInterval(timer);


    quizSection.style.display = "none";

    resultSection.style.display = "block";


    finalScore.textContent =
        "Score: " +
        score +
        "/" +
        questions.length;


    if (
        score >= 8
    ) {

        resultMessage.textContent =
            "Excellent! 🎉";

    } else if (
        score >= 5
    ) {

        resultMessage.textContent =
            "Good Job! 👍";

    } else {

        resultMessage.textContent =
            "Keep Practicing! 💪";

    }

}


// Restart quiz

restartButton.addEventListener(
    "click",
    function() {

        startQuiz();

    }
);