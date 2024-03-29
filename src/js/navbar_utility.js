const sections = document.querySelectorAll("section")
const navElements = document.querySelectorAll("header #navbarNav ul li a.nav-link")
const navbarnav = document.getElementById("navbarNav")
const navSpans = document.querySelectorAll("#cevent")


export default window.onscroll = function() {
    navbarActive()
    navbarScrolled()
};

// TODO: This could be better
export function navbarActive() {
    let currentNavitem = "";
    sections.forEach( (section) => {
        const secTop = section.offsetTop
        const sectionHeight = section.clientHeight;
        if(scrollY >= secTop - sectionHeight/3 ){
            currentNavitem = section.getAttribute("id")
        };
    });

    // if bottom of page, choose last element
    if ((window.innerHeight + scrollY) >= document.body.offsetHeight) {
        currentNavitem = sections[sections.length-1].getAttribute("id")
    }

    // if top of page
    if (scrollY ==0) {
        currentNavitem = sections[0].getAttribute("id")
    }

    navElements.forEach((a) => {
        a.classList.remove("active")
        if(a.classList.contains(currentNavitem)){
            a.classList.add("active")
        };
    });

};



const collapsedWindow = window.matchMedia("(min-width: 767px)")
const id_value = document.getElementById("navigationbar")
const navbarElement = document.getElementById("nbToggler")

// color navbar based on scroll
export function navbarScrolled() {
    let expandedScreen = collapsedWindow.matches
    if (scrollY <= 100 & (navbarElement.className == "navbar-toggler" & !expandedScreen)){
        id_value.classList.remove("nb");
        id_value.classList.add("nb-scrolled");
    } else if (scrollY > 100) {
        id_value.classList.remove("nb");
        id_value.classList.add("nb-scrolled");
    } else {
        id_value.classList.remove("nb-scrolled");
        id_value.classList.add("nb");
    }
}

// color navbar based on window resize
export const checkResize = collapsedWindow.onchange = (evt) => {    
    let expandedScreen = collapsedWindow.matches
    if (scrollY <= 100 & (navbarElement.className == "navbar-toggler" & expandedScreen)){
        id_value.classList.add("nb");
        id_value.classList.remove("nb-scrolled");
    } else if (scrollY <= 100 & (navbarElement.className == "navbar-toggler" & !expandedScreen)) {
        id_value.classList.remove("nb");
        id_value.classList.add("nb-scrolled");
    }

    // fixes collapse when navbar is not collapsed
    let styleNav = getComputedStyle(navbarnav).display
    navSpans.forEach( (navSpan) => {
        if (styleNav =='flex'){
            navSpan.dataset.bsTarget=''
        } else {
            navSpan.dataset.bsTarget='#navbarNav'
        }
    })
}

// Color navbar based on click
export const navbarToggler = () => {
    navbarElement.addEventListener('click', () => {
        if (window.scrollY == 0 & navbarElement.className == "navbar-toggler"){
            id_value.classList.remove("nb");
            id_value.classList.add("nb-scrolled")
        } else if(window.scrollY == 0 & navbarElement.className == "navbar-toggler collapsed"){
            id_value.classList.remove("nb-scrolled");
            id_value.classList.add("nb")
        }
    })
}


// fixes collapse when navbar is not collapsed
export function navbarCollapseAdjustTimer() {
    navSpans.forEach( (navSpan) => {
        navSpan.addEventListener('click', () => {
            let styleNav = getComputedStyle(navbarnav).display
            if (styleNav =='flex'){
                navSpan.dataset.bsTarget=''
            } else {
                navSpan.dataset.bsTarget='#navbarNav'
            }
        })
    })
}

