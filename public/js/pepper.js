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
      return true
    }
    return false
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

  data() {
    return ({
      id: this.$elem.data('id'),
      text: this.$elem.val(),
      client_x: this.getClientX(),
      client_y: this.getClientY()
    })
  }

  save() {
    $.ajax({
      method: 'PUT',
      url: '/pepper',
      data: this.data(),
      success: function (data) {
        console.log(data)
      },
      error: function (jqXHR) {
        console.log('error')
      },
    });
  }

  delete() {
    $.ajax({
      method: 'DELETE',
      url: '/pepper',
      data: this.data(),
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
      this.deleteIfSizeZero() ? this.delete() : this.save()
    })
  }
}
