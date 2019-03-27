
import { EMoveDir } from "./Enum"

const colNum = 4; //行数
const rowNum = 4; //列数

class GameController {
    blockData: Array<Array<number>> = [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0]
    ];

    randomOneBlock() {
        let rand = Math.random()
        if (rand > 0.1) {
            return 0;
        }
        else {
            return -1;
        }
    }

    randomOneZeroBlock() {
        let i = Math.floor(Math.random() * rowNum);
        let j = Math.floor(Math.random() * colNum);

        let v = this.blockData[i][j];

        while (v != 0) {
            i = Math.floor(Math.random() * rowNum);
            j = Math.floor(Math.random() * colNum);

            v = this.blockData[i][j];
        }

        return v;
    }

    randomOneNumber() {
        const numArray = [1, 2, 4, 8, 16, 32, 64];
        let i = Math.floor(Math.random() * numArray.length) + 1;
        return numArray[i];
    }

    genInitData() {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let v = this.randomOneBlock();
                this.blockData[i][j] = v;
            }
        }


    }


    checkLineUp() {

        //判断竖
        for (let i = 0; i < 3; i++) {

            if (this.blockData[i][0] != 0 &&
                this.blockData[i][0] == this.blockData[i][1] &&
                this.blockData[i][0] == this.blockData[i][2]) {
                this.blockData[i][0] = this.blockData[i][1] = this.blockData[i][2] = 0;
                return [true, true, i];
            }
        }

        //判断横
        for (let i = 0; i < 3; i++) {

            if (this.blockData[0][i] != 0 &&
                this.blockData[0][i] == this.blockData[1][i] &&
                this.blockData[0][i] == this.blockData[2][i]) {
                this.blockData[0][i] = this.blockData[1][i] = this.blockData[2][i] = 0;
                return [true, false, i];
            }
        }

        return [false, false, 0];


    }

    moveBlock(i, j, dir: EMoveDir) {
        if (dir == EMoveDir.DOWN) {

            let t = this.blockData[3][j];

            this.blockData[3][j] = this.blockData[2][j];
            this.blockData[2][j] = this.blockData[1][j];
            this.blockData[1][j] = this.blockData[0][j];
            this.blockData[0][j] = t;
        }
        else if (dir == EMoveDir.UP) {

            let t = this.blockData[0][j];
            this.blockData[0][j] = this.blockData[1][j];
            this.blockData[1][j] = this.blockData[2][j];
            this.blockData[2][j] = this.blockData[3][j];
            this.blockData[3][j] = t;
        }
        else if (dir == EMoveDir.RIGHT) {

            let t = this.blockData[i][3];
            this.blockData[i][3] = this.blockData[i][2];
            this.blockData[i][2] = this.blockData[i][1];
            this.blockData[i][1] = this.blockData[i][0];
            this.blockData[i][0] = t;
        }
        else if (dir == EMoveDir.LEFT) {

            let t = this.blockData[i][0];
            this.blockData[i][0] = this.blockData[i][1];
            this.blockData[i][1] = this.blockData[i][2];
            this.blockData[i][2] = this.blockData[i][3];
            this.blockData[i][3] = t;
        }
    }
}

const gameCtrl = new GameController();
window.gameCtrl = gameCtrl;
export { gameCtrl, rowNum, colNum }; 