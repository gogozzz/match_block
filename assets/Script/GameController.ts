
import {EMoveDir} from "./Enum" 

const {ccclass, property} = cc._decorator;

const row = 20;
const col = 20;

@ccclass
export default class NewClass extends cc.Component {
    blocks : number[][];


    checkLineUp() {

        //判断竖
        for (let i = 0; i < 3; i++) {
          
            if(this.blocks[i][0] == this.blocks[i][1] && 
                this.blocks[i][0] == this.blocks[i][2])
                {
                    return [true, true, i];
                }
        }

        //判断横
        for (let i = 0; i < 3; i++) {
          
            if(this.blocks[0][i] == this.blocks[1][i] && 
                this.blocks[0][i] == this.blocks[2][i])
                {
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

            let t = this.blocks[2][i];
            this.blocks[2][i] = this.blocks[1][i];
            this.blocks[1][i] = this.blocks[0][i];
            this.blocks[0][i] = t;
        }
        else if (dir == EMoveDir.UP) {

            let t = this.blocks[0][i];
            this.blocks[0][i] = this.blocks[1][i];
            this.blocks[1][i] = this.blocks[2][i];
            this.blocks[2][i] = t;
        }
        else if (dir == EMoveDir.RIGHT) {

            let t = this.blocks[i][0];
            this.blocks[i][0] = this.blocks[i][1];
            this.blocks[i][1] = this.blocks[i][2];
            this.blocks[i][2] = t;
        }
        else if (dir == EMoveDir.LEFT) {

            let t = this.blocks[i][2];
            this.blocks[i][2] = this.blocks[i][1];
            this.blocks[i][1] = this.blocks[i][0];
            this.blocks[i][0] = t;
        }

    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}
