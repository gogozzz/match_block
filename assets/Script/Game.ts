import Plane from "./Plane"
import Block from "./Block"
import { EMoveDir } from "./Enum";
import { gameCtrl } from "./GameController";


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(Plane)
    plane: Plane = null;
    @property(cc.Prefab)
    block: cc.Prefab = null;
    @property(cc.Label)
    score: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    blocks: Block[] = [];

    onLoad() {
        window.game = this;
    }

    start() {
        this.score.string = "Score: 0";
        gameCtrl.genInitData();

        for (let i = 0; i < 4; i++) {

            for (let j = 0; j < 4; j++) {

                let go = cc.instantiate(this.block) as cc.Node;
                let pos = this.getPos(i, j);

                go.setPosition(pos);
                go.name = i + '' + j;

                let block = go.getComponent(Block);
                this.blocks.push(block);

                this.plane.addBlock(go);
            }
        }

        this.initBlockByData(gameCtrl.blockData);
    }

    initBlockByData(data: Array<Array<number>>) {
        console.log(data);

        for (let i = 0; i < data.length; i++) {
            const tmp = data[i];
            for (let j = 0; j < tmp.length; j++) {
                const v = tmp[j];
                let index = i * tmp.length + j;
                let block = this.blocks[index];
                block.setIndex(index);
                block.setId(v);
            }
        }
    }

    getPos(i, j) {
        let planeSize = this.plane.node.getContentSize();
        let origin = cc.v2(-planeSize.width * 0.5, planeSize.height * 0.5)
        let goSize = this.block.data.getContentSize();
        let pos = origin.add(cc.v2((j + 0.5) * goSize.width, -(i + 0.5) * goSize.height));

        return pos;
    }

    onMove(i, j, dir: EMoveDir) {
        gameCtrl.checkMove(i, j, dir);
        gameCtrl.checkLineUp(i, j, dir);
        
        this.score.string = "Score: "+ gameCtrl.score;

        gameCtrl.checkMove(i, j, dir);

        if (gameCtrl.isHasTwoZeroBlock()) {
            gameCtrl.genNextStepData();
        }
        // gameCtrl.checkLineUp();

        this.initBlockByData(gameCtrl.blockData);
    }

    // update (dt) {}
}
