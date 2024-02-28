import { Layer, Stage } from 'react-konva'
import { useSoftbody } from './hooks/use-softbody'
import { Softbody } from './physics/softbody/softbody'
import { Particle } from './physics/particle/particle'
import { DELTA_TIME } from './utils/constants'
import ParticleComponent from './components/particle-components'
import SpringComponent from './components/spring-component'

function App() {
  const particles: Particle[] = []
  for (let i = 0; i < 12; i++) {
    particles.push(new Particle([500 + (i % 4) * 30, 500 + Math.floor(i / 4) * 30], 2, 10))
  }
  const connects: {a: number, b: number}[] = []
  const softbody = new Softbody(particles, connects, 1)
  const {particlesCoordinate, springsCoordinate} = useSoftbody(softbody, DELTA_TIME)
  
  const particlesJSX = particlesCoordinate.map((particle, index) => {
    return <ParticleComponent x={particle.x} y={particle.y} r={particle.r} height={window.innerHeight} key={index}/>
  })
  const springsJSX = springsCoordinate.map((spring, index) => {
    <SpringComponent {...spring} height={window.innerHeight} key={index}/>
  })

  return (
    <Stage 
      width={window.innerWidth} 
      height={window.innerHeight}
    >
      <Layer>
        {
          particlesJSX
        }
      </Layer>
    </Stage>
  )
}

export default App
