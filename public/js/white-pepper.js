class WhitePepper {
  constructor($elem) {
    this.$elem = $elem
    this.addEvents()
    this.createPeppers()
  }

  addEvents() {
    this.$elem.on('click', (e) => {
      if ($(e.target).is(this.$elem)) {
        const input = this.createInput(e)
        input.appendTo(`#${this.$elem.attr('id')}`)
        new Pepper(input)
        input.focus()
      }
    })
  }

  createInput(e) {
    return $('<input/>', {
      style: `top: ${e.clientY - 18}px; left: ${e.clientX - 1}px`,
      type: 'text',
      size: 1,
    })
  }

  createPeppers() {
    $('input').each((i, input) => {
      new Pepper(input)
    })
  }
}
