import { FC } from "react";
import { Collision } from "../physics/colission/colission";
import { Line } from "react-konva";
import { TENSION } from "../utils/constants";

interface ICollisionComponent {
    collision: Collision,
    height: number
}

const CollisionComponent: FC<ICollisionComponent> = ({
    collision,
    height
}) => {
    const linesJSX = collision.getSectorLines().map(element => {
        const startingX = element.getPoint1().getX()
        const startingY = height - element.getPoint1().getY()
        const endX = element.getPoint2().getX() - element.getPoint1().getX()
        const endY = element.getPoint1().getY() - element.getPoint2().getY()
        return( 
            <Line 
                x={startingX}
                y={startingY}
                points={[0, 0, endX, endY]}
                tension={TENSION}
                stroke={'black'}
            />
        )
    })
    return (
        <>
            {linesJSX}
        </>
    )
}

export default CollisionComponent