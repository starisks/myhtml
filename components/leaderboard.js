function LeaderboardComponent() {
  let times = getTimes().sort((a,b)=>a-b);

  return `
    <div class="card">
      <h2>Leaderboard</h2>
      ${times.map((t,i)=>`
        <div>#${i+1} - ${(t/1000).toFixed(2)}s</div>
      `).join("")}
    </div>
  `;
}

function initLeaderboard() {}
