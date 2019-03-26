
import {EMoveDir} from "./Enum" 


const row = 20;
const col = 20;

class GameController {
    blockData : Array<Array<number>> = [
        [0,0,1],
        [0,0,1],
        [1,0,0]
    ];


    checkLineUp() {

        //判断竖
        for (let i = 0; i < 3; i++) {
          
            if(this.blockData[i][0] != 0 &&
                this.blockData[i][0] == this.blockData[i][1] && 
                this.blockData[i][0] == this.blockData[i][2])
                {
                    this.blockData[i][0] = this.blockData[i][1] = this.blockData[i][2] = 0;
                    return [true, true, i];
                }
        }

        //判断横
        for (let i = 0; i < 3; i++) {
          
            if(this.blockData[0][i] != 0 &&
                this.blockData[0][i] == this.blockData[1][i] && 
                this.blockData[0][i] == this.blockData[2][i])
                {
                    this.blockData[0][i] = this.blockData[1][i] = this.blockData[2][i] = 0;
                    return [true, false, i];
                }
        }

        return [false, false, 0];


    }

    getPox(i, j) {
        return cc.v2(i* row, j * col);
    }

    moveBlock(i, j, dir: EMoveDir) {
        if (dir == EMoveDir.DOWN) {

            let t = this.blockData[2][j];
            this.blockData[2][j] = this.blockData[1][j];
            this.blockData[1][j] = this.blockData[0][j];
            this.blockData[0][j] = t;
        }
        else if (dir == EMoveDir.UP) {

            let t = this.blockData[0][j];
            this.blockData[0][j] = this.blockData[1][j];
            this.blockData[1][j] = this.blockData[2][j];
            this.blockData[2][j] = t;
        }
        else if (dir == EMoveDir.RIGHT) {

            let t = this.blockData[i][2];
            this.blockData[i][2] = this.blockData[i][1];
            this.blockData[i][1] = this.blockData[i][0];
            this.blockData[i][0] = t;
        }
        else if (dir == EMoveDir.LEFT) {

            let t = this.blockData[i][0];
            this.blockData[i][0] = this.blockData[i][1];
            this.blockData[i][1] = this.blockData[i][2];
            this.blockData[i][2] = t;
        }
    }
}

const gameCtrl = new GameController();
window.gameCtrl = gameCtrl;
export default gameCtrl; 