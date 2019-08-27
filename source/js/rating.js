'use strict';
(function() {
  var dataset = window.data.teams_results;
  var buttons = document.querySelectorAll('.rating__pagination-button');

  // Colors
  var COLORS = ['#a6cee3','#1f78b4','#b2df8a','#33a02c', '#8dd3c7', '#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a','#ffffb3','#b15928', '#fccde5', '#ffed6f', '#fb8072', '#b3de69', '#d9d9d9', '#8dd3c7'];

  //Width and height
  var w = 413;
  var h = 723;
  var textH = 179;
  var padding = 35;
  var barPadding = 7;

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

  
  var createChart = function(button) {
    //Make all buttons not active
    for(var i = 0; i < buttons.length; i++) {
      buttons[i].className = buttons[i].className.replace(" rating__pagination-button--active", "");
    }
    // Make current button active
    buttons[button - 1].className += " rating__pagination-button--active";
    getAllRatings(button);
    drawChart();
  }



  var drawChart = function() {

    // Clear space
    d3.select(".rating__diagram")
    .selectAll("*")
    .remove();

    // Defining Y scale
    var yScale = d3.scaleLinear()
      .domain([0, d3.max(newDataset, function(d) {return d.rating; })]).nice()
      .range([(h - textH), 0]);


    // Define Y axis
    var yAxis = d3.axisLeft()
      .scale(yScale)
      .ticks(6)
      .tickSizeInner([-w])
      .tickPadding(15);

    // Create SVG
    var svg = d3.select(".rating__diagram")
      .append("svg")
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0" + " " + w + " " + h);
      // .attr("width", w)
      // .attr("height", h);

    // Create Y axis 
    svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(" + (padding - barPadding) + "," + padding + ")")
      .call(yAxis);

    // Create bars
    svg
      .append("g")
      .attr("class", "data")
      .selectAll("rect")
      .data(newDataset)
      .enter()
      .append("rect")
      // Set bar position
      .attr("x", function(d, i) {
        return i * ((w - padding) / newDataset.length) + padding;
      })
      .attr("y", function(d) {
        return yScale(d.rating) + padding;
      })
      // Set bar size
      .attr("width", (w - padding)/ newDataset.length - barPadding)
      .attr("height", function(d) {
        return h - textH - yScale(d.rating);
      })
      .attr("fill", function(d, i) {
        return COLORS[i];
      });

    // Add labels
    svg.select(".data")
      .selectAll("text")
      .data(newDataset)
      .enter()
      .append("text")
      .text(function(d) {
        return d.name;
      })
      .attr("x", function(d, i) {
        return i * ((w - padding) / newDataset.length) + (w / newDataset.length - barPadding) / 2 + padding;
      })
      .attr("y", function(d) {
        return h - textH + padding + 7;
      })
      // .attr("font-size", "14px")
      .attr("style", "writing-mode: vertical-rl")
      .attr("fill", "white");
    }  

    createChart(buttons.length);

    window.rating = {
      createChart: createChart,
    }
})();   