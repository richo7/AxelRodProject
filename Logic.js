const MAX_TURNS = 10;
let turnsDone = 0;

let player1 = new Player()
let player2 = new Player()

class Player {
    years: number;
    inputted: boolean;
    betray: boolean;

    constructor() {
        this.years = 0;
    }
}

radio.onDataPacketReceived((receivedNumber) => {
    let n = receivedNumber.receivedString;

    if (n === "0" || n === "1") {
        if(player1.inputted)
            return;

        player1.inputted = true;
        player1.betray = n === "1";
    } else if (n === "2" || n === "3") {
        if (player2.inputted)
            return;

        player2.inputted = true;
        player2.betray = n === "3";    
    }

    if(player1.inputted && player2.inputted) {
        resolve();

        //SEND DATA
        
        turnsDone ++;
    }

    if(turnsDone >= MAX_TURNS) {

        //GAME END

        reset();
    }
})
radio.setGroup(1);

function resolve() {
    let input1 = player1.betray;
    let input2 = player2.betray;

    if (input1 && input2) { //both betray
        player1.years += 2;
        player2.years += 2;
    } else if (!input1 && !input2) { //both silent
        player1.years += 1;
        player2.years += 1;
    } else { //1 betray, 1 silent
        if (input1) { //player 1 betray, player 2 silent
            player2.years += 3;
        } else if (input2) { //player 2 betray, player 1 silent
            player1.years += 3;
        }
    }
}

function reset() {
    player1.years = 0;
    player2.years = 0;
}

let message = "DEFAULT";
if (player1.years == player2.years) {
    message = "It's a draw!";
} else if (player1.years < player2.years) {
    message = "Player 1 wins";
} else {
    message = "Player 2 wins";
}
console.log(message);

