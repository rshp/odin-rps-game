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

const userButtons = document.querySelectorAll('.user-buttons-container > button');
userButtons.forEach(element => {
    element.addEventListener('click', processUserInput)
});

function processUserInput(event){
    let playerSelection = userPlay(event);
    console.log(playerSelection);
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
function game() {
    let userWinCount = 0;
    let computerWinCount = 0;
    for (let i = 0; i < 5; i++) {
        playerSelection = userPlay();
        computerSelection = computerPlay();
        result = playSingleRound(playerSelection, computerSelection);
        if (result == "player") { userWinCount++ }
        else if (result == "computer") { computerWinCount++ };
        //console.table ([playerSelection,computerSelection,result,userWinCount,computerWinCount]);
    }
    return userWinCount > computerWinCount ? "player"
        : userWinCount < computerWinCount ? "computer"
            : "tie";
}





