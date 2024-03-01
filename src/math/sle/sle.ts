import { LineEquation } from "../line-equation/line-equation";
import { Matrix } from "../matrix/matrix";
import { Vector } from "../vector/vector";

export class Sle {
    private _matrix: Matrix;
    private _vector: Vector;
    constructor (matrix: Matrix, vector: Vector) {
        this._matrix = matrix
        this._vector = vector
    }
    static getSleFromTwoVectors(vector1: Vector, vector2: Vector, position1: {x: number, y: number}, position2: {x: number, y: number}) {
        const line1 = LineEquation.getLineEquationFromPointAndVector(position1, vector1)
        const line2 = LineEquation.getLineEquationFromPointAndVector(position2, vector2)
        return this.getSleFromTwoLineEquations(line1, line2)
    }
    static getSleFromTwoLineEquations(line1: LineEquation, line2: LineEquation) {
        const resultMatrix = new Matrix([line1.getX(), line1.getY(), line2.getX(), line2.getY()])
        const resultVector = new Vector([line1.getZ(), line2.getZ()])
        return new Sle(resultMatrix, resultVector)
    }
    private _round(num: number) {
        return Math.round((num + Number.EPSILON) * 100) / 100
    }
    solve() {
        const determinant = this._matrix.getDeterminant()
        if (determinant === 0) return undefined
        const determinant1 = this._matrix.getNewMatrixFromVector(this._vector, 1).getDeterminant()
        const determinant2 = this._matrix.getNewMatrixFromVector(this._vector, 2).getDeterminant()
        return [this._round(determinant1 / determinant), this._round(determinant2 / determinant)]
    }
}