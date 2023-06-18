const sections = document.querySelectorAll("section")
const navElements = document.querySelectorAll("header #navbarNav ul li a.nav-link")

export default window.onscroll = function() {
    navbarActive()
};

export function navbarActive() {
    var currentNavitem = "";
    sections.forEach( (section) => {
        var secTop = section.offsetTop
        if(scrollY>=secTop-200){
            currentNavitem = section.getAttribute("id")
        };
    });

    navElements.forEach((a) => {
        a.classList.remove("active")
        if(a.classList.contains(currentNavitem)){
            a.classList.add("active")
        };
    });

};

