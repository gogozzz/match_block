const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Node)
    background = null;

    id: number;
    index: number;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    // update (dt) {}

    start () {
        this.updateNdoeColor();
    }

    setIndex(index: number) {
        this.index = index;
    }

    setId(id: number) {
        this.id = id;

        this.updateNdoeColor();
    }

    updateNdoeColor() {
        this.background.color = cc.Color.GRAY;

    }

}
