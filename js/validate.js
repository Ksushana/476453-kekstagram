'use strict';

(function () {

  var hashTagForm = window.uploadForm.form.querySelector('.img-upload__text');
  var hashtagInput = window.uploadForm.form.querySelector('.text__hashtags');
  var buttonSubmitElement = window.uploadForm.form.querySelector('.img-upload__submit');

  hashTagForm.addEventListener('keydown', function (evt) {
    if (evt.keydown === window.util.ESC) {
      evt.stopPropagation();
    }
  });

  var validateSpaceBetween = function (hashtag) {
    return !((hashtag.match(/#/g) || []).length > 1);
  };

  var setErrorMessageToHashTags = function (message) {
    hashtagInput.setCustomValidity(message);
    hashtagInput.style.border = '2px solid red';
  };

  var setCorrectMessageToHashTags = function () {
    hashtagInput.setCustomValidity('');
    hashtagInput.style.border = 'none';
  };

  var validateHashTags = function () {
    var value = hashtagInput.value.trim().toLowerCase();
    if (!value || value === '') {
      return true;
    }

    var hashtagArray = value.split(' ');
    var error;
    if (hashtagArray.length > 5) {
      error = window.util.hashtagInputRequirements.maximumAmmount;
    } else if (!window.util.validateUniqueness(hashtagArray)) {
      error = window.util.hashtagInputRequirements.noRepeat;
    } else {
      for (var i = 0; i < hashtagArray.length; i++) {
        var hashtag = hashtagArray[i];
        if (hashtag.charAt(0) !== '#') {
          error = window.util.hashtagInputRequirements.startsWithHash;
        } else if (hashtag === '#') {
          error = window.util.hashtagInputRequirements.minimumTwoSymbols;
        } else if (!validateSpaceBetween(hashtag)) {
          error = window.util.hashtagInputRequirements.spaceBetween;
        } else if (hashtag.length > 20) {
          error = window.util.hashtagInputRequirements.maxLength;
        }
      }
    }

    if (error) {
      setErrorMessageToHashTags(error);
      return false;
    } else {
      setCorrectMessageToHashTags();
      return true;
    }
  };

  hashtagInput.addEventListener('input', validateHashTags);

  buttonSubmitElement.addEventListener('click', function () {
    setCorrectMessageToHashTags();
    validateHashTags();
  });

  window.validations = {
    validateForm: validateHashTags
  };

})();
