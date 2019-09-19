'use strict';
(function() {
  var dataset = window.data.teams_results;
  var buttons = document.querySelectorAll('.score__pagination-button');

  // Colors
  var COLORS = ['#a6cee3','#1f78b4','#b2df8a','#33a02c', '#8dd3c7', '#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a','#ffffb3','#b15928', '#fccde5', '#ffed6f', '#fb8072', '#b3de69', '#d9d9d9', '#8dd3c7'];

  //Width and height
  var w = 413;
  var h = 723;
  var textH = 179;
  var padding = 35;
  var barPadding = 7;
  var labelAddPadding = 2;
  var maxScore = 50;

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
  
  var createChart2 = function(button) {
    //Make all buttons not active
    for(var i = 0; i < buttons.length; i++) {
      buttons[i].className = buttons[i].className.replace(" score__pagination-button--active", "");
    }
    // Make current button active
    buttons[button - 1].className += " score__pagination-button--active";
    //Get new data
    getscore(button);
    // Draw chart
    drawChart();
  }

  var drawChart = function() {

    // Clear space
    d3.select(".score__diagram")
    .selectAll("*")
    .remove();

    // Defining Y scale
    var yScale = d3.scaleLinear()
      .domain([0, maxScore])
      .range([(h - textH), 0]);


    // Define Y axis
    var yAxis = d3.axisLeft()
      .scale(yScale)
      .ticks(51)
      .tickSizeInner([-w])
      .tickPadding(15);

    // Create SVG
    var svg = d3.select(".score__diagram")
      .append("svg")
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0" + " " + w + " " + h);

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
        return Math.floor(i * ((w - padding) / newDataset.length) + padding);
      })
      .attr("y", function(d) {
        return Math.floor(yScale(d.score) + padding);
      })
      // Set bar size
      .attr("width", Math.floor((w - padding)/ newDataset.length - barPadding))
      .attr("height", function(d) {
        return h - textH - Math.floor(yScale(d.score));
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
      .attr('transform', function(d,i) {
      return 'translate( ' + (i * ((w - padding) / newDataset.length) + padding + labelAddPadding) + ' , '+(h - textH + padding + barPadding)+'),'+ 'rotate(90)';})
      .attr("fill", "white");
  }  

    createChart2(buttons.length);

    window.score = {
      createChart2: createChart2,
    }
})();   