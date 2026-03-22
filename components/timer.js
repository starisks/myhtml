let timer = 0;
let running = false;
let interval;

function TimerComponent() {
  return `
    <div class="card center">
      <h2>Inspection: 15s</h2>
      <div id="time" class="big">0.00</div>

      <button onclick="toggleTimer()">Start / Stop</button>
      <button onclick="resetTimer()">Reset</button>
      <p>Press SPACE</p>
    </div>
  `;
}

function initTimer() {
  document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
      e.preventDefault();
      toggleTimer();
    }
  });

  interval = setInterval(() => {
    if (running) {
      timer += 10;
      document.getElementById("time").innerText = (timer / 1000).toFixed(2);
    }
  }, 10);
}

function toggleTimer() {
  running = !running;

  if (!running) {
    saveTime(timer);
  }
}

function resetTimer() {
  running = false;
  timer = 0;
  document.getElementById("time").innerText = "0.00";
}
