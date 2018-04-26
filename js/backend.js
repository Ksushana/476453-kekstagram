'use strict';

(function () {
  var URL_GET = 'https://js.dump.academy/kekstagram/data';
  var URL_POST = 'https://js.dump.academy/kekstagram';
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  var getData = function (onLoad, onError) {

    var onXhrLoad = function () {
      var messageErrorElement = document.querySelector('.message_error');
      if (xhr.status === 200) {
        messageErrorElement.classList.add('hidden');
        onLoad(xhr.response);
      } else {
        messageErrorElement.classList.remove('hidden');
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    };

    var onXhrError = function () {
      onError('Произошла ошибка соединения');
    };

    var onXhrTimout = function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    };

    xhr.timeout = 10000;

    xhr.addEventListener('load', onXhrLoad);
    xhr.addEventListener('error', onXhrError);
    xhr.addEventListener('timeout', onXhrTimout);
  };


  var loadData = function (onLoad, onError) {
    getData(onLoad, onError);
    xhr.open('GET', URL_GET);
    xhr.send();
    // console.log(loadData);
  };

  var postData = function (data, onLoad, onError) {
    getData(onLoad, onError);
    xhr.open('POST', URL_POST);
    xhr.send(data);
  };

  window.backend = {
    loadData: loadData,
    postData: postData
  };

})();
