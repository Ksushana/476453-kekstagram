'use strict';

(function () {
  var EFFECT_PARAMS = {
    chrome: {filter: 'grayscale', min: 0, max: 1, unit: null},
    sepia: {filter: 'sepia', min: 0, max: 1, unit: null},
    marvin: {filter: 'invert', min: 0, max: 100, unit: '%'},
    phobos: {filter: 'blur', min: 0, max: 3, unit: 'px'},
    heat: {filter: 'brightness', min: 1, max: 3, unit: null}
  };
  var SPIN_DEFAULT_VALUE = 100;

  var getSpinPercent = function () {
    var percent = parseInt(window.uploadForm.scalePin.style.left, 10);
    return percent;
  };

  var changeSpinPosition = function (percent) {
    if (!percent && percent !== 0) {
      percent = 100;
    }
    window.uploadForm.scalePin.style.left = percent + '%';
    window.uploadForm.effectLevel.style.width = percent + '%';
  };

  var hideScale = function () {
    window.uploadForm.scale.classList.add('hidden');
  };

  var showScale = function () {
    window.uploadForm.scale.classList.remove('hidden');
  };

  var applyFilter = function () {
    var percent = window.uploadForm.effectLevelInput.value;
    var effectName = window.uploadForm.form.querySelector('.effects__radio:checked').value;
    if (effectName === 'none') {
      hideScale();
    } else {
      showScale();
    }
    applyFilterCss(effectName, percent);
  };

  var applyFilterCss = function (effect, percent) {
    var cssClass = 'effects__preview--' + effect;
    window.uploadForm.formImgElement.className = '';
    window.uploadForm.formImgElement.classList.add(cssClass);
    var filterValue = calcFilterValue(effect, percent);
    window.uploadForm.formImgElement.style.webkitFilter = filterValue;
    window.uploadForm.formImgElement.style.filter = filterValue;
  };

  var resetFilters = function () {
    window.uploadForm.form.querySelector('.effects__radio:checked').checked = false;
    window.uploadForm.formImgElement.className = '';
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
    window.uploadForm.effectLevelInput.value = getSpinPercent();
    applyFilter();
  };

  var changeEffect = function () {
    changeSpinPosition(SPIN_DEFAULT_VALUE);
    window.uploadForm.effectLevelInput.value = SPIN_DEFAULT_VALUE;
    applyFilter();
  };

  var onEffectRadioInputChange = function (evt) {
    if (evt.target.name === 'effect') {
      changeEffect();
    }
  };

  window.filter = {
    hideScale: hideScale,
    resetFilters: resetFilters,
    changeEffectLevel: changeEffectLevel,
    onEffectRadioInputChange: onEffectRadioInputChange
  };

})();
