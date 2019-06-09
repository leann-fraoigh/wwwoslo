var nav = document.querySelector(".nav");
var navToggler = nav.querySelector(".nav__toggler");

nav.classList.remove("nav--no-js");
nav.classList.add("nav--menu-closed");

navToggler.addEventListener("click", function () {
  if (nav.classList.contains("nav--menu-closed")) {
    nav.classList.remove("nav--menu-closed");
    nav.classList.add("nav--menu-opened");
  } else {
    nav.classList.add("nav--menu-closed");
    nav.classList.remove("nav--menu-opened");    
  }
})