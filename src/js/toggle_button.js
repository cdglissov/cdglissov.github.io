let active = false

function toggle() {
    let toggle = document.querySelector('.toggle')
    let text = document.querySelector('.text')

    active = !active

    if (active) {
      toggle.classList.add('active')
      document.documentElement.setAttribute('data-bs-theme','light')
      text.innerHTML = 'Dark mode off'
    } else {
      toggle.classList.remove('active')
      document.documentElement.setAttribute('data-bs-theme','dark')
      text.innerHTML = 'Dark mode on'
    }
  }