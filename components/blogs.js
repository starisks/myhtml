const posts = [
  { title: "Cross Planning", content: "Plan your cross during inspection." },
  { title: "Lookahead", content: "Reduce pauses during F2L." },
  { title: "TPS Control", content: "Balance speed and accuracy." }
];

function BlogsComponent() {
  return `
    <div>
      ${posts.map(p => `
        <div class="card">
          <h3>${p.title}</h3>
          <p>${p.content}</p>
        </div>
      `).join("")}
    </div>
  `;
}
