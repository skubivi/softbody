import { SectorLine } from "../sector-line/sectot-line"
import { Vector } from "../vector/vector"

type TLineEquation = {
    x: number,
    y: number
    z: number
}

export class LineEquation {
    private _x: number
    private _y: number
    private _z: number
    constructor(options: TLineEquation) {
        this._x = options.x
        this._y = options.y
        this._z = options.z
    }
    getX() {
        return this._x
    }
    getY() {
        return this._y
    }
    getZ() {
        return this._z
    }

    static getLineEquationFromTwoPoints(point1: {x: number, y: number}, point2: {x: number, y: number}) {
        const x = point2.x === point1.x ? 1 : (point1.y - point2.y) / (point2.x - point1.x)
        const y = point2.x === point1.x ? 0 : 1
        const z = point2.x === point1.x ? point1.x : -(point2.x * point1.y - point1.x * point2.y) / (point1.x - point2.x)
        return new LineEquation({x, y, z})
    }
    static getLineEquationFromPointAndVector(point: {x: number, y: number}, vector: Vector) {
        const newPoint = {
            x: point.x + vector.getX(),
            y: point.y + vector.getY()
        }
        return this.getLineEquationFromTwoPoints(point, newPoint)
    }
    static getLineEquationFromSectorLine(sectorLine: SectorLine) {
        const point1 = {
            x: sectorLine.getX1(),
            y: sectorLine.getY1()
        }
        const point2 = {
            x: sectorLine.getX2(),
            y: sectorLine.getY2()
        }
        return this.getLineEquationFromTwoPoints(point1, point2)
    }
}