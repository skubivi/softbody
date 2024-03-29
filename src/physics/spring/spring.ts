import { DAMPING, MINIMAL_DEFORM_AMOUNT } from "../../utils/constants";
import { Particle } from "../particle/particle";
import { Vector } from "../../math/vector/vector";

export class Spring {
    private _particleA: Particle;
    private _particleB: Particle;
    private _restLength: number;
    private _stiffness: number;
    private _damping: number;
    constructor(particleA: Particle, particleB: Particle, stiffness: number) {
        this._particleA = particleA
        this._particleB = particleB
        this._restLength = Vector.sub(this._particleA, this._particleB).getRadius()
        this._stiffness = stiffness
        this._damping = DAMPING
    }

    private _computeForce() {
        const d = Vector.sub(this._particleA, this._particleB)
        const distance = d.getRadius()
        const deformAmount = distance - this._restLength
        if (Math.abs(deformAmount) < MINIMAL_DEFORM_AMOUNT) return new Vector()
        const restorativeForce = this._stiffness * deformAmount
        return Vector.multiplyByNumber(Vector.divideByNumber(d, distance), restorativeForce)
    }
    private _computeDampingForce() {
        return Vector.multiplyByNumber(Vector.sub(this._particleA.getVelocity(), this._particleB.getVelocity()), this._damping)
    }

    addForceToParticles() {
        const f = this._computeForce()

        this._particleA.addForce(Vector.multiplyByNumber(f, -1))
        this._particleB.addForce(f)
    }

    addDampingForceToParticles() {
        const dampingForce = this._computeDampingForce()
        this._particleA.addForce(Vector.multiplyByNumber(dampingForce, -1))
        this._particleB.addForce(dampingForce)
    }

    getCoordinates() {
        return {
            a: this._particleA.getPos(),
            b: this._particleB.getPos()
        }
    }
}