'use strict';

(function () {
  var DEFAULT_RAMDOM_MIN = 1;
  var DEFAULT_RAMDOM_MAX = 100;

  var util = {
    ESC: 27
  };

  util.getRandomInteger = function (max, min) {
    min = min || DEFAULT_RAMDOM_MIN;
    max = max || DEFAULT_RAMDOM_MAX;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  util.getRandomElement = function (array) {
    var randomIndex = util.getRandomInteger(array.length - 1);
    return array[randomIndex];
  };

  window.util = util;
})();