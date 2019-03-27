
export async function doMoveAction(dt: number, delta: cc.Vec2, nodes: cc.Node[]) {

    let p = new Promise((r, j) => {

        let cb = cc.callFunc(() => { r(); });

        nodes.forEach(element => {
            let action = cc.sequence(cc.moveBy(dt, delta).easing(cc.easeCubicActionInOut()), cb);
            element.runAction(action);

        });
    });

    await p.then(() => {
        return true;
    });

}

