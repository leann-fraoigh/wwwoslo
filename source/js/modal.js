(function(){
  var Enter = 13;
  var Esc = 27;
  var teamButtons = document.querySelectorAll(".teams__name");
  var overlay = document.querySelector(".overlay");
  var closeButtons = document.querySelectorAll(".modal__close-button");
  
  // Open modal function
  var openModal = function (evt) {
    evt.preventDefault();
    evt.target.nextElementSibling.classList.add("modal--opened");
    overlay.classList.add("overlay--showed");
  }
  
  // Close modal function
  var closeModal = function (evt) {
    evt.preventDefault();
    document.querySelector('.modal--opened').classList.remove('modal--opened');
    overlay.classList.remove("overlay--showed");
  }
  
  // Add eventListeners to all preview buttons
  for (var i = 0; i < teamButtons.length; i++) {
    var teamButton = teamButtons[i];
    teamButton.addEventListener("click", function (evt) {
      openModal(evt);
    });
    teamButton.addEventListener("keydown", function (evt) {
      if (evt.keyCode === Enter) {
        openModal(evt);
      }
    });
  };
  
  // Close modal handlers
  // Not the perfect decision, maybe
  window.addEventListener("keydown", function(evt) {
    if (evt.keyCode === 27) {
      if (document.querySelector('.modal--opened') !== undefined) {
        closeModal(evt);
      }
    }
  });
  
  // Click on overlay closes a modal window
  overlay.addEventListener("click", function(evt) {
    closeModal(evt);
  });
  
  // Add closeModal handler to all close buttons
  for (var i = 0; i < closeButtons.length; i++) {
    var closeButton = closeButtons[i];
    closeButton.addEventListener("click", function (evt) {
      closeModal(evt);
    });
    closeButton.addEventListener("keydown", function (evt) {
      if (evt.keyCode === Enter) {
        closeModal(evt);
      }
    });
  };
})();

