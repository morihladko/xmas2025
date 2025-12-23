import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Scene from './components/Scene'
import Loader from './components/Loader'

function App() {
  return (
    <>
      <Loader />
      <Canvas
        shadows
        camera={{
          position: [32, 8, 0],
          fov: 35,
          near: 0.1,
          far: 1000
        }}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </>
  )
}

export default App
