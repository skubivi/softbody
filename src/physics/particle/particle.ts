import { gravityForce } from "../../utils/constants"
import { TVector, Vector } from "../vector/vector"

export class Particle {
    private _pos: number[]
    private _force: Vector
    private _mass: number
    private _velocity: Vector
    private _radius: number
    constructor([x, y]: number[], mass: number, radius: number) {
        this._pos = [x, y]
        this._force = new Vector()
        this._mass = mass
        this._velocity = new Vector()
        this._radius = radius
    }
    getPos() {
        return {
            x: this._pos[0],
            y: this._pos[1],
            r: this._radius
        }
    }
    getX() {
        return this._pos[0]
    }
    getY() {
        return this._pos[1]
    }

    getRadius() {
        return this._radius
    }

    getVelocity() {
        return this._velocity   
    }

    addForce(vector: TVector) {
        this._force.add(vector)
    }
    addGravityForce() {
        this._force.add(gravityForce)
    }
    clearForce() {
        this._force.clearVector()
    }

    updatePos(deltaTime: number) {
        const acceleration = Vector.divideByNumber(this._force, this._mass)
        this._velocity.add(Vector.multiplyByNumber(acceleration, deltaTime))
        const newPosVector = Vector.add(this._pos, Vector.multiplyByNumber(this._velocity, deltaTime))
        this._pos = newPosVector.getXY()
    }
    updatePosWithClearForce(deltaTime: number) {
        this.updatePos(deltaTime)
        this.clearForce()
    }
    
}