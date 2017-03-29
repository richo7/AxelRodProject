//0 = silence : 1 = betray
//betrayed - Whether or not they have been betrayed
let betrayed: boolean = false
class Ai {
    private aiMoves: boolean[];
    private enemyMoves: boolean[];
    private strategies: Strategy[];
    private currentStratIndex: number;

    //this function is called to create the AI    
    constructor() {
        this.aiMoves = [];
        this.enemyMoves = [];
        this.strategies = [];
        this.currentStratIndex = 0;
        this.strategies.push(new Strategy1(this));
    }

    //receives the human player's choice    
    receiveEnemyChoice(choice: boolean) {
        this.enemyMoves.push(choice);
    }

    //sends a response to the other player    
    // use the strategy     
    respondToEnemy() {
        let strategy: Strategy = this.strategies[this.currentStratIndex]
        let nextMove: boolean = strategy.getNextMove()
    }

    public getMoves(): boolean[] {
        return this.aiMoves;
    }

    public getVisibleMoves() : boolean[] {
        let moves : boolean[] = [];
        for(let i = 0; i < this.aiMoves.length - 1; i ++) {
            moves.push(this.aiMoves[i]);
        }
        return moves;
    }

    public registerMoveSet(aiMove:boolean, enemyMove:boolean) : void {
        this.aiMoves.push(aiMove);
        this.enemyMoves.push(enemyMove);
    }
}

abstract class Strategy {
    protected parentAi: Ai;

    constructor(ai: Ai) {
        this.parentAi = ai;
    }

    //gets next move to make. True = betray. False = silent.    
    abstract getNextMove(): boolean;
}

//TitForTat
class Strategy1 extends Strategy {
    getNextMove(): boolean {
        let aiMoves = this.parentAi.getVisibleMoves();
        return aiMoves[aiMoves.length - 1];
    }
}

//Unforgiving
class Strategy2 extends Strategy {
    getNextMove(): boolean {
        let aiMoves = this.parentAi.getVisibleMoves();
        for (let i = 0; i < aiMoves.length; i ++) {
            if (aiMoves[i] == false)
                return false;
        }
        
        return true;
    }
}
