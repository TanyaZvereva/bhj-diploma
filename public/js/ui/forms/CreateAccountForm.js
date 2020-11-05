/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * Наследуется от AsyncForm
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно (в котором находится форма) в случае успеха,
   * а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit( options ) {
    this.create(options.data, (err, response) => {
      this.element.preventDefault()
      this.element.reset()
      console.log(response)
      debugger
        if (response.success) {
         
        } else {
         
        }
      })
  }
}
