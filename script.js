// Domande del test di italiano - Livello Base
const questions = [
    {
        type: 'multipleChoice',
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
        text: 'Leggi il testo e clicca su ogni parola evidenziata per scoprire la traduzione in tedesco:',
        textContent: 'Mi piace molto visitare l\'Italia. La <span class="highlight-word" data-word="bandiera">bandiera</span> italiana è bellissima! Quando vado a Roma, visito il <span class="highlight-word" data-word="Colosseo">Colosseo</span> e mangio una deliziosa <span class="highlight-word" data-word="pizza">pizza</span> con gli <span class="highlight-word" data-word="amici">amici</span>.',
        pairs: [
            { word: 'bandiera', german: 'Flagge' },
            { word: 'Colosseo', german: 'Kolosseum' },
            { word: 'pizza', german: 'Pizza' },
            { word: 'amici', german: 'Freunde' }
        ],
        difficultWords: []
    },
    {
        type: 'dialog',
        text: 'Completa il dialogo tra Anna e Marco:',
        dialog: [
            { speaker: 'Anna', text: 'Ciao Marco! Come stai?' },
            { speaker: 'Marco', text: '_______ bene, grazie! E tu?', blank: true, options: ['Sto', 'Sono', 'Vado', 'Esco'] },
            { speaker: 'Anna', text: 'Anch\'io bene! Hai _______?' },
            { speaker: 'Marco', text: 'Sì, ho fame! Vuoi un caffè?', blank: false },
            { speaker: 'Anna', text: '_______ ! Mi piacerebbe molto!', blank: true, options: ['Sì', 'No', 'Forse', 'Mai'] },
            { speaker: 'Marco', text: 'Perfetto! Andiamo al bar.', blank: false }
        ],
        blanks: [
            { index: 1, correctAnswer: 0, question: 'Primo dialogo - Risposta Marco' },
            { index: 4, correctAnswer: 0, question: 'Secondo dialogo - Risposta Anna' }
        ]
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
    },
    {
        type: 'multipleChoice',
        text: 'Come si dice "Ti amo" in italiano?',
        options: [
            'Amo tu',
            'Ti amo',
            'Amo te',
            'Te amo'
        ],
        correctAnswer: 1,
        difficultWords: []
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

    if (question.type === 'completion') {
        renderCompletion(questionDiv, question);
    } else if (question.type === 'multipleChoice') {
        renderMultipleChoice(questionDiv, question);
    } else if (question.type === 'translation') {
        renderTranslationWithHighlight(questionDiv, question);
    } else if (question.type === 'dialog') {
        renderDialog(questionDiv, question);
    }

    if (question.difficultWords && question.difficultWords.length > 0) {
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

function renderTranslationWithHighlight(container, question) {
    const textDiv = document.createElement('div');
    textDiv.className = 'highlighted-text';
    textDiv.innerHTML = question.textContent;
    container.appendChild(textDiv);

    const highlightedWords = textDiv.querySelectorAll('.highlight-word');
    highlightedWords.forEach(word => {
        word.addEventListener('click', function(e) {
            e.preventDefault();
            const wordText = this.getAttribute('data-word');
            showTranslationPopup(this, wordText, question.pairs);
        });
    });

    const section = document.createElement('div');
    section.className = 'translation-section';

    const title = document.createElement('p');
    title.className = 'translation-title';
    title.textContent = '🇩🇪 Clicca sulle parole blu per le traduzioni';
    section.appendChild(title);

    question.pairs.forEach((pair) => {
        const item = document.createElement('div');
        item.className = 'translation-item';

        const german = document.createElement('span');
        german.className = 'italian-word';
        german.textContent = pair.word;
        german.style.cursor = 'pointer';

        const btn = document.createElement('button');
        btn.className = 'translate-btn';
        btn.textContent = '🔍 Traduci';

        const translation = document.createElement('span');
        translation.className = 'german-translation';
        translation.textContent = pair.german;

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            translation.classList.toggle('show');
            btn.textContent = translation.classList.contains('show') ? '😪 Nascondi' : '🔍 Traduci';
        });

        item.appendChild(german);
        item.appendChild(btn);
        item.appendChild(translation);
        section.appendChild(item);
    });

    container.appendChild(section);
}

function showTranslationPopup(element, word, pairs) {
    const pair = pairs.find(p => p.word.toLowerCase() === word.toLowerCase());
    if (pair) {
        const popup = document.createElement('div');
        popup.className = 'popup-translation';
        popup.innerHTML = `<strong>${pair.word}</strong><br/><span style="font-style: italic; color: white;">${pair.german}</span>`;
        element.parentNode.insertBefore(popup, element.nextSibling);
        setTimeout(() => popup.remove(), 2000);
    }
}

function renderDialog(container, question) {
    const dialogDiv = document.createElement('div');
    dialogDiv.className = 'dialog-container';

    if (!answers[currentQuestion]) {
        answers[currentQuestion] = {};
    }

    question.dialog.forEach((line, index) => {
        const lineDiv = document.createElement('div');
        lineDiv.className = 'dialog-line';
        lineDiv.setAttribute('data-speaker', line.speaker);

        const speakerSpan = document.createElement('span');
        speakerSpan.className = 'dialog-speaker';
        speakerSpan.textContent = line.speaker + ':';
        lineDiv.appendChild(speakerSpan);

        if (line.blank) {
            const blankInfo = question.blanks.find(b => b.index === index);
            if (blankInfo) {
                const inputDiv = document.createElement('div');
                inputDiv.className = 'dialog-input-group';

                const select = document.createElement('select');
                select.className = 'dialog-select';
                select.value = answers[currentQuestion][index] !== undefined ? answers[currentQuestion][index] : '';

                const emptyOption = document.createElement('option');
                emptyOption.value = '';
                emptyOption.textContent = 'Scegli...';
                select.appendChild(emptyOption);

                blankInfo.options.forEach((opt, optIndex) => {
                    const option = document.createElement('option');
                    option.value = optIndex;
                    option.textContent = opt;
                    select.appendChild(option);
                });

                select.addEventListener('change', (e) => {
                    answers[currentQuestion][index] = parseInt(e.target.value);
                });

                inputDiv.appendChild(select);
                lineDiv.appendChild(inputDiv);
            }
        } else {
            const textSpan = document.createElement('span');
            textSpan.className = 'dialog-text';
            textSpan.textContent = line.text;
            lineDiv.appendChild(textSpan);
        }

        dialogDiv.appendChild(lineDiv);
    });

    container.appendChild(dialogDiv);
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
        'colosseo': 'Kolosseum'
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
        if (question.type === 'completion' || question.type === 'multipleChoice') {
            if (answers[index] === question.correctAnswer) {
                score++;
            }
        } else if (question.type === 'dialog') {
            if (typeof answers[index] === 'object' && Object.keys(answers[index]).length > 0) {
                let dialogCorrect = true;
                question.blanks.forEach(blank => {
                    if (answers[index][blank.index] !== blank.correctAnswer) {
                        dialogCorrect = false;
                    }
                });
                if (dialogCorrect) score++;
            }
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
