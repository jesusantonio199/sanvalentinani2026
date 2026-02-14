/* --- JavaScript: Lógica e Interactividad --- */
const yesBtn = document.getElementById('yesBtn');
const mainCard = document.getElementById('mainCard');
const successCard = document.getElementById('successCard');
const questionsCard = document.getElementById('questionsCard');
const questionTitle = document.getElementById('questionTitle');
const questionText = document.getElementById('questionText');
const nextBtn = document.getElementById('nextBtn');
const answerInput = document.getElementById('answerInput');
const displayWord = document.getElementById('displayWord');

// Elementos de la Alerta Personalizada
const customAlert = document.getElementById('customAlert');
const closeAlertBtn = document.getElementById('closeAlertBtn');
const alertMessage = document.getElementById('alertMessage');

// Elementos de las Fotos Laterales
const leftPoster = document.getElementById('left-poster');
const rightPoster = document.getElementById('right-poster');

function showAlert(msg) {
    alertMessage.innerText = msg;
    customAlert.classList.remove('hidden');
}

closeAlertBtn.addEventListener('click', () => {
    customAlert.classList.add('hidden');
});

// Elementos del Login Principal
const entryCard = document.getElementById('entryCard');
const entryPassword = document.getElementById('entryPassword');
const entryBtn = document.getElementById('entryBtn');
const entryError = document.getElementById('entryError');

// Lógica de Entrada (Login)
entryBtn.addEventListener('click', () => {
    const name = entryPassword.value.trim().toUpperCase();

    if (name === "ANITZA") {
        // Si es Anitza, mostramos la sorpresa
        entryCard.classList.add('hidden');
        
        // OCULTAR LAS FOTOS LATERALES AL SALIR DE LA BIENVENIDA
        if (leftPoster) leftPoster.classList.add('hidden');
        if (rightPoster) rightPoster.classList.add('hidden');

        questionsCard.classList.remove('hidden');
        questionsCard.classList.add('enter-effect'); // Agregamos el efecto de entrada
        questionsCard.style.backgroundColor = questions[0].color; // Color de la primera pregunta
    } else if (name === "JESUS") {
        // Si es Jesús, vamos a la página de administración
        window.location.href = "respuestas.html";
    } else {
        // Si es incorrecto
        entryError.classList.remove('hidden');
    }
});

// Array de preguntas previas
const questions = [
    { title: "Hola mi vida Anitza ❤️", text: "Antes de la sorpresa, quiero ver si recuerdas algunas cosas...", color: "#fff0f5" }, // Rosa muy suave
    { title: "Nuestra fecha especial 📅", text: "¿Cuál es la fecha en que nos volvimos a enamorar?", input: true, type: "date", color: "#e0f7fa" }, // Cian pastel
    { title: "Un lugar 🌎", text: "¿Cuál es tu lugar favorito cuando estamos juntos?", input: true, type: "text", color: "#f1f8e9" }, // Verde pastel
    { title: "Gustos 🍽️", text: "¿Cuál es tu comida favorita que quisieras que comamos?", input: true, type: "text", color: "#fff8e1" }, // Amarillo pastel
    { title: "Música 🎵", text: "¿Qué canción te recuerda a nosotros?", input: true, type: "text", color: "#f3e5f5" }, // Violeta pastel
    { title: "Nosotros ❤️", text: "Escribe una frase bonita que nos defina:", input: true, type: "text", color: "#ffebee" }, // Rojo pastel
    { title: "Una última cosa...", text: "¿Estás lista para lo que viene?", color: "#ffffff" } // Blanco
];

let currentQuestionIndex = 0;
let allAnswers = []; // Array para guardar todas las respuestas

// Lógica para pasar preguntas
nextBtn.addEventListener('click', () => {
    const currentQ = questions[currentQuestionIndex];

    // 1. Si la pregunta actual requiere escribir, guardamos el dato
    if (currentQ.input) {
        const value = answerInput.value.trim();
        if (value === "") {
            showAlert("¡Por favor responde para continuar! ❤️");
            return; // No avanza si está vacío
        }
        // Guardamos la respuesta en nuestro array
        allAnswers.push({ question: currentQ.title, answer: value });
        // GUARDAR EN MEMORIA DEL NAVEGADOR (Para ver en la página de respuestas)
        localStorage.setItem('valentines_answers', JSON.stringify(allAnswers));
        // AQUÍ SE ENVIARÍA A TU BASE DE DATOS (Simulado con console.log)
        console.log("Base de Datos (Simulada):", allAnswers);
    }

    // 2. Avanzamos a la siguiente pregunta
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        const nextQ = questions[currentQuestionIndex];
        
        // Mostrar siguiente pregunta
        questionTitle.innerText = nextQ.title;
        questionText.innerText = nextQ.text;
        questionsCard.style.backgroundColor = nextQ.color; // Cambiar color de fondo

        // Mostrar u ocultar el input según corresponda
        if (nextQ.input) {
            answerInput.classList.remove('hidden');
            answerInput.type = nextQ.type || 'text'; // Cambiar tipo de input (fecha o texto)
            answerInput.value = ''; // Limpiar campo anterior
            answerInput.focus();
        } else {
            answerInput.classList.add('hidden');
        }
    } else {
        // Si se acaban las preguntas, mostrar la propuesta final
        questionsCard.classList.add('hidden');
        mainCard.classList.remove('hidden');
    }
});

// --- Lógica del Juego del Botón "Sí" ---
let gameState = 'start'; // Fases: start, playing, tired, trick, final
let moveCount = 0;
const taunts = [
    "¡Sígueme amor!",
    "¡No me atrapas amor!",
    "¿Ya te cansaste amor?",
    "¡Estoy aquí amor!",
    "¡Casi amor!",
    "¡Más rápido amor!",
    "¡Por aquí amor!",
    "¡Uy, qué lenta amor!",
    "¡Inténtalo de nuevo amor!",
    "¡No te rindas amor!"
];

function moveYesButton() {
    // El juego solo se activa si está en 'start' o 'playing'
    if (gameState !== 'playing' && gameState !== 'start') return;

    gameState = 'playing';
    moveCount++;

    // Después de 12 movimientos, el botón se cansa
    if (moveCount > 12) {
        gameState = 'tired';
        yesBtn.innerText = "Ya me cansé, ahora sí, ¡sí acepto! ❤️";
        // Lo devolvemos a su sitio original
        yesBtn.style.position = 'relative';
        yesBtn.style.left = 'auto';
        yesBtn.style.top = 'auto';
        return; // Se detiene hasta que le hagan clic
    }

    // Cambia el texto y se mueve a un lugar aleatorio
    yesBtn.innerText = taunts[moveCount % taunts.length];
    const newX = Math.random() * (window.innerWidth - 150);
    const newY = Math.random() * (window.innerHeight - 60);

    yesBtn.style.position = 'fixed';
    yesBtn.style.left = newX + 'px';
    yesBtn.style.top = newY + 'px';
}

// Eventos para iniciar el juego
yesBtn.addEventListener('mouseover', moveYesButton);
yesBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Evita que se active el clic junto con el toque
    moveYesButton();
});

// Lógica de clic que maneja las fases del juego
yesBtn.addEventListener('click', () => {
    // Si el botón está "cansado", hace la trampa
    if (gameState === 'tired') {
        gameState = 'trick';
        yesBtn.innerText = "¡Sígueme amor!";
        // Se escapa una última vez
        const newX = Math.random() * (window.innerWidth - 150);
        const newY = Math.random() * (window.innerHeight - 60);
        yesBtn.style.position = 'fixed';
        yesBtn.style.left = newX + 'px';
        yesBtn.style.top = newY + 'px';

        // Después de la trampa, se rinde de verdad
        setTimeout(() => {
            gameState = 'final';
            yesBtn.innerText = "Ahora sí, ¡atrapado!";
            yesBtn.style.position = 'relative';
            yesBtn.style.left = 'auto';
            yesBtn.style.top = 'auto';
        }, 1500);
        return;
    }

    // Si el juego está en la fase final, ahora sí procede
    if (gameState === 'final') {
        mainCard.classList.add('hidden');
        successCard.classList.remove('hidden');
        celebrate(); // ¡Efecto bonito de celebración!
        
        const lastAnswer = allAnswers[allAnswers.length - 1];
        if (lastAnswer) {
            displayWord.innerText = 'Tu frase fue: "' + lastAnswer.answer + '"';
        }
    }
});

// Función para crear lluvia de corazones
function createHearts() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        
        // Posición horizontal aleatoria
        heart.style.left = Math.random() * 100 + 'vw';
        
        // Duración de caída aleatoria
        heart.style.animationDuration = Math.random() * 2 + 3 + 's';
        
        // Tamaño aleatorio
        heart.style.fontSize = Math.random() * 20 + 20 + 'px';
        
        document.body.appendChild(heart);

        // Limpiar el DOM eliminando corazones viejos
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }, 300); /* 300ms = Lluvia suave y constante */
}

// Iniciar la lluvia de corazones automáticamente al cargar
createHearts();

// Función para el efecto bonito final (Explosión de amor)
function celebrate() {
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.innerHTML = ['❤️', '💖', '🥰', '✨', '🌹'][Math.floor(Math.random() * 5)];
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = Math.random() * 2 + 2 + 's';
            heart.style.fontSize = Math.random() * 30 + 20 + 'px';
            heart.style.zIndex = "100";
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 4000);
        }, i * 40);
    }
}