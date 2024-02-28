import { FC } from "react";
import { Line } from "react-konva";
import { TENSION } from "../utils/constants";

interface ISpringComponent {
    a: {
        x: number
        y: number
    }
    b: {
        x: number
        y: number
    }
    height: number
}

const SpringComponent: FC<ISpringComponent> = ({
    a,
    b,
    height
}) => {
    const x1 = a.x
    const y1 = height - a.y
    const x2 = b.x - a.x
    const y2 = a.y - b.y
    return (
        <Line
            x={x1}
            y={y1}
            points={[0, 0, x2, y2]}
            tension={TENSION}
            stroke={'black'}
        />
    )
}

export default SpringComponent