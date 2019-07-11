var tablinks = document.querySelectorAll(".games__tab-button");
var tabcontent = document.querySelectorAll(".games__stat");

var openTab = function(evt, tabName) {
  // Hide all tabs
   for(var i = 0; i < tabcontent.length; i++) {
     tabcontent[i].style.display = "none";
   }

   // Make all buttons not active
   for(var i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" games__tab-button--active", "");
   }

   // Show current tab and make current button active
   document.getElementById(tabName).style.display = "block";
   event.target.className += " games__tab-button--active";
}

// openTab("click", "score");
