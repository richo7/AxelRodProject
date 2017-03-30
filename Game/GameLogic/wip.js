
let conclusion = ""
let MAX_ROUNDS = 5
let localScore = 0
let roundsCompleted = 0
let localInput = false
let localBetray = false
let gameEnded = false
let foreignInput = false
let foreignBetray = false
let foreignScore = 0

let isPlayer = false;

enum STATE {
    INIT = 1,
    VER_PLAYER,
    VER_COMPLETE,
    GAME,
    POST_GAME
}
let state = STATE.INIT;

let verification: boolean[] = [false, false];

radio.onDataPacketReceived(({receivedString}) => {
    if (state == STATE.VER_PLAYER) {
        verification[1] = true;
    } else if (state == STATE.GAME) {
        if (receivedString[0] == "c") {
            foreignBetray = receivedString[1] == "B"
            foreignInput = true
        }
    }

})

// Event handler for button A
input.onButtonPressed(Button.A, () => {
    if (state == STATE.VER_PLAYER && !verification[0]) {
        radio.sendString("cS")
        verification[0] = true;
        isPlayer = true
    } else if (state == STATE.GAME && !verification[0]) {
        localBetray = false
        localInput = true
        radio.sendString("cS")
    }
})

// Event handler for button B
input.onButtonPressed(Button.B, () => {
    if (state == STATE.VER_PLAYER) {
        radio.sendString("cB")
        verification[0] = true;
        isPlayer = false
    } else if (state == STATE.GAME) {
        radio.sendString("cB")
        localBetray = true
        localInput = true
    }
})

function verifyPlayer() {
    state = STATE.VER_PLAYER
    basic.showString("V");
}

function gameLoop() {
    let roundInitialised = false;
    basic.forever(() => {

        if (!roundInitialised) {
            basic.showString("R" + (roundsCompleted + 1))
        }

        if (state == STATE.GAME && localInput && foreignInput) {

            if (localBetray && foreignBetray) {
                localScore += 2
                foreignScore += 2
            } else if (!(localBetray) && !(foreignBetray)) {
                localScore += 1
                foreignScore += 1
            } else if (!(localBetray) && foreignBetray) {
                localScore += 3
            } else {
                foreignScore += 3
            }

            localInput = false
            foreignInput = false
            roundsCompleted++
            roundInitialised = false
        }

        if (roundsCompleted >= MAX_ROUNDS) {
            state = STATE.POST_GAME;
        }
    })
}

function endGame() {
    gameEnded = true
    basic.pause(2000)
    if (localScore > foreignScore) {
        conclusion = "WIN"
    } else if (localScore < foreignScore) {
        conclusion = "LOSS"
    } else {
        conclusion = "DRAW"
    }
    basic.showString("" + conclusion + " " + " You: " + localScore + " Them: " + foreignScore)
}

function main() {
    basic.forever(() => {
        if (state == STATE.INIT) {
            verifyPlayer();
        } else if (state == STATE.VER_PLAYER) {
            if (verification[0] && verification[1]) {
                state = STATE.VER_COMPLETE;
            }
        } else if (state == STATE.VER_COMPLETE) {
            state = STATE.GAME;
            gameLoop();
        } else if (state == STATE.POST_GAME) {
            endGame();
        }

    })
}

main();
