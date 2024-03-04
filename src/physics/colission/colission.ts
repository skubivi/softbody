import { Point } from "../../math/point/point";
import { SectorLine } from "../../math/sector-line/sector-line";

export class Collision {
    private _sectorLines: SectorLine[] = []
    private _elasticity: number
    constructor(points: Point[], elasticity: number = 0) {
        for (let i = 1; i < points.length; i++) {
            this._sectorLines.push(new SectorLine(points[i - 1], points[i]))
        }
        if (elasticity < 0) this._elasticity = 0
        else if (elasticity > 1) this._elasticity = 1
        else this._elasticity = elasticity
    }
    getSectorLines() {
        return this._sectorLines
    }
    getElasticity() {
        return this._elasticity
    }
}