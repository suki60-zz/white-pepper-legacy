class WhitePepper {
  constructor($elem) {
    this.$elem = $elem
    this.addEvents()
  }

  addEvents() {
    this.$elem.on('click', (e) => {
      if ($(e.target).is(this.$elem)) new Pepper(e)
    })
  }
}
