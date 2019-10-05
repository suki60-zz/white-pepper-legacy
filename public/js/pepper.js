class Pepper {
  constructor(elem) {
    this.$elem = $(elem)
    this.addEvents()
  }

  getClientX() {
    return parseInt(this.$elem.css('left'))
  }

  getClientY() {
    return parseInt(this.$elem.css('top'))
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

  preventUnfocusWithTab() {
    setTimeout(() => {
      this.$elem.focus()
    }, 0)
  }

  createInput() {
    return $('<input/>', {
      style: `top: ${this.getClientY() + 24}px; left: ${this.getClientX()}px`,
      type: 'text',
      size: 1,
    })
  }

  save() {
    console.log('save')
    $.ajax({
      method: 'PUT',
      url: '/pepper',
      data: { hey: 'hey' },
      success: function (data) {
        console.log(data)
      },
      error: function (jqXHR) {
        console.log('error')
      },
    });
  }

  addEvents() {
    this.$elem.on('keydown', (e) => {
      if (e.keyCode == 13) {
        const input = this.createInput()
        input.appendTo('#white-pepper')
        new Pepper(input)
        input.focus()

      } else if (e.keyCode == 9) {
        this.preventUnfocusWithTab()

      } else {
        this.resize(e)
      }
    })

    this.$elem.on('keyup', (e) => {
      this.resize(e)
    })

    this.$elem.on('focusout', () => {
      this.deleteIfSizeZero()
      this.save()
    })
  }
}
