
class Player {
    years: number;

    constructor() {
        this.years = 0;
    }

    getInput() {
        //return boolean 50/50
        return 1;
    }
}

const MAX_TURNS = 10;

let player1 = new Player()
let player2 = new Player()

for (let i = 0; i < MAX_TURNS; i++) {
	/*
		true - betray
		false - silence
	*/

    let input1 = player1.getInput();
    let input2 = player2.getInput();

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

radio.onDataPacketReceived((receivedNumber) => {
    switch (receivedNumber) {
        case 1:
        case 2:
        case 3:
        case 4:
    }
})
radio.setGroup(1);

let message = "DEFAULT";
if (player1.years == player2.years) {
    message = "It's a draw!";
} else if (player1.years < player2.years) {
    message = "Player 1 wins";
} else {
    message = "Player 2 wins";
}
console.log(message);

