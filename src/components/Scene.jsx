import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Cabin from './Cabin'
import Snow from './Snow'
import Skybox from './Skybox'

function Scene() {
  const groupRef = useRef()

  // Gentle rotation animation for the scene
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  return (
    <>
      {/* Camera controls - front view with limited rotation */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={1}
        maxDistance={4}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
        minAzimuthAngle={-Math.PI / 2}
        maxAzimuthAngle={Math.PI / 2}
        target={[0, 0.7, 0]}
      />

      {/* Starry night sky with moon */}
      <Skybox />

      {/* Ambient light for base illumination */}
      { <ambientLight intensity={200} color="#f423f1" /> }

      {/* Main directional light (moonlight effect) */}
      <directionalLight
        position={[5, 15, 5]}
        intensity={7}
        color="#e8f4ff"
        castShadow
        shadow-mapSize={[2048, 2048]}
      />

      {/* Warm accent light from below */}
      <pointLight position={[0, -2, 0]} intensity={50} color="#ffaa55" />

      {/* Cool rim light */}
      <pointLight position={[-5, 3, -5]} intensity={100} color="#aaccff" />

      {/* Snow particles */}
      <Snow count={4000} />

      {/* Animated group containing the cabin */}
      <group ref={groupRef}>
        <Cabin />
      </group>

      {/* Ground plane for shadow catching */}
      {/* <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
        <circleGeometry args={[10, 64]} />
        <shadowMaterial opacity={0.3} />
      </mesh> */}
    </>
  )
}

export default Scene
