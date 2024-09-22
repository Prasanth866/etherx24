const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Sample quiz questions
const questions = [
    {
        question: "How often do you create a personal budget?",
        options: ["Never", "Once a year", "Monthly", "Weekly"],
        correct: 2
    },
    {
        question: "What percentage of your income do you save each month?",
        options: ["I don't save", "0-5%", "5-10%", "More than 10%"],
        correct: 3
    },
    // Add more questions here...
];

// Serve quiz questions
app.get('/api/questions', (req, res) => {
    res.json(questions);
});

// Provide personalized feedback based on score
app.post('/api/feedback', (req, res) => {
    const { score, total } = req.body;
    let feedback;

    if (score === total) {
        feedback = "Great job! You have a strong understanding of financial literacy!";
    } else if (score >= total / 2) {
        feedback = "Not bad! But there's still room for improvement.";
    } else {
        feedback = "It looks like you might need to brush up on your financial knowledge. Consider learning more about budgeting and saving.";
    }

    res.json({ feedback });
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});