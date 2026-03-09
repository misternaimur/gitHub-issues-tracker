/** @format */

if (localStorage.getItem("isLoggedIn")) {
  window.location.href = "index.html";
}

document.getElementById("loginBtn").addEventListener("click", function () {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "admin" && password === "admin123") {
    localStorage.setItem("isLoggedIn", true);

    window.location.href = "index.html";
  } else {
    document.getElementById("errorMsg").classList.remove("hidden");
  }
});
