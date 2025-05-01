const sidebarBtnOpen = document.querySelector("#sidebar-button-open");
const sidebarBtnClosed = document.querySelector("#sidebar-button-closed");

const sidebar = document.querySelector(".sidebar");

sidebarBtnOpen.addEventListener("click", () => {
  sidebar.classList.toggle("sidebar-open");
  sidebar.classList.toggle("sidebar-closed");
  sidebarBtnOpen.style.display = "none";
});

sidebarBtnClosed.addEventListener("click", () => {
  sidebar.classList.toggle("side-bar-closed");
  sidebar.classList.toggle("sidebar-open");
  sidebarBtnOpen.style.display = "block";
});

function confirmDelete() {
  const password = prompt("Enter the admin password to delete this game.");
  if (password === "simslife123") {
    return true;
  } else {
    alert("Incorrect password");
    return false;
  }
}
