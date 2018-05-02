'use strict';

(function () {
  var DEFAULT_RAMDOM_MIN = 1;
  var DEFAULT_RAMDOM_MAX = 100;
  var DEBOUNCE_INTERVAL = 200;
  var messageErrorElement = document.querySelector('.message_error');
  var debounceTimeout;

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

  var debounce = function (callback) {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
      debounceTimeout = null;
      debounceTimeout = setTimeout(callback, DEBOUNCE_INTERVAL);
    } else {
      callback();
      debounceTimeout = setTimeout(function () {
        debounceTimeout = null;
      }, DEBOUNCE_INTERVAL);
    }
  };

  window.util = {
    showError: showError,
    hideError: hideError,
    getRandomInteger: getRandomInteger,
    validateUniqueness: validateUniqueness,
    debounce: debounce,
    ESC: 27
  };
})();
