// =========================
// GLOBAL STATE
// =========================

let currentTab = "timer";
let currentUser = null;

// =========================
// INIT
// =========================

document.addEventListener("DOMContentLoaded", async () => {
  await checkAuth();
  render();
});

// =========================
// AUTH
// =========================

async function checkAuth() {
  try {
    const res = await fetch("/api/auth/me");
    currentUser = await res.json();
  } catch {
    currentUser = null;
  }
}

async function login(username, password) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  await checkAuth();
  render();
  return data;
}

async function register(username, password) {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  });

  return await res.json();
}

async function logout() {
  await fetch("/api/auth/logout");
  currentUser = null;
  render();
}

// =========================
// NAVIGATION
// =========================

function setTab(tab) {
  currentTab = tab;
  render();
}

// =========================
// RENDER
// =========================

function render() {
  const app = document.getElementById("app");

  app.innerHTML = `
    ${renderHeader()}
    ${renderTabs()}
    <div class="content">
      ${renderContent()}
    </div>
  `;
}

function renderHeader() {
  return `
    <div class="card">
      <h1>Cubing Hub</h1>
      ${
        currentUser
          ? `<p>Logged in as <b>${currentUser.username}</b> (${currentUser.role})</p>
             <button onclick="logout()">Logout</button>`
          : `<p>Not logged in</p>`
      }
    </div>
  `;
}

function renderTabs() {
  return `
    <div class="tabs">
      <button onclick="setTab('timer')">Timer</button>
      <button onclick="setTab('algorithms')">Algorithms</button>
      <button onclick="setTab('blogs')">Blogs</button>
      <button onclick="setTab('leaderboard')">Leaderboard</button>
      ${
        currentUser?.role === "admin"
          ? `<button onclick="setTab('admin')">Admin</button>`
          : ""
      }
    </div>
  `;
}

function renderContent() {
  switch (currentTab) {
    case "timer":
      return renderTimer();
    case "algorithms":
      return renderAlgorithms();
    case "blogs":
      return renderBlogs();
    case "leaderboard":
      return renderLeaderboard();
    case "admin":
      return renderAdmin();
    case "auth":
      return renderAuth();
    default:
      return "";
  }
}

// =========================
// AUTH UI
// =========================

function renderAuth() {
  return `
    <div class="card">
      <h2>Login</h2>
      <input id="loginUser" placeholder="Username"/>
      <input id="loginPass" type="password" placeholder="Password"/>
      <button onclick="handleLogin()">Login</button>

      <h2>Register</h2>
      <input id="regUser" placeholder="Username"/>
      <input id="regPass" type="password" placeholder="Password"/>
      <button onclick="handleRegister()">Register</button>
    </div>
  `;
}

async function handleLogin() {
  const username = document.getElementById("loginUser").value;
  const password = document.getElementById("loginPass").value;

  await login(username, password);
}

async function handleRegister() {
  const username = document.getElementById("regUser").value;
  const password = document.getElementById("regPass").value;

  await register(username, password);
}

// =========================
// TIMER
// =========================

let timer = 0;
let running = false;
let interval;

function renderTimer() {
  return `
    <div class="card center">
      <h2>Timer</h2>
      <div class="big" id="timeDisplay">${(timer / 1000).toFixed(2)}</div>

      <button onclick="toggleTimer()">Start / Stop</button>
      <button onclick="resetTimer()">Reset</button>

      ${
        currentUser
          ? `<button onclick="saveTime()">Save Time</button>`
          : `<p>Login to save times</p>`
      }

      <p>Press SPACE to toggle</p>
    </div>
  `;
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    toggleTimer();
  }
});

function toggleTimer() {
  running = !running;

  if (running) {
    interval = setInterval(() => {
      timer += 10;
      updateTimerDisplay();
    }, 10);
  } else {
    clearInterval(interval);
  }
}

function resetTimer() {
  running = false;
  timer = 0;
  clearInterval(interval);
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const el = document.getElementById("timeDisplay");
  if (el) el.innerText = (timer / 1000).toFixed(2);
}

async function saveTime() {
  if (!currentUser) return alert("Login first");

  await fetch("/api/times/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ time: timer })
  });

  alert("Time saved!");
}

// =========================
// ALGORITHMS
// =========================

function renderAlgorithms() {
  const oll = Array.from({ length: 10 }, (_, i) => `<div class="card">OLL ${i + 1}</div>`).join("");
  const pll = Array.from({ length: 5 }, (_, i) => `<div class="card">PLL ${i + 1}</div>`).join("");

  return `
    <div>
      <h2>Algorithms</h2>
      <h3>OLL</h3>
      ${oll}
      <h3>PLL</h3>
      ${pll}
    </div>
  `;
}

// =========================
// BLOGS
// =========================

function renderBlogs() {
  const posts = [
    { title: "Cross Planning", content: "Plan your cross during inspection." },
    { title: "Lookahead", content: "Reduce pauses." },
    { title: "TPS Control", content: "Balance speed and accuracy." }
  ];

  return posts.map(p => `
    <div class="card">
      <h3>${p.title}</h3>
      <p>${p.content}</p>
    </div>
  `).join("");
}

// =========================
// LEADERBOARD
// =========================

async function renderLeaderboard() {
  const res = await fetch("/api/times/get");
  const times = await res.json();

  return `
    <div class="card">
      <h2>Leaderboard</h2>
      ${times
        .map(
          (t, i) =>
            `<div>#${i + 1} ${t.username} - ${(t.time / 1000).toFixed(2)}s</div>`
        )
        .join("")}
    </div>
  `;
}

// =========================
// ADMIN
// =========================

async function renderAdmin() {
  if (!currentUser || currentUser.role !== "admin") {
    return `<div class="card">Forbidden</div>`;
  }

  const res = await fetch("/api/admin/users");
  const users = await res.json();

  return `
    <div class="card">
      <h2>Admin Panel</h2>
      ${users.map(u => `<div>${u.username} (${u.role})</div>`).join("")}
    </div>
  `;
}
