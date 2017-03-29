
class Ai {
    private aiMoves: boolean[]
    private enemyMoves: boolean[]
    private strategies: Strategy[]
    private currentStratIndex: number


    //this function is called to create the AI    
    constructor() {
        this.aiMoves = []
        this.enemyMoves = []
        this.strategies = []

        this.currentStratIndex = 1
        this.strategies.push(new Strategy1(this))
        this.strategies.push(new Strategy2(this))
    }

    public getAiMoves(): boolean[] {
        return this.aiMoves
    }

    public getEnemyMoves(): boolean[] {
        let moves: boolean[] = []
        for (let i = 0; i < this.enemyMoves.length - 1; i++) {
            moves.push(this.enemyMoves[i])
        }
        return moves
    }

    public registerEnemyMove(enemyMove: boolean): void {
        this.enemyMoves.push(enemyMove)
    }

    public getDecision(): boolean {
        let decision = this.strategies[this.currentStratIndex].getNextMove();
        this.aiMoves.push(decision);
        return decision;
    }

}

class Strategy {
    protected parentAi: Ai

    constructor(ai: Ai) {
        this.parentAi = ai
    }

    getNextMove(): boolean {
        return true;
    }
}

// TitForTat

class Strategy1 extends Strategy {
    getNextMove(): boolean {
        let aiMoves = this.parentAi.getEnemyMoves()
        return aiMoves[aiMoves.length - 1]
    }
}

// Unforgiving
class Strategy2 extends Strategy {
    getNextMove(): boolean {
        let enemyMoves = this.parentAi.getEnemyMoves();
        for (let i = 0; i < enemyMoves.length; i++) {
            if (enemyMoves[i]) {
                return true
            }
        }

        return false
    }
}


//TESTING

let bob = new Ai()

bob.registerEnemyMove(false)
bob.registerEnemyMove(false)
bob.registerEnemyMove(false)
bob.registerEnemyMove(false)
bob.registerEnemyMove(true)
bob.registerEnemyMove(true)

let decision = bob.getDecision();
basic.showNumber(decision ? 1 : 0);
