import { Particle } from "../../physics/particle/particle"
import { round } from "../../utils/functions"
import { Point } from "../point/point"
import { SectorLine } from "../sector-line/sector-line"

export type TVector = Vector | number[] | number | undefined | Particle | Point | SectorLine

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
    copy(options: Vector | Particle | Point | SectorLine) {
        if (options instanceof Vector) {
            this._x = options.getNormalX()
            this._y = options.getNormalY()
            this._r = options.getRadius()
        }
        else if (options instanceof SectorLine) {
            const x1 = options.getPoint1().getX()
            const x2 = options.getPoint2().getX()
            const y1 = options.getPoint1().getY()
            const y2 = options.getPoint2().getY()
            this.setXY(x2 - x1, y2 - y1)
        }
        else {
            this.setXY(options.getX(), options.getY())
        }
        
    }
    setXY(newX: number, newY: number) {
        const tempX = round(newX)
        const tempY = round(newY)
        this._r = Math.sqrt(tempX * tempX + tempY * tempY)
        if (this._r === 0) {
            this._x = 0,
            this._y = 0
        } else {
            this._x = tempX / this._r
            this._y = tempY / this._r
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
    static reflect(vector1: TVector, vector2: TVector) {
        const resultVector = new Vector(vector1)
        return resultVector.reflect(vector2)
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
        return new Point(this.getX(), this.getY())
    }
    getNormalXY() {
        return new Point (this.getNormalX(), this.getNormalY())
    }

    multiplyByNumber(n: number) {
        this.setRadius(this.getRadius() * n)
    }
    divideByNumber(n: number) {
        let tempN = n
        if (n === 0) {
            tempN = 0.001
        }
        this.setRadius(this.getRadius() / tempN)
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

    reflect(options: TVector) {
        const lineVector = new Vector(options)
        lineVector.setRadius(1)
        let projectionOnSector = this.getCosAngleBetweenVectors(lineVector) * this.getRadius()
        if (Number.isNaN(projectionOnSector)) return new Vector(this)
        lineVector.multiplyByNumber(projectionOnSector)
        const projectionVector = Vector.sub(lineVector, this)
        return Vector.add(projectionVector, lineVector)
    }
}