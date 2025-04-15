let points = parseInt(localStorage.getItem("points")) || 0;
const pointsDisplay = document.getElementById("points");
pointsDisplay.textContent = points;

const disableDuration = 30; // seconds
const buttonStates = JSON.parse(localStorage.getItem("buttonStates")) || {};

function earnPoints(amount, btn) {
  if (btn.disabled) return;

  points += 33;
  localStorage.setItem("points", points);
  pointsDisplay.textContent = points;

  btn.disabled = true;
  const btnText = btn.textContent;
  const timer = document.createElement("span");
  timer.style.marginLeft = "10px";
  btn.appendChild(timer);

  let countdown = disableDuration;
  timer.textContent = `(${countdown}s)`;

  const interval = setInterval(() => {
    countdown--;
    timer.textContent = `(${countdown}s)`;
    if (countdown === 0) {
      clearInterval(interval);
      btn.disabled = false;
      timer.remove();
      delete buttonStates[btnText];
      localStorage.setItem("buttonStates", JSON.stringify(buttonStates));
    }
  }, 1000);

  buttonStates[btnText] = Date.now();
  localStorage.setItem("buttonStates", JSON.stringify(buttonStates));
}

window.onload = () => {
  document.querySelectorAll(".btn").forEach(btn => {
    const btnText = btn.textContent;
    if (buttonStates[btnText]) {
      const timePassed = Math.floor((Date.now() - buttonStates[btnText]) / 1000);
      if (timePassed < disableDuration) {
        btn.disabled = true;
        const remaining = disableDuration - timePassed;
        const timer = document.createElement("span");
        timer.style.marginLeft = "10px";
        btn.appendChild(timer);
        timer.textContent = `(${remaining}s)`;

        let countdown = remaining;
        const interval = setInterval(() => {
          countdown--;
          timer.textContent = `(${countdown}s)`;
          if (countdown === 0) {
            clearInterval(interval);
            btn.disabled = false;
            timer.remove();
            delete buttonStates[btnText];
            localStorage.setItem("buttonStates", JSON.stringify(buttonStates));
          }
        }, 1000);
      }
    }
  });
};
