import { Collision } from "../../physics/colission/colission"
import { LineEquation } from "../line-equation/line-equation"
import { Point } from "../point/point"
import { SectorLine } from "../sector-line/sector-line"
import { Sle } from "../sle/sle"
import { Vector } from "../vector/vector"

export type TRay = {
    startingPoint: Point
    vector: Vector
}

export type TRayCrossing = {
    isCrossing: boolean
    crossingPoint: Point
}

export class Ray {
    private _startingPoint: Point
    private _vector: Vector
    constructor(startingPoint: Point, vector: Vector) {
        this._startingPoint = startingPoint
        this._vector = vector
    }
    isCrossingLine(line: LineEquation) {
        const crossingPoint = Sle.getSleFromTwoLineEquations(
            line, 
            LineEquation.getLineEquationFromPointAndVector(this._startingPoint, this._vector)
        ).solve()
        const result: TRayCrossing = {
            isCrossing: false,
            crossingPoint: new Point(NaN, NaN)
        }
        if (crossingPoint === undefined) return result
        const right = this._vector.getNormalX() > 0
        const top = this._vector.getNormalY() > 0
        if (right)
            if (crossingPoint[0] < this._startingPoint.getX()) return result
        if (top)
            if (crossingPoint[1] < this._startingPoint.getY()) return result
        result.isCrossing = true
        result.crossingPoint.setXY(crossingPoint[0], crossingPoint[1])
        return result
    }
    isCrossingSectorLine(sectorLine: SectorLine) {
        const lineFromSectorLine = LineEquation.getLineEquationFromSectorLine(sectorLine)
        const result = this.isCrossingLine(lineFromSectorLine)
        if (!result.isCrossing) return result
        const minX = Math.min(sectorLine.getPoint1().getX(), sectorLine.getPoint2().getX())
        const maxX = Math.max(sectorLine.getPoint1().getX(), sectorLine.getPoint2().getX())
        const minY = Math.min(sectorLine.getPoint1().getY(), sectorLine.getPoint2().getY())
        const maxY = Math.max(sectorLine.getPoint1().getY(), sectorLine.getPoint2().getY())
        if (
            !(
                result.crossingPoint.getX() >= minX && 
                result.crossingPoint.getX() <= maxX && 
                result.crossingPoint.getY() >= minY && 
                result.crossingPoint.getY() <= maxY
            )
        ) {
            result.isCrossing = false
            result.crossingPoint.setXY(NaN, NaN)
        }
        return result
    }
    getCrossingPointWithColission(collision: Collision, n: number) {
        const tempSectorLine = collision.getSectorLines()[n]
        const tempCrossingPoint = this.isCrossingSectorLine(tempSectorLine)
        if (tempCrossingPoint.isCrossing) {
            return {
                point: tempCrossingPoint.crossingPoint,
                sectorLine: tempSectorLine,
                elasticity: collision.getElasticity()
            }
        }
        return undefined
    }
}