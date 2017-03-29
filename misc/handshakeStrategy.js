//HANDSHAKE STRATEGY//
//false = co-operate and true = betray 
let aimoves: boolean[] = [];
let enemymoves: boolean[] = [];
let turnnumber = 0
if (turnnumber == 0) {
    aimoves[turnnumber] = true
} else if (turnnumber == 1) {
    aimoves[turnnumber] = false
} else if (enemymoves[0] == aimoves[0] && enemymoves[1] == aimoves[0]) {
    aimoves[turnnumber] = false

} else if (enemymoves[0] != aimoves[0] || enemymoves[1] != aimoves[0]) {
    aimoves[turnnumber] = true
}

// Collective STRATEGY//
// Plays C and D in the first and second move. If the opponent has played the same moves, CS plays TFT. Otherwise, CS plays AllD.
