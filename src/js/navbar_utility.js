const sections = document.querySelectorAll("section")
const navElements = document.querySelectorAll("header #navbarNav ul li a.nav-link")

export default window.onscroll = function() {
    navbarActive()
    navbarScrolled()
};


export function navbarActive() {
    let currentNavitem = "";
    sections.forEach( (section) => {
        const secTop = section.offsetTop
        const sectionHeight = section.clientHeight;
        if(scrollY >= secTop - sectionHeight ){
            currentNavitem = section.getAttribute("id")
        };
    });

    // if bottom of page, choose last element
    if ((window.innerHeight + scrollY) >= document.body.offsetHeight) {
        currentNavitem = sections[sections.length-1].getAttribute("id")
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


/*
export const CheckResize = () => {
    window.addEventListener("resize", ResizeWindow)
}

export const ResizeWindow = (e) => {
    const collapsedWindow = window.matchMedia("(min-width: 767px)").matches
    if (scrollY <= 100 & (navbarElement.className == "navbar-toggler" & collapsedWindow)){
        id_value.classList.remove("nb");
        id_value.classList.add("nb-scrolled");
    }
}
*/



