/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * Наследуется от AsyncForm
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor( element ) {
    if (element) {
      super(element)
      this.renderAccountsList()
    } else {
      throw new Error("Ошибка!")
    }
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
      User.current() && Account.list(User.current(), (err, response) =>{
       if(response.success){
        const select = this.element.querySelector('select')
        let options = ''
        response.data.forEach(element => {
          options += `<option value="${element.id}">${element.name}</option>`
        })
        select.innerHTML = options
       }
      })
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit( options ) {
    Transaction.create(options.data, (err, response) => {
      const modal = new Modal(this.element.closest('.modal'))
      modal.close()
      this.element.reset
      if (response.success) App.update()
      })
  }
}
