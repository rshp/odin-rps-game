//This is a ui version of the game
/*      Pseudocode
Attach mouse click listeners to buttoons
    - If clicked
        - Animate user selection
        - Roll computer selection
        - Idle half-second
        - Animate computer selection
        - Determine winner
        - Update counter of wins for each player
        - Display result
    - Number of games reached 5
        - Determine game winner
        - Display result
*/

const MAX_WIN_COUNT = 5;
let userWinCount = 0;
let computerWinCount = 0;
let gameResult = undefined;

const userButtons = document.querySelectorAll('.user-buttons-container > button');
userButtons.forEach(element => {
    element.addEventListener('click', processUserInput)
});

const modal = document.querySelector(".modal");
const trigger = document.querySelector(".trigger");
const resetButton = document.querySelector(".reset-button");

function displayPopup(gameResult) {
    document.querySelector(".modal-content > h1").textContent = gameResult + ` wins`;
    modal.classList.toggle("show-modal");
}

resetButton.addEventListener("click", () => {modal.classList.toggle("show-modal")});

function processUserInput(event) {
    userButtons.forEach(element => {
        element.removeEventListener('click', processUserInput);
        element.classList.add('disabled');
    });
    let playerSelection = userPlay(event);
    
    let computerSelection = computerPlay();
    let result = playSingleRound(playerSelection, computerSelection);
    if (result == "player") {
        userWinCount++
    }
    else if (result == "computer") {
        computerWinCount++
    };
    
    document.querySelector(`.user-buttons-container > #${event.target.id}`).classList.add('button-selected');                   //highlight selection
    setTimeout(() => {
        document.querySelector(`.computer-buttons-container > #button-${computerSelection}`).classList.add('button-selected');   //highlight selection
    }, 500);

    setTimeout(() => {
        updateScoreDisplay([userWinCount, computerWinCount]);
        document.querySelector(`.computer-buttons-container > #button-${computerSelection}`).classList.remove('button-selected');   //reset selection
        document.querySelector(`.user-buttons-container > #${event.target.id}`).classList.remove('button-selected');                //reset selection
        userButtons.forEach(element => {
            element.addEventListener('click', processUserInput);
            element.classList.remove('disabled');
        });
        if ((userWinCount == MAX_WIN_COUNT) || (computerWinCount==MAX_WIN_COUNT)) {
            gameResult = checkGameWinner();
            displayPopup(gameResult);
            userWinCount = 0;
            computerWinCount = 0;
            updateScoreDisplay([userWinCount, computerWinCount]);
        }
    }, 1000);
}

function userPlay(event) {
    switch (event.target.id) {
        case "button-rock":
            return "rock";
        case "button-paper":
            return "paper";
        case "button-scissors":
            return "scissors";
    }
}

//Roll computer result
//Convert computer result to uniform format
function computerPlay() {
    rnd = Math.floor(Math.random() * 3);
    switch (rnd) {
        case 0:
            return "rock";
         case 1:
            return "paper";
         case 2:
            return "scissors";
     }
}

//Compare user and computer results
//Determine winner
function playSingleRound(playerSelection, computerSelection) {
    if (
        ((playerSelection == "rock") && (computerSelection == "scissors")) ||
        ((playerSelection == "paper") && (computerSelection == "rock")) ||
        ((playerSelection == "scissors") && (computerSelection == "paper"))
    ) {
        return "player";
    }
    else if (playerSelection === computerSelection) {
        return "tie";
    }
    return "computer"
}
//Run game until counter reaches 5
//Return winner of 5 games (or tie)
function checkGameWinner() {
    return userWinCount > computerWinCount ? "player"
        : userWinCount < computerWinCount ? "computer"
            : "tie";
}

function updateScoreDisplay(score) {
    document.getElementById('user-win-counter').textContent = score[0];
    document.getElementById('computer-win-counter').textContent = score[1];
}
