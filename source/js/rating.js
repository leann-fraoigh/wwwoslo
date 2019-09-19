'use strict';
(function() {
  var dataset = window.data.teams_results;
  var buttons = document.querySelectorAll('.rating__pagination-button');

  //Width and height
  var section = "rating"; // Name of the section and type of the chart
  var domainMax = ""; // Max Rating
  var ticksNumber = 6;

  var newDataset = [];

  // Get sum of raitings for a team
  var getRating = function(currentTeamIndex, numberOfGames) {
    var totalRating = 0;
    for (var i = 0; i < numberOfGames; i++) {
      totalRating += dataset[currentTeamIndex]["game" + (i + 1)].rating;
    }
    return totalRating;
  }

  //Get new data
  var getAllRatings  = function (numberOfGames) {
    newDataset = [];
    // Loop through all teams
    for (var i = 0; i < dataset.length; i++) {
      // Add name of the current team to new data array
      newDataset.push({name: dataset[i].name,});
      // Get sum of ratings for current team
      var totalRating = getRating(i, numberOfGames);
      // Add new rating to new data array
      newDataset[i].rating = totalRating;
    }
    
  } 
  
  var createChartRating = function(button) {
    //Make all buttons not active
    for(var i = 0; i < buttons.length; i++) {
      buttons[i].className = buttons[i].className.replace(" rating__pagination-button--active", "");
    }
    // Make current button active
    buttons[button - 1].className += " rating__pagination-button--active";
    //Get new data
    getAllRatings(button);
    //Calculate max rating
    domainMax = d3.max(newDataset, function(d) {return d.rating; });
    // Draw chart
    window.chart.drawChart(section, domainMax, ticksNumber, newDataset);

  }

    createChartRating(buttons.length);

    window.rating = {
      createChartRating: createChartRating,
    }
})();   