'use strict';

(function () {

  var EFFECT_PARAMS = {
    chrome: {filter: 'grayscale', min: 0, max: 1, unit: null},
    sepia: {filter: 'sepia', min: 0, max: 1, unit: null},
    marvin: {filter: 'invert', min: 0, max: 100, unit: '%'},
    phobos: {filter: 'blur', min: 0, max: 3, unit: 'px'},
    heat: {filter: 'brightness', min: 1, max: 3, unit: null}
  };
  var RESIZE_STEP = 25;
  var RESIZE_MIN_VALUE = 25;
  var RESIZE_MAX_VALUE = 100;
  var SPIN_DEFAULT_VALUE = 100;
  var SPIN_MINIMUM_VALUE = 0;

  var exports = {};

  var form = document.querySelector('.img-upload__form');
  exports.form = form;

  var body = document.querySelector('body');
  // UPLOAD

  var imageUploadOverlay = form.querySelector('.img-upload__overlay');
  var fileInput = form.querySelector('.img-upload__input');
  var formCloseButton = form.querySelector('.img-upload__cancel');

  var addEffectChangeListeners = function () {
    body.addEventListener('change', onEffectRadioInputChange);
  };

  var removeEffectChangeListeners = function () {
    body.removeEventListener('change', onEffectRadioInputChange);
  };

  var showForm = function () {
    imageUploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onFormEscPress);
    formCloseButton.addEventListener('click', onFormCloseButtonClick);
    scalePin.addEventListener('mousedown', onPinDownClick);
    resizeIncreasingButton.addEventListener('click', onResizeIncreasingButton);
    resizeDecreasingButton.addEventListener('click', onResizeDecreasingButton);

    addEffectChangeListeners();
    hideScale();
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
    resetFilters();
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

  // Фильтры//

  var scale = form.querySelector('.scale');
  var scalePin = scale.querySelector('.scale__pin');
  var formImgElement = form.querySelector('.img-upload__preview img');
  var effectLevelInput = form.querySelector('.scale__value');
  var effectLevel = scale.querySelector('.scale__level');

  var getSpinPercent = function () {
    var percent = parseInt(scalePin.style.left, 10);
    return percent;
  };

  var changeSpinPosition = function (percent) {
    if (!percent && percent !== 0) {
      percent = 100;
    }

    scalePin.style.left = percent + '%';
    effectLevel.style.width = percent + '%';
  };

  var hideScale = function () {
    scale.classList.add('hidden');
  };

  var showScale = function () {
    scale.classList.remove('hidden');
  };

  var applyFilter = function () {
    var percent = effectLevelInput.value;
    var effectName = form.querySelector('.effects__radio:checked').value;
    if (effectName === 'none') {
      hideScale();
    } else {
      showScale();
    }
    applyFilterCss(effectName, percent);
  };

  var applyFilterCss = function (effect, percent) {
    var cssClass = 'effects__preview--' + effect;
    formImgElement.className = '';
    formImgElement.classList.add(cssClass);
    var filterValue = calcFilterValue(effect, percent);
    formImgElement.style.webkitFilter = filterValue;
    formImgElement.style.filter = filterValue;
  };

  var resetFilters = function () {
    form.querySelector('.effects__radio:checked').checked = false;
    formImgElement.className = '';
  };

  var calcFilterValue = function (effect, percent) {
    if (effect === 'none') {
      return '';
    }

    var effectParams = EFFECT_PARAMS[effect];
    var filterName = effectParams.filter;
    var unit = effectParams.unit || '';
    var range = effectParams.max - effectParams.min;

    var filterNumberValue = range * (percent / 100) + effectParams.min;
    var filterValue = filterName + '(' + filterNumberValue + unit + ')';
    return filterValue;
  };

  var changeEffectLevel = function () {
    effectLevelInput.value = getSpinPercent();
    applyFilter();
  };

  var changeEffect = function () {
    changeSpinPosition(SPIN_DEFAULT_VALUE);
    effectLevelInput.value = SPIN_DEFAULT_VALUE;
    applyFilter();
  };


  var onEffectRadioInputChange = function (evt) {
    if (evt.target.name === 'effect') {
      changeEffect();
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
      changeEffectLevel();
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

  window.uploadForm = exports;
})();
