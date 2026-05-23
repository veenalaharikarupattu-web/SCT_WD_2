let timer = null;
let elapsedTime = 0;
let startTime = 0;
let running = false;
let lapCounter = 1;

const display = document.getElementById("display");
const lapsContainer = document.getElementById("laps");

function formatTime(milliseconds) {

  let ms = milliseconds % 1000;

  let totalSeconds = Math.floor(milliseconds / 1000);

  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds % 3600) / 60);
  let seconds = totalSeconds % 60;

  return (
    String(hours).padStart(2, "0") + ":" +
    String(minutes).padStart(2, "0") + ":" +
    String(seconds).padStart(2, "0") + "." +
    String(ms).padStart(3, "0")
  );
}

function updateDisplay() {
  display.textContent = formatTime(elapsedTime);
}

function startStopwatch() {

  if (running) return;

  running = true;

  startTime = Date.now() - elapsedTime;

  timer = setInterval(() => {

    elapsedTime = Date.now() - startTime;

    updateDisplay();

  }, 10);
}

function pauseStopwatch() {

  if (!running) return;

  running = false;

  clearInterval(timer);
}

function resetStopwatch() {

  running = false;

  clearInterval(timer);

  elapsedTime = 0;

  lapCounter = 1;

  updateDisplay();

  lapsContainer.innerHTML = "";
}

function recordLap() {

  if (!running) return;

  const lapTime = formatTime(elapsedTime);

  const lapItem = document.createElement("div");

  lapItem.classList.add("lap-item");

  lapItem.innerHTML = `
    <span>Lap ${lapCounter}</span>
    <span>${lapTime}</span>
  `;

  lapsContainer.prepend(lapItem);

  lapCounter++;
}

updateDisplay();