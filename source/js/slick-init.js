$(document).ready(function(){
  $('.teams__list').slick(
    {
      // slide: '.teams__item',
      mobileFirst: true,
      slidesToScroll: 1,
      arrows: false,
      infinite: false,
      rows: 2,
      variableWidth: true,
      swipeToSlide: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: true,
            centerMode: false,
            swipeToSlide: false,
            slidesToScroll: 3,
          }
        }
        // {
        //   breakpoint: 1200,
        //   // settings: "unslick",
        //   settings: {
        //     rows: 3,
        //     // slidesPerRow: 8,
        //   }
        // }
      ]    
    }
  );
});

// $('.slider-left-button').on('click', function() {
//   $('.teams__list').slick('slickPrev');
// })


// $('.slider-right-button').on('click', function() {
//   $('.teams__list').slick('slickNext');
// })