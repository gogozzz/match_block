import Plane from "./Plane"

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(Plane)
    plane = null;
    @property(cc.Prefab)
    block = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        window.game = this;
    }

    start() {

        for (let i = 0; i < 3; i++) {

            for (let j = 0; j < 3; j++) {

                let go = cc.instantiate(this.block);
                let pos = this.getPos(i, j);

                go.setPosition(pos);
                go.setName(i +''+ j);

                this.plane.addBlock(go);

                let box = go.getBoundingBox();
                console.log(box);

            }
        }
    }

    getPos(i, j) {
        let planeSize = this.plane.node.getContentSize();
        let origin = cc.v2(-planeSize.width * 0.5, planeSize.height * 0.5)
        let goSize = this.block.data.getContentSize();
        let pos = origin.add(cc.v2((j + 0.5)* goSize.width ,  -(i + 0.5) * goSize.height));

        return pos;
    }


    // update (dt) {}
}
