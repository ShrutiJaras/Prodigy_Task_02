let timer;
let seconds = 0;
let isRunning = false;

const display = document.getElementById("display");
const startStopButton = document.getElementById("startStopButton");
const resetButton = document.getElementById("resetButton");
const lapButton = document.getElementById("lapButton");
const lapsList = document.getElementById("laps");

function formatTime(time) {
  const hours = String(Math.floor(time / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
  const secs = String(time % 60).padStart(2, "0");
  return ${hours}:${minutes}:${secs};
}

function updateDisplay() {
  display.textContent = formatTime(seconds);
}

function startStopTimer() {
  if (isRunning) {
    clearInterval(timer);
    startStopButton.textContent = "Start";
  } else {
    timer = setInterval(() => {
      seconds++;
      updateDisplay();
    }, 1000);
    startStopButton.textContent = "Pause";
  }
  isRunning = !isRunning;
}

function resetTimer() {
  clearInterval(timer);
  seconds = 0;
  isRunning = false;
  updateDisplay();
  startStopButton.textContent = "Start";
  lapsList.innerHTML = ""; // Clear lap list
}

function recordLap() {
  if (!isRunning) return;

  const lapTime = formatTime(seconds);
  const lapItem = document.createElement("li");
  lapItem.textContent = Lap ${lapsList.children.length + 1}: ${lapTime};
  lapsList.appendChild(lapItem);
}

startStopButton.addEventListener("click", startStopTimer);
resetButton.addEventListener("click", resetTimer);
lapButton.addEventListener("click", recordLap);

updateDisplay();