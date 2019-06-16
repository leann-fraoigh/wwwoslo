var Enter = 13;
var Esc = 27;
var teamButtons = document.querySelectorAll(".teams__name");
var overlay = document.querySelector(".overlay");


// Add eventListeners to all modals
for (var i = 0; i < teamButtons.length; i++) {
  var teamButton = teamButtons[i];
  teamButton.addEventListener("click", function (evt) {
    teamCliclHandler(evt);
  });
  teamButton.addEventListener("keydown", function (evt) {
    if (evt.keyCode === Enter) {
      teamKeydownHandler(evt);
    }
  });
};

// Open modal handlers
var teamCliclHandler = function (evt) {
  evt.preventDefault();
  evt.target.nextElementSibling.classList.add("modal--opened");
  overlay.classList.add("overlay--showed");
};

var teamKeydownHandler = function (evt) {
  evt.preventDefault();
  evt.target.nextElementSibling.classList.add("modal--opened");
  overlay.classList.add("overlay--showed");
};

// Close modal handlers
// Not the perfect decision, maybe
window.addEventListener("keydown", function(evt) {
  if (evt.keyCode === 27) {
    if (document.querySelector('.modal--opened') !== undefined) {
      evt.preventDefault();
      document.querySelector('.modal--opened').classList.remove('modal--opened');
      overlay.classList.remove("overlay--showed");
    }
  }
});

overlay.addEventListener("click", function(evt) {
  evt.preventDefault();
  document.querySelector('.modal--opened').classList.remove('modal--opened');
  overlay.classList.remove("overlay--showed");
});