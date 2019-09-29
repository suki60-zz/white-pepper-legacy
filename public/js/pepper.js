class Pepper {
  constructor(client) {
    this.clientX = client.x
    this.clientY = client.y
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

  preventUnfocusWithTab() {
    setTimeout(() => {
      this.$elem.focus()
    }, 0)
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
        new Pepper({ x: this.clientX, y: this.clientY + 24})

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
      console.log('gooo')
      this.deleteIfSizeZero()
      this.save()
    })
  }
}
