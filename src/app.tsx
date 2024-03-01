import { Layer, Stage } from 'react-konva'
import { useSoftbody } from './hooks/use-softbody'
import { Softbody } from './physics/softbody/softbody'
import { Particle } from './physics/particle/particle'
import { DELTA_TIME } from './utils/constants'
import ParticleComponent from './components/particle-components'
import SpringComponent from './components/spring-component'
import { Sle } from './math/sle/sle'
import { Vector } from './math/vector/vector'
import { LineEquation } from './math/line-equation/line-equation'
import { Ray } from './math/ray/ray'

function App() {
  // const particles: Particle[] = []
  // for (let i = 0; i < 12; i++) {
  //   particles.push(new Particle([500 + (i % 4) * 30, 500 + Math.floor(i / 4) * 30], 2, 10))
  // }
  // const connects: {a: number, b: number}[] = []
  // const softbody = new Softbody(particles, connects, 1)
  // const {particlesCoordinate, springsCoordinate} = useSoftbody(softbody, DELTA_TIME)
  
  // const particlesJSX = particlesCoordinate.map((particle, index) => {
  //   return <ParticleComponent x={particle.x} y={particle.y} r={particle.r} height={window.innerHeight} key={index}/>
  // })
  // const springsJSX = springsCoordinate.map((spring, index) => {
  //   <SpringComponent {...spring} height={window.innerHeight} key={index}/>
  // })
  const line1 = LineEquation.getLineEquationFromTwoPoints({
    x: 2,
    y: 4
  }, {
    x: 3,
    y: 5
  })
  const line2 = LineEquation.getLineEquationFromTwoPoints({
    x: 5,
    y: 1
  }, {
    x: 7,
    y: 2
  })
  const startingPoint = {
    x: 1,
    y: 1
  }
  const vector = new Vector([-3, 1])
  const ray = new Ray({
    startingPoint,
    vector
  })
  console.log(ray.isCrossingLine(line1))
  
  return (
    <Stage 
      width={window.innerWidth} 
      height={window.innerHeight}
    >
      <Layer>

      </Layer>
    </Stage>
  )
}

export default App
