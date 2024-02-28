type TVector = Vector | number[] | number | undefined

export class Vector {
    _x!: number
    _y!: number
    _r!: number
    constructor(options?: TVector) {
        if (typeof options === 'undefined') {
            this.setXY(0, 0)
        }
        else if (typeof options === 'number') {
            this.setXY(options, options)
        }
        else if (Array.isArray(options)) {
            if (options.length === 0) {
                this.setXY(0, 0)
            }
            else if (options.length === 1) {
                this.setXY(options[0], options[0])
            }
            else {
                this.setXY(options[0], options[1])
            }
        }
        else {
            this.copy(options)
        }
    }
    copy(anotherVector: Vector) {
        this._x = anotherVector.getNormalX()
        this._y = anotherVector.getNormalY()
        this._r = anotherVector.getRadius()
    }
    setXY(newX: number, newY: number) {
        this._r = Math.sqrt(newX * newX + newY * newY)
        if (this._r === 0) {
            this._x = 0,
            this._y = 0
        } else {
            this._x = newX / this._r
            this._y = newY / this._r
        }
    }
    getRadius() {
        return this._r
    }
    setRadiuse(newR: number) {
        this._r = newR
    }
    getX() {
        return this._x * this._r
    }
    setX(newX: number) {
        this.setXY(newX, this.getY())
    }
    getNormalX() {
        return this._x
    }
    getY() {
        return this._y * this._r
    }
    setY(newY: number) {
        this.setXY(this.getX(), newY)
    }
    getNormalY() {
        return this._y
    }
    multiplyByNumber(a: number) {
        return new Vector([this.getX() * a, this.getY() * a])
    }
    add(options: TVector) {
        if (typeof options === 'undefined') {
            return new Vector(this)
        }
        if (typeof options === 'number') {
            return new Vector([
                this.getX() + options, 
                this.getY() + options
            ])
        }
        if (Array.isArray(options)) {
            if (options.length === 0) {
                return new Vector(this)
            }
            if (options.length === 1) {
                return new Vector([
                    this.getX() + options[0], 
                    this.getY() + options[0]
                ])
            }
            return new Vector([
                this.getX() + options[0], 
                this.getY() + options[1]
            ])
        }
        return new Vector([
            this.getX() + options.getX(),
            this.getY() + options.getY()
        ])
    }
    sub(options: TVector) {
        if (typeof options === 'undefined') {
            return new Vector(this)
        }
        if (typeof options === 'number') {
            return new Vector([
                this.getX() - options, 
                this.getY() - options
            ])
        }
        if (Array.isArray(options)) {
            if (options.length === 0) {
                return new Vector(this)
            }
            if (options.length === 1) {
                return new Vector([
                    this.getX() - options[0], 
                    this.getY() - options[0]
                ])
            }
            return new Vector([
                this.getX() - options[0], 
                this.getY() - options[1]
            ])
        }
        return new Vector([
            this.getX() - options.getX(),
            this.getY() - options.getY()
        ])
    }
}