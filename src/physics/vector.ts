class Vector {
    _x: number
    _y: number
    _r: number
    constructor(x: number = 0, y: number = 0, anotherVector?: Vector) {
        if (anotherVector) {
            this._x = anotherVector.getNormalX()
            this._y = anotherVector.getNormalY()
            this._r = anotherVector.getRadius()
        }
        else {
            this._r = Math.sqrt(x * x + y * y)
            this._x = x / this._r
            this._y = y / this._r
        }
    }
    getRadius() {
        return this._r
    }
    getX() {
        return this._x * this._r
    }
    getNormalX() {
        return this._x
    }
    getY() {
        return this._y * this._r
    }
    getNormalY() {
        return this._y
    }
    multiplyByNumber(a: number) {
        this._x *= a
        this._y *= a
    }
}