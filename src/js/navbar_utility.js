const sections = document.querySelectorAll("section")
const navElements = document.querySelectorAll("header #navbarNav ul li a.nav-link")
const navbarnav = document.getElementById("navbarNav")
const navSpans = document.querySelectorAll(".collapse-event")

export default window.onscroll = function () {
    navbarActive()
    navbarScrolled()
}

export function navbarActive() {
    if (!sections.length || !navElements.length) {
        return
    }

    let currentNavitem = ""

    sections.forEach((section) => {
        const secTop = section.offsetTop
        const sectionHeight = section.clientHeight
        if (window.scrollY >= secTop - sectionHeight / 3) {
            currentNavitem = section.getAttribute("id") || ""
        }
    })

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        currentNavitem = sections[sections.length - 1].getAttribute("id") || ""
    }

    if (window.scrollY === 0) {
        currentNavitem = sections[0].getAttribute("id") || ""
    }

    navElements.forEach((anchor) => {
        anchor.classList.remove("active")
        if (currentNavitem && anchor.classList.contains(currentNavitem)) {
            anchor.classList.add("active")
        }
    })
}

const collapsedWindow = window.matchMedia("(min-width: 767px)")
const navRoot = document.getElementById("navigationbar")
const navbarElement = document.getElementById("nbToggler")

export function navbarScrolled() {
    if (!navRoot) {
        return
    }

    const expandedScreen = collapsedWindow.matches
    const isTogglerCollapsed = navbarElement ? navbarElement.classList.contains("collapsed") : true

    if (window.scrollY <= 100 && !expandedScreen && !isTogglerCollapsed) {
        navRoot.classList.remove("nb")
        navRoot.classList.add("nb-scrolled")
    } else if (window.scrollY > 100) {
        navRoot.classList.remove("nb")
        navRoot.classList.add("nb-scrolled")
    } else {
        navRoot.classList.remove("nb-scrolled")
        navRoot.classList.add("nb")
    }
}

export const checkResize = collapsedWindow.onchange = () => {
    if (!navRoot) {
        return
    }

    const expandedScreen = collapsedWindow.matches
    const isTogglerCollapsed = navbarElement ? navbarElement.classList.contains("collapsed") : true

    if (window.scrollY <= 100 && expandedScreen && !isTogglerCollapsed) {
        navRoot.classList.add("nb")
        navRoot.classList.remove("nb-scrolled")
    } else if (window.scrollY <= 100 && !expandedScreen) {
        navRoot.classList.remove("nb")
        navRoot.classList.add("nb-scrolled")
    }

    const styleNav = navbarnav ? getComputedStyle(navbarnav).display : "none"
    navSpans.forEach((navSpan) => {
        navSpan.dataset.bsTarget = styleNav === "flex" ? "" : "#navbarNav"
    })
}

export const navbarToggler = () => {
    if (!navbarElement || !navRoot) {
        return
    }

    navbarElement.addEventListener("click", () => {
        const isCollapsed = navbarElement.classList.contains("collapsed")
        if (window.scrollY === 0 && !isCollapsed) {
            navRoot.classList.remove("nb")
            navRoot.classList.add("nb-scrolled")
        } else if (window.scrollY === 0 && isCollapsed) {
            navRoot.classList.remove("nb-scrolled")
            navRoot.classList.add("nb")
        }
    })
}

export function navbarCollapseAdjustTimer() {
    if (!navbarnav || !navSpans.length) {
        return
    }

    navSpans.forEach((navSpan) => {
        navSpan.addEventListener("click", () => {
            const styleNav = getComputedStyle(navbarnav).display
            navSpan.dataset.bsTarget = styleNav === "flex" ? "" : "#navbarNav"
        })
    })
}
