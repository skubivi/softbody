export type TSectorLine = {
    x1: number
    y1: number
    x2: number
    y2: number
}

export class SectorLine {
    private _x1: number
    private _y1: number
    private _x2: number
    private _y2: number
    constructor(options: TSectorLine) {
        this._x1 = options.x1
        this._y1 = options.y1
        this._x2 = options.x2
        this._y2 = options.y2
    }
    getX1() {
        return this._x1
    }
    getX2() {
        return this._x2
    }
    getY1() {
        return this._y1
    }
    getY2() {
        return this._y2
    }
}