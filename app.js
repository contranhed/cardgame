/**
 * @function createAndAppend - creates and appends elements to parent with content if there is any
 * 
 * @param {string} tag
 * @param {HTMLElement} parent
 * @param {?string} textContent
 * @returns {HTMLElement} new element
 */
const createAndAppend = (tag, parent) => {
    const newElement = document.createElement(tag)
    parent.appendChild(newElement)
    return newElement
}

/**
 * Landing page
 * 
 */
// Create first message to player
const containerElement = document.getElementById('container')
const messageElement = createAndAppend('h2', containerElement)
messageElement.innerText = 'Guess if the next card will be higher or lower'

// Create buttons
const divButtons = createAndAppend('div', containerElement)
divButtons.setAttribute('id', 'buttons')
const lowerButton = createAndAppend('button', divButtons)
lowerButton.setAttribute('id', 'lowerbutton')
lowerButton.innerText = 'Lower'

const higherButton = createAndAppend('button', divButtons)
higherButton.setAttribute('id', 'higherbutton')
higherButton.innerText = 'Higher'

lowerButton.addEventListener('click', () => {
    console.log('clicked lower')
})

higherButton.addEventListener('click', () => {
    console.log('clicked higher')
})

// Display card
let deck = {}

async function getDeck() {
    const res = await fetch(
        'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=2')
    const data = await res.json()
    deck = data
    console.log(deck)
}

getDeck()

