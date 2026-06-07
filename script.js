// Domande del test di italiano - Livello Base
const questions = [
    {
        type: 'openText',
        text: 'Domanda 1 - Risposta aperta: Descrivi in 2-3 frasi perché ami l\'Italia.',
        placeholder: 'Scrivi la tua risposta...',
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
        type: 'fillBlanks',
        text: 'Completa il testo con le parole giuste:',
        textContent: 'Mi piace molto visitare l\'Italia. La <span class="highlight-word" data-blank="0">bandiera</span> italiana è bellissima! Quando vado a Roma, visito il <span class="highlight-word" data-blank="1">Colosseo</span>. In Italia mangio molta <span class="highlight-word" data-blank="2">pizza</span> con i miei <span class="highlight-word" data-blank="3">amici</span>.',
        blanks: [
            { index: 0, options: ['bandiera', 'bandire', 'banca'], correct: 0 },
            { index: 1, options: ['Colosseo', 'Castello', 'Colle'], correct: 0 },
            { index: 2, options: ['pasta', 'pizza', 'piazza'], correct: 1 },
            { index: 3, options: ['amore', 'amici', 'ammici'], correct: 1 }
        ],
        difficultWords: []
    },
    {
        type: 'binaryChoice',
        text: 'Haiyang è una ragazza dolce ma anche:',
        options: ['Stupida', 'Intelligente'],
        correctAnswer: 1,
        difficultWords: []
    },
    {
        type: 'multipleChoice',
        text: 'Quale frase è corretta in italiano?',
        options: [
            'Io amo pizza',
            'Io amo la pizza',
            'Io amo di pizza',
            'Amo io pizza'
        ],
        correctAnswer: 1,
        difficultWords: []
    },
    {
        type: 'matching',
        text: 'Collega le parole in tedesco con le loro traduzioni italiane:',
        pairs: [
            { german: 'Flagge', italian: 'bandiera' },
            { german: 'Haus', italian: 'casa' },
            { german: 'Liebe', italian: 'amore' },
            { german: 'Kolosseum', italian: 'Colosseo' },
            { german: 'Pizza', italian: 'pizza' }
        ],
        difficultWords: []
    },
    {
        type: 'comprehension',
        text: 'Leggi il testo e rispondi alle domande:',
        textContent: 'Roma è la capitale d\'Italia ed è una città molto bella e antica. I turisti visitano Roma ogni anno per vedere il Colosseo, il Vaticano e la Fontana di Trevi. La gente italiana è molto amichevole e ama condividere il cibo con la famiglia e gli amici.',
        questions: [
            {
                question: 'Qual è la capitale d\'Italia?',
                options: ['Venezia', 'Roma', 'Milano', 'Firenze'],
                correctAnswer: 1
            },
            {
                question: 'Quali monumenti visitano i turisti a Roma?',
                options: [
                    'Il Big Ben e il Ponte di Londra',
                    'La Torre Eiffel',
                    'Il Colosseo e la Fontana di Trevi',
                    'Il Duomo di Milano'
                ],
                correctAnswer: 2
            }
        ],
        difficultWords: []
    },
    {
        type: 'multipleChoice',
        text: 'Quali sono i numeri da 1 a 3 in italiano?',
        options: [
            'Un, due, tre',
            'Uno, due, tre',
            'Una, due, tre',
            'Uno, duos, tre'
        ],
        correctAnswer: 1,
        difficultWords: []
    }
];

let currentQuestion = 0;
let answers = [];
let questionAnswered = [];

document.addEventListener('DOMContentLoaded', function() {
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

    updateProgressBar();

    const questionDiv = document.createElement('div');
    questionDiv.className = 'question';

    const numberSpan = document.createElement('span');
    numberSpan.className = 'question-number';
    numberSpan.textContent = `Domanda ${questionNumber} di ${questions.length}`;
    questionDiv.appendChild(numberSpan);

    const questionText = document.createElement('h3');
    questionText.textContent = question.text;
    questionDiv.appendChild(questionText);

    if (question.type === 'openText') {
        renderOpenText(questionDiv, question);
    } else if (question.type === 'multipleChoice') {
        renderMultipleChoice(questionDiv, question);
    } else if (question.type === 'fillBlanks') {
        renderFillBlanks(questionDiv, question);
    } else if (question.type === 'binaryChoice') {
        renderBinaryChoice(questionDiv, question);
    } else if (question.type === 'matching') {
        renderMatching(questionDiv, question);
    } else if (question.type === 'comprehension') {
        renderComprehension(questionDiv, question);
    }

    if (question.difficultWords && question.difficultWords.length > 0) {
        renderDifficultWords(questionDiv, question.difficultWords);
    }

    quizContainer.appendChild(questionDiv);
    updateButtons();
}

function renderOpenText(container, question) {
    const textarea = document.createElement('textarea');
    textarea.className = 'completion-input';
    textarea.placeholder = question.placeholder;
    textarea.style.minHeight = '120px';
    textarea.style.resize = 'vertical';
    textarea.value = answers[currentQuestion] !== null ? answers[currentQuestion] : '';

    textarea.addEventListener('input', (e) => {
        answers[currentQuestion] = e.target.value;
    });

    container.appendChild(textarea);
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
            optionsDiv.querySelectorAll('.option-btn').forEach(b => {
                b.classList.remove('selected');
            });
            btn.classList.add('selected');
            answers[currentQuestion] = index;
        });

        optionsDiv.appendChild(btn);
    });

    container.appendChild(optionsDiv);
}

function renderFillBlanks(container, question) {
    const textDiv = document.createElement('div');
    textDiv.className = 'highlighted-text';
    textDiv.innerHTML = question.textContent;
    container.appendChild(textDiv);

    if (!answers[currentQuestion]) {
        answers[currentQuestion] = {};
    }

    const section = document.createElement('div');
    section.className = 'translation-section';
    section.style.marginTop = '20px';

    const title = document.createElement('p');
    title.className = 'translation-title';
    title.textContent = 'Scegli le parole giuste per gli spazi:';
    section.appendChild(title);

    question.blanks.forEach((blank) => {
        const item = document.createElement('div');
        item.className = 'translation-item';

        const label = document.createElement('span');
        label.className = 'italian-word';
        label.textContent = `Spazio ${blank.index + 1}:`;

        const select = document.createElement('select');
        select.className = 'dialog-select';
        select.value = answers[currentQuestion][blank.index] !== undefined ? answers[currentQuestion][blank.index] : '';

        const emptyOption = document.createElement('option');
        emptyOption.value = '';
        emptyOption.textContent = 'Scegli...';
        select.appendChild(emptyOption);

        blank.options.forEach((opt, optIndex) => {
            const option = document.createElement('option');
            option.value = optIndex;
            option.textContent = opt;
            select.appendChild(option);
        });

        select.addEventListener('change', (e) => {
            answers[currentQuestion][blank.index] = parseInt(e.target.value);
        });

        item.appendChild(label);
        item.appendChild(select);
        section.appendChild(item);
    });

    container.appendChild(section);
}

function renderBinaryChoice(container, question) {
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
            optionsDiv.querySelectorAll('.option-btn').forEach(b => {
                b.classList.remove('selected');
            });
            btn.classList.add('selected');
            answers[currentQuestion] = index;
        });

        optionsDiv.appendChild(btn);
    });

    container.appendChild(optionsDiv);
}

function renderMatching(container, question) {
    if (!answers[currentQuestion]) {
        answers[currentQuestion] = {};
    }

    const matchingDiv = document.createElement('div');
    matchingDiv.className = 'matching-container';

    const leftCol = document.createElement('div');
    leftCol.className = 'matching-column left';

    const rightCol = document.createElement('div');
    rightCol.className = 'matching-column right';

    const title1 = document.createElement('div');
    title1.className = 'matching-title';
    title1.textContent = '🇩🇪 Tedesco';
    leftCol.appendChild(title1);

    const title2 = document.createElement('div');
    title2.className = 'matching-title';
    title2.textContent = '🇮🇹 Italiano';
    rightCol.appendChild(title2);

    // Shuffle Italian options
    const shuffledItalian = [...question.pairs].sort(() => Math.random() - 0.5);

    question.pairs.forEach((pair, index) => {
        const germantItem = document.createElement('div');
        germantItem.className = 'matching-item german-item';
        germantItem.textContent = pair.german;
        germantItem.setAttribute('data-german-index', index);
        leftCol.appendChild(germantItem);
    });

    shuffledItalian.forEach((pair, index) => {
        const italianItem = document.createElement('div');
        italianItem.className = 'matching-item italian-item';
        italianItem.textContent = pair.italian;
        italianItem.setAttribute('data-italian-index', index);
        italianItem.setAttribute('data-correct-german', question.pairs.findIndex(p => p.italian === pair.italian));
        italianItem.addEventListener('click', (e) => {
            document.querySelectorAll('.italian-item.connected').forEach(el => {
                el.classList.remove('connected');
            });
            italianItem.classList.add('connected');
            answers[currentQuestion][italianItem.getAttribute('data-correct-german')] = index;
        });
        rightCol.appendChild(italianItem);
    });

    matchingDiv.appendChild(leftCol);
    matchingDiv.appendChild(rightCol);
    container.appendChild(matchingDiv);
}

function renderComprehension(container, question) {
    const textDiv = document.createElement('div');
    textDiv.className = 'comprehension-text';
    textDiv.innerHTML = `<p>${question.textContent}</p>`;
    container.appendChild(textDiv);

    const questionsDiv = document.createElement('div');
    questionsDiv.className = 'comprehension-questions';

    if (!answers[currentQuestion]) {
        answers[currentQuestion] = {};
    }

    question.questions.forEach((q, index) => {
        const qDiv = document.createElement('div');
        qDiv.className = 'comprehension-question';

        const qTitle = document.createElement('h4');
        qTitle.textContent = `Domanda ${index + 1}: ${q.question}`;
        qDiv.appendChild(qTitle);

        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options';

        q.options.forEach((option, optIndex) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = option;

            if (answers[currentQuestion][index] === optIndex) {
                btn.classList.add('selected');
            }

            btn.addEventListener('click', () => {
                optionsDiv.querySelectorAll('.option-btn').forEach(b => {
                    b.classList.remove('selected');
                });
                btn.classList.add('selected');
                answers[currentQuestion][index] = optIndex;
            });

            optionsDiv.appendChild(btn);
        });

        qDiv.appendChild(optionsDiv);
        questionsDiv.appendChild(qDiv);
    });

    container.appendChild(questionsDiv);
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
            btn.textContent = translation.classList.contains('show') ? '😪 Nascondi' : '🔍 Traduci';
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
        'famoso': 'Berühmt',
        'amore': 'Liebe',
        'casa': 'Haus',
        'amico': 'Freund',
        'acqua': 'Wasser',
        'tempo': 'Zeit',
        'colosseo': 'Kolosseum',
        'roma': 'Rom',
        'vaticano': 'Vatikan',
        'fontana': 'Brunnen',
        'turista': 'Tourist',
        'amichevole': 'Freundlich'
    };

    return translations[word.toLowerCase()] || '❓ Non trovata';
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
    let score = 0;
    questions.forEach((question, index) => {
        if (question.type === 'multipleChoice' || question.type === 'binaryChoice') {
            if (answers[index] === question.correctAnswer) {
                score++;
            }
        } else if (question.type === 'fillBlanks') {
            let allCorrect = true;
            question.blanks.forEach(blank => {
                if (answers[index][blank.index] !== blank.correct) {
                    allCorrect = false;
                }
            });
            if (allCorrect) score++;
        } else if (question.type === 'matching') {
            let allCorrect = true;
            question.pairs.forEach((pair, pairIndex) => {
                if (answers[index][pairIndex] !== pairIndex) {
                    allCorrect = false;
                }
            });
            if (allCorrect) score++;
        } else if (question.type === 'comprehension') {
            let allCorrect = true;
            question.questions.forEach((q, qIndex) => {
                if (answers[index][qIndex] !== q.correctAnswer) {
                    allCorrect = false;
                }
            });
            if (allCorrect) score++;
        }
    });

    const percentage = Math.round((score / questions.length) * 100);

    let message = '';
    let emoji = '';

    if (percentage >= 80) {
        message = '❤️ Ottimo! Sei pronto per il tuo love trip!';
        emoji = '🌟';
    } else if (percentage >= 60) {
        message = '💪 Bene! Continua a praticare!';
        emoji = '😊';
    } else {
        message = '📚 Continua a imparare e riprova!';
        emoji = '🎓';
    }

    const resultDetails = document.getElementById('resultDetails');
    resultDetails.innerHTML = `
        <p style="font-size: 3em; margin-bottom: 20px;">${emoji}</p>
        <p>Hai ottenuto <strong>${score} su ${questions.length}</strong> risposte corrette! 🏆</p>
        <p style="font-size: 1.5em; margin: 20px 0; color: #FF6B9D;"><strong>${percentage}%</strong></p>
        <p style="margin-top: 25px; font-size: 1.15em;">${message}</p>
    `;

    document.getElementById('results-modal').classList.remove('hidden');
    document.querySelector('.container').style.display = 'none';
}
