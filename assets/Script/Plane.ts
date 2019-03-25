
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.onListener();
    }

    start () {

    }

    onListener() {
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.touchStart, this);
        this.node.on(cc.Node.EventType.MOUSE_UP, this.touchEnd, this);
        this.node.on(cc.Node.EventType.MOUSE_MOVE, this.touchMove, this);
        this.node.on(cc.Node.EventType.MOUSE_LEAVE, this.touchCancel, this);
    }

    touchCancel(ev): any {

    }

    touchMove(ev): any {

    }

    touchEnd(ev): any {

    }

    touchStart(ev): any {
        let pos = ev.getLocation();
    }

    // update (dt) {}
}
