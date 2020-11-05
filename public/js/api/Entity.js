/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {

  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static URL = ''
  static list(data, callback = f => f) {
    createRequest({
      url: this.URL,
      method: "GET",
      data,
      callback: (err, response) => {
        callback(err, response)
      }
    })
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create(data, callback = f => f) {
    console.log(data); // { mail: 'ivan@biz.pro' }
    // ... добавляем _method к data
    Object.assign(data, {
      _method: 'PUT'
    })
    console.log(data); // { mail: 'ivan@biz.pro', _method: 'PUT' }
    createRequest({
      url: this.URL,
      method: "POST",
      data,
      callback: (err, response) => {
        callback(err, response)
      }
    })
  }

  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get(id = '', data, callback = f => f) {
    createRequest({
      url: this.URL + id,
      method: "GET",
      data,
      callback: (err, response) => {
        callback(err, response)
      }
    })
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove(id = '', data, callback = f => f) {
    Object.assign(data, {
      id: id,
      _method: 'DELETE'
    })
    createRequest({
      url: this.URL,
      method: "POST",
      data,
      callback: (err, response) => {
        callback(err, response)
      }
    })
  }

}
// const data = {
//   mail: 'ivan@biz.pro',
//   password: 'odinodin'
// };
// console.log(Entity.URL); // ''
// Entity.list(data, function (err, response) {
//   console.log(response)
//   // эта функция работает аналогично callback в createRequest
// });
// const data = {
//   mail: 'ivan@biz.pro'
// };
// Entity.create(data, function (err, response) {
//   console.log(response)
//   // эта функция работает аналогично callback в createRequest
// });
// Entity.get(21, {
//   hello: 'kitty'
// }, function (err, response) {
//   console.log(response)
// });
// const data = {
//   mail: 'ivan@biz.pro'
// };
// Entity.remove(21, {
//   hello: 'kitty'
// }, function (err, response) {
//   console.log(response)
// });