import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Snow({ count = 2000 }) {
  const pointsRef = useRef()

  // Create particle positions and velocities
  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      // Random positions in a box around the scene
      positions[i * 3] = (Math.random() - 0.5) * 20      // x
      positions[i * 3 + 1] = Math.random() * 15          // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20  // z

      // Random fall speeds
      velocities[i] = 0.5 + Math.random() * 1.5
    }

    return { positions, velocities }
  }, [count])

  // Animate snowflakes falling
  useFrame((state, delta) => {
    if (!pointsRef.current) return

    const positionArray = pointsRef.current.geometry.attributes.position.array

    for (let i = 0; i < count; i++) {
      // Move down
      positionArray[i * 3 + 1] -= velocities[i] * delta

      // Add slight horizontal drift
      positionArray[i * 3] += Math.sin(state.clock.elapsedTime + i) * 0.002
      positionArray[i * 3 + 2] += Math.cos(state.clock.elapsedTime + i * 0.5) * 0.002

      // Reset to top when below ground
      if (positionArray[i * 3 + 1] < -2) {
        positionArray[i * 3 + 1] = 15
        positionArray[i * 3] = (Math.random() - 0.5) * 20
        positionArray[i * 3 + 2] = (Math.random() - 0.5) * 20
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#ffffff"
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default Snow
