# Title: Card Game
This card game was built as the first assignment for EC Utbildning in 2021, one week in on the JavaScript crash course.


## Game logic
A human player is presented with a card. Based on its value, the player is prompted to guess whether the next card will have the same, lower or higher value. 

If the next card holds the same value as the previous one, and the player did not pick the "same" button, s/he will be informed that the answer was incorrect.


### Keeps track of rounds and points
The player gets ten rounds. One point is given for each correct answer. After ten rounds, the player will be informed of the total points scored. A "play again" button will be presented which redirects the player to the first page again. 


## Technologies 
This web-based application is written in Vanilla JavaScript and node.js executes this code outside the browser.


## How to install the app
If you cannot open the application, try the following steps: 
    1. Open the app file in an IDE and open the terminal
    2. Write "npm install" and push enter. Packages will be installed.
    3. Write "npm start" and push enter. App will start.


## Room for improvement
1. The user is not presented with the answer of the last guess. S/he is instead immediately presented with the score. Adding a timer or other type of timing logic may have solved this bug, but that was beyond the scope of this assignment. If correct, the last point is (at least) included in the total score.

2. Media queries and Apple devices
When the application is used on an Ipad in landscape mode, the vh in css does not work. According to the online discussion, this is an unescapable feature and it is just the way Apple wants it. As of now, the container is centered through a scroll-down. 


## Author
Connie Hedberg <humanitariancoder@gmail.com>