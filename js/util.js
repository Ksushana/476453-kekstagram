'use strict';

(function () {
  var DEFAULT_RAMDOM_MIN = 1;
  var DEFAULT_RAMDOM_MAX = 100;
  var messageErrorElement = document.querySelector('.message_error');

  var showError = function (message) {
    messageErrorElement.classList.remove('hidden');
    messageErrorElement.textContent = message;
  };

  var hideError = function () {
    messageErrorElement.classList.add('hidden');
  };

  var getRandomInteger = function (max, min) {
    min = min || DEFAULT_RAMDOM_MIN;
    max = max || DEFAULT_RAMDOM_MAX;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var validateUniqueness = function (array) {
    var presentElements = {};

    for (var i = 0; i < array.length; i++) {
      var item = array[i];
      if (presentElements[item]) {
        return false;
      }
      presentElements[item] = true;
    }

    return true;
  };

  window.util = {
    showError: showError,
    hideError: hideError,
    getRandomInteger: getRandomInteger,
    validateUniqueness: validateUniqueness,
    ESC: 27
  };
})();
