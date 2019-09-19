'use strict';
(function() {
  var dataset = window.data.teams_results;
  var buttons = document.querySelectorAll('.score__pagination-button');

  //Width and height
  var section = "score"; // Name of the section and type of the chart
  var domainMax = 50; // Max Score
  var ticksNumber = 51;

  var newDataset = [];

  //Get new data
  var getscore = function (numberOfGame) {
    newDataset = [];
    // Loop through all teams
    for (var i = 0; i < dataset.length; i++) {
      // Add name of the current team to new data array
      newDataset.push({name: dataset[i].name,});
      // Add score of current team
      var currentScore = dataset[i]['game' + numberOfGame].points;
      newDataset[i].score = currentScore;
    }
  } 
  
  var createChartScore = function(button) {
    //Make all buttons not active
    for(var i = 0; i < buttons.length; i++) {
      buttons[i].className = buttons[i].className.replace(" score__pagination-button--active", "");
    }
    // Make current button active
    buttons[button - 1].className += " score__pagination-button--active";
    //Get new data
    getscore(button);
    // Draw chart
    window.chart.drawChart(section, domainMax, ticksNumber, newDataset);
  }

    createChartScore(buttons.length);

    window.score = {
      createChartScore: createChartScore,
    }
})();   