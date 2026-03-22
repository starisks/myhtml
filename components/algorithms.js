function AlgorithmsComponent() {
  let oll = Array.from({ length: 57 }, (_, i) => `<div class="card">OLL ${i+1}</div>`).join("");
  let pll = Array.from({ length: 21 }, (_, i) => `<div class="card">PLL ${i+1}</div>`).join("");

  return `
    <div class="center">
      <h2>OLL</h2>
      <div>${oll}</div>

      <h2>PLL</h2>
      <div>${pll}</div>
    </div>
  `;
}
