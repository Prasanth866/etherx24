const quizContainer = document.getElementById('question-container');
const nextButton = document.getElementById('next-btn');
const resultContainer = document.getElementById('result-container');
const feedbackElement = document.getElementById('feedback');

let currentQuestionIndex = 0;
let score = 0;
let questions = [];

// Fetch questions from the backend
fetch('/api/questions')
    .then(response => response.json())
    .then(data => {
        questions = data;
        showQuestion();
    });

// Display a question
function showQuestion() {
    const question = questions[currentQuestionIndex];
    quizContainer.innerHTML = `
        <p>${question.question}</p>
        ${question.options.map((option, index) => 
            `<label>
                <input type="radio" name="answer" value="${index}">
                ${option}
            </label>`
        ).join('')}
    `;
}

// Handle "Next" button click
nextButton.addEventListener('click', () => {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    
    if (selectedAnswer) {
        const answerValue = parseInt(selectedAnswer.value);
        if (answerValue === questions[currentQuestionIndex].correct) {
            score++;
        }
        
        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    } else {
        alert('Please select an answer.');
    }
});

// Show result and feedback
function showResult() {
    fetch('/api/feedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ score, total: questions.length })
    })
    .then(response => response.json())
    .then(data => {
        quizContainer.classList.add('hidden');
        resultContainer.classList.remove('hidden');
        feedbackElement.innerText = data.feedback;
    });
}