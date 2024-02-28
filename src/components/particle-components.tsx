import { FC } from "react";
import { Circle } from "react-konva";

interface IParticleComponent {
    r: number,
    x: number,
    y: number,
    height: number
}

const ParticleComponent: FC<IParticleComponent> = ({
    x,
    y,
    r,
    height
}) => {
    return (
        <Circle 
            x={x}
            y={height - y}
            radius={r}
            fill="black"
        />
    )
}

export default ParticleComponent