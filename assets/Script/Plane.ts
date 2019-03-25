
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    preClickPos: cc.Vec2;
    curClickPos: cc.Vec2;

    blocks: cc.Node[] = [];
    clickedBlock: cc.Node = null;


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

    }

    touchEnd(ev) {
        let evPos = ev.getLocation();
        this.curClickPos = this.node.convertToNodeSpaceAR(evPos);
    }

    touchStart(ev) {
        let evPos = ev.getLocation();
        this.preClickPos = this.node.convertToNodeSpaceAR(evPos);

        console.log( this.preClickPos);
    }


    checkClickBlock(pos: cc.Vec2) {
        

    }

    // update (dt) {}
}
