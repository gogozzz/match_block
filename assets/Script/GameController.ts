
import { EMoveDir } from "./Enum"
import { BlockModel } from "./BlockModel";

const colNum = 4; //行数
const rowNum = 4; //列数

class GameController {
    blockModels: Array<Array<BlockModel>> = new Array<Array<BlockModel>>();

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

    randomOneNumber() {
        const numArray = [1, 2, 4, 8, 16, 32, 64];
        let i = Math.floor(Math.random() * numArray.length);
        return numArray[i];
    }

    randomOneZeroBlock() {


        let i = Math.floor(Math.random() * rowNum);
        let j = Math.floor(Math.random() * colNum);

        let v = this.blockModels[i][j];

        while (!v.isZeroBlock()) {
            i = Math.floor(Math.random() * rowNum);
            j = Math.floor(Math.random() * colNum);

            v = this.blockModels[i][j];
        }

        return { i: i, j: j };
    }

    genNextStepData(blockCnt) {
        let v = this.randomOneNumber();
        for (let i = 0; i < blockCnt; i++) {
            let p = this.randomOneZeroBlock();
            this.blockModels[p.i][p.j] = new BlockModel(v);
        }
    }

    genInitData() {
        this.score = 0;

        for (let i = 0; i < rowNum; i++) {
            this.blockModels[i] = [];
            for (let j = 0; j < colNum; j++) {
                let v = this.randomOneBlock();
                this.blockModels[i][j] = new BlockModel(v);
            }
        }

        let p = this.randomOneZeroBlock();
        this.blockModels[p.i][p.j] = new BlockModel(2019);

        for (let i = 0; i < 5; i++) {
            this.genNextStepData(2);
        }
    }

    checkMove(x, y, dir: EMoveDir) {


        let func = (self, v, i, j, imove, jmove, res) => {

            if (imove != i || jmove != j) {
                self.blockModels[imove][jmove].num = v;
                self.blockModels[i][j].num = 0;
                let js = {
                    pos: { i: i, j: y },
                    move: cc.v2(jmove - j, imove - i),
                }

                res.push(js);
            }
        }

        let res = [];
        if (dir == EMoveDir.DOWN) {
            for (let i = rowNum - 2; i >= 0; i--) {
                let v = this.blockModels[i][y].num;
                if (v > 0) {
                    let imove = i;
                    for (let j = i + 1; j < rowNum; j++) {
                        let t = this.blockModels[j][y].num;
                        if (t == 0) {
                            imove = j;
                        }
                        else {
                            break;
                        }
                    }

                    func(this, v, i, y, imove, y, res);
                }
            }
        }
        else if (dir == EMoveDir.UP) {
            for (let i = 1; i < rowNum; i++) {
                let v = this.blockModels[i][y].num;
                if (v > 0) {
                    let imove = i;
                    for (let j = i - 1; j >= 0; j--) {
                        let t = this.blockModels[j][y].num;
                        if (t == 0) {
                            imove = j;
                        }
                        else {
                            break;
                        }
                    }

                    func(this, v, i, y, imove, y, res);
                }
            }
        }
        else if (dir == EMoveDir.LEFT) {
            for (let i = 1; i < rowNum; i++) {
                let v = this.blockModels[x][i].num;
                if (v > 0) {
                    let imove = i;
                    for (let j = i - 1; j >= 0; j--) {
                        let t = this.blockModels[x][j].num;
                        if (t == 0) {
                            imove = j;
                        } else {
                            break;
                        }
                    }

                    func(this, v, x, i, x, imove, res);

                }
            }
        }
        else if (dir == EMoveDir.RIGHT) {
            for (let i = rowNum - 2; i >= 0; i--) {
                let v = this.blockModels[x][i].num;

                if (v > 0) {
                    let imove = i;
                    for (let j = i + 1; j < rowNum; j++) {
                        let t = this.blockModels[x][j].num;
                        if (t == 0) {
                            imove = j;
                        } else {
                            break;
                        }
                    }

                    func(this, v, x, i, x, imove, res);
    
                }
            }
        }

        return res;
    }

    checkScore(...args) {
        if (args[0].num > 0 && args[0].num > args[1].num
            && args[1].num == args[2].num && args[1].num == args[3].num) {

            args[0].num -= args[1].num;
            args[1].num = args[2].num = args[3].num = 0;

            return 3;
        }
        else if (args[0].num > 0 && args[0].num > args[1].num
            && args[1].num == args[2].num && args[1].num != args[3].num) {
            args[0].num -= args[1].num;
            args[1].num = args[2].num = 0;

            return 2;
        }
        else if (args[1].num > 0 && args[1].num > args[2].num
            && args[2].num == args[3].num) {
            args[1].num -= args[2].num;
            args[2].num = args[2].num = 0;

            return 2;
        }
        return 0;
    }

    checkLineUp(i, j, dir: EMoveDir) {

        let score = 0;
        //判断竖
        if (dir == EMoveDir.RIGHT) {
            score = this.checkScore(this.blockModels[i][3], this.blockModels[i][2], this.blockModels[i][1], this.blockModels[i][0]);
        }
        else if (dir == EMoveDir.LEFT) {
            score = this.checkScore(this.blockModels[i][0], this.blockModels[i][1], this.blockModels[i][2], this.blockModels[i][3]);
        }

        else if (dir == EMoveDir.DOWN) {
            score = this.checkScore(this.blockModels[3][j], this.blockModels[2][j], this.blockModels[1][j], this.blockModels[0][j]);
        }

        else if (dir == EMoveDir.UP) {
            score = this.checkScore(this.blockModels[0][j], this.blockModels[1][j], this.blockModels[2][j], this.blockModels[3][j]);
        }

        this.score += score;

        return score;

    }
    
}

const gameCtrl = new GameController();
window.gameCtrl = gameCtrl;
export { gameCtrl, rowNum, colNum }; 