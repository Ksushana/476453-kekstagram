'use strict';

(function () {
  var URL_POST = 'https://js.dump.academy/kekstagram';

  var RESIZE_STEP = 25;
  var RESIZE_MIN_VALUE = 25;
  var RESIZE_MAX_VALUE = 100;
  var SPIN_MINIMUM_VALUE = 0;

  var body = document.querySelector('body');
  var form = document.querySelector('.img-upload__form');
  var scale = form.querySelector('.scale');
  var scalePin = scale.querySelector('.scale__pin');
  var formImgElement = form.querySelector('.img-upload__preview img');
  var effectLevelInput = form.querySelector('.scale__value');
  var effectLevel = scale.querySelector('.scale__level');
  // UPLOAD

  var imageUploadOverlay = form.querySelector('.img-upload__overlay');
  var fileInput = form.querySelector('.img-upload__input');
  var formCloseButton = form.querySelector('.img-upload__cancel');

  var addEffectChangeListeners = function () {
    body.addEventListener('change', window.filter.onEffectRadioInputChange);
  };

  var removeEffectChangeListeners = function () {
    body.removeEventListener('change', window.filter.onEffectRadioInputChange);
  };

  var showForm = function () {
    imageUploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onFormEscPress);
    formCloseButton.addEventListener('click', onFormCloseButtonClick);
    scalePin.addEventListener('mousedown', onPinDownClick);
    resizeIncreasingButton.addEventListener('click', onResizeIncreasingButton);
    resizeDecreasingButton.addEventListener('click', onResizeDecreasingButton);

    addEffectChangeListeners();
    window.filter.hideScale();
  };

  var hideForm = function () {
    imageUploadOverlay.classList.add('hidden');
    fileInput.value = '';

    document.removeEventListener('keydown', onFormEscPress);
    formCloseButton.removeEventListener('click', onFormCloseButtonClick);
    scalePin.removeEventListener('mousedown', onPinDownClick);
    resizeIncreasingButton.removeEventListener('click', onResizeIncreasingButton);
    resizeDecreasingButton.removeEventListener('click', onResizeDecreasingButton);

    removeEffectChangeListeners();
    window.filter.resetFilters();
  };

  var onFileInputChange = function () {
    showForm();
  };

  var onFormCloseButtonClick = function () {
    hideForm();
  };

  var onFormEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC) {
      hideForm();
    }
  };

  // РЕСАЙЗ

  var resizeDecreasingButton = form.querySelector('.resize__control--minus');
  var resizeIncreasingButton = form.querySelector('.resize__control--plus');
  var photoSizeInput = form.querySelector('.resize__control--value');

  var changePhotoSize = function (size) {
    var transformValue = 'scale(' + size / 100 + ')';
    formImgElement.style.transform = transformValue;
    photoSizeInput.value = size + '%';
  };

  var increasePhotoSize = function () {
    var currentSize = parseInt(photoSizeInput.value, 10);
    var newSize = currentSize + RESIZE_STEP;
    if (newSize > RESIZE_MAX_VALUE) {
      return;
    }
    changePhotoSize(newSize);
  };

  var decreasePhotoSize = function () {
    var currentSize = parseInt(photoSizeInput.value, 10);
    var newSize = currentSize - RESIZE_STEP;
    if (newSize < RESIZE_MIN_VALUE) {
      return;
    }
    changePhotoSize(newSize);
  };

  var onResizeDecreasingButton = function () {
    decreasePhotoSize();
  };

  var onResizeIncreasingButton = function () {
    increasePhotoSize();
  };

  // Перетаскивание

  var onPinDownClick = function (evt) {
    evt.preventDefault();

    var pinCoords = scalePin.getBoundingClientRect();
    var scaleCoords = scale.getBoundingClientRect();
    var xShift = evt.pageX - (pinCoords.left + pinCoords.width / 2);

    var onMouseDragging = function (moveEvt) {
      var newCoords = moveEvt.pageX - scaleCoords.left - xShift;
      var maxCoords = scaleCoords.width;

      if (newCoords < SPIN_MINIMUM_VALUE) {
        newCoords = 0;
      }

      if (newCoords > maxCoords) {
        newCoords = maxCoords;
      }

      effectLevelInput.value = Math.round(newCoords * 100 / scaleCoords.width);
      scalePin.style.left = effectLevelInput.value + '%';
      effectLevel.style.width = scalePin.style.left;
      window.filter.changeEffectLevel();
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      onMouseDragging(moveEvt);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      onMouseDragging(upEvt);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  fileInput.addEventListener('change', onFileInputChange);

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    if (window.validations.validateForm()) {
      submitForm();
    }
  };

  var resetForm = function () {
    form.reset();
    window.filter.resetFilters();
  };

  var submitForm = function () {
    var formData = new FormData(form);
    window.util.hideError();
    window.backend.request(URL_POST, 'POST', formData, function () {
      hideForm();
      resetForm();
    }, function (error) {
      window.util.showError(error);
    });
  };

  // hashtagInput.addEventListener('input', onFormSubmit);
  form.addEventListener('submit', onFormSubmit);

  window.uploadForm = {
    form: form,
    scale: scale,
    scalePin: scalePin,
    formImgElement: formImgElement,
    effectLevelInput: effectLevelInput,
    effectLevel: effectLevel
  };
})();
