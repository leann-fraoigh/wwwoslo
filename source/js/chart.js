'use strict';
(function() {
    // Colors
    var COLORS = ['#a6cee3','#1f78b4','#b2df8a','#33a02c', '#8dd3c7', '#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a','#ffffb3','#b15928', '#fccde5', '#ffed6f', '#fb8072', '#b3de69', '#d9d9d9', '#8dd3c7'];

    var w = 413;
    var h = 723;
    var textH = 179;
    var padding = 35;
    var barPadding = 7;
    var labelAddPadding = 2;
    var tickPadding = 15;

  var drawChart = function(section, domainMax, ticksNumber, newDataset) {

    // Clear space
    d3.select("." + section + "__diagram")
    .selectAll("*")
    .remove();

    // Defining Y scale
    var yScale = d3.scaleLinear()
      .domain([0, domainMax])
      .range([(h - textH), 0]);


    // Define Y axis
    var yAxis = d3.axisLeft()
      .scale(yScale)
      .ticks(ticksNumber)
      .tickSizeInner([-w])
      .tickPadding(tickPadding);

    // Create SVG
    var svg = d3.select("." + section + "__diagram")
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
        return Math.floor(yScale(d[section]) + padding);
      })
      // Set bar size
      .attr("width", Math.floor((w - padding)/ newDataset.length - barPadding))
      .attr("height", function(d) {
        return h - textH - Math.floor(yScale(d[section]));
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

  window.chart = {
    drawChart: drawChart,
  }
})();   
