import { Particle } from "../../physics/particle/particle"

export type TVector = Vector | number[] | number | undefined | Particle

export class Vector {
    private _x!: number
    private _y!: number
    private _r!: number
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
    copy(options: Vector | Particle) {
        if (options instanceof Vector) {
            this._x = options.getNormalX()
            this._y = options.getNormalY()
            this._r = options.getRadius()
        }
        else {
            this.setXY(options.getX(), options.getY())
        }
        
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
    clearVector() {
        this._x = 0
        this._y = 0
        this._r = 0
    }

    static add(vector1: TVector, vector2: TVector) {
        const resultVector = new Vector(vector1)
        resultVector.add(vector2)
        return resultVector
    }
    static sub(vector1: TVector, vector2: TVector) {
        const resultVector = new Vector(vector1)
        resultVector.sub(vector2)
        return resultVector
    }
    static multiplyByNumber(vector: TVector, n: number) {
        const resultVector = new Vector(vector)
        resultVector.multiplyByNumber(n)
        return resultVector
    }
    static divideByNumber(vector: TVector, n: number) {
        const resultVector = new Vector(vector)
        resultVector.divideByNumber(n)
        return resultVector
    }
    static getDotProduct(vector1: TVector, vector2: TVector) {
        const tempVector = new Vector(vector1)
        return tempVector.getDotProduct(vector2)
    }
    static getCosAngleBetweenVectors(vector1: TVector, vector2: TVector) {
        const tempVector = new Vector(vector1)
        return tempVector.getCosAngleBetweenVectors(vector2)
    }
    getRadius() {
        return this._r
    }
    setRadius(newR: number) {
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

    getXY() {
        return [this.getX(), this.getY()]
    }
    getNormalXY() {
        return [this.getNormalX(), this.getNormalY()]
    }

    multiplyByNumber(n: number) {
        this.setRadius(this.getRadius() * n)
    }
    divideByNumber(n: number) {
        this.setRadius(this.getRadius() / n)
    }

    add(options: TVector) {
        const anotherVector = new Vector(options)
        this.setXY(this.getX() + anotherVector.getX(), this.getY() + anotherVector.getY())
    }
    sub(options: TVector) {
        const anotherVector = new Vector(options)
        this.setXY(this.getX() - anotherVector.getX(), this.getY() - anotherVector.getY())
    }
    getDotProduct(options: TVector) {
        const anotherVector = new Vector(options)
        return this.getX() * anotherVector.getX() + this.getY() * anotherVector.getY()
    }
    getCosAngleBetweenVectors(options: TVector) {
        const anotherVector = new Vector(options)
        return this.getDotProduct(anotherVector) / (this.getRadius() * anotherVector.getRadius())
    }
}