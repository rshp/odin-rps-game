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

const GAMES_MAX_COUNT = 5;
let userWinCount = 0;
let computerWinCount = 0;
let gameCount = 0;
let gameResult = undefined;

const userButtons = document.querySelectorAll('.user-buttons-container > button');
userButtons.forEach(element => {
    element.addEventListener('click', processUserInput)
});

function processUserInput(event) {
    userButtons.forEach(element => {
        element.removeEventListener('click', processUserInput);
        element.classList.add('disabled');
    });
    let playerSelection = userPlay(event);
    document.querySelector(`.user-buttons-container > #${event.target.id}`).classList.add('button-selected');
    let computerSelection = computerPlay();
    setTimeout(() => {
        document.querySelector(`.computer-buttons-container > #button-${computerSelection}`).classList.add('button-selected');
    }, 1000);

    setTimeout(() => {
        let result = playSingleRound(playerSelection, computerSelection);
        gameCount++;
        if (result == "player") {
            userWinCount++
        }
        else if (result == "computer") {
            computerWinCount++
        };
        updateScoreDisplay([userWinCount, computerWinCount, gameCount]);
        document.querySelector(`.computer-buttons-container > #button-${computerSelection}`).classList.remove('button-selected');
        document.querySelector(`.user-buttons-container > #${event.target.id}`).classList.remove('button-selected');

        userButtons.forEach(element => {
            element.addEventListener('click', processUserInput);
            element.classList.remove('disabled');
        });
    }, 2000);
    if (gameCount == GAMES_MAX_COUNT) {
        gameResult = checkGameWinner();
        gameCount = 0;
        userWinCount = 0;
        computerWinCount = 0;
    }
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
            break;
        case 1:
            return "paper";
            break;
        case 2:
            return "scissors";
            break;
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
    document.getElementById('round').textContent = score[2];
}



