$window = $(window)

$(() => {
  $('#paper').on('click', (e) => {
    const div = createInput(e)
    div.appendTo('body')
    div.focus()
  })
})

function createInput(e) {
  return $('<input/>', {
    style: `top: ${e.clientY - 18}px; left: ${e.clientX - 1}px`,
    class: 'selected'
  })
}
