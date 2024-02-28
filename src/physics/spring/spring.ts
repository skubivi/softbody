import { MINIMAL_DEFORM_AMOUNT } from "../../utils/constants";
import { Particle } from "../particle/particle";
import { Vector } from "../vector/vector";

export class Spring {
    particleA: Particle;
    particleB: Particle;
    restLength: number;
    stiffness: number;
    damping: number;
    constructor(particleA: Particle, particleB: Particle, restLength: number, stiffness: number) {
        this.particleA = particleA
        this.particleB = particleB
        this.restLength = restLength
        this.stiffness = stiffness
        this.damping = 0.5
    }

    computeForce() {
        const d = Vector.sub(this.particleA, this.particleB)
        const distance = d.getRadius()
        const deformAmount = distance - this.restLength
        if (Math.abs(deformAmount) < MINIMAL_DEFORM_AMOUNT) return new Vector()
        const restorativeForce = this.stiffness * deformAmount
        return Vector.multiplyByNumber(Vector.divideByNumber(d, distance), restorativeForce)
    }
    computeDampingForce() {
        return Vector.multiplyByNumber(Vector.sub(this.particleA.getVelocity(), this.particleB.getVelocity()), this.damping)
    }

    update() {
        const f = this.computeForce()
        const dampingForce = this.computeDampingForce()
        const resultForce = Vector.add(f, dampingForce)

        this.particleA.addForce(Vector.multiplyByNumber(resultForce, -1))
        this.particleB.addForce(resultForce)
    }
}