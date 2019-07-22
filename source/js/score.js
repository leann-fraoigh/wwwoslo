'use strict';
(function() {
  var COLORS = ['#a6cee3','#1f78b4','#b2df8a','#33a02c', '#8dd3c7', '#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a','#ffffb3','#b15928', '#fccde5', '#ffed6f', '#fb8072', '#b3de69', '#d9d9d9', '#8dd3c7'];
  var BAR_HEIGHT_INDEX = 10;

  var diagramTemplate = document.querySelector('#score__diagram-template');
  var diagram = document.querySelector('.score__diagram');
  var buttons = document.querySelectorAll('.score__pagination-button');


  var drawChart = function (event, button) {
    // Draw one bar (virtually)
    var createBar = function (points, color, name) {
      var clonedBar = document.importNode(diagramTemplate.content, true)
      .querySelector('.score__diagram-element-container');
      var bar = clonedBar.querySelector('.score__diagram-element');
      bar.style.height = points * BAR_HEIGHT_INDEX + "px";
      bar.style.backgroundColor = color;
      clonedBar.querySelector('.score__diagram-element-name').textContent = name;
      clonedBar.querySelector('.score__diagram-element-data').textContent = points;
      return clonedBar;
    };
    
    for (var i = 0; i < window.data.teams_results.length; i++) {
      var currentTeam = window.data.teams_results[i];
      // var buttonNumber = type.target.classList[1].slice(26, 27);
      var buttonNumber = button;
      var gameNumber = 'game' + buttonNumber;
      var currentRating = currentTeam[gameNumber].points;
      var currentColor = COLORS[i];
      var currentName = currentTeam.name;
      // Create and insert bars
      diagram.appendChild(createBar(currentRating, currentColor, currentName));
    }
  };

  // if template works, render and insert chart
  var createChart = function(event, button) {
    // Make all button not active
    for(var i = 0; i < buttons.length; i++) {
      buttons[i].className = buttons[i].className.replace(" score__pagination-button--active", "");
    }
    // Make current button active
    buttons[button - 1].className += " score__pagination-button--active";

    if ('content' in document.createElement('template')) {
      while (diagram.firstChild) {
        diagram.removeChild(diagram.firstChild);
      }
      drawChart(event, button);
    } else {
      var message = 'Извините, эта функция не работает в вашем браузере';
      var p = document.createElement('p');
      diagram.appendChild(p);
    }
  };  

  createChart('click', buttons.length);

  window.score = {
    createChart: createChart,
  }
})();  