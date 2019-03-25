// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    plane = null;
    @property(cc.Prefab)
    block = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

        for (let i = 0; i < 3; i++) {

            for (let j = 0; j < 3; j++) {

                let go = cc.instantiate(this.block);
                let pos = this.getPos(i, j);

                go.setPosition(pos);

                this.plane.addChild(go);

            }
        }

    }

    getPos(i, j) {
        let planeSize = this.plane.getContentSize();
        let origin = cc.v2(-planeSize.width * 0.5, -planeSize.height * 0.5)
        let goSize = this.block.data.getContentSize();
        let pos = origin.add(cc.v2((i + 0.5)* goSize.width ,  (j + 0.5) * goSize.height));

        return pos;
    }

    // update (dt) {}
}
