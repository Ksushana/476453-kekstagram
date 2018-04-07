'use strict';

var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!']
var DISCRIPTION = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!']

var picture = document.querySelector('#picture').content.querySelector('.picture__link');
var pictureElements = document.querySelector('.pictures');

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
  for (var i = 0; i <= commentsAmmount - 1; i++) {
    var comment = COMMENTS[Math.floor(Math.random() * COMMENTS.length)];
    res.push(comment);
  }
  return res;
};

var getDiscription = function () {
  var randDiscription = DISCRIPTION[Math.floor(Math.random() * DISCRIPTION.length)];
  return randDiscription;
}

var generatePhotoInfo = function (photosAmmount) {
  var res = [];
  for (var i = 1; i <= photosAmmount; i++) {
    var photo = {
      url: getUrl(photosAmmount),
      likes: getLikes(),
      // comments: getComments(),
      // description: getDiscription()
    }
    res.push(photo);
  }
  return res;
};


var renderPhoto = function (photo) {
  var photoElement = pictureTemplate.cloneNode(true);
  pictureTemplate.querySelector(src) = photo.url;
  pictureTemplate.querySelector('.picture__stat--likes') = photo.likes;
  pictureTemplate.querySelector('.picture__stat--comments') = photo.xxx;

  return photoElement;
};

var createPhotoStream = function (photos) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(renderPhoto(photos[i]));
  }
  pictureElements.appendChild(fragment);
};



// var bigPicture = document.querySelector('.big-picture');
// bigPicture.classList.remove('hidden');
