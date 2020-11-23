/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */
class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (element) {
      this.element = element
      this.update()
    } else {
      throw new Error("Ошибка!")
    }
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    const account = this.element.querySelector('.create-account')
    account.onclick = () => {
      const createAccount = App.getModal('createAccount')
      const modal = new Modal(createAccount.element)
      modal.open()
    }
    const accountList = this.element.querySelectorAll('.account')
    Array.from(accountList).forEach(li => {
      li.onclick = (event) => {
        this.onSelectAccount(event.currentTarget)
      }
    })
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    if(User.current()){
      Account.list(User.current(), (err, response) =>{
       if(response.success){
        this.clear()
        this.renderItem(response.data)
        this.registerEvents()
       }
      })
    }
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    const account = this.element.querySelectorAll('.account')
    Array.from(account).forEach(li => li.remove())
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {
    const active = this.element.querySelector('.active')
    if(active) active.classList.remove('active')
    element.classList.add('active')
    const idAccount = element.dataset.id
    App.showPage( 'transactions', { account_id: idAccount })
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML( item ) {
        return `<li class="account" data-id="${item.id}">
        <a href="#">
            <span>${item.name}</span> /
            <span>${item.sum}</span>
        </a>
    </li>`
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem( items ) {
    items.forEach(item => {
      const li = this.getAccountHTML(item)
      this.element.insertAdjacentHTML("beforeEnd", li)
    })
  }
}
