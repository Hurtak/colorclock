/*jshint devel: true */

(function() {
  'use strict';

  function addLeadingZero(time) {
    time = time.toString();
    if (time.length < 2) {
      time = '0' + time;
    }
    return time;
  }

  function linearConversion(number, oldMin, oldMax, newMin, newMax) {
    var oldRange = oldMax - oldMin;
    if (oldRange === 0) {
      return newMax;
    }

    var newRange = newMax - newMin;
    return (((number - oldMin) * newRange) / oldRange) + newMin;
  }

  function timeToHex(time, max) {
    time = linearConversion(time, 0, max, 0, 0xFF);
    time = Math.round(time).toString(16);
    time = addLeadingZero(time).toUpperCase();
    return time;
  }

  var clockDigital = document.getElementById('clock-digital');
  var clockHex = document.getElementById('clock-hex');

  var body = document.getElementById('wrapper');

  setInterval(function(){
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

    body.style.backgroundColor = '#' + color.join('');
    clockHex.innerHTML = color.join(':');

  }, 1000);

}());
