const pointDisplay = document.getElementById("pointDisplay");
const countdown = document.getElementById("countdown");
const buttonGrid = document.getElementById("buttonGrid");

let points = localStorage.getItem('points') ? parseInt(localStorage.getItem('points')) : 0;
pointDisplay.innerText = points;

let isCooldown = false;
let timeLeft = 0;
let interval;

// Define button links (you can change these links to any URL)
const buttonLinks = [
  "https://www.example1.com",
  "https://www.example2.com",
  "https://www.example3.com",
  "https://www.example4.com",
  "https://www.example5.com",
  "https://www.example6.com",
  "https://www.example7.com",
  "https://www.example8.com",
  "https://www.example9.com",
  "https://www.example10.com"
];

// Generate 10 buttons dynamically
for (let i = 1; i <= 10; i++) {
  const btn = document.createElement("button");
  btn.textContent = `Earn ${i}`;
  btn.id = `btn-${i}`;
  btn.addEventListener("click", () => handleClick(btn, i));
  buttonGrid.appendChild(btn);
}

function handleClick(clickedBtn, index) {
  if (isCooldown) return;

  // Add points
  points += 33;
  pointDisplay.innerText = points;
  localStorage.setItem('points', points);

  // Open the associated link when clicked
  window.open(buttonLinks[index - 1], "_blank");

  // Disable all buttons
  setCooldown(30);
}

function setCooldown(seconds) {
  isCooldown = true;
  timeLeft = seconds;

  updateCountdownText();
  toggleButtons(true);

  interval = setInterval(() => {
    timeLeft--;
    updateCountdownText();

    if (timeLeft <= 0) {
      clearInterval(interval);
      toggleButtons(false);
      isCooldown = false;
    }
  }, 1000);
}

function updateCountdownText() {
  countdown.innerText = timeLeft;
}

function toggleButtons(disable) {
  const buttons = document.querySelectorAll("button");
  buttons.forEach(btn => {
    btn.disabled = disable;
  });
}
