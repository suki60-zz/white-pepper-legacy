class Pepper {
  constructor(e) {
    this.clientY = e.clientY - 18
    this.clientX = e.clientX - 1
    this.$elem = this.createInput()
    this.$elem.focus()
    this.addEvents()
  }

  createInput() {
    return $('<input/>', {
      style: `top: ${this.clientY}px; left: ${this.clientX}px`,
      type: 'text',
      size: 1,
    }).appendTo('#white-pepper')
  }

  textLength() {
    return this.$elem.val().length
  }

  resize(e) {
    this.$elem.attr('size', this.textLength() + 1)
  }

  deleteIfSizeZero() {
    if (this.textLength() == 0) {
      this.$elem.remove()
    }
  }

  addEvents() {
    this.$elem.on('keydown', (e) => {
      this.resize(e)
    })
    
    this.$elem.on('keyup', (e) => {
      this.resize(e)
    })

    this.$elem.on('focusout', () => {
      this.deleteIfSizeZero()
    })
  }
}
