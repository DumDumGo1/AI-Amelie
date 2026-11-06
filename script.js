
/* ===================================
   SQUISHY WORLD – INTERACTIONS
=================================== */

const questions = [
    {
        question: "Woraus bestehen viele klassische Squishies?",
        answers: ["Holz", "PU-Schaumstoff", "Glas"],
        correct: 1,
        info: "Genau! Viele klassische Squishies bestehen aus Polyurethan-Schaumstoff."
    },
    {
        question: "Was bedeutet Slow Rising?",
        answers: ["Sie leuchten", "Sie wachsen", "Sie kehren langsam in ihre Form zurück"],
        correct: 2,
        info: "Richtig! Sie brauchen eine gewisse Zeit, bis sie wieder ihre Form haben."
    },
    {
        question: "Was kann die Oberfläche eines Squishys beeinflussen?",
        answers: ["Eine Beschichtung", "Die Mondphase", "Die Schuhgrösse"],
        correct: 0,
        info: "Super! Beschichtungen können die Oberfläche verändern."
    },
    {
        question: "Was passiert bei der Herstellung?",
        answers: ["Sie werden aus Glas geblasen", "Sie werden geformt und gestaltet", "Sie wachsen am Baum"],
        correct: 1,
        info: "Richtig! Formen und Gestaltung sind wichtige Produktionsschritte."
    },
    {
        question: "Welches davon ist eine Squishy-Art?",
        answers: ["Jumbo Squishy", "Wasser Squishy", "Stein Squishy"],
        correct: 0,
        info: "Jumbo Squishies sind besonders grosse Modelle!"
    }
];

let currentQuestion = 0;
let answered = false;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const resultElement = document.getElementById("quiz-result");
const nextButton = document.getElementById("next-question");

function showQuestion() {
    answered = false;
    const q = questions[currentQuestion];

    questionElement.textContent = q.question;
    resultElement.textContent = "";
    nextButton.style.display = "none";
    answersElement.innerHTML = "";

    q.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.className = "answer";
        button.textContent = answer;

        button.addEventListener("click", () => {
            if (answered) return;
            answered = true;

            if (index === q.correct) {
                button.classList.add("correct");
                resultElement.textContent = "✨ " + q.info;
            } else {
                button.classList.add("wrong");
                resultElement.textContent =
                    "🍓 Nicht ganz! " + q.info;
                answersElement.children[q.correct].classList.add("correct");
            }

            nextButton.style.display = "inline-block";
        });

        answersElement.appendChild(button);
    });
}

nextButton.addEventListener("click", () => {
    currentQuestion++;

    if (currentQuestion >= questions.length) {
        questionElement.textContent = "Du bist ein Squishy-Profi! 🧸";
        answersElement.innerHTML = "";
        resultElement.textContent = "Danke fürs Mitmachen! ♡";
        nextButton.textContent = "Quiz nochmals starten";
        nextButton.onclick = () => {
            currentQuestion = 0;
            nextButton.textContent = "Nächste Frage →";
            nextButton.onclick = null;
            showQuestion();
        };
        return;
    }

    showQuestion();
});

showQuestion();

/* Kleine Überraschung beim Logo-Klick */

let logoClicks = 0;
document.querySelector(".logo").addEventListener("click", event => {
    event.preventDefault();
    logoClicks++;

    if (logoClicks >= 5) {
        alert("🍓 AMÉLIE'S SECRET SQUISHY CLUB! 🍓");
        logoClicks = 0;
    } else {
        document.querySelector("#home").scrollIntoView({ behavior: "smooth" });
    }
});

/* Schwebende kleine Herzen beim Klicken */

document.addEventListener("click", event => {
    if (event.target.closest("button, a")) return;

    const heart = document.createElement("span");
    heart.textContent = ["💗", "🍓", "✨", "🍬", "☁️"][
        Math.floor(Math.random() * 5)
    ];
    heart.style.position = "fixed";
    heart.style.left = event.clientX + "px";
    heart.style.top = event.clientY + "px";
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "9999";
    heart.style.fontSize = "25px";
    heart.style.animation = "float 1.5s ease-out forwards";

    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1500);
});
