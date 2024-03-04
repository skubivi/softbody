import { Collision } from "../colission/colission";
import { Particle } from "../particle/particle";
import { Spring } from "../spring/spring";

export class Softbody {
    private _springs: Spring[];
    private _particles: Particle[];
    constructor(particles: Particle[], connects: {a: number, b: number}[], stiffness: number) {
        this._particles = particles
        this._springs = []
        connects.forEach(connect => {
            const particleA = particles[connect.a]
            const particleB = particles[connect.b]
            this._springs.push(new Spring(particleA, particleB, stiffness))
        })
    }
    
    updatePosition(collisions: Collision[], deltaTime: number) {
        this._springs.forEach(spring => {
            spring.addForceToParticles()
        })
        this._particles.forEach(particle => {
            particle.addGravityForce()
        })
        this._particles.forEach(particle => {
            particle.updateVelocity(deltaTime)
        })
        this._springs.forEach(spring => {
            spring.addDampingForceToParticles()
        })
        this._particles.forEach(particle => {
            particle.updateVelocity(deltaTime)
        })
        this._particles.forEach(particle => {
            particle.updatePos(collisions, deltaTime)
        })
    }

    getParticlesCoordinates() {
        return this._particles.map(particle => {
            return {
                x: particle.getPos().getX(),
                y: particle.getPos().getY(),
                r: particle.getRadius()
            }
            
        })
    }

    getSpringsCoordinates() {
        return this._springs.map(spring => spring.getCoordinates())
    }
}