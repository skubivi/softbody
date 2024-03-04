import { FC } from "react";
import { Line } from "react-konva";
import { TENSION } from "../utils/constants";
import { Point } from "../math/point/point";

interface ISpringComponent {
    a: Point
    b: Point
    height: number
}

const SpringComponent: FC<ISpringComponent> = ({
    a,
    b,
    height
}) => {
    const x1 = Math.round(a.getX())
    const y1 = Math.round(height - a.getY())
    const x2 = Math.round(b.getX() - a.getX())
    const y2 = Math.round(a.getY() - b.getY())
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