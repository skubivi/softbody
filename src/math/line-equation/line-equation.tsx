import { Point } from "../point/point"
import { SectorLine } from "../sector-line/sector-line"
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

    static getLineEquationFromTwoPoints(point1: Point, point2: Point) {
        const check = point2.getX() === point1.getX()
        const x = check ? 1 : (point1.getY() - point2.getY()) / (point2.getX() - point1.getX())
        const y = check ? 0 : 1
        const z = check ? point1.getX() : -(point2.getX() * point1.getY() - point1.getX() * point2.getY()) / (point1.getX() - point2.getX())
        return new LineEquation({x, y, z})
    }
    static getLineEquationFromPointAndVector(point: Point, vector: Vector) {
        const newPoint = new Point(point.getX() + vector.getX(), point.getY() + vector.getY())
        return this.getLineEquationFromTwoPoints(point, newPoint)
    }
    static getLineEquationFromSectorLine(sectorLine: SectorLine) {
        return this.getLineEquationFromTwoPoints(sectorLine.getPoint1(), sectorLine.getPoint2())
    }
}