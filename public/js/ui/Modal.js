/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 * */
class Modal {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    if (element) {
      this.element = element
      this.allCloseElements = this.element.querySelectorAll('[data-dismiss = "modal"]')
      this.registerEvents()
    } else {
      throw new Error("Ошибка!")
    }
  }
  /**
   * При нажатии на элемент с data-dismiss="modal"
   * должен закрыть текущее окно
   * (с помощью метода Modal.onClose)
   * */
  registerEvents() {
    console.log(this.allCloseElements)
    Array.from(this.allCloseElements).forEach(el => {
      el.onclick = () => {
        console.log(111)
        this.onClose()
      }
    })
  }

  /**
   * Срабатывает после нажатия на элементы, закрывающие окно.
   * Закрывает текущее окно (Modal.close())
   * */
  onClose(e) {
    this.close()
  }
  /**
   * Удаляет обработчики событий
   * */
  unregisterEvents() {
    Array.from(this.allCloseElements).forEach(el => {
      el.onclick = null
    })
  }
  /**
   * Открывает окно: устанавливает CSS-свойство display
   * со значением «block»
   * */
  open() {
    this.element.style.display = "block"
  }
  /**
   * Закрывает окно: удаляет CSS-свойство display
   * */
  close() {
    console.log(this.element)
    this.element.style.display = "none"
  }
}