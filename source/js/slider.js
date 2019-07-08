var teamItems = document.querySelectorAll(".teams__item");

var sliderContainer = document.querySelector(".teams__list-container");
var slider = document.querySelector(".teams__list");
var card = slider.querySelector(".teams__item")
var rightButton = document.querySelector(".teams__slider-button--right");
var leftButton = document.querySelector(".teams__slider-button--left");

var sliderWidth = slider.offsetWidth;
var cardWidth = card.offsetWidth;
var cardCount = slider.querySelectorAll(".teams__item").length;

// var maxX = ((Math.ceil(cardCount / 2) * cardWidth) - sliderWidth);
slider.scrollLeftMax += cardWidth;
var maxX = slider.scrollLeftMax;

if (/Mobi|Android/i.test(navigator.userAgent)) {
  leftButton.style.display = "none";
  rightButton.style.display = "none";
  slider.style.overflow = "scroll";
} else {
  // Set left button disabled
  leftButton.disabled = true;
  
  
  // Right button 
  rightButton.addEventListener("click", function () {
    event.preventDefault();
    
    if (slider.scrollLeft < maxX) {
      slider.scrollLeft += cardWidth;
    }
    
    if (leftButton.disabled) {
      leftButton.disabled = false;
    }
  
    if (slider.scrollLeft >= maxX) {
      rightButton.disabled = true;
    }
  })
  
  // Left button
  leftButton.addEventListener("click", function () {
    event.preventDefault();
    if (slider.scrollLeft !== 0) {
      slider.scrollLeft -= cardWidth;
    }
  
    if (rightButton.disabled) {
      rightButton.disabled = false;
    }
  
    if (slider.scrollLeft === 0) {
      leftButton.disabled = true;
    }
  })
  
  
  // Disabling/enabling buttons if tab used to navigate though the list
  for (var i = 0; i < teamItems.length; i++) {
    var teamItem = teamItems[i];
    teamItem.addEventListener("focusin", function () {
  
      if (slider.scrollLeft >= maxX) {
        rightButton.disabled = true;
      }
      if (slider.scrollLeft === 0) {
        leftButton.disabled = true;
      }
      if (slider.scrollLeft < maxX && slider.scrollLeft !== 0) {
        leftButton.disabled = false;
        rightButton.disabled = false;
      }
    });
  };
}