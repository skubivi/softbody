import { FC } from "react";
import { Line } from "react-konva";
import { TENSION } from "../utils/constants";
import { Point } from "../math/point/point";

interface ISpringComponent {
    spring: {
        a: Point,
        b: Point
    }
    height: number
}

const SpringComponent: FC<ISpringComponent> = ({
    spring,
    height
}) => {
    const x1 = Math.round(spring.a.getX())
    const y1 = Math.round(height - spring.a.getY())
    const x2 = Math.round(spring.b.getX() - spring.a.getX())
    const y2 = Math.round(spring.a.getY() - spring.b.getY())
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