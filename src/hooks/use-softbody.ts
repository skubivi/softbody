import { useEffect, useState } from "react";
import { Softbody } from "../physics/softbody/softbody";

export const useSoftbody = (softbody: Softbody, deltaTime: number) => {
    const [softbodyState, setSoftbodyState] = useState(softbody) 
    const [particlesCoordinate, setParticlesCoordinate] = useState(softbody.getParticlesCoordinates())
    const [springsCoordinate, setSpringsCoordinate] = useState(softbody.getSpringsCoordinates())
    const [frame, setFrame] = useState(0)
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const currentSoftbodyState = softbodyState
            currentSoftbodyState.updatePosition(deltaTime)
            setParticlesCoordinate(currentSoftbodyState.getParticlesCoordinates())
            setSpringsCoordinate(currentSoftbodyState.getSpringsCoordinates())
            setSoftbodyState(currentSoftbodyState)
            setFrame(prev => prev + 1)
        }, deltaTime)

        return () => {
            clearTimeout(timeoutId)
        }
    }, [frame])

    return {
        particlesCoordinate,
        springsCoordinate
    }
}