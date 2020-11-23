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
    localStorage.user = JSON.stringify(user)
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    delete localStorage.user
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    if (localStorage.user && localStorage.user !== undefined) {
      return JSON.parse(localStorage.user)
    } else {
      return undefined
    }
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(data, callback = f => f) {
    createRequest({
      url: this.URL + '/current',
      method: "GET",
      data,
      callback: ( err, response ) => {
        if(response.success === false){
          this.unsetCurrent()
        }
        callback(err, response)
      }
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
      url: this.URL + '/login',
      method: "POST",
      data,
      callback: (err, response) => {
        this.setCurrent(response.user)
        callback(err, response)
      }
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
      url: this.URL + '/register',
      method: "POST",
      data,
      callback: (err, response) => {
        this.setCurrent(response.user)
        callback(err, response)
      }
    })
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback = f => f) {
    createRequest({
      url: this.URL + '/logout',
      method: "POST",
      callback
    })
    this.unsetCurrent()
  }
}

