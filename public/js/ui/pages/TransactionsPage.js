/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    if (element) {
      this.element = element
      this.lastOptions = {}
    } else {
      throw new Error("Ошибка!")
    }
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    this.render(this.lastOptions)
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    const removeAcButton = document.querySelector('.remove-account')
    removeAcButton.onclick = () => {
      this.removeAccount()
    }
    const removeTrButtons = document.querySelectorAll('.transaction__remove')
    Array.from(removeTrButtons).forEach(button => {
      button.onclick = (event) => {
        const dataId = event.currentTarget.dataset.id
        this.removeTransaction(dataId)
      }
    })
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.update()
   * для обновления приложения
   * */
  removeAccount() {
    if(this.lastOptions){
      const conf = confirm("Вы действительно хотите удалить счёт?")
      if(conf) {
        Account.remove(this.lastOptions.account_id, this.lastOptions, (err, response) => {
          if(response.success) {
            this.clear()
            App.update()
          }
        })
      }
    }
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update()
   * */
  removeTransaction( id ){
    const conf = confirm("Вы действительно хотите удалить эту транзакцию?")
    if(conf) {
      Transaction.remove(id, {}, (err, response) => {
        if(response.success) {
          App.update()
        }
      })
    }
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render( options ) {
    if(options.account_id) {
      this.lastOptions = options
      Account.get(options.account_id, options, (err, response) => {
        if (response.success) {
          this.renderTitle(response.data.name)
          Transaction.list(options, (err, res) =>{
            if(res.success){
              this.renderTransactions(res.data)
            }
           })
        }
        })
    }
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions([])
    this.renderTitle('Название счёта')
    this.lastOptions = {}
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle( name ) {
    const title = this.element.querySelector('.content-title')
    title.innerText = name
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate( date ) {
    const months = ["января", "февраля","марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"]
    const format = new Date(date)
    const dateString = `${format.getDay()} ${months[format.getMonth()-1]} ${format.getFullYear()} г. в ${format.getHours()}:${format.getMinutes()}`
    return dateString
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML( item ) {
    return `<div class="transaction ${item.type === 'expense'?'transaction_expense':'transaction_income'} row">
    <div class="col-md-7 transaction__details">
      <div class="transaction__icon">
          <span class="fa fa-money fa-2x"></span>
      </div>
      <div class="transaction__info">
          <h4 class="transaction__title">${item.name}</h4>
          <div class="transaction__date">${this.formatDate(item.created_at)}</div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="transaction__summ">
      ${item.sum}
         <span class="currency">₽</span>
      </div>
    </div>
    <div class="col-md-2 transaction__controls">
        <button class="btn btn-danger transaction__remove" data-id="${item.id}">
            <i class="fa fa-trash"></i>  
        </button>
    </div>
</div>`

  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions( data ) {
    const content = this.element.querySelector('.content')
    let contentHTML = ''
    data.forEach(item => {
      contentHTML += this.getTransactionHTML(item)
    })
    content.innerHTML = contentHTML
    this.registerEvents()
  }
}
