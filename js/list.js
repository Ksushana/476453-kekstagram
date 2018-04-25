'use strict';

(function () {
  var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var DISCRIPTIONS = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];
  var PHOTOS_AMMOUNT = 25;
  var LIKES_MIN = 15;
  var LIKES_MAX = 200;
  var COMMENTS_MIN = 1;
  var COMMENTS_MAX = 2;

  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
  var pictureElement = document.querySelector('.pictures');

  var getComments = function () {
    var commentsAmmount = window.util.getRandomInteger(COMMENTS_MAX, COMMENTS_MIN);
    var commentsArray = [];
    for (var i = 0; i < commentsAmmount; i++) {
      var comment = window.util.getRandomElement(COMMENTS);
      commentsArray.push(comment);
    }
    return commentsArray;
  };

  var getDiscription = function () {
    window.util.getRandomElement(DISCRIPTIONS);
  };

  var generatePhotosArray = function (photosAmmount) {
    var photosArray = [];
    for (var i = 1; i <= photosAmmount; i++) {
      var photo = {
        url: 'photos/' + i + '.jpg',
        likes: window.util.getRandomInteger(LIKES_MAX, LIKES_MIN),
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

  renderAllPhotos(allPhotos);
})();
