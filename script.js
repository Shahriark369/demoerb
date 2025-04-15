const pointsDisplay = document.getElementById("points");
const buttons = document.querySelectorAll(".earn-button");

let points = parseInt(localStorage.getItem("points")) || 0;
pointsDisplay.textContent = points;

const disableDuration = 30; // 30 seconds

let buttonStates = JSON.parse(localStorage.getItem("buttonStates")) || {};

function updateButtonStates() {
  const now = Date.now();

  buttons.forEach((btn, index) => {
    const buttonId = `button_${index}`;
    const lastClicked = buttonStates[buttonId];

    if (lastClicked) {
      const timeElapsed = Math.floor((now - lastClicked) / 1000);
      const remaining = disableDuration - timeElapsed;

      if (remaining > 0) {
        btn.disabled = true;
        const timer = document.createElement("span");
        timer.className = "timer";
        timer.textContent = `(${remaining}s)`;
        btn.appendChild(timer);

        const interval = setInterval(() => {
          const updatedTimeElapsed = Math.floor((Date.now() - lastClicked) / 1000);
          const updatedRemaining = disableDuration - updatedTimeElapsed;

          if (updatedRemaining <= 0) {
            clearInterval(interval);
            btn.disabled = false;
            timer.remove();
            delete buttonStates[buttonId];
            localStorage.setItem("buttonStates", JSON.stringify(buttonStates));
          } else {
            timer.textContent = `(${updatedRemaining}s)`;
          }
        }, 1000);
      }
    }
  });
}

function earnPoints(amount, element) {
  if (element.disabled) return;

  points += amount;
  localStorage.setItem("points", points);
  pointsDisplay.textContent = points;

  element.disabled = true;
  const buttonId = element.getAttribute("data-id");

  const timer = document.createElement("span");
  timer.className = "timer";
  timer.textContent = `(${disableDuration}s)`;
  element.appendChild(timer);

  let countdown = disableDuration;
  const interval = setInterval(() => {
    countdown--;
    timer.textContent = `(${countdown}s)`;
    if (countdown <= 0) {
      clearInterval(interval);
      element.disabled = false;
      timer.remove();
      delete buttonStates[buttonId];
      localStorage.setItem("buttonStates", JSON.stringify(buttonStates));
    }
  }, 1000);

  buttonStates[buttonId] = Date.now();
  localStorage.setItem("buttonStates", JSON.stringify(buttonStates));
}

buttons.forEach((btn, index) => {
  btn.setAttribute("data-id", `button_${index}`);
  btn.addEventListener("click", () => earnPoints(33, btn));
});

updateButtonStates();
