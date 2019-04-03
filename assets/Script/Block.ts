import { BlockModel } from "./BlockModel";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Node)
    background: cc.Node = null;
    @property(cc.Label)
    label: cc.Label = null;

    // id: number;
    // index: number;

    model: BlockModel 

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    // update (dt) {}

    init(model: BlockModel) {
        this.model = model;

        this.updateNdoeColor();
    }

    start () {
        // this.updateNdoeColor();
    }

    // setIndex(index: number) {
    //     this.index = index;
    // }

    // setId(id: number) {
    //     this.id = id;

    //     this.updateNdoeColor();
    // }

    updateNdoeColor() {
        this.node.opacity = 255;

        if (this.model.isZeroBlock()) {
            this.background.color = cc.Color.GRAY;
            this.label.string = "";
        }else if (this.model.isNum2019()) {
            this.background.color = cc.Color.RED;
            this.label.string = this.model.num.toString();
        }
        else if (this.model.isSpaceBlock()) {
            this.node.opacity = 0;
            this.label.string = "";
        }
        else {
            this.background.color = cc.Color.ORANGE;
            this.label.string =  this.model.num.toString();
        }
    }

}
