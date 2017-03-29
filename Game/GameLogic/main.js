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
radio.onDataPacketReceived(({receivedString}) => {
    if (receivedString[0] == "c") {
        foreignBetray = receivedString[1] == "B"
        foreignInput = true
    }
})
// Event handler for button A
input.onButtonPressed(Button.A, () => {
    if (!(gameEnded)) {
        radio.sendString("cS")
        localBetray = false
        localInput = true
    }
})
// Event handler for button B
input.onButtonPressed(Button.B, () => {
    if (!(gameEnded)) {
        radio.sendString("cB")
        localBetray = true
        localInput = true
    }
})
// Loops and checks for both inputs to be done
basic.forever(() => {
    basic.showString("R" + (roundsCompleted + 1))
    if (roundsCompleted < MAX_ROUNDS && localInput && foreignInput) {
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
        roundsCompleted += 1
    }
    if (roundsCompleted >= MAX_ROUNDS) {
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
})
basic.showString("A-COOP B-BETRAY. READY?")
// Event handler for receiving data from the other
// player

