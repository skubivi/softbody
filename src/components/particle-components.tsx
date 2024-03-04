import { FC } from "react";
import { Circle } from "react-konva";

interface IParticleComponent {
    particle: {
        r: number,
        x: number,
        y: number
    }
    height: number
}

const ParticleComponent: FC<IParticleComponent> = ({
    particle,
    height
}) => {
    return (
        <Circle 
            x={particle.x}
            y={height - particle.y}
            radius={particle.r}
            fill="black"
        />
    )
}

export default ParticleComponent