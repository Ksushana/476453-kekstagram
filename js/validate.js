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

  var hashtagInputRequirements = {
    startsWithHash: 'Хэш-теги должны начинаться с символа # (решётка)',
    minimumTwoSymbols: 'Хеш-тег не может состоять только из одной решётки',
    spaceBetween: 'Хэш-теги должны разделяться пробелами',
    noRepeat: 'Один и тот же хэш-тег не может быть использован дважды',
    maximumAmmount: 'Нельзя указать больше пяти хэш-тегов',
    maxLength: 'Максимальная длина одного хэш-тега 20 символов, включая знак #'
  };

  var validateHashTags = function () {
    var value = hashtagInput.value.trim().toLowerCase();
    if (!value || value === '') {
      return true;
    }

    var hashtagArray = hashtagInput.value.split(' ');
    var error;
    if (hashtagArray.length > 5) {
      error = hashtagInputRequirements.maximumAmmount;
    } else if (!window.util.validateUniqueness(hashtagArray)) {
      error = hashtagInputRequirements.noRepeat;
    } else {
      for (var i = 0; i < hashtagArray.length; i++) {
        var hashtag = hashtagArray[i];
        if (hashtag.charAt(0) !== '#') {
          error = hashtagInputRequirements.startsWithHash;
        } else if (hashtag === '#') {
          error = hashtagInputRequirements.minimumTwoSymbols;
        } else if (!validateSpaceBetween(hashtag)) {
          error = hashtagInputRequirements.spaceBetween;
        } else if (hashtag.length > 20) {
          error = hashtagInputRequirements.maxLength;
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
