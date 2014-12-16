/*jshint devel: true */

var clock = (function() {
  'use strict';

  var clockDigital = document.getElementById('clock-digital');
  var clockHex = document.getElementById('clock-hex');
  var background = document.getElementById('wrapper');

  function addLeadingZero(time) {
    time = time.toString();
    if (time.length < 2) {
      time = '0' + time;
    }

    return time;
  }

  function timeToHex(time, max) {
    time = time * 255 / max;
    time = Math.round(time).toString(16);
    time = addLeadingZero(time).toUpperCase();

    return time;
  }

  function tick() {
      var date = new Date();
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var seconds = date.getSeconds();

      clockDigital.innerHTML = addLeadingZero(hours) + ':' +
                               addLeadingZero(minutes) + ':' +
                               addLeadingZero(seconds);

      var color = [
        timeToHex(hours, 23),
        timeToHex(minutes, 59),
        timeToHex(seconds, 59)
      ];

      background.style.backgroundColor = '#' + color.join('');
      clockHex.innerHTML = '#' + color.join(':');
  }

  function init() {
    tick();
    setInterval(tick, 1000);
  }

  return {
    init: init
  };

}());

clock.init();

