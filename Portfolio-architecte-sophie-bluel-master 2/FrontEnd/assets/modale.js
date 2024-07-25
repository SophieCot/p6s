let modal = null
const focusableSelector = 'button, a, input, textarea'
let focusables = []
let previouslyFocusElement = null

const openModal = function (e) {
    e.preventDefault()
    modal = document.querySelector(e.target.getAttribute('href'))
    focusables = Array.from(modal.querySelectorAll(focusableSelector))
    previouslyFocusElement = document.querySelector(':focus')
    focusables[0].focus()
    modal.style.display = null
    modal.removeAttribute('aria-hidden')
    modal.setAttribute('aria-modal', 'true')
    modal.addEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
}

const closeModal = function (e) {
    if (modal === null) return
    if (previouslyFocusElement !== null) previouslyFocusElement.focus()
    e.preventDefault()
    window.setTimeout(function(){
        modal.style.display = "none"
    }, 500)
    modal.setAttribute('aria-hidden', 'true')
    modal.removetAttribute('aria-modal')
    modal = null
    modal.addEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
    modal = null
}

const stopPropagation = function (e) {
    e.stopPropagation()
}

const focusInModal = function (e) {
    e.preventDefault()
    let index = focusables.findIndex(f => f === modal.querySelector(':focus'))
    if (e.shifKey === true) {
        index --
    } else {
   index ++ 
    }
   if (index >= focusables.lenght) {
    index = 0
   }
   focusables[index].focus()
}

document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal)
})

window.addEventListener('keydown', function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
    if ( e.key === 'Tab' && modal !== null) {
            focusInModal(e)
}

})
