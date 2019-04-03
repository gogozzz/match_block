import Plane from "./Plane"
import Block from "./Block"
import { EMoveDir } from "./Enum";
import { gameCtrl } from "./GameController";
import { BlockModel } from "./BlockModel";
import { delay } from "./Functions";


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
        this.createBlockNodes();
        gameCtrl.genInitData();
        this.initBlockByData(gameCtrl.blockModels);
    }

    createBlockNodes() {
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
    }

    initBlockByData(data: Array<Array<BlockModel>>) {

        for (let i = 0; i < data.length; i++) {
            const tmp = data[i];
            for (let j = 0; j < tmp.length; j++) {
                const v = tmp[j];

                let index = i * tmp.length + j;
                let block = this.blocks[index];
                block.init(v);

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

    async onMove(i, j, dir: EMoveDir) {
        gameCtrl.checkMove(i, j, dir);
        this.initBlockByData(gameCtrl.blockModels);
        
        let n = gameCtrl.checkLineUp(i, j, dir);
        await delay(200);
        this.initBlockByData(gameCtrl.blockModels);

        gameCtrl.checkMove(i, j, dir);
        await delay(200);
        this.initBlockByData(gameCtrl.blockModels);

        gameCtrl.genNextStepData(n);
        await delay(200);
        this.initBlockByData(gameCtrl.blockModels);
        
        this.score.string = "Score: " + gameCtrl.score;
    }

    // update (dt) {}
}
