import { Layer, Rect, Stage } from 'react-konva'

function App() {
  return (
    <Stage 
      width={window.innerWidth} 
      height={window.innerHeight}
    >
      <Layer>
        <Rect 
          width={100}
          height={100}
          fill='rgb(255, 0, 0)'
        />
      </Layer>
    </Stage>
  )
}

export default App
