import { Point } from "../point/point"

export type TSectorLine = {
    point1: Point
    point2: Point
}

export class SectorLine {
    private _point1: Point
    private _point2: Point
    constructor(point1: Point, point2: Point) {
        this._point1 = point1
        this._point2 = point2
    }
    getPoint1() {
        return this._point1
    }
    getPoint2() {
        return this._point2
    }
}