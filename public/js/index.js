$window = $(window)

$(() => {
  $('#paper').on('click', (event) => {
    const div = createDiv(event)
    div.appendTo('body')


    div.focus()
  })
})

$window.on('keydown', (event) => {
  type($('div.selected'), event)
})

function createDiv(event) {
  return $('<div/>', {
    style: `top: ${event.clientY}px; left: ${event.clientX}px`,
    class: 'selected'
    })
}

function type(div, event) {
  text = div.text()
  div.text(text.concat(event.key))
}
