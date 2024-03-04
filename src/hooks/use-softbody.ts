import { useEffect, useState } from "react";
import { Softbody } from "../physics/softbody/softbody";
import { Collision } from "../physics/colission/colission";

export const useSoftbody = (softbody: Softbody, collisions: Collision[]) => {
    const [softbodyState, setSoftbodyState] = useState(softbody) 
    const [particlesCoordinate, setParticlesCoordinate] = useState(softbody.getParticlesCoordinates())
    const [springsCoordinate, setSpringsCoordinate] = useState(softbody.getSpringsCoordinates())
    const [previousTime, setPreviousTime] = useState(Date.now())
    const [frame, setFrame] = useState(0)
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const currentSoftbodyState = softbodyState
            const currentTime = Date.now()
            const deltaTime = (currentTime - previousTime) / 1000
            setPreviousTime(currentTime)
            currentSoftbodyState.updatePosition(collisions, deltaTime)
            setParticlesCoordinate(currentSoftbodyState.getParticlesCoordinates())
            setSpringsCoordinate(currentSoftbodyState.getSpringsCoordinates())
            setSoftbodyState(currentSoftbodyState)
            setFrame(prev => prev + 1)
        })

        return () => {
            clearTimeout(timeoutId)
        }
    }, [frame])

    return {
        particlesCoordinate,
        springsCoordinate
    }
}