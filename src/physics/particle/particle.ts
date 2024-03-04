import { TVector, Vector } from "../../math/vector/vector"
import { Point } from "../../math/point/point"
import { Collision } from "../colission/colission"
import { Ray } from "../../math/ray/ray"
import { SectorLine } from "../../math/sector-line/sector-line"
import { LineEquation } from "../../math/line-equation/line-equation"
import { Sle } from "../../math/sle/sle"
import { G } from "../../utils/constants"

export class Particle {
    private _pos: Point
    private _force: Vector
    private _mass: number
    private _velocity: Vector
    private _radius: number
    constructor([x, y]: number[], mass: number, radius: number) {
        this._pos = new Point(x, y)
        this._force = new Vector()
        this._mass = mass
        this._velocity = new Vector()
        this._radius = radius
    }
    getPos() {
        return this._pos
    }
    getX() {
        return this._pos.getX()
    }
    getY() {
        return this._pos.getY()
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
        const gravityForce = Vector.multiplyByNumber([0, -G], this._mass)
        this._force.add(gravityForce)
    }
    clearForce() {
        this._force = new Vector()
    }

    isColidingAfterDeltaTime(collisions: Collision[], deltaTime: number) {
        type TResult = {
            pointOfParticleToCollide: Point,
            crossingPoint: Point,
            crossingSectorLine: SectorLine
            distanceToPoint: number,
            elasticity: number
        } | undefined
        let result: TResult = undefined
        for (let i = 0; i < collisions.length; i++) {
            const currentCollision = collisions[i]
            for (let j = 0; j < currentCollision.getSectorLines().length; j++) {
                const currentSectorLine = currentCollision.getSectorLines()[j]
                const tempVector = new Vector(currentSectorLine)
                const vectorOfNormal = new Vector([tempVector.getY(), -tempVector.getX()])
                const lineEquation1 = LineEquation.getLineEquationFromPointAndVector(this._pos, vectorOfNormal)
                const lineEquation2 = LineEquation.getLineEquationFromSectorLine(currentSectorLine)
                const tempCrossingPoint = Sle.getSleFromTwoLineEquations(lineEquation1, lineEquation2).solve()
                const minDistanceVector = Vector.sub(tempCrossingPoint, this._pos)
                minDistanceVector.setRadius(this._radius)
                const pointToCollide = Vector.add(this._pos, minDistanceVector).getXY()
                const currentRay = new Ray(pointToCollide, this.getVelocity())
                const tempCollidingPoint = currentRay.getCrossingPointWithColission(currentCollision, j)
                if (tempCollidingPoint) {
                    const distanceToPoint = Vector.sub(tempCollidingPoint.point, pointToCollide).getRadius()
                    if (distanceToPoint <= Vector.multiplyByNumber(this._velocity, 2 * deltaTime).getRadius()) {
                        if (!result || distanceToPoint < result.distanceToPoint) {
                            result = {
                                pointOfParticleToCollide: pointToCollide,
                                crossingPoint: tempCollidingPoint.point,
                                crossingSectorLine: tempCollidingPoint.sectorLine,
                                distanceToPoint,
                                elasticity: tempCollidingPoint.elasticity
                            }
                        }
                    }
                }
            }
        }
        return result
    }

    updateVelocity(deltaTime: number) {
        const acceleration = Vector.divideByNumber(this._force, this._mass)
        this._velocity.add(Vector.multiplyByNumber(acceleration, deltaTime))
        this.clearForce()
    }

    updatePos(colissions: Collision[], deltaTime: number) {
        let newPosVector: Vector
        newPosVector = Vector.add(this._pos, Vector.multiplyByNumber(this._velocity, deltaTime))
        const collidingPoint = this.isColidingAfterDeltaTime(colissions, deltaTime)
        if (collidingPoint) {    
            const reflectedVelocity = Vector.reflect(this._velocity, collidingPoint.crossingSectorLine)
            const reflectedVelocityWithElasticity = Vector.multiplyByNumber(reflectedVelocity, Math.sqrt(collidingPoint.elasticity))
            this._velocity = reflectedVelocityWithElasticity

            const vectorFromPointOfParticleToCenter = Vector.sub(this._pos, collidingPoint.pointOfParticleToCollide)
            vectorFromPointOfParticleToCenter.setRadius(this._radius)
            const vectorAfterCrossing = Vector.sub(Vector.sub(newPosVector, vectorFromPointOfParticleToCenter), collidingPoint.crossingPoint)
            
            this._pos = Vector.add(collidingPoint.crossingPoint, Vector.multiplyByNumber(vectorFromPointOfParticleToCenter, 1.1)).getXY()
            this.updatePos(colissions, deltaTime * (vectorAfterCrossing.getRadius() / newPosVector.getRadius()))
        } 
        else 
            this._pos = newPosVector.getXY()
    }
}