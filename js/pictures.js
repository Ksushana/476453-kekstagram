'use strict';

var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var DISCRIPTION = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
var pictureElement = document.querySelector('.pictures');

var getUrl = function (urlNumber) {
  var url = 'photos/' + urlNumber + '.jpg';
  return url;
};


var getLikes = function () {
  var likes = Math.floor((Math.random() * 200) + 15);
  return likes;
};

var getComments = function () {
  var commentsAmmount = Math.floor((Math.random() * 2) + 1);
  var res = [];
  for (var i = 0; i < commentsAmmount; i++) {
    var comment = COMMENTS[Math.floor(Math.random() * COMMENTS.length)];
    res.push(comment);
  }
  return res;
};

var getDiscription = function () {
  var randDiscription = DISCRIPTION[Math.floor(Math.random() * DISCRIPTION.length)];
  return randDiscription;
};

var generatePhotosArray = function (photosAmmount) {
  var res = [];
  for (var i = 1; i <= photosAmmount; i++) {
    var photo = {
      url: getUrl(i),
      likes: getLikes(),
      comments: getComments(),
      description: getDiscription()
    };
    res.push(photo);
  }
  return res;
};


var renderOnePhoto = function (photo) {
  var photoElement = pictureTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__stat--likes').textContent = photo.likes;
  photoElement.querySelector('.picture__stat--comments').textContent = photo.comments.length;

  return photoElement;
};

var renderAllPhotos = function (photos) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(renderOnePhoto(photos[i]));
  }
  pictureElement.appendChild(fragment);
};

var allPhotos = generatePhotosArray(25);
renderAllPhotos(allPhotos);

var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');

var renderComments = function (photo) {
  var listItemElements = bigPicture.querySelectorAll('.social__comment');
  for (var i = 0; i < listItemElements.length; i++) {
    var listItemElement = listItemElements[i];
    var comment = photo.comments[i];

    if (comment) {
      var textElement = listItemElement.querySelector('.social__comment--content');
      textElement.textContent = comment;
    } else {
      listItemElement.classList.add('visually-hidden');
    }
  }
};

var renderBigPhoto = function (photo) {
  var avatarNumber = Math.floor((Math.random() * 6) + 1);
  bigPicture.querySelector('.big-picture__img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.social__picture').src = 'img/avatar-' + avatarNumber + '.svg';
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
  renderComments(allPhotos[0]);
};


var commentsCount = bigPicture.querySelector('.social__comment-count');
var commentsLoadmore = bigPicture.querySelector('.social__comment-loadmore');
commentsCount.classList.add('visually-hidden');
commentsLoadmore.classList.add('visually-hidden');

// main

renderBigPhoto(allPhotos[0]);
