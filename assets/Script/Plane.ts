
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    preClickPos: cc.Vec2;
    curClickPos: cc.Vec2;

    blocks: cc.Node[] = [];
    clickedBlockIndex : number = -1;
    isInTouch = false;


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.onListener();
    }

    start () {
        
    }

    addBlock(go) {
        this.node.addChild(go);
        this.blocks.push(go);
    }

    onListener() {
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.touchStart, this);
        this.node.on(cc.Node.EventType.MOUSE_UP, this.touchEnd, this);
        this.node.on(cc.Node.EventType.MOUSE_MOVE, this.touchMove, this);
        this.node.on(cc.Node.EventType.MOUSE_LEAVE, this.touchCancel, this);
    }

    touchCancel(ev) {

    }

    touchMove(ev) {
        if (this.isInTouch) {
            let evPos = ev.getLocation();
            let mvPos = this.node.convertToNodeSpaceAR(evPos);
            let delta = mvPos.sub(this.preClickPos);
            this.moveBlock(delta);
            this.preClickPos = mvPos;
        }
    }

    touchEnd(ev) {
        let evPos = ev.getLocation();
        this.curClickPos = this.node.convertToNodeSpaceAR(evPos);
        this.isInTouch = false; 
    }

    touchStart(ev) {
        let evPos = ev.getLocation();
        this.preClickPos = this.node.convertToNodeSpaceAR(evPos);

        this.checkClickBlock(this.preClickPos);
        this.isInTouch = true;
    }


    checkClickBlock(pos: cc.Vec2) {
        for (let index = 0; index < this.blocks.length; index++) {
            const element =  this.blocks[index];
            if (element.getBoundingBox().contains(pos)) {
                this.clickedBlockIndex = index;
                return element;
            }
        }
    }

    moveBlock(delta: cc.Vec2) {
        let absX = Math.abs(delta.x);
        let absY = Math.abs(delta.y);

        let i = Math.ceil(this.clickedBlockIndex / 3);
        let j = Math.ceil(this.clickedBlockIndex % 3); 

        if (absX > absY) {
            for (let index = 0; index < 3; index++) {
                const element = this.blocks[i * 3 + index];
                element.x += delta.x;
                
            }
        }
        else {
            for (let index = 0; index < 3; index++) {
                let idx = index * 3 + j;
                const element = this.blocks[idx];
                element.y += delta.y;

                console.log(idx);
            }
        }
    }

    // update (dt) {}
}
