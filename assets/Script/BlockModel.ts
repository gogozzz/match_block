
export class BlockModel {
    num: number;
    bNum2019: boolean;

    constructor(num: number) {
        this.num = num;
        this.bNum2019 = num == 2019;
    }

    isZeroBlock() {
        return this.num == 0 && !this.isNum2019();
    }

    isSpaceBlock() {
        return this.num < 0 && !this.isNum2019();
    }

    isNum2019() {
        return this.bNum2019;
    }
}
