import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

function Cabin(props) {
  const groupRef = useRef()
  const { nodes, materials } = useGLTF('/chalupka-transformed.glb')

  // Subtle floating animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.025
    }
  })

  return (
    <group ref={groupRef} {...props} dispose={null} rotation={[0, -Math.PI / 2, 0]}>
      <mesh
        geometry={nodes['tripo_node_c3f2fe8f-73aa-4e71-9035-5c5198143da1'].geometry}
        material={nodes['tripo_node_c3f2fe8f-73aa-4e71-9035-5c5198143da1'].material}
        receiveShadow
        scale={1}
        position={[0, 0, 0]}
      />
    </group>
  )
}

// Preload the model with Draco decoder
useGLTF.preload('/chalupka-transformed.glb')

export default Cabin
