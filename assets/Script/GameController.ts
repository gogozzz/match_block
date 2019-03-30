
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

    score: number;

    randomOneBlock() {
        let rand = Math.random()
        if (rand > 0.1) {
            return 0;
        }
        else {
            return -1;
        }
    }

    isHasTwoZeroBlock() {
        let ok = 0;
        for (let i = 0; i < colNum; i++) {
            for (let j = 0; j < rowNum; j++) {
                let v = this.blockData[i][j];
                if (v == 0) {
                    ok += 1;
                }
            }
        }
        return ok > 1;
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
        this.score = 0;
        for (let i = 0; i < rowNum; i++) {
            for (let j = 0; j < colNum; j++) {
                let v = this.randomOneBlock();
                this.blockData[i][j] = v;
            }
        }
        let p = this.randomOneZeroBlock();
        this.blockData[p.i][p.j] = 2019;
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
            for (let i = rowNum - 2; i >= 0; i--) {
                let v = this.blockData[i][y];
                if (v > 0) {
                    let imove = i;
                    for (let j = i + 1; j < rowNum; j++ {
                        let t = this.blockData[j][y];
                        if (t == 0) {
                            imove = j;
                        }
                        else {
                            break;
                        }
                    }

                    if (imove != i) {
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
            for (let i = 1; i < rowNum; i++) {
                let v = this.blockData[i][y];
                if (v > 0) {
                    let imove = i;
                    for (let j = i - 1; j >= 0; j--) {
                        let t = this.blockData[j][y];
                        if (t == 0) {
                            imove = j;
                        }
                        else {
                            break;
                        }
                    }

                    if (imove != i) {
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
            for (let i = 1; i < rowNum; i++) {
                let v = this.blockData[x][i];
                if (v > 0) {
                    let imove = i;
                    for (let j = i - 1; j >= 0; j--) {
                        let t = this.blockData[x][j];
                        if (t == 0) {
                            imove = j;
                        } else {
                            break;
                        }
                    }

                    if (imove != i) {
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
            for (let i = rowNum - 2; i >= 0; i--) {
                let v = this.blockData[x][i];
                if (v > 0) {
                    let imove = i;
                    for (let j = i + 1; j < rowNum; j++) {
                        let t = this.blockData[x][j];
                        if (t == 0) {
                            imove = j;
                        } else {
                            break;
                        }
                    }

                    if (imove != i) {
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

    checkScore(...args) {
        if (args[0] > 0 && args[1] > 0 && args[1] == args[2] && args[1] == args[3]) {
            return 3;
        }
        else if (args[0] > 0  && args[1] > 0 && args[1] == args[2] && args[1] != args[3]) {
            return 2;
        }
        else if (args[1] > 0  && args[2] > 0 && args[2] == args[3]) {
            return 1;
        }
        return 0;
    }

    checkLineUp(i, j, dir: EMoveDir) {

        let score = 0;
        //判断竖
        if (dir == EMoveDir.RIGHT) {
            score = this.checkScore(this.blockData[i][3], this.blockData[i][2], this.blockData[i][1], this.blockData[i][0]);
            if (score == 3) {
                this.blockData[i][3] -= this.blockData[i][2];
                this.blockData[i][3] = this.blockData[i][3] < 0 ? 0 : this.blockData[i][3];
                this.blockData[i][2] = this.blockData[i][1] = this.blockData[i][0] = 0;
            } else if (score == 2) {
                this.blockData[i][3] -= this.blockData[i][2];
                this.blockData[i][3] = this.blockData[i][3] < 0 ? 0 : this.blockData[i][3];
                this.blockData[i][2] = this.blockData[i][1] = 0;
            } else if (score == 1) {
                this.blockData[i][2] -= this.blockData[i][1];
                this.blockData[i][2] = this.blockData[i][2] < 0 ? 0 : this.blockData[i][2];
                this.blockData[i][1] = this.blockData[i][0] = 0;
            }
        }
        else if (dir == EMoveDir.LEFT) {
            score = this.checkScore(this.blockData[i][0], this.blockData[i][1], this.blockData[i][2], this.blockData[i][3]);
            if (score == 3) {
                this.blockData[i][0] -= this.blockData[i][1];
                this.blockData[i][0] = this.blockData[i][0] < 0 ? 0 : this.blockData[i][0];
                this.blockData[i][1] = this.blockData[i][2] = this.blockData[i][3] = 0;
            } else if (score == 2) {
                this.blockData[i][0] -= this.blockData[i][1];
                this.blockData[i][0] = this.blockData[i][0] < 0 ? 0 : this.blockData[i][0];
                this.blockData[i][1] = this.blockData[i][2] = 0;
            } else if (score == 1) {
                this.blockData[i][1] -= this.blockData[i][2];
                this.blockData[i][1] = this.blockData[i][1] < 0 ? 0 : this.blockData[i][1];
                this.blockData[i][2] = this.blockData[i][3] = 0;
            }
        }

        else if (dir == EMoveDir.DOWN) {
            score = this.checkScore(this.blockData[3][j], this.blockData[2][j], this.blockData[1][j], this.blockData[0][j]);
            if (score == 3) {
                this.blockData[3][j] -= this.blockData[2][j];
                this.blockData[3][j] = this.blockData[3][j] < 0 ? 0 : this.blockData[3][j];
                this.blockData[i][2] = this.blockData[i][1] = this.blockData[i][0] = 0;
            } else if (score == 2) {
                this.blockData[3][j] -= this.blockData[2][j];
                this.blockData[3][j] = this.blockData[3][j] < 0 ? 0 : this.blockData[3][j];
                this.blockData[2][j] = this.blockData[1][j] = 0;
            } else if (score == 1) {
                this.blockData[2][j] -= this.blockData[1][j];
                this.blockData[2][j] = this.blockData[2][j] < 0 ? 0 : this.blockData[2][j];
                this.blockData[1][j] = this.blockData[0][j] = 0;
            }
        }

        else if (dir == EMoveDir.UP) {
            score = this.checkScore(this.blockData[0][j], this.blockData[1][j], this.blockData[2][j], this.blockData[3][j]);
            if (score == 3) {
                this.blockData[0][j] -= this.blockData[1][j];
                this.blockData[0][j] = this.blockData[0][j] < 0 ? 0 : this.blockData[0][j];
                this.blockData[1][j] = this.blockData[2][j] = this.blockData[3][j] = 0;
            } else if (score == 2) {
                this.blockData[0][j] -= this.blockData[1][j];
                this.blockData[0][j] = this.blockData[0][j] < 0 ? 0 : this.blockData[0][j];
                this.blockData[1][j] = this.blockData[2][j] = 0;
            } else if (score == 1) {
                this.blockData[1][j] -= this.blockData[2][j];
                this.blockData[1][j] = this.blockData[1][j] < 0 ? 0 : this.blockData[1][j];
                this.blockData[2][j] = this.blockData[3][j] = 0;
            }
        }

        if (score == 3)
        {
            this.score += 3;
        }else if (score == 2 || score == 1) {
            this.score += 2;
        }

        return score;

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