import { TVector, Vector } from "../vector/vector"

export class Particle {
    private _pos: number[]
    private _force: Vector
    private _mass: number
    private _velocity: Vector
    constructor([x, y]: number[], mass: number) {
        this._pos = [x, y]
        this._force = new Vector()
        this._mass = mass
        this._velocity = new Vector()
    }
    getPos() {
        return this._pos
    }
    getX() {
        return this._pos[0]
    }
    getY() {
        return this._pos[1]
    }

    getVelocity() {
        return this._velocity   
    }

    addForce(vector: TVector) {
        this._force.add(vector)
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