
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

        return { i: i, j: j };
    }

    randomOneNumber() {
        const numArray = [1, 2, 4, 8, 16, 32, 64];
        let i = Math.floor(Math.random() * numArray.length);
        return numArray[i];
    }

    genInitData() {
        for (let i = 0; i < rowNum; i++) {
            for (let j = 0; j < colNum; j++) {
                let v = this.randomOneBlock();
                this.blockData[i][j] = v;
            }
        }

        this.genNextStepData();
    }

    genNextStepData() {
        for (let i = 0; i < 2; i++) {
            let p = this.randomOneZeroBlock();
            this.blockData[p.i][p.j] = this.randomOneNumber();
        }
    }

    checkMove(x, y, dir: EMoveDir) {

        let res = [];
        if (dir == EMoveDir.DOWN) {
            for (let i = colNum - 2; i >= 0; i--) {
                let v = this.blockData[i][y];
                if (v > 0) {
                    let imove = 0;
                    for (let j = i - 1; j >= 0; j-- {
                        let v = this.blockData[j][y];
                        if (v == 0) {
                            imove = j;
                        }
                    }

                    if (imove > 0) {
                        this.blockData[imove][y] = v;
                        this.blockData[i][y] = 0;
                        let js = {
                            pos: { i: i, j: y },
                            move: cc.v2(0, imove - i),
                        }

                        res.push(js);
                    }
                }
            }
        }
        else if (dir == EMoveDir.UP) {
            for (let i = 1; i < colNum - 1; i++) {
                let v = this.blockData[i][y];
                if (v > 0) {
                    let imove = 0;
                    for (let j = i + 1; j < colNum - 1; j++) {
                        let v = this.blockData[j][y];
                        if (v == 0) {
                            imove = j;
                        }
                    }

                    if (imove > 0) {
                        this.blockData[imove][y] = v;
                        this.blockData[i][y] = 0;
                        let js = {
                            pos: { i: i, j: y },
                            move: cc.v2(0, imove - i),
                        }

                        res.push(js);
                    }
                }
            }
        }
        else if (dir == EMoveDir.LEFT) {
            for (let i = colNum - 2; i >= 0; i--) {
                let v = this.blockData[x][i];
                if (v > 0) {
                    let imove = 0;
                    for (let j = i - 1; j >= 0; j-- {
                        let v = this.blockData[x][j];
                        if (v == 0) {
                            imove = j;
                        }
                    }

                    if (imove > 0) {
                        this.blockData[x][imove] = v;
                        this.blockData[x][i] = 0;
                        let js = {
                            pos: { i: i, j: y },
                            move: cc.v2(imove - i, 0),
                        }

                        res.push(js);
                    }
                }
            }
        }
        else if (dir == EMoveDir.RIGHT) {
            for (let i = 1; i < colNum - 1; i++) {
                let v = this.blockData[x][i];
                if (v > 0) {
                    let imove = 0;
                    for (let j = i + 1; j < colNum - 1; j++) {
                        let v = this.blockData[x][j];
                        if (v == 0) {
                            imove = j;
                        }
                    }

                    if (imove > 0) {
                        this.blockData[x][imove] = v;
                        this.blockData[x][i] = 0;
                        let js = {
                            pos: { i: i, j: y },
                            move: cc.v2(imove - i, 0),
                        }

                        res.push(js);
                    }
                }
            }
        }

        return res;
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