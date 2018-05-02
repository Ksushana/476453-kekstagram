'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 100;
  var imageFilterButtons = document.querySelectorAll('.img-filters__button');

  var clearFilterButtonsClasses = function () {
    imageFilterButtons.forEach(function (button) {
      button.classList.remove('img-filters__button--active');
    });
  };

  var clearPhotoList = function () {
    var pictureLinks = document.querySelectorAll('.picture__link');
    pictureLinks.forEach(function (photo) {
      photo.remove();
    });
  };

  var sortRecommendedPhotos = function (photos) {
    return photos;
  };

  var sortPopularPhotos = function (photos) {
    return photos.slice().sort(function (first, second) {
      return second.likes - first.likes;
    });
  };

  var sortDiscussedPhotos = function (photos) {
    return photos.slice().sort(function (first, second) {
      return second.comments.length - first.comments.length;
    });
  };

  var sortRandomPhotos = function (photos) {
    return photos.slice().sort(function () {
      return Math.random() - 0.5;
    });
  };

  var sortFunctions = {
    recommended: sortRecommendedPhotos,
    popular: sortPopularPhotos,
    discussed: sortDiscussedPhotos,
    random: sortRandomPhotos
  };

  var debounce = function (callback) {
    var lastTimeout;
    if (lastTimeout) {
      clearTimeout(lastTimeout);
      lastTimeout = null;
    }
    lastTimeout = setTimeout(callback, DEBOUNCE_INTERVAL);
  };

  var sortPhotos = function (sortType) {
    clearPhotoList();
    var sortFunction = sortFunctions[sortType];
    var photos = sortFunction(window.list.photos);
    window.list.renderAllPhotos(photos);
  };

  var setCurrentSortButton = function (button) {
    clearFilterButtonsClasses();
    button.classList.add('img-filters__button--active');
  };

  var getSortTypeByButton = function (button) {
    var sortType = button.id.split('-')[1];
    return sortType;
  };

  var onSortButtonClick = function (evt) {
    debounce(function () {
      var button = evt.target;
      setCurrentSortButton(button);
      var sortType = getSortTypeByButton(button);
      sortPhotos(sortType);
    });
  };

  imageFilterButtons.forEach(function (button) {
    button.addEventListener('click', onSortButtonClick);
  });
})();
