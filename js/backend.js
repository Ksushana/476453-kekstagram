'use strict';

(function () {
  var URL_GET = 'https://js.dump.academy/kekstagram/data';
  var URL_POST = 'https://js.dump.academy/kekstagram';
  var TIMEOUT = 10000;

  var exports = {};

  var request = function (url, method, data, onLoad, onError) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    var onXhrLoad = function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    };

    var onXhrError = function () {
      onError('Произошла ошибка соединения');
    };

    var onXhrTimout = function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    };

    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', onXhrLoad);
    xhr.addEventListener('error', onXhrError);
    xhr.addEventListener('timeout', onXhrTimout);

    xhr.open(method, url);
    xhr.send(data);
  };

  var loadPictures = function (onLoad, onError) {
    request(URL_GET, 'GET', null, onLoad, onError);
  };
  exports.loadPictures = loadPictures;

  var createPicture = function (data, onLoad, onError) {
    request(URL_POST, 'POST', data, onLoad, onError);
  };
  exports.createPicture = createPicture;

  window.backend = exports;

})();
