/* Maximum number of rounds before the game ends */
const MAX_TURNS = 10;
/* Rounds completed so far. Used to reset the game when required */
let turnsDone = 0;

/* The two player objects */
let localPlayer = new Player()
let foreignPlayer = new Player()

/* The player class */
class Player {
    years: number;     
    inputted: boolean; //have they inputted for the current round ?
    betray: boolean;   //their choice of action for the current

    constructor() {
        this.years = 0;
    }
}

radio.onDataPacketReceived(({receivedNumber}) => {
    /* The choice of the foreign player */
    if (foreignPlayer.inputted)
        return;
    
    foreignPlayer.inputted = true;
    let n = receivedNumber;
    foreignPlayer.betray = n == 1;

    tryToProceed();
})
radio.setGroup(1);

//stay silent
input.onButtonPressed(Button.A, () => {
    if(localPlayer.inputted)
        return;
    
    localPlayer.inputted = true;
    localPlayer.betray = false;
})

//betray
input.onButtonPressed(Button.B, () => {
    if (localPlayer.inputted)
        return;

    localPlayer.inputted = true;
    localPlayer.betray = true;    
})

function tryToProceed() {

    if (localPlayer.inputted && foreignPlayer.inputted) {
        localPlayer.inputted = false;
        foreignPlayer.inputted = false;

        resolve();

        //SEND DATA

        turnsDone++;
    }

    if (turnsDone >= MAX_TURNS) {
        reset();
    }
}

function resolve() {
    let input1 = localPlayer.betray;
    let input2 = foreignPlayer.betray;

    if (input1 && input2) { //both betray
        localPlayer.years += 2;
        foreignPlayer.years += 2;
    } else if (!input1 && !input2) { //both silent
        localPlayer.years += 1;
        foreignPlayer.years += 1;
    } else { //1 betray, 1 silent
        if (input1) { //player 1 betray, player 2 silent
            foreignPlayer.years += 3;
        } else if (input2) { //player 2 betray, player 1 silent
            localPlayer.years += 3;
        }
    }
}

function reset() {
    localPlayer.years = 0;
    foreignPlayer.years = 0;
}
