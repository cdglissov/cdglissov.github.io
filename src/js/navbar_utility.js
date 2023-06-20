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
        if(scrollY >= secTop - sectionHeight / 3){
            currentNavitem = section.getAttribute("id")
        };
    });

    // if bottom of page, choose last element
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
        currentNavitem = sections[sections.length-1].getAttribute("id")
    }

    navElements.forEach((a) => {
        a.classList.remove("active")
        if(a.classList.contains(currentNavitem)){
            a.classList.add("active")
        };
    });

};


const id_value = document.getElementById("navigationbar")
const home_val = document.getElementById("home")
export function navbarScrolled() {
    if (scrollY > 100) {
        id_value.classList.remove("nb");
        id_value.classList.add("nb-scrolled");
      } else {
        id_value.classList.remove("nb-scrolled");
        id_value.classList.add("nb");
      }
}

