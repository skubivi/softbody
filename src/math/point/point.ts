export class Point {
    private _x: number
    private _y: number
    constructor(x: number, y: number) {
        this._x = x
        this._y = y
    }

    static copy(anotherPoint: Point) {
        return new Point(anotherPoint.getX(), anotherPoint.getY())
    }

    getX() {
        return this._x
    }
    setX(n: number) {
        this._x = n
    }

    getY() {
        return this._y
    }
    setY(n: number) {
        this._y = n
    }
    
    getXY() {
        return [this._x, this._y]
    }
    setXY(x: number, y: number) {
        this.setX(x)
        this.setY(y)
    }
}