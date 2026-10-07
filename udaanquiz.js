const questions = [

    {
        question: "What does HTML stand for?",

        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlinks Text Mark Language",
            "Home Tool Markup Language"
        ],

        answer: 0
    },

    {
        question: "Which language is used for styling web pages?",

        options: [
            "HTML",
            "CSS",
            "Python",
            "Java"
        ],

        answer: 1
    },

    {
        question: "Which language is used to make websites interactive?",

        options: [
            "CSS",
            "HTML",
            "JavaScript",
            "SQL"
        ],

        answer: 2
    }

];


let currentQuestion = 0;
let score = 0;


function loadQuestion() {

    const q =
        questions[currentQuestion];

    document.getElementById("question")
        .textContent = q.question;

    const options =
        document.getElementById("options");

    options.innerHTML = "";

    q.options.forEach(
        (option, index) => {

            const button =
                document.createElement("button");

            button.textContent = option;

            button.onclick = function () {

                if (index === q.answer) {
                    score++;
                    alert("✅ Correct!");
                } else {
                    alert("❌ Wrong answer!");
                }

            };

            options.appendChild(button);
        }
    );
}


function nextQuestion() {

    currentQuestion++;

    if (
        currentQuestion >=
        questions.length
    ) {

        document.getElementById(
            "quizResult"
        ).textContent =
            `🎉 Quiz completed! Score: ${score}/${questions.length}`;

        currentQuestion = 0;
        score = 0;

        return;
    }

    loadQuestion();
}


document.addEventListener(
    "DOMContentLoaded",
    loadQuestion
);