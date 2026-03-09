/** @format */

// login.js
const loginBtn = document.getElementById("loginBtn");
const loader = document.getElementById("loader");
const errorMsg = document.getElementById("errorMsg");

function showLoader() {
  loader.style.display = "flex";
}
function hideLoader() {
  loader.style.display = "none";
}

loginBtn.addEventListener("click", () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  showLoader(); // spinner on click

  setTimeout(() => {
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "index.html";
    } else {
      errorMsg.classList.remove("hidden");
    }
    hideLoader(); 
  }, 100); // simulate 
});
