(function(){
  var teamItems = document.querySelectorAll(".teams__item");

  var sliderContainer = document.querySelector(".teams__list-container");
  var slider = document.querySelector(".teams__list");
  var card = slider.querySelector(".teams__item")
  var rightButton = document.querySelector(".teams__slider-button--right");
  var leftButton = document.querySelector(".teams__slider-button--left");
  
  var sliderWidth = slider.offsetWidth;
  var cardMargin = 3; // Margin right of tht .teams__item element
  var cardWidth = card.offsetWidth + cardMargin;
  var cardCount = slider.querySelectorAll(".teams__item").length;
  
  if (/Mobi|Android/i.test(navigator.userAgent)) {
    leftButton.style.display = "none";
    rightButton.style.display = "none";
    slider.style.overflow = "scroll";
  } else {
    // Set left button disabled
    leftButton.disabled = true;
    
    // Add event listener to the right button 
    rightButton.addEventListener("click", function () {
      event.preventDefault();
      
      // Scroll if possible
      if (slider.scrollLeft < slider.scrollLeftMax) {
        slider.scrollLeft += cardWidth;
      }
      
      // Enable left button 
      if (leftButton.disabled) {
        leftButton.disabled = false;
      }
    
      // Disable the button if the maximum scroll reached
      if (slider.scrollLeft >= slider.scrollLeftMax) {
        rightButton.disabled = true;
      }
    })
    
    // Add event listener to the left button
    leftButton.addEventListener("click", function () {
      event.preventDefault();
      // Scroll if possible
      if (slider.scrollLeft !== 0) {
        slider.scrollLeft -= cardWidth;
      }
      // Enable right button
      if (rightButton.disabled) {
        rightButton.disabled = false;
      }
      // Disable the button if the maximum scroll reached
      if (slider.scrollLeft === 0) {
        leftButton.disabled = true;
      }
    })
    
    
    // Disabling/enabling buttons if tab used to navigate though the list
    for (var i = 0; i < teamItems.length; i++) {
      var teamItem = teamItems[i];
      teamItem.addEventListener("focusin", function () {
    
        if (slider.scrollLeft >= slider.scrollLeftMax) {
          rightButton.disabled = true;
        }
        if (slider.scrollLeft === 0) {
          leftButton.disabled = true;
        }
        if (slider.scrollLeft < slider.scrollLeftMax && slider.scrollLeft !== 0) {
          leftButton.disabled = false;
          rightButton.disabled = false;
        }
      });
    };
  }
})()