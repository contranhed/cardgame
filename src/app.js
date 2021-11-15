// Grabbing the elements needed for the application and storing them in new variables
const lowerButton = document.getElementById('lowerbutton')
const higherButton = document.getElementById('higherbutton')
const sameButton = document.getElementById('samebutton')
const resetButton = document.getElementById('resetbutton')
const submitButton = document.getElementById('submitbutton')
const h1HeaderElement = document.getElementById('h1header')
const greetingElement = document.getElementById('greeting')
const messageElement = document.getElementById('message')
const cardElement = document.getElementById('card')
const containerElement = document.getElementById('container')
const imageElement = document.getElementById('cardImage')
const roundsElement = document.getElementById('rounds')
const pointsElement = document.getElementById('points')

// Initiating variables used in the application
let deck = {}
let playingCard = ''
let guessingCard = {}
let guess = {}
let rounds = 0
let points = 0
  
// EventListener when user chooses button "start game"
submitButton.addEventListener('click', async () => {
    getNewCard() // Get and display a card

    // Display/hide elements as required by the page.
    h1HeaderElement.style.display = 'none'
    submitButton.style.display = 'none'
    resetButton.style.display = 'none'
    lowerButton.style.display = 'block'
    higherButton.style.display = 'block'
    sameButton.style.display = 'block'
})
// EventListener when user chooses button "play again"
resetButton.addEventListener('click', async () => {
    resetGame() // Call to function that resets/reloads the page.
})

/**
 * 
 * @function getDeck fetches a deck of cards from an API 
 */
async function getDeck() {
    try {
        const res = await fetch( // When called and the promise has been resolved, fetch a deck of cards and store the response in a variable 
            'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=2')
        deck = await res.json() // When the response has been received, rewrite it to json and store the data in a variable declared on top of the file to enable wider access to the deck   
        // deck = data // Could also assign the data to the variable like this.
    }
    catch (e) { // Error handling
        console.log('Not successful with the fetch')
        console.log(e)
    }
}

/**
 *  
 *  @function setUpGame sets up the game
 */
async function setUpGame() {
    try {
        getDeck() // Function call to get the deck of cards

        // Remove visibility of buttons not used on landing page
        lowerButton.style.display = 'none'
        higherButton.style.display = 'none'
        sameButton.style.display = 'none'
        resetButton.style.display = 'none'
        messageElement.style.display = 'none'
        roundsElement.style.display = 'none'
        pointsElement.style.display = 'none'
        submitButton.innerText = 'START GAME' // Insert text to button
    } catch (e) { // Error handling
        console.log('Could not set up the game')
        console.log(e)
    }
}

/**
 * 
 * @function getNewCard retrieves an object (random card) from API
 * @returns object that contains a string (playingCard)  
 */
async function getNewCard() {
    try {
        const res = await fetch( // Fetch the card from API
            `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`)
        const data = await res.json() // Store the response (translated to JSON) in a variable
        playingCard = data.cards[0] // Set the current card to the card value received in the API response
        containerElement.children[0].setAttribute('src', playingCard.image) // Set the src attribute on the image element.
        containerElement.children[0].setAttribute('alt', 'image of a playing card') // Set the alt attribute on the image element.
        
        // Insert text in existing element.
        greetingElement.innerText = `Will next card be the same, lower or higher than ${playingCard.value}?`

        // Reassign value on the the higher cards
        // NB! Taking full advantage of implicit type cocercion in JavaScript!
        if (playingCard.value > 1 && playingCard.value < 10) {
            containerElement.children[0].setAttribute('src', playingCard.image)
        } 
        else if (playingCard.value == '10') {
            playingCard.value = 10
            containerElement.children[0].setAttribute('src', playingCard.image)
        }
        else if (playingCard.value == 'JACK') {
            playingCard.value = 11
            containerElement.children[0].setAttribute('src', playingCard.image)
        } 
        else if (playingCard.value == 'QUEEN') {
            playingCard.value = 12
            containerElement.children[0].setAttribute('src', playingCard.image)
        } 
        else if (playingCard.value == 'KING') {
            playingCard.value = 13
            containerElement.children[0].setAttribute('src', playingCard.image)
        } 
        else if (playingCard.value == 'ACE') {
            playingCard.value = 14
            containerElement.children[0].setAttribute('src', playingCard.image)
        }
    return playingCard // Return the current card object (with reassigned value if needed)
    } catch(e) { // Error handling
        console.log('Could not draw new card')
        console.log(e)
    }
}

/**
 * 
 * @function checkAnswer Checks if the guess was right
 * @param guess A string passed from onclick event to see which button was pressed
 */
async function checkAnswer(guess) {
    try {
        const oldCard = playingCard // Store the previously saved object in a local variable.
        const newCard = await getNewCard() // Function call and store the result in a variable after the promise has been resolved.
        let correctAnswer = '' // Initiate a local variable that will contain a string
        // Evaluate the two cards' values and check the correct answer
        if (oldCard.value > newCard.value) {
            correctAnswer = 'lower'
        } else if (oldCard.value < newCard.value) {
            correctAnswer = 'higher'
        } else if (oldCard.value == newCard.value) {
            correctAnswer = 'same'
        }
        
        // Check if the player's guess is correct
        if (guess == correctAnswer) {
            greetingElement.innerText = 'CORRECT'
            points++ // Increment the points by one.
        } else {
            greetingElement.innerText = 'WRONG'
        }
        // Display former hidden elements.
        messageElement.style.display = 'block'
        messageElement.innerText = `Next card: same, lower or higher than ${playingCard.value}?`
        roundsElement.style.display = 'block'
        pointsElement.style.display = 'block'
        
        rounds++ // Increment the rounds by one.

        // Status board presented to the player.
        pointsElement.innerText = `Points: ${points}`
        roundsElement.innerText = `Round: ${rounds} / 10`
        
        // Check if it is on round 10 to end the game
        if (rounds === 10) {
            imageElement.style.display = 'none'
            roundsElement.style.display = 'none'
            pointsElement.style.display = 'none'
            lowerButton.style.display = 'none'
            higherButton.style.display = 'none'
            sameButton.style.display = 'none'
            messageElement.style.display = 'none'
            greetingElement.innerText = `Out of rounds and you scored ${points}`
            resetButton.style.display = 'block'
            resetButton.innerText = 'play again'
        }
    } catch (e) { // Error handling
        console.log('Could not check the answer')
        console.log(e)
    }
}

/**
 * 
 * @function resetGame reloads the page and redirects player to first page
 */
async function resetGame() {
    try {
        window.location.reload()
    } catch (e) {
        console.log('Could not reset game')
        console.log(e)
    }
}

// Call to start the game.
setUpGame()
