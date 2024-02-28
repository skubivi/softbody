import { Vector } from "../physics/vector/vector"

export const G = 0.1
export const gravityForce = new Vector([0, -G])
export const MINIMAL_DEFORM_AMOUNT = 1
export const DAMPING = 0.5
export const FPS = 60
export const DELTA_TIME = 1 / FPS
export const TENSION = 1