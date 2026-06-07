// Domande del test di italiano - Livello Base
const questions = [
    {
        type: 'completion',
        text: 'Completa la frase: "Ciao, mi chiamo _______"',
        options: ['Marco', 'Maria', 'Giulia', 'Luca'],
        correctAnswer: 0,
        difficultWords: []
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
        text: 'Clicca sul bottone "Traduci" per scoprire le traduzioni in tedesco:',
        pairs: [
            { german: 'Liebe', italian: 'Amore', difficulty: true },
            { german: 'Haus', italian: 'Casa', difficulty: false },
            { german: 'Freund', italian: 'Amico', difficulty: false }
        ],
        difficultWords: []
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
        correctAnswer: 1,
        difficultWords: []
    },
    {
        type: 'multipleChoice',
        text: 'Quale di queste parole significa "amore" in italiano?',
        options: [
            'Acqua',
            'Amore',
            'Tempo',
            'Sole'
        ],
        correctAnswer: 1,
        difficultWords: []
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
        text: 'Completa: "Ti piace ___________?" (la città con il Colosseo)',
        options: ['Roma', 'Milano', 'Venezia'],
        correctAnswer: 0,
        difficultWords: []
    }
];

let currentQuestion = 0;
let answers = [];
let questionAnswered = [];

// Inizializzazione
document.addEventListener('DOMContentLoaded', function() {
    // Inizializza array delle risposte
    answers = new Array(questions.length).fill(null);
    questionAnswered = new Array(questions.length).fill(false);
    
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

    // Aggiorna progresso
    updateProgressBar();

    // Crea contenitore domanda
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question';

    // Numero domanda
    const numberSpan = document.createElement('span');
    numberSpan.className = 'question-number';
    numberSpan.textContent = `Domanda ${questionNumber} di ${questions.length}`;
    questionDiv.appendChild(numberSpan);

    // Testo domanda
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

    // Aggiungi parole difficili se presenti
    if (question.difficultWords && question.difficultWords.length > 0 && question.type !== 'translation') {
        renderDifficultWords(questionDiv, question.difficultWords);
    }

    quizContainer.appendChild(questionDiv);
    updateButtons();
}

function renderCompletion(container, question) {
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'completion-input';
    input.placeholder = 'Scrivi la tua risposta...';
    input.value = answers[currentQuestion] !== null ? answers[currentQuestion] : '';

    input.addEventListener('input', (e) => {
        answers[currentQuestion] = e.target.value;
    });

    container.appendChild(input);
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

        btn.addEventListener('click', (e) => {
            // Rimuovi selezione da tutti i bottoni
            optionsDiv.querySelectorAll('.option-btn').forEach(b => {
                b.classList.remove('selected');
            });
            // Aggiungi selezione al bottone cliccato
            btn.classList.add('selected');
            answers[currentQuestion] = index;
        });

        optionsDiv.appendChild(btn);
    });

    container.appendChild(optionsDiv);
}

function renderTranslation(container, question) {
    const section = document.createElement('div');
    section.className = 'translation-section';

    const title = document.createElement('p');
    title.className = 'translation-title';
    title.textContent = question.text;
    section.appendChild(title);

    question.pairs.forEach((pair, index) => {
        const item = document.createElement('div');
        item.className = 'translation-item';

        const german = document.createElement('span');
        german.className = 'italian-word';
        german.textContent = pair.german;
        
        if (pair.difficulty) {
            german.style.color = '#FF6B9D';
        }

        const btn = document.createElement('button');
        btn.className = 'translate-btn';
        btn.textContent = '🔍 Traduci';

        const translation = document.createElement('span');
        translation.className = 'german-translation';
        translation.textContent = pair.italian;

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            translation.classList.toggle('show');
            btn.textContent = translation.classList.contains('show') ? '🙈 Nascondi' : '🔍 Traduci';
        });

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
    title.className = 'translation-title';
    title.textContent = '📚 Parole difficili - Traduzioni in tedesco';
    section.appendChild(title);

    words.forEach((word) => {
        const item = document.createElement('div');
        item.className = 'translation-item';

        const wordSpan = document.createElement('span');
        wordSpan.className = 'italian-word';
        wordSpan.textContent = word;

        const btn = document.createElement('button');
        btn.className = 'translate-btn';
        btn.textContent = '🔍 Traduci';

        const translation = document.createElement('span');
        translation.className = 'german-translation';
        translation.textContent = getGermanTranslation(word);

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            translation.classList.toggle('show');
            btn.textContent = translation.classList.contains('show') ? '🙈 Nascondi' : '🔍 Traduci';
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
        'famoso': 'Berühmte',
        'amore': 'Liebe',
        'casa': 'Haus',
        'amico': 'Freund',
        'acqua': 'Wasser',
        'tempo': 'Zeit'
    };

    return translations[word.toLowerCase()] || '❓ Non trovata';
}

function updateProgressBar() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('progressText').textContent = `Domanda ${currentQuestion + 1} di ${questions.length}`;
}

function updateButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    prevBtn.style.display = currentQuestion > 0 ? 'block' : 'none';

    if (currentQuestion === questions.length - 1) {
        nextBtn.textContent = '✓ Completa il Test';
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
            if (answers[index] === question.correctAnswer) {
                score++;
            }
        }
    });

    const percentage = Math.round((score / questions.length) * 100);
    
    let message = '';
    let emoji = '';
    
    if (percentage >= 80) {
        message = '🌟 Ottimo! Sei pronto per il tuo love trip!';
        emoji = '❤️';
    } else if (percentage >= 60) {
        message = '😊 Bene! Continua a praticare!';
        emoji = '💪';
    } else {
        message = '📚 Continua a imparare e riprova!';
        emoji = '🎓';
    }

    const resultDetails = document.getElementById('resultDetails');
    resultDetails.innerHTML = `
        <p style="font-size: 3em; margin-bottom: 20px;">${emoji}</p>
        <p>Hai ottenuto <strong>${score} su ${questions.length}</strong> risposte corrette! 🎯</p>
        <p style="font-size: 1.5em; margin: 20px 0; color: #FF6B9D;"><strong>${percentage}%</strong></p>
        <p style="margin-top: 25px; font-size: 1.15em;">${message}</p>
    `;

    document.getElementById('results-modal').classList.remove('hidden');
    document.querySelector('.container').style.display = 'none';
}
