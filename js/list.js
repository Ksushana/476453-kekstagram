'use strict';

(function () {
  var URL_GET = 'https://js.dump.academy/kekstagram/data';

  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
  var pictureElement = document.querySelector('.pictures');

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
      window.preview.renderBigPhoto(photo);
    });
  };

  var renderAllPhotos = function (photos) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(renderOnePhoto(photos[i]));
    }
    pictureElement.appendChild(fragment);
  };

  window.backend.request(URL_GET, 'GET', null, function (allPhotos) {
    renderAllPhotos(allPhotos);
    var filterElement = document.querySelector('.img-filters');
    filterElement.classList.remove('img-filters--inactive');
  }, function (error) {
    window.util.showError(error);
  });

})();
