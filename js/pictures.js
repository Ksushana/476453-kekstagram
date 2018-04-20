'use strict';

var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var DISCRIPTIONS = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];
var PHOTOS_AMMOUNT = 25;
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var COMMENTS_MIN = 1;
var COMMENTS_MAX = 2;
var DEFAULT_RAMDOM_MIN = 1;
var DEFAULT_RAMDOM_MAX = 100;
var SOCIAL_PICTURE_SRC_MIN = 1;
var SOCIAL_PICTURE_SRC_MAX = 6;
var ESC = 27;
var RESIZE_STEP = 25;
var RESIZE_MIN_VALUE = 25;
var RESIZE_MAX_VALUE = 100;
var EFFECT_PARAMS = {
  chrome: {filter: 'grayscale', min: 0, max: 1, unit: null},
  sepia: {filter: 'sepia', min: 0, max: 1, unit: null},
  marvin: {filter: 'invert', min: 0, max: 100, unit: '%'},
  phobos: {filter: 'blur', min: 0, max: 3, unit: 'px'},
  heat: {filter: 'brightness', min: 1, max: 3, unit: null}
};
var SPIN_DEFAULT_VALUE = 100;

var body = document.querySelector('body');
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
var pictureElement = document.querySelector('.pictures');
var form = document.querySelector('.img-upload__form');

var getRandomInteger = function (max, min) {
  min = min || DEFAULT_RAMDOM_MIN;
  max = max || DEFAULT_RAMDOM_MAX;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomElement = function (array) {
  var randomIndex = getRandomInteger(array.length - 1);
  return array[randomIndex];
};

var getComments = function () {
  var commentsAmmount = getRandomInteger(COMMENTS_MAX, COMMENTS_MIN);
  var commentsArray = [];
  for (var i = 0; i < commentsAmmount; i++) {
    var comment = getRandomElement(COMMENTS);
    commentsArray.push(comment);
  }
  return commentsArray;
};


var getDiscription = function () {
  getRandomElement(DISCRIPTIONS);
};

var generatePhotosArray = function (photosAmmount) {
  var photosArray = [];
  for (var i = 1; i <= photosAmmount; i++) {
    var photo = {
      url: 'photos/' + i + '.jpg',
      likes: getRandomInteger(LIKES_MAX, LIKES_MIN),
      comments: getComments(),
      description: getDiscription()
    };
    photosArray.push(photo);
  }
  return photosArray;
};

var allPhotos = generatePhotosArray(PHOTOS_AMMOUNT);


var renderOnePhoto = function (photo) {
  var photoElement = pictureTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__stat--likes').textContent = photo.likes;
  photoElement.querySelector('.picture__stat--comments').textContent = photo.comments.length;
  addSmallPhotoClickListener(photoElement, photo);
  return photoElement;
};

var addSmallPhotoClickListener = function (element, photo) {
  element.addEventListener('click', function () {
    renderBigPhoto(photo);
  });
};

var renderAllPhotos = function (photos) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(renderOnePhoto(photos[i]));
  }
  pictureElement.appendChild(fragment);
};

// BIG PHOTO//

var bigPhoto = document.querySelector('.big-picture');
var bigPhotoCloseButton = bigPhoto.querySelector('.big-picture__cancel');


var showBigPhoto = function () {
  bigPhoto.classList.remove('hidden');
};

var renderOneComment = function (comment) {
  var commentTemplate = document.querySelector('#comment-template').content.querySelector('.social__comment');
  var commentListElement = commentTemplate.cloneNode(true);
  var srcNumber = getRandomInteger(SOCIAL_PICTURE_SRC_MAX, SOCIAL_PICTURE_SRC_MIN);
  commentListElement.querySelector('.social__comment--content').textContent = comment;
  commentListElement.querySelector('.social__picture').src = 'img/avatar-' + srcNumber + '.svg';
  return commentListElement;
};

var renderComments = function (comments) {
  var commentsElement = document.querySelector('.social__comments');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < comments.length; i++) {
    var commentListElement = renderOneComment(comments[i]);
    fragment.appendChild(commentListElement);
  }
  commentsElement.innerHTML = '';
  commentsElement.appendChild(fragment);
};

var onBigPhotoCloseButtonClick = function () {
  closeBigPhoto();
};

var closeBigPhoto = function () {
  bigPhoto.classList.add('hidden');
  bigPhotoCloseButton.removeEventListener('click', onBigPhotoCloseButtonClick);
};

var commentsCount = bigPhoto.querySelector('.social__comment-count');
var commentsLoadmore = bigPhoto.querySelector('.social__comment-loadmore');

var renderBigPhoto = function (photo) {
  var avatarNumber = getRandomInteger(SOCIAL_PICTURE_SRC_MAX, SOCIAL_PICTURE_SRC_MIN);
  showBigPhoto();
  bigPhoto.querySelector('.big-picture__img img').src = photo.url;
  bigPhoto.querySelector('.likes-count').textContent = photo.likes;
  bigPhoto.querySelector('.social__picture').src = 'img/avatar-' + avatarNumber + '.svg';
  bigPhoto.querySelector('.comments-count').textContent = photo.comments.length;
  renderComments(photo.comments);
  commentsCount.classList.add('visually-hidden');
  commentsLoadmore.classList.add('visually-hidden');
  bigPhotoCloseButton.addEventListener('click', onBigPhotoCloseButtonClick);
};

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
  scalePin.addEventListener('mouseup', onScalePinMouseUp);

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

  scalePin.removeEventListener('mouseup', onScalePinMouseUp);

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
  if (evt.keyCode === ESC) {
    hideForm();
  }
};

// Фильтры//

var scale = form.querySelector('.scale');
var scalePin = scale.querySelector('.scale__pin');
var formImgElement = form.querySelector('.img-upload__preview img');
var effectLevelInput = form.querySelector('.scale__value');

var getSpinPercent = function () {
  var percent = parseInt(scalePin.style.left, 10);
  return percent;
};

var changeSpinPosition = function (percent) {
  var effectLevel = scale.querySelector('.scale__level');
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

var onScalePinMouseUp = function () {
  changeEffectLevel();
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

// Валидация формы

var hashTagForm = form.querySelector('.img-upload__text');
var hashtagInput = form.querySelector('.text__hashtags');

hashTagForm.addEventListener('keydown', function (evt) {
  if (evt.keydown === ESC) {
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
  var hashtagArray = hashtagInput.value.trim().toLowerCase().split(' ');

  hashtagInput.setCustomValidity('');

  if (hashtagArray.length > 5) {
    hashtagInput.setCustomValidity(hashtagInputRequirements.maximumAmmount);
  } else if (!validateUniqueness(hashtagArray)) {
    hashtagInput.setCustomValidity(hashtagInputRequirements.noRepeat);
  } else {
    for (var i = 0; i < hashtagArray.length; i++) {
      var hashtag = hashtagArray[i];
      if (hashtag.charAt(0) !== '#') {
        hashtagInput.setCustomValidity(hashtagInputRequirements.startsWithHash);
      } else if (hashtag === '#') {
        hashtagInput.setCustomValidity(hashtagInputRequirements.minimumTwoSymbols);
      } else if (!validateSpaceBetween(hashtag)) {
        hashtagInput.setCustomValidity(hashtagInputRequirements.spaceBetween);
      } else if (hashtag.length > 20) {
        hashtagInput.setCustomValidity(hashtagInputRequirements.maxLength);
      }
    }
  }
  return true;
};

var validateForm = function () {
  return validateHashTags();
};

var onFormSubmit = function (evt) {
  var formValid = validateForm();
  if (!formValid) {
    evt.preventDefault();
  }
};

hashtagInput.addEventListener('input', onFormSubmit);
form.addEventListener('submit', onFormSubmit);
fileInput.addEventListener('change', onFileInputChange);
renderAllPhotos(allPhotos);
