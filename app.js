// Grabbing the elements needed for the application and storing them in new variables
const lowerButton = document.getElementById('lowerbutton')
const higherButton = document.getElementById('higherbutton')
const sameButton = document.getElementById('samebutton')
const playButton = document.getElementById('playbutton')
const submitButton = document.getElementById('submitbutton')
const h1HeaderElement = document.getElementById('h1header')
const greetingElement = document.getElementById('greeting')
const messageElement = document.getElementById('message')
const cardElement = document.getElementById('card')
const imageElement = document.getElementById('cardImage')

// Variable that stores the object that represents a deck of cards
let deck = {}
let playingCard = 0
let guessingCard = {}
let guess = {}

// // EventListener when user chooses button "lower"
// lowerButton.addEventListener('click', async () => {
//     console.log('lower')
//     chosenButton()
// })

// // EventListener when user chooses button "higher"
// higherButton.addEventListener('click', async () => {
//     console.log('higher')
//     chosenButton()
// })
  
// EventListener when user chooses button "start game"
submitButton.addEventListener('click', async () => {
    // Get and display a card
    getNewCard()
 
    // Display/hide elements as required by the page.
    h1HeaderElement.style.display = 'none'
    submitButton.style.display = 'none'
    lowerButton.style.display = 'block'
    higherButton.style.display = 'block'
    sameButton.style.display = 'block'
    playButton.style.display = 'none'
    playButton.innerText = 'play again'
})

// playButton.addEventListener('click', async () => {
//     checkAnswer()
// })

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
    catch (e) { // Error handling
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
        sameButton.style.display = 'none'
        playButton.style.display = 'none'
        messageElement.style.display = 'none'
        
        // Insert text to button
        submitButton.innerText = 'START GAME'
        
    } catch (e) { // Error handling
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
        console.log('i am now in getNewCard')
        console.log(playingCard)
        
        // Set the image attribute on the card HTML element.
        cardElement.children[1].setAttribute('src', playingCard.image)
        console.log('this is ' + data.cards[0].value)
    
        // Insert text in existing element.
        greetingElement.innerText = `Will next card be the same, lower or higher than ${playingCard.value}?`

        // Reassign value on the the higher cards
        // NB! Taking full advantage of implicit type cocercion in JavaScript!
        if (playingCard.value > 1 && playingCard.value < 10) {
            cardElement.children[1].setAttribute('src', playingCard.image)
            console.log('this is below 11')
        } 
        else if (playingCard.value == '10') {
            playingCard.value = 10
            cardElement.children[1].setAttribute('src', playingCard.image)
            console.log('this is 10')
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
    } catch(e) { // Error handling
        console.log('Could not draw new card')
        console.log(e)
    }
}

/**
 * @function checkAnswer Checks if the guess was right
 */
async function checkAnswer(guess) {
    try {
        // Function call and store the result in a variable after the promise has been resolved.
        const card = playingCard
        // Asssign the value to the variable that is declared on top of the file.
        oldCard = card
        console.log('i am now in checkAnswer!')
        // THIS WORKS!!
        const newCard = await getNewCard()
        console.log('this is the OLD value ' + oldCard.value) 
        // THIS WORKS!
        guessingCard = newCard
        console.log('this is the NEW value ' + guessingCard.value)
        console.log('this is the old type ' + typeof(oldCard.value))
        console.log('this is the old type ' + typeof(guessingCard.value))

        // Evaluate the card values and check the correct answer
        // WORKS!
        let correctAnswer = ''
        if (oldCard.value > guessingCard.value) {
            correctAnswer = 'lower'
        }
        else if (oldCard.value < guessingCard.value){
            correctAnswer = 'higher'

        } else if(oldCard.value == guessingCard.value) {
            correctAnswer = 'same'
        }
        console.log('the correct answer is ' + correctAnswer)
        console.log('the guess was: ' + guess)
    
        // WORKS!
        if (guess == correctAnswer) {
            console.log('you guessed right!')
        } else {
            console.log('you gussed wrong')
        }

    } catch (e) { // Error handling
        console.log('Could not check the answer')
        console.log(e)
    }
}

// Call to start the game.
setUpGame()
