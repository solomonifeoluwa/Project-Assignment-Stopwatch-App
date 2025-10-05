let [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];
let timerDisplay = document.getElementById("display");
let timer = null;
let lapsContainer = document.getElementById("laps");

document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("stop").addEventListener("click", stopTimer);
document.getElementById("reset").addEventListener("click", resetTimer);
document.getElementById("lap").addEventListener("click", recordLap);

function stopwatch() {
  milliseconds += 10;
  if (milliseconds == 1000) {
        milliseconds = 0;
        seconds++;
        if (seconds == 60) {
        seconds = 0;
        minutes++;
        if (minutes == 60) {
            minutes = 0;
            hours++;
        }
        }
    }

  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  let ms = milliseconds < 100 ? (milliseconds < 10 ? "00" + milliseconds : "0" + milliseconds) : milliseconds;

  timerDisplay.innerHTML = `${h}:${m}:${s}:${ms}`;
}

function startTimer() {
  if (timer !== null) clearInterval(timer);
  timer = setInterval(stopwatch, 10);
}

function stopTimer() {
  clearInterval(timer);
}

function resetTimer() {
  clearInterval(timer);
  [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];
  timerDisplay.innerHTML = "00:00:00:00";
  lapsContainer.innerHTML = "";
}

function recordLap() {
  if (hours === 0 && minutes === 0 && seconds === 0 && milliseconds === 0) return;
  const lapTime = timerDisplay.innerHTML;
  const lapItem = document.createElement("div");
  lapItem.className = "lap-item";
  lapItem.textContent = `Lap ${lapsContainer.childElementCount + 1}: ${lapTime}`;
  lapsContainer.prepend(lapItem); // newest lap at top
}
