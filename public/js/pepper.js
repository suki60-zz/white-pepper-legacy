class Pepper {
  constructor(e) {
    this.$elem = this.createInput(e)
    this.$elem.focus()
    this.size = 2
    this.addEvents()
  }

  createInput(e) {
    return $('<input/>', {
      style: `top: ${e.clientY - 18}px; left: ${e.clientX - 1}px`,
      type: 'text',
      size: 2
    }).appendTo('#white-pepper')
  }

  resize() {
    this.size++
    this.$elem.attr('size', this.size)
  }

  addEvents() {
    this.$elem.on('keydown', (e) => {
      this.resize(e)
    })
  }
}
