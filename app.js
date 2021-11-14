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
const imageElement = document.getElementById('cardImage')
const roundsElement = document.getElementById('rounds')
const pointsElement = document.getElementById('points')

// Declaration of variables used in the application
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

// TODO: Fix tomorrow, it does not work as of now
resetButton.addEventListener('click', async () => {
    resetGame()
})

/**
 * 
 * @function getDeck that fetches a deck of cards from an API 
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
 * @function getNewCard retrieves a playing card from API
 * @returns object with string (playingCard)  
 */
async function getNewCard() {
    try {
        // Fetch the card from API
        const res = await fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`)
        const data = await res.json() // Store the response (translated to JSON) in a variable
        playingCard = data.cards[0] // Set the current card to the card value received in the API response
        cardElement.children[1].setAttribute('src', playingCard.image) // Set the image attribute on the card HTML element.
        // Insert text in existing element.
        greetingElement.innerText = `Will next card be the same, lower or higher than ${playingCard.value}?`

        // Reassign value on the the higher cards
        // NB! Taking full advantage of implicit type cocercion in JavaScript!
        if (playingCard.value > 1 && playingCard.value < 10) {
            cardElement.children[1].setAttribute('src', playingCard.image)
            // console.log('this is below 11')
        } 
        else if (playingCard.value == '10') {
            playingCard.value = 10
            cardElement.children[1].setAttribute('src', playingCard.image)
        }
        else if (playingCard.value == 'JACK') {
            playingCard.value = 11
            cardElement.children[1].setAttribute('src', playingCard.image)
        } 
        else if (playingCard.value == 'QUEEN') {
            playingCard.value = 12
            cardElement.children[1].setAttribute('src', playingCard.image)
        } 
        else if (playingCard.value == 'KING') {
            playingCard.value = 13
            cardElement.children[1].setAttribute('src', playingCard.image)
        } 
        else if (playingCard.value == 'ACE') {
            playingCard.value = 14
            cardElement.children[1].setAttribute('src', playingCard.image)
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
        const card = playingCard // Function call and store the result in a variable after the promise has been resolved.
        oldCard = card // Asssign the value to the variable that is declared on top of the file.
        const newCard = await getNewCard() // same as above
        guessingCard = newCard // same as above

        // Evaluate the card values and check the correct answer
        let correctAnswer = ''
        if (oldCard.value > guessingCard.value) {
            correctAnswer = 'lower'
        }
        else if (oldCard.value < guessingCard.value){
            correctAnswer = 'higher'

        } else if(oldCard.value == guessingCard.value) {
            correctAnswer = 'same'
        }

        if (guess == correctAnswer) {
            console.log('you guessed right!')
            greetingElement.innerText = 'Yay, you got it right!'
            points++
        } else {
            console.log('you gussed wrong')
            greetingElement.innerText = 'Sorry, wrong answer!'
        }
        rounds++
        roundsElement.style.display = 'block'
        pointsElement.style.display = 'block'
        pointsElement.innerText = `Points: ${points}`
        roundsElement.innerText = `Round: ${rounds}/10`

        if (rounds == 10) {
            imageElement.style.display = 'none'
            roundsElement.style.display = 'none'
            pointsElement.style.display = 'none'
            lowerButton.style.display = 'none'
            higherButton.style.display = 'none'
            sameButton.style.display = 'none'
            greetingElement.innerText = `Out of rounds and you scored ${points}`
            resetButton.style.display = 'block'
            resetButton.innerText = 'play again'
        }

    } catch (e) { // Error handling
        console.log('Could not check the answer')
        console.log(e)
    }
}

async function resetGame() {
    window.location.reload()
}

// Call to start the game.
setUpGame()
