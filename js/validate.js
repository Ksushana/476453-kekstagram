'use strict';

(function () {

  var exports = {};

  var hashTagForm = window.uploadForm.form.querySelector('.img-upload__text');
  var hashtagInput = window.uploadForm.form.querySelector('.text__hashtags');

  hashTagForm.addEventListener('keydown', function (evt) {
    if (evt.keydown === window.util.ESC) {
      evt.stopPropagation();
    }
  });

  var validateSpaceBetween = function (hashtag) {
    return !((hashtag.match(/#/g) || []).length > 1);
  };

  var hashtagInputRequirements = {
    startsWithHash: 'Хэш-теги должны начинаться с символа # (решётка)',
    minimumTwoSymbols: 'Хеш-тег не может состоять только из одной решётки',
    spaceBetween: 'Хэш-теги должны разделяться пробелами',
    noRepeat: 'Один и тот же хэш-тег не может быть использован дважды',
    maximumAmmount: 'Нельзя указать больше пяти хэш-тегов',
    maxLength: 'Максимальная длина одного хэш-тега 20 символов, включая знак #'
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

  var validateHashTags = function () {
    hashtagInput.setCustomValidity('');

    var value = hashtagInput.value.trim().toLowerCase();
    if (!value || value === '') {
      return true;
    }

    var hashtagArray = value.split(' ');
    if (hashtagArray.length > 5) {
      hashtagInput.setCustomValidity(hashtagInputRequirements.maximumAmmount);
      return false;
    } else if (!validateUniqueness(hashtagArray)) {
      hashtagInput.setCustomValidity(hashtagInputRequirements.noRepeat);
      return false;
    } else {
      for (var i = 0; i < hashtagArray.length; i++) {
        var hashtag = hashtagArray[i];
        if (hashtag.charAt(0) !== '#') {
          hashtagInput.setCustomValidity(hashtagInputRequirements.startsWithHash);
          return false;
        } else if (hashtag === '#') {
          hashtagInput.setCustomValidity(hashtagInputRequirements.minimumTwoSymbols);
          return false;
        } else if (!validateSpaceBetween(hashtag)) {
          hashtagInput.setCustomValidity(hashtagInputRequirements.spaceBetween);
          return false;
        } else if (hashtag.length > 20) {
          hashtagInput.setCustomValidity(hashtagInputRequirements.maxLength);
          return false;
        }
      }
    }

    return true;
  };

  var validateForm = function () {
    return validateHashTags();
  };
  exports.validateForm = validateForm;

  window.validations = exports;

})();
