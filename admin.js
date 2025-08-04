const loginForm = document.getElementById("loginForm");
const adminPanel = document.getElementById("adminPanel");
const truckForm = document.getElementById("truckForm");
const truckList = document.getElementById("truckList");
const searchInput = document.getElementById("searchInput");

const credentials = {
  username: "asghar",
  password: "aa11bb22"
};

let trucks = JSON.parse(localStorage.getItem("trucks")) || [];

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user === credentials.username && pass === credentials.password) {
    loginForm.classList.add("hidden");
    adminPanel.classList.remove("hidden");
    loadTrucks();
  } else {
    alert("Wrong username or password");
  }
});

truckForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("truckName").value;
  const location = document.getElementById("location").value;
  const quantity = document.getElementById("quantity").value;
  const status = document.getElementById("status").value;

  const truck = {
    id: Date.now(),
    name,
    location,
    quantity,
    status
  };

  trucks.push(truck);
  localStorage.setItem("trucks", JSON.stringify(trucks));
  truckForm.reset();
  loadTrucks();
});

function loadTrucks(filter = "") {
  truckList.innerHTML = "";

  const filtered = trucks.filter(truck =>
    truck.name.toLowerCase().includes(filter.toLowerCase())
  );

  filtered.forEach(truck => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${truck.name}</strong> - ${truck.location} (${truck.quantity}) [${truck.status}]
      <br />
      <button onclick="deleteTruck(${truck.id})">Delete</button>
      <button onclick="editTruck(${truck.id})">Edit</button>
    `;
    truckList.appendChild(li);
  });
}

function deleteTruck(id) {
  if (confirm("Are you sure to delete this truck?")) {
    trucks = trucks.filter(t => t.id !== id);
    localStorage.setItem("trucks", JSON.stringify(trucks));
    loadTrucks();
  }
}

function editTruck(id) {
  const truck = trucks.find(t => t.id === id);
  if (!truck) return;

  document.getElementById("truckName").value = truck.name;
  document.getElementById("location").value = truck.location;
  document.getElementById("quantity").value = truck.quantity;
  document.getElementById("status").value = truck.status;

  deleteTruck(id); // Remove old; will add as new on submit
}

searchInput.addEventListener("input", () => {
  loadTrucks(searchInput.value);
});

function logout() {
  adminPanel.classList.add("hidden");
  loginForm.classList.remove("hidden");
}
