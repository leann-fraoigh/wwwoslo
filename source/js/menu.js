(function(){
  var nav = document.querySelector(".nav");
  var navToggler = nav.querySelector(".nav__toggler");
  var menyLinks = document.querySelectorAll(".menu__link");
  
  nav.classList.remove("nav--no-js");
  nav.classList.add("nav--menu-closed");
  
  // Close menu
   var closeMenu = function() {
    nav.classList.add("nav--menu-closed");
    nav.classList.remove("nav--menu-opened"); 
   }
  
   // Open menu
   var openMenu = function() {
    nav.classList.remove("nav--menu-closed");
    nav.classList.add("nav--menu-opened");
   }
  
  navToggler.addEventListener("click", function () {
    if (nav.classList.contains("nav--menu-closed")) {
      openMenu();
    } else {
      closeMenu();
    }
  })
  
  
  // Add eventListeners to all links
  for (var i = 0; i < menyLinks.length; i++) {
    menyLinks[i].addEventListener('click', closeMenu);
  }
})();