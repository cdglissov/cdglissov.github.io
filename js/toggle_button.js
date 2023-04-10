let active = false

function toggle() {
    let toggle = document.querySelector('.toggle')
    let text = document.querySelector('.text')
    active = !active

    if (active) {
      toggle.classList.add('active')
      document.body.classList.remove("latex-dark")
      text.innerHTML = 'Dark mode off'
    } else {
      toggle.classList.remove('active')
      document.body.classList.add("latex-dark")
      text.innerHTML = 'Dark mode on'
    }
  }
