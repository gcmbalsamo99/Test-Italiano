// Domande del test di italiano - Livello Base
const questions = [
    {
        type: 'completion',
        text: 'Completa la frase: "Ciao, mi chiamo _______"',
        answer: ['Marco', 'Maria', 'Giulia', 'Luca'],
        correctAnswer: 0,
        hint: 'Un nome italiano comune'
    },
    {
        type: 'multipleChoice',
        text: 'Qual è il colore della bandiera italiana?',
        options: [
            'Rosso, bianco e blu',
            'Rosso, bianco e verde',
            'Blu, bianco e verde',
            'Rosso e bianco'
        ],
        correctAnswer: 1,
        difficultWords: ['bandiera']
    },
    {
        type: 'translation',
        text: 'Traduci dal tedesco all\'italiano:',
        pairs: [
            { german: 'Liebe', italian: 'amore', difficulty: true },
            { german: 'Haus', italian: 'casa', difficulty: false },
            { german: 'Freund', italian: 'amico', difficulty: false }
        ]
    },
    {
        type: 'completion',
        text: 'Completa: "Vorrei un caffè _______ per favore"',
        options: ['caldo', 'freddo', 'tiepido'],
        correctAnswer: 0,
        difficultWords: ['caffè']
    },
    {
        type: 'multipleChoice',
        text: 'Come si saluta formalmente in italiano?',
        options: [
            'Ciao!',
            'Buongiorno!',
            'Hey!',
            'Yo!'
        ],
        correctAnswer: 1
    },
    {
        type: 'translation',
        text: 'Quale parola significa "amore" in italiano?',
        pairs: [
            { german: 'Wasser', italian: 'acqua', difficulty: false },
            { german: 'Liebe', italian: 'amore', difficulty: true },
            { german: 'Zeit', italian: 'tempo', difficulty: false }
        ]
    },
    {
        type: 'multipleChoice',
        text: 'Qual è il piatto italiano più famoso nel mondo?',
        options: [
            'Pizza',
            'Hamburger',
            'Sushi',
            'Tacos'
        ],
        correctAnswer: 0,
        difficultWords: ['piatto', 'famoso']
    },
    {
        type: 'completion',
        text: 'Completa: "Ti piace l\'___________?" (il luogo con il Colosseo)',
        options: ['Roma', 'Milano', 'Venezia'],
        correctAnswer: 0
    }
];

let currentQuestion = 0;
let answers = [];
let scores = 0;

document.addEventListener('DOMContentLoaded', function() {
    displayQuestion();
    setupEventListeners();
});

function setupEventListeners() {
    document.getElementById('nextBtn').addEventListener('click', nextQuestion);
    document.getElementById('prevBtn').addEventListener('click', previousQuestion);
}

function displayQuestion() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '';

    const question = questions[currentQuestion];
    const questionNumber = currentQuestion + 1;

    // Aggiorna la barra di progresso
    updateProgressBar();

    // Crea l'elemento della domanda
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question';

    const numberSpan = document.createElement('span');
    numberSpan.className = 'question-number';
    numberSpan.textContent = `Domanda ${questionNumber} di ${questions.length}`;
    questionDiv.appendChild(numberSpan);

    const questionText = document.createElement('h3');
    questionText.textContent = question.text;
    questionDiv.appendChild(questionText);

    // Renderizza il tipo di domanda
    if (question.type === 'completion') {
        renderCompletion(questionDiv, question);
    } else if (question.type === 'multipleChoice') {
        renderMultipleChoice(questionDiv, question);
    } else if (question.type === 'translation') {
        renderTranslation(questionDiv, question);
    }

    quizContainer.appendChild(questionDiv);

    // Aggiorna i pulsanti
    updateButtons();
}

function renderCompletion(container, question) {
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'completion-input';
    input.placeholder = 'Scrivi la tua risposta...';
    input.value = answers[currentQuestion] || '';

    input.addEventListener('input', (e) => {
        answers[currentQuestion] = e.target.value;
    });

    container.appendChild(input);

    // Aggiungi parole difficili se presenti
    if (question.difficultWords) {
        renderDifficultWords(container, question.difficultWords);
    }
}

function renderMultipleChoice(container, question) {
    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'options';

    question.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;

        if (answers[currentQuestion] === index) {
            btn.classList.add('selected');
        }

        btn.addEventListener('click', () => {
            document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            answers[currentQuestion] = index;
        });

        optionsDiv.appendChild(btn);
    });

    container.appendChild(optionsDiv);

    // Aggiungi parole difficili se presenti
    if (question.difficultWords) {
        renderDifficultWords(container, question.difficultWords);
    }
}

function renderTranslation(container, question) {
    const section = document.createElement('div');
    section.className = 'translation-section';

    question.pairs.forEach((pair, index) => {
        const item = document.createElement('div');
        item.className = 'translation-item';

        const german = document.createElement('span');
        german.className = 'italian-word';
        german.textContent = pair.german;

        const btn = document.createElement('button');
        btn.className = 'translate-btn';
        btn.textContent = 'Traduci';

        const translation = document.createElement('span');
        translation.className = 'german-translation';
        translation.textContent = pair.italian;

        btn.addEventListener('click', () => {
            translation.classList.toggle('show');
            btn.textContent = translation.classList.contains('show') ? 'Nascondi' : 'Traduci';
        });

        // Evidenzia le parole difficili
        if (pair.difficulty) {
            german.style.fontWeight = 'bold';
            german.style.color = '#764ba2';
        }

        item.appendChild(german);
        item.appendChild(btn);
        item.appendChild(translation);
        section.appendChild(item);
    });

    container.appendChild(section);
}

function renderDifficultWords(container, words) {
    const section = document.createElement('div');
    section.className = 'translation-section';
    section.style.marginTop = '20px';

    const title = document.createElement('p');
    title.style.fontWeight = 'bold';
    title.style.marginBottom = '15px';
    title.textContent = '📚 Parole difficili (clicca per la traduzione in tedesco):';
    section.appendChild(title);

    words.forEach((word) => {
        const item = document.createElement('div');
        item.className = 'translation-item';

        const wordSpan = document.createElement('span');
        wordSpan.className = 'italian-word';
        wordSpan.textContent = word;
        wordSpan.style.cursor = 'pointer';

        const btn = document.createElement('button');
        btn.className = 'translate-btn';
        btn.textContent = 'Traduci';

        const translation = document.createElement('span');
        translation.className = 'german-translation';
        translation.textContent = getGermanTranslation(word);

        btn.addEventListener('click', () => {
            translation.classList.toggle('show');
            btn.textContent = translation.classList.contains('show') ? 'Nascondi' : 'Traduci';
        });

        item.appendChild(wordSpan);
        item.appendChild(btn);
        item.appendChild(translation);
        section.appendChild(item);
    });

    container.appendChild(section);
}

function getGermanTranslation(word) {
    const translations = {
        'bandiera': 'Flagge',
        'caffè': 'Kaffee',
        'piatto': 'Gericht',
        'famoso': 'berühmt',
        'amore': 'Liebe',
        'casa': 'Haus',
        'amico': 'Freund',
        'acqua': 'Wasser',
        'tempo': 'Zeit'
    };

    return translations[word.toLowerCase()] || 'Traduzione non disponibile';
}

function updateProgressBar() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
}

function updateButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    prevBtn.style.display = currentQuestion > 0 ? 'block' : 'none';

    if (currentQuestion === questions.length - 1) {
        nextBtn.textContent = 'Completa il Test ✓';
    } else {
        nextBtn.textContent = 'Avanti →';
    }
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        displayQuestion();
    } else {
        showResults();
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
    }
}

function showResults() {
    // Calcola il punteggio
    let score = 0;
    questions.forEach((question, index) => {
        if (question.type === 'completion' || question.type === 'multipleChoice') {
            if (answers[index] === question.correctAnswer || 
                (typeof question.correctAnswer === 'object' && question.correctAnswer.includes(answers[index]))) {
                score++;
            }
        }
    });

    const percentage = Math.round((score / questions.length) * 100);

    const resultDetails = document.getElementById('resultDetails');
    resultDetails.innerHTML = `
        <p>Hai ottenuto <strong>${score} su ${questions.length}</strong> risposte corrette!</p>
        <p>Percentuale: <strong>${percentage}%</strong></p>
        <p style="margin-top: 20px; font-size: 1.1em;">
            ${percentage >= 80 ? '🌟 Ottimo! Sei pronto per il tuo love trip!' :
              percentage >= 60 ? '😊 Bene! Continua a praticare!' :
              '📚 Continua a imparare e riprova!'}
        </p>
    `;

    document.getElementById('results').classList.remove('results-hidden');
    document.getElementById('quiz-container').style.display = 'none';
    document.querySelector('.button-group').style.display = 'none';
}
