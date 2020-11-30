/**
 * Класс LoginForm управляет формой
 * входа в портал
 * Наследуется от AsyncForm
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit( options ) {
    User.login(options.data, (err, response) => {
      if(response.success) {
      User.setCurrent(response.user)
      this.element.reset()
      App.setState( 'user-logged' )
      const modal = new Modal(this.element.closest('.modal'))
      modal.close()
      }
    })
  }
}
