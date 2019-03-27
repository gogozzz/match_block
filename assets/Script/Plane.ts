import Game from './Game'
import Block from './Block'
import { doMoveAction } from './Functions';
import { EMoveDir } from './Enum';
import { colNum, rowNum } from './GameController';

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Node)
    EventPlane = null;
    @property(cc.Node)
    Background = null;


    game: Game = null;

    preClickPos: cc.Vec2;
    curClickPos: cc.Vec2;

    blocks: cc.Node[] = [];
    actionBlocks: cc.Node[] = [];

    clickedBlockIndex: number = -1;
    isInTouch = false;


    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.onListener();
    }

    start() {
        this.game = window.game;
    }

    addBlock(go) {

        this.node.addChild(go);
        this.blocks.push(go);

        // let cpy = cc.instantiate(go);
        // this.node.addChild(cpy);
        // this.actionBlocks.push(cpy);
    }

    onListener() {
        this.EventPlane.on(cc.Node.EventType.MOUSE_DOWN, this.touchStart, this);
        this.EventPlane.on(cc.Node.EventType.MOUSE_UP, this.touchEnd, this);
        this.EventPlane.on(cc.Node.EventType.MOUSE_MOVE, this.touchMove, this);
        this.EventPlane.on(cc.Node.EventType.MOUSE_LEAVE, this.touchCancel, this);
    }

    touchCancel(ev) {
        console.log("touchCancel");
    }

    touchMove(ev) {

    }

    touchEnd(ev) {
        console.log("touchEnd");
        this.isInTouch = false;

        let evPos = ev.getLocation();
        this.curClickPos = this.node.convertToNodeSpaceAR(evPos);
        let delta = this.curClickPos.sub(this.preClickPos);

        if (delta.mag() > 30) {
            this.moveBlock(delta);
        }
    }

    touchStart(ev) {
        this.isInTouch = true;

        let evPos = ev.getLocation();
        this.preClickPos = this.node.convertToNodeSpaceAR(evPos);
        this.checkClickBlock(this.preClickPos);
    }

    checkClickBlock(pos: cc.Vec2) {
        console.log(pos);

        for (let index = 0; index < this.blocks.length; index++) {
            const element = this.blocks[index];
            let box = element.getBoundingBox();

            if (box.contains(pos)) {
                this.clickedBlockIndex = index;

                console.log(index);

                return element;

            }
        }
    }

    getblock(i, j) {
        return this.blocks[i * rowNum + j];
    }

    async moveBlock(delta: cc.Vec2) {
        let absX = Math.abs(delta.x);
        let absY = Math.abs(delta.y);

        let i = Math.floor(this.clickedBlockIndex / rowNum);
        let j = Math.floor(this.clickedBlockIndex % rowNum);

        let move: cc.Vec2;
        let nodes: cc.Node[] = [];
        let cpyNodes: cc.Node[] = [];

        let cpyLastNodePos: cc.Vec2;
        let cpyParentNode: cc.Node;
        let moveDirType: EMoveDir;

        if (absX > absY) {
            move = cc.v2((delta.x / absX) * 100, 0);

            for (let index = 0; index < colNum; index++) {
                const element = this.getblock(i, index);
                // element.x += delta.x;
                nodes.push(element);
            }
            if (move.x > 0) {
                let p = this.getblock(i, 0);
                cpyLastNodePos = p.position.add(cc.v2(-100, 0));
                cpyParentNode = this.getblock(i, rowNum - 1);

                moveDirType = EMoveDir.RIGHT;
            }
            else {
                let p = this.getblock(i, rowNum - 1);
                cpyLastNodePos = p.position.add(cc.v2(100, 0));
                cpyParentNode = this.getblock(i, 0);

                moveDirType = EMoveDir.LEFT;
            }
        }
        else {
            move = cc.v2(0, (delta.y / absY) * 100);

            for (let index = 0; index < rowNum; index++) {
                const element = this.getblock(index, j);
                // element.y += delta.y;

                nodes.push(element);
            }

            if (move.y > 0) {
                let p = this.getblock(colNum - 1, j);
                cpyLastNodePos = p.position.add(cc.v2(0, -100));
                cpyParentNode = this.getblock(0, j);

                moveDirType = EMoveDir.UP;
            }
            else {
                let p = this.getblock(0, j);
                cpyLastNodePos = p.position.add(cc.v2(0, 100));
                cpyParentNode = this.getblock(colNum - 1, j);

                moveDirType = EMoveDir.DOWN;
            }
        }

        console.log(move);
        console.log(nodes);

        let cpy = cc.instantiate(cpyParentNode);
        cpyNodes.push(cpy);
        cpy.setParent(cpyParentNode.getParent());
        cpy.position = cpyLastNodePos;

        nodes.forEach(p => {
            let cpy = cc.instantiate(p);
            cpyNodes.push(cpy);

            cpy.setParent(p.getParent());
        });



        nodes.forEach(p => {
            p.active = false;
        });

        await doMoveAction(0.4, move, cpyNodes);

        cpyNodes.forEach(p => {
            p.destroy();
        });

        nodes.forEach(p => {
            p.active = true;
        });

        this.game.onMove(i, j, moveDirType);

    }

    // update (dt) {}
}
