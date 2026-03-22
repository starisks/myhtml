let currentTab = "timer";

function setTab(tab) {
  currentTab = tab;
  render();
}

function render() {
  const app = document.getElementById("app");

  if (currentTab === "timer") {
    app.innerHTML = TimerComponent();
    initTimer();
  }

  if (currentTab === "algorithms") {
    app.innerHTML = AlgorithmsComponent();
  }

  if (currentTab === "blogs") {
    app.innerHTML = BlogsComponent();
  }

  if (currentTab === "leaderboard") {
    app.innerHTML = LeaderboardComponent();
    initLeaderboard();
  }
}

render();
