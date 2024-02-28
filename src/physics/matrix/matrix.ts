import { Vector } from "../vector/vector"

export type TMatrixFromNumbers = number[]

export type TMatrixFromVectors = {
    vector1: Vector
    vector2: Vector
}

export type TMatrix = TMatrixFromNumbers | TMatrixFromVectors

export class Matrix {
    private _x1: number
    private _x2: number
    private _y1: number
    private _y2: number
    private _determinant: number
    constructor(options: number[] | TMatrixFromVectors) {
        if (Array.isArray(options)) {
            this._x1 = options[0]
            this._x2 = options[1]
            this._y1 = options[2]
            this._y2 = options[3]
        } else {
            this._x1 = options.vector1.getX()
            this._x2 = options.vector1.getY()
            this._y1 = options.vector2.getX()
            this._y2 = options.vector2.getY()
        }
        this._determinant = this._x1 * this._y2 - this._x2 * this._y1
    }
    getDeterminant() {
        return this._determinant
    }
    getNewMatrixFromVector(vector: Vector, column: 1 | 2) {
        if (column === 1) {
            return new Matrix([vector.getX(), this._x2, vector.getY(), this._y2])
        }
        else {
            return new Matrix([this._x1, vector.getX(), this._y1, vector.getY()])
        }
    }
}