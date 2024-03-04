import { Layer, Stage } from 'react-konva'
import { useSoftbody } from './hooks/use-softbody'
import { Softbody } from './physics/softbody/softbody'
import { Particle } from './physics/particle/particle'
import ParticleComponent from './components/particle-components'
import { Point } from './math/point/point'
import { Collision } from './physics/colission/colission'
import CollisionComponent from './components/collision-component'
import SpringComponent from './components/spring-component'

function App() {
  const particles: Particle[] = []
  for (let i = 0; i < 6; i++) {
    particles.push(new Particle([100 + (i % 3) * 30, 500 + Math.floor(i / 3) * 30], 2, 10))
  }
  particles.push(new Particle([130, 470], 2, 10))
  particles.push(new Particle([130, 560], 2, 10))
  const connects: {a: number, b: number}[] = [
    {
      a: 0,
      b: 1
    }, {
      a: 1,
      b: 2
    }, {
      a: 3,
      b: 4
    }, {
      a: 4,
      b: 5
    },
    {
      a: 0,
      b: 3
    }, {
      a: 1,
      b: 4
    },
    {
      a: 2,
      b: 5
    }, {
      a: 0,
      b: 4
    }, {
      a: 1,
      b: 3
    }, {
      a: 1,
      b: 5
    }, {
      a: 2,
      b: 4
    }, {
      a: 0,
      b: 6
    }, {
      a: 1,
      b: 6
    }, {
      a: 2,
      b: 6
    }, {
      a: 3,
      b: 7
    }, {
      a: 4,
      b: 7
    }, {
      a: 5,
      b: 7
    },
  ]
  const softbody = new Softbody(particles, connects, 100)
  
  const testCollision1 = new Collision([
    new Point(0, 500),
    new Point(window.innerWidth / 3, 100),
    new Point(window.innerWidth * 2 / 3, 100),
    new Point(window.innerWidth, 500)
  ], 1)
  const {particlesCoordinate, springsCoordinate} = useSoftbody(softbody, [testCollision1])
  
  const particlesJSX = particlesCoordinate.map((particle, index) => {
    return <ParticleComponent {...particle} height={window.innerHeight} key={index}/>
  })
  
  const springsJSX = springsCoordinate.map((spring, index) => {
    return <SpringComponent {...spring} height={window.innerHeight} key={index}/>
  })
  
  return (
    <Stage 
      width={window.innerWidth} 
      height={window.innerHeight}
    >
      <Layer>
        {particlesJSX}
        {springsJSX}
        <CollisionComponent collision={testCollision1} height={window.innerHeight}/>
      </Layer>
    </Stage>
  )
}

export default App
