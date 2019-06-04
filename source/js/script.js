'use strict';

var COLORS = ['#a6cee3','#1f78b4','#b2df8a','#33a02c', '#8dd3c7', '#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a','#ffffb3','#b15928', '#fccde5', '#ffed6f', '#fb8072', '#b3de69', '#d9d9d9', '#8dd3c7'];
var BAR_HEIGHT_INDEX = 10;

var barTemplate = document.querySelector('#bar-template');
var chartElement = document.querySelector('.bar-chart');


var drawChart = function (type) {
  // Draw one bar (virtually)
  var createBar = function (points, color, name) {
    var clonedBar = document.importNode(barTemplate.content, true)
    .querySelector('.bar-chart__element-container');
    var bar = clonedBar.querySelector('.bar-chart__element');
    bar.style.height = points * BAR_HEIGHT_INDEX + "px";
    bar.style.backgroundColor = color;
    clonedBar.querySelector('.bar-chart__element-name').textContent = name;
    clonedBar.querySelector('.bar-chart__element-data').textContent = points;
    return clonedBar;
  };
  
  for (var i = 0; i < TEAMS_RESULTS.length; i++) {
    var currentTeam = TEAMS_RESULTS[i];
    var buttonNumber = type.target.classList[1].slice(20, 21);
    var gameNumber = 'game' + buttonNumber;
    var currentRating = currentTeam[gameNumber].points;
    var currentColor = COLORS[i];
    var currentName = currentTeam.name;
    // Create and insert bars
    chartElement.appendChild(createBar(currentRating, currentColor, currentName));
  }
};

// if template works, render and insert chart
var createChart = function(type) {
  if ('content' in document.createElement('template')) {
    while (chartElement.firstChild) {
      chartElement.removeChild(chartElement.firstChild);
    }
    drawChart(type);
  } else {
    var message = 'Извините, эта функция не работает в вашем браузере';
    var p = document.createElement('p');
    chartElement.appendChild(p);
  }
};  

// Click on buttons
var button = document.querySelector('.pagination__button--1');
button.addEventListener('click', createChart);

var button2 = document.querySelector('.pagination__button--2');
button2.addEventListener('click', createChart);

var button3 = document.querySelector('.pagination__button--3');
button3.addEventListener('click', createChart);

var button3 = document.querySelector('.pagination__button--4');
button3.addEventListener('click', createChart);

