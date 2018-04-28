'use strict';

(function () {
  var TIMEOUT = 10000;

  var request = function (url, method, data, onLoad, onError) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open(method, url);
    xhr.send(data);
  };

  var getAll = function (url, onLoad, onError) {
    request(url, 'GET', null, onLoad, onError);
  };

  var create = function (url, data, onLoad, onError) {
    request(url, 'POST', data, onLoad, onError);
  };

  window.backend = {
    getAll: getAll,
    create: create
  };

})();
