/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static URL = '/user'
  static setCurrent(user) {
    localStorage.user = JSON.stringify(user);
    console.log(localStorage['user'])
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    delete localStorage.user;
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    if (localStorage.user) {
      return JSON.parse(localStorage.user);
    } else {
      return underfind
    }
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(data, callback = f => f) {
    createRequest({
      url: User.URL + '/current',
      method: "GET",
      data,
      callback
    })
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback = f => f) {
    createRequest({
      url: User.URL + '/login',
      method: "POST",
      data,
      callback
    })
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback = f => f) {
    createRequest({
      url: User.URL + '/register',
      method: "POST",
      data,
      callback
    })
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(data, callback = f => f) {
    createRequest({
      url: User.URL + '/logout',
      method: "POST",
      data,
      callback
    })
  }
}

// const data = {
//   name: 'Vlad14',
//   email: 'test14@test.ru',
//   password: 'abracadabra'
// }
// производим регистрацию
// User.register(data, (err, response) => {
//   console.log(response);
//   User.setCurrent(response.user)
// });
// console.log(localStorage)
// const current = User.current();
// console.log(current)
// const current = User.current();
// User.unsetCurrent();
// console.log(current);
// User.fetch(User.current(), (err, response) => {
//   console.log(response.user.id); // 2
//   if (response.success) {
//     User.setCurrent(response.user)
//   } else {
//     User.unsetCurrent()
//   }
// });
// const data = {
//   email: 'test@test.ru',
//   password: 'abracadabra'
// }
// User.logout(data, (err, response) => {
//   console.log(response); // Ответ
//   User.setCurrent(response.user)
// });