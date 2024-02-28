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
        const firstSection = {
            x1: position1.x, 
            y1: position1.y, 
            x2: vector1.getX() + position1.x, 
            y2: vector1.getY() + position1.y
        }
        const secondSection = {
            x1: position2.x, 
            y1: position2.y, 
            x2: vector2.getX() + position2.x, 
            y2: vector2.getY() + position2.y
        }
        const firstOptions = [
            firstSection.x2 === firstSection.x1 ? 1 : (firstSection.y1 - firstSection.y2) / (firstSection.x2 - firstSection.x1),
            firstSection.x2 === firstSection.x1 ? 0 : 1,
            firstSection.x2 === firstSection.x1 ? firstSection.x1 : (firstSection.x2 * firstSection.y1 - firstSection.x1 * firstSection.y2) / (firstSection.x2 - firstSection.x1)
        ]
        const secondOptions = [
            secondSection.x2 === secondSection.x1 ? 1 : (secondSection.y1 - secondSection.y2) / (secondSection.x2 - secondSection.x1),
            secondSection.x2 === secondSection.x1 ? 0 : 1,
            secondSection.x2 === secondSection.x1 ? secondSection.x1 : (secondSection.x2 * secondSection.y1 - secondSection.x1 * secondSection.y2) / (secondSection.x2 - secondSection.x1)
        ]
        const newMatrix = new Matrix([firstOptions[0], firstOptions[1], secondOptions[0], secondOptions[1]])
        const newVector = new Vector([firstOptions[2], secondOptions[2]])
        return new Sle(newMatrix, newVector)
    }
    solve() {
        const determinant = this._matrix.getDeterminant()
        if (determinant === 0) return undefined
        const determinant1 = this._matrix.getNewMatrixFromVector(this._vector, 1).getDeterminant()
        const determinant2 = this._matrix.getNewMatrixFromVector(this._vector, 2).getDeterminant()
        return [determinant1 / determinant, determinant2 / determinant]
    }
}