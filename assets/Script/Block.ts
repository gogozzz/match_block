const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Node)
    background: cc.Node = null;
    @property(cc.Label)
    label: cc.Label = null;

    id: number;
    index: number;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    // update (dt) {}

    start () {
        // this.updateNdoeColor();
    }

    setIndex(index: number) {
        this.index = index;
    }

    setId(id: number) {
        this.id = id;

        this.updateNdoeColor();
    }

    updateNdoeColor() {
        this.node.opacity = 255;
        if (this.id == 0) {
            this.background.color = cc.Color.GRAY;
            this.label.string = "";
        }else if (this.id > 0) {
            this.background.color = cc.Color.ORANGE;
            this.label.string = this.id.toString();
        }
        else if (this.id == -1) {
            this.node.opacity = 0;
            this.label.string = "";
        }
    }

}
