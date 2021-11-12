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

const submitButton = createAndAppend('button', containerElement)
submitButton.innerText = 'GET CARD'
submitButton.setAttribute('id', 'submitbutton')

lowerButton.addEventListener('click', () => {
    console.log('clicked lower')
})

higherButton.addEventListener('click', () => {
    console.log('clicked higher')
})

submitButton.addEventListener('click', () => {
    console.log('submitted')
} )

// Display card
let deck = {}

async function getDeck() {
    try {
        const res = await fetch(
            'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=2')
        const data = await res.json()
        deck = data
    }
    catch (e) {
        console.log('Not successful fetch')
        console.log(e)
    }
    console.log(deck)
}
getDeck()

const cardElement = document.getElementById('card')
const imageElement = document.getElementById('cardImage')

submitButton.addEventListener('click', async () => {
    try {
        const res = await fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`)
        const data = await res.json()
        let playingCard = data.cards[0]
        console.log(data.cards[0])
        cardElement.children[0].innerText = playingCard.value
        cardElement.children[1].setAttribute('src', playingCard.image)
        submitButton.innerText = 'TRY AGAIN'
    } catch(e) {
        console.log('Could not draw new card')
        console.log(e)
    }
})
