/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */
class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (element) {
      this.element = element
      this.registerEvents()
    } else {
      throw new Error("Ошибка!")
    }
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    const incomeButton = document.querySelector('.create-income-button')
    const expenseButton = document.querySelector('.create-expense-button')
    incomeButton.onclick = () => {
      const newIncome = App.getModal('newIncome')
      const modal = new Modal(newIncome.element)
      modal.open()
    }
    expenseButton.onclick = () => {
      const newExpense = App.getModal('newExpense')
      const modal = new Modal(newExpense.element)
      modal.open()
    }
  }
}
