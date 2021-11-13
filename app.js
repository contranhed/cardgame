'use strict'
// Grabbing the elements needed for the application and storing them in new variables
const lowerButton = document.getElementById('lowerbutton')
const higherButton = document.getElementById('higherbutton')
const submitButton = document.getElementById('submitbutton')
const h1HeaderElement = document.getElementById('h1header')
const greetingElement = document.getElementById('greeting')
const messageElement = document.getElementById('message')
const cardElement = document.getElementById('card')
const imageElement = document.getElementById('cardImage')

// Variable that stores the object that represents a deck of cards
let deck = {}
let playingCard = {}
let guess = ''

// EventListener when user chooses button "lower"
lowerButton.addEventListener('click', () => {
    lowerButton.style.backgroundColor = 'green'
    const lower = 'false'
    chosenButton(lower)
    console.log(lower)
})

// EventListener when user chooses button "higher"
higherButton.addEventListener('click', () => {
    const higher = 'true'
    chosenButton(higher)
    console.log(higher)
})
  
// EventListener when user chooses button "start game"
submitButton.addEventListener('click', async () => {
    checkAnswer()
})

/**
 * 
 * @function getDeck that fetches a deck of cards from an API
 * 
 */
async function getDeck() {
    try {
        // When called, fetch a deck of cards and store the response in a variable 
        const res = await fetch(
            'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=2')
        
        // When the response has been received, rewrite it to json and store the data in a variable    
        const data = await res.json()
        // Assign the data to the variable declared on top of the file to enable wider access to the deck.
        deck = data
        console.log('Deck was successfully retrieved!')
    }
    catch (e) {
        console.log('Not successful with the fetch')
        console.log(e)
    }
}

/**
 *  Function that sets up the game
 */
async function setUpGame() {
    try {
        // Function call to get the deck of cards
        getDeck()
    
        // Remove visibility of buttons not used on landing page
        lowerButton.style.display = 'none'
        higherButton.style.display = 'none'
        messageElement.style.display = 'none'
        
        // Insert text to button
        submitButton.innerText = 'START GAME'
    } catch (e) {
        console.log('Could not set up the game')
        console.log(e)
    }
}

async function getNewCard() {
    try {
        // Fetch the card from API
        const res = await fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`)
        
        // Store the response (translated to JSON) in a variable
        const data = await res.json()
        
        // Set the current card to the card value received in the API response
        playingCard = data.cards[0]
        console.log(data.cards[0])
        
        // Set the image attribute on the card HTML element.
        cardElement.children[1].setAttribute('src', playingCard.image)
        console.log('1. this is ' + data.cards[0].value)
        
        // Display/hide elements as required by the page.
        h1HeaderElement.style.display = 'none'
        lowerButton.style.display = 'block'
        higherButton.style.display = 'block'
        submitButton.innerText = 'submit'
        
        // Insert text in existing element.
        greetingElement.innerText = `Will next card be lower or higher than ${playingCard.value}?`

        // Reassign value on the the higher cards
        if(playingCard.value > 1 && playingCard.value <= 10) {
            cardElement.children[1].setAttribute('src', playingCard.image)
            console.log('this is below 10')
        } 
        else if (playingCard.value == 'JACK') {
            playingCard.value = 11
            cardElement.children[1].setAttribute('src', playingCard.image)
            console.log('this is jack')

        } 
        else if (playingCard.value == 'QUEEN') {
            playingCard.value = 12
            cardElement.children[1].setAttribute('src', playingCard.image)
            console.log('this is a queen')
        } 
        else if (playingCard.value == 'KING') {
            playingCard.value = 13
            cardElement.children[1].setAttribute('src', playingCard.image)
            console.log('this is a king')
        } 
        else if (playingCard.value == 'ACE') {
            playingCard.value = 14
            cardElement.children[1].setAttribute('src', playingCard.image)
            console.log('this is an ace')
        }
    console.log('the sent card will be: ' + playingCard.value)
    // Return the current card object (with reassigned value if needed)
    return playingCard
    } catch(e) {
        console.log('Could not draw new card')
        console.log(e)
    }
}

/**
 * 
 * @function chosenButton checks which button that was clicked 
 * A setup because eventlisteners cannot return anything
 * 
 * @param {*} res 
 * @returns boolean
 */
async function chosenButton(res) {
    try {
        if (res === false) {
            return('false')
        } 
        else if (res === true) {
            return('true')
        }
    } catch (e) {
        console.log('Could not check the chosen button')
    }
}

async function checkAnswer() {
    try {
        // Function call and store the result in a variable after the promise has been resolved.
        const card = await getNewCard()
        // Asssign the value to the variable that is declared on top of the file.
        playingCard = card
        // THIS WORKS!!
        console.log('this is the value I am going to check ' + playingCard.value) 
        const answer = await chosenButton()
        // TODO: This part with the guess does not work.
        guess = answer
        console.log('this is the button choice: ' + answer)
    } catch (e) {
        console.log('Could not check the answer')
        console.log(e)
    }
}

// Call to start the game.
setUpGame()
