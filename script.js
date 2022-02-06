//This is a console version of the game
//Pseudocode

//Initialise numer of wins for player and computer

//Run game until counter reaches 5
//Prompt user for input:
//User can input different case strings as well as shortcut r/p/s.
//parse user inputs to uniform format
//Roll computer result
//Convert computer result to uniform format
//Compare user and computer results
//Determine winner
//Print user choise, computer choice and win count
//Update counter of wins for each player
//declare winner and end game


//Prompt user for input:
//User can input different case strings as well as shortcut r/p/s.
//parse user inputs to uniform format
function userPlay() {
    let userInput = prompt("input stuff");
    userInput = userInput.toLowerCase();
    switch (userInput) {
        case "r":
        case "rock":
            return "rock";
            break;
        case "p":
        case "paper":
            return "paper";
            break;
        case "s":
        case "scissors":
            return "scissors";
            break;
        default:
            console.log("Cant understand you, try again");
            return userPlay();
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
        ((playerSelection=="rock") && (computerSelection=="scissors")) ||
        ((playerSelection=="paper") && (computerSelection=="rock")) ||
        ((playerSelection=="scissors") && (computerSelection=="paper"))
        ){
        return "player";
        }
    else if (playerSelection===computerSelection){
        return "tie";
    }
    return "computer"
}
//Run game until counter reaches 5
//Return winner of 5 games (or tie)
function game(){
    let userWinCount=0;
    let computerWinCount=0;
    for (let i=0; i<5; i++) {
        playerSelection=userPlay();
        computerSelection=computerPlay();
        result = playSingleRound(playerSelection, computerSelection);
        if (result == "player") {userWinCount++}
        else if (result == "computer") {computerWinCount++} ;
        //console.table ([playerSelection,computerSelection,result,userWinCount,computerWinCount]);
    }
    return userWinCount>computerWinCount ? "player"
         : userWinCount<computerWinCount ? "computer"
         : "tie";
}





