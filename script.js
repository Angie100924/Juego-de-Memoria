// script.js

// Emojis para las 6 parejas
const emojis = ["🐶","🐱","🦊","🐸","🐵","🦁"];
let cardsArray = [...emojis, ...emojis]; // duplicamos para tener parejas

const board = document.getElementById("game-board");
const attemptsDisplay = document.getElementById("attempts");
const timerDisplay = document.getElementById("timer");
const resetBtn = document.getElementById("reset-btn");

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let attempts = 0;
let pairsFound = 0;
let timer;
let time = 0;
let timerStarted = false;

// Función para mezclar el arreglo
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Crear tablero
function createBoard() {
  board.innerHTML = "";
  shuffle(cardsArray).forEach((emoji, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.value = emoji;

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">?</div>
        <div class="card-back">${emoji}</div>
      </div>
    `;

    card.addEventListener("click", flipCard);
    board.appendChild(card);
  });
  attempts = 0;
  attemptsDisplay.textContent = `Intentos: ${attempts}`;
  pairsFound = 0;
  stopTimer();
  time = 0;
  timerDisplay.textContent = `Tiempo: 0s`;
  timerStarted = false;
}

// Voltear carta
function flipCard() {
  if (!timerStarted) startTimer();
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;
  attempts++;
  attemptsDisplay.textContent = `Intentos: ${attempts}`;

  checkForMatch();
}

// Verificar si las cartas coinciden
function checkForMatch() {
  if (firstCard.dataset.value === secondCard.dataset.value) {
    // Pareja encontrada
    pairsFound++;
    resetTurn();
    if (pairsFound === emojis.length) {
      setTimeout(() => alert(`¡Ganaste en ${attempts} intentos y ${time} segundos!`), 300);
      stopTimer();
    }
  } else {
    // No coincide
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      resetTurn();
    }, 1000);
  }
}

// Reiniciar turno
function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

// Temporizador
function startTimer() {
  timerStarted = true;
  timer = setInterval(() => {
    time++;
    timerDisplay.textContent = `Tiempo: ${time}s`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

// Botón reiniciar
resetBtn.addEventListener("click", createBoard);

// Inicializar juego
createBoard();
