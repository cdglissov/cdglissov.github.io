export let active = false

function updateThemeToggle(toggleElement, textElement) {
  toggleElement.classList.toggle("active", active)
  toggleElement.setAttribute("aria-pressed", String(active))
  document.documentElement.setAttribute("data-bs-theme", active ? "light" : "dark")
  textElement.textContent = active ? "Dark mode off" : "Dark mode on"
}

function applySavedTheme() {
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "light") {
    active = true
  }
}

export default window.toggle = function () {
  const toggleElement = document.querySelector(".toggle")
  const textElement = document.querySelector(".text")

  if (!toggleElement || !textElement) {
    return
  }

  active = !active
  localStorage.setItem("theme", active ? "light" : "dark")
  updateThemeToggle(toggleElement, textElement)
}

applySavedTheme()

document.addEventListener("DOMContentLoaded", () => {
  const toggleElement = document.querySelector(".toggle")
  const textElement = document.querySelector(".text")

  if (!toggleElement || !textElement) {
    return
  }

  updateThemeToggle(toggleElement, textElement)
})
