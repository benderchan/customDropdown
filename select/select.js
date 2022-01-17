const getTemplate = (data = [], placeholder, selectedId) => {
  let text = placeholder ?? 'Default text'

  const items = data.map((el) => {
    let classes = ''
    if (el.id === selectedId) {
      classes = 'selected'
      text = el.value
    }
    return `<li class='select__item ${classes}' data-type='li' data-id='${el.id}'>${el.value}</li>`
  })
  return `
  <div class="select__input" data-type='input'>
          <span data-type='value'>${text}</span>
          <i class="fas fa-chevron-down"></i>
        </div>
        <div class="select__dropdown">
          <ul class="select__list">
            ${items.join('')}
          </ul>
        </div>
  `
}

export class Select {
  constructor(selector, options) {
    this.options = options
    this.el = document.querySelector(selector)
    this.selectedId = +options.selectedId
    this.#render()
    this.#setup()
  }

  #render() {
    const { placeholder, data } = this.options
    this.el.classList.add('select')
    this.el.innerHTML = getTemplate(data, placeholder, this.selectedId)
  }
  #setup() {
    this.clickHandler = this.clickHandler.bind(this)
    this.el.addEventListener('click', this.clickHandler)
    this.$value = this.el.querySelector('[data-type="value"]')
  }
  clickHandler(e) {
    const { type } = e.target.dataset
    if (type === 'input') {
      this.toggle()
    } else if (type === 'li') {
      const id = e.target.dataset.id
      this.select(id)
    }
  }
  // get currentEl() {
  //   return this.options.data.find((el) => el.id === this.selectedId)
  // }
  select(id) {
    this.selectedId = id
    this.$value.textContent = this.options.data[this.selectedId - 1].value
    // this.$value.textContent = this.currentEl.value
    this.el.querySelectorAll('[data-type="li"]').forEach((el) => {
      el.classList.remove('selected')
    })
    this.el.querySelector(`[data-id='${id}']`).classList.add('selected')
    this.close()
  }
  get isOpen() {
    return this.el.classList.contains('open')
  }
  toggle() {
    this.isOpen ? this.close() : this.open()
  }
  open() {
    this.el.classList.add('open')
  }
  close() {
    this.el.classList.remove('open')
  }
  destroy() {
    this.el.removeEventListener('click', this.clickHandler)
  }
}
