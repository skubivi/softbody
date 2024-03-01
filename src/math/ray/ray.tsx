import { LineEquation } from "../line-equation/line-equation"
import { SectorLine } from "../sector-line/sectot-line"
import { Sle } from "../sle/sle"
import { Vector } from "../vector/vector"

export type TRay = {
    startingPoint: {
        x: number,
        y: number
    }
    vector: Vector
}

export type TRayCrossing = {
    isCrossing: boolean
    crossingPoint: {
        x: number,
        y: number
    }
}

export class Ray {
    private _startingPoint: { x: number; y: number }
    private _vector: Vector
    constructor(options: TRay) {
        this._startingPoint = options.startingPoint
        this._vector = options.vector
    }
    isCrossingLine(line: LineEquation) {
        const crossingPoint = Sle.getSleFromTwoLineEquations(
            line, 
            LineEquation.getLineEquationFromPointAndVector(this._startingPoint, this._vector)
        ).solve()
        const result: TRayCrossing = {
            isCrossing: false,
            crossingPoint: {
                x: NaN,
                y: NaN
            }
        }
        if (crossingPoint === undefined) return result
        const right = this._vector.getNormalX() > 0
        const top = this._vector.getNormalY() > 0
        if (right)
            if (crossingPoint[0] < this._startingPoint.x) return result
        if (top)
            if (crossingPoint[1] < this._startingPoint.y) return result
        result.isCrossing = true
        result.crossingPoint = {
            x: crossingPoint[0],
            y: crossingPoint[1]
        }
        return result
    }
    isCrossingSectorLine(sectorLine: SectorLine) {
        const lineFromSectorLine = LineEquation.getLineEquationFromSectorLine(sectorLine)
        const result = this.isCrossingLine(lineFromSectorLine)
        const minX = Math.min(sectorLine.getX1(), sectorLine.getX2())
        const maxX = Math.max(sectorLine.getX1(), sectorLine.getX2())
        const minY = Math.min(sectorLine.getY1(), sectorLine.getY2())
        const maxY = Math.max(sectorLine.getY1(), sectorLine.getY2())
        if (
            !(
                result.crossingPoint.x >= minX && 
                result.crossingPoint.x <= maxX && 
                result.crossingPoint.y >= minY && 
                result.crossingPoint.y <= maxY
            )
        ) {
            result.isCrossing = false
            result.crossingPoint = {
                x: NaN,
                y: NaN
            }
        }
        return result
    }
}