'use strict';

(function () {

  var SOCIAL_PICTURE_SRC_MIN = 1;
  var SOCIAL_PICTURE_SRC_MAX = 6;

  // BIG PHOTO//

  var bigPhoto = document.querySelector('.big-picture');
  var bigPhotoCloseButton = bigPhoto.querySelector('.big-picture__cancel');


  var showBigPhoto = function () {
    bigPhoto.classList.remove('hidden');
  };

  var renderOneComment = function (comment) {
    var commentTemplate = document.querySelector('#comment-template').content.querySelector('.social__comment');
    var commentListElement = commentTemplate.cloneNode(true);
    var srcNumber = window.util.getRandomInteger(SOCIAL_PICTURE_SRC_MAX, SOCIAL_PICTURE_SRC_MIN);
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
    var avatarNumber = window.util.getRandomInteger(SOCIAL_PICTURE_SRC_MAX, SOCIAL_PICTURE_SRC_MIN);
    var description = photo.comments.shift();
    showBigPhoto();
    bigPhoto.querySelector('.big-picture__img img').src = photo.url;
    bigPhoto.querySelector('.likes-count').textContent = photo.likes;
    bigPhoto.querySelector('.social__picture').src = 'img/avatar-' + avatarNumber + '.svg';
    bigPhoto.querySelector('.social__caption').textContent = description;
    bigPhoto.querySelector('.comments-count').textContent = photo.comments.length;
    renderComments(photo.comments);
    commentsCount.classList.add('visually-hidden');
    commentsLoadmore.classList.add('visually-hidden');
    bigPhotoCloseButton.addEventListener('click', onBigPhotoCloseButtonClick);
  };

  window.preview = {
    renderBigPhoto: renderBigPhoto
  };
})();
