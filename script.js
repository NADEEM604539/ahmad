function showSection(id) {
  document.querySelectorAll(".section").forEach(sec => {
    sec.classList.remove("visible");
    sec.classList.add("hidden");
  });
  document.getElementById(id).classList.remove("hidden");
  document.getElementById(id).classList.add("visible");
}

function toggleLanguage() {
  const title = document.getElementById("site-title");
  if (title.innerText === "Tuka Truck Service") {
    title.innerText = "ٹوکہ ٹرک سروس";
  } else {
    title.innerText = "Tuka Truck Service";
  }
}
