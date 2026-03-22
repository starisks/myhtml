function saveTime(time) {
  let data = JSON.parse(localStorage.getItem("times") || "[]");
  data.push(time);
  localStorage.setItem("times", JSON.stringify(data));
}

function getTimes() {
  return JSON.parse(localStorage.getItem("times") || "[]");
}
