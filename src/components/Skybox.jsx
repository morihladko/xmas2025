import { useTexture } from '@react-three/drei'
import { useThree, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

useTexture.preload('/skybox.webp')

function Skybox() {
  const texture = useTexture('/skybox.webp')
  const meshRef = useRef()
  const { camera, size } = useThree()

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        map: { value: texture },
        viewportAspect: { value: size.width / size.height },
        imageAspect: { value: 1 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position.xy, 0.9999, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D map;
        uniform float viewportAspect;
        uniform float imageAspect;
        varying vec2 vUv;

        void main() {
          vec2 uv = vUv;

          // Cover behavior: scale UVs to fill viewport while maintaining aspect ratio
          if (viewportAspect > imageAspect) {
            float scale = viewportAspect / imageAspect;
            uv.y = (uv.y - 0.5) / scale + 0.5;
          } else {
            float scale = imageAspect / viewportAspect;
            uv.x = (uv.x - 0.5) / scale + 0.5;
          }

          gl_FragColor = texture2D(map, uv);
        }
      `,
      depthTest: false,
      depthWrite: false
    })
  }, [texture])

  // Update aspect ratios when texture loads or viewport changes
  useFrame(() => {
    if (texture.image && material.uniforms) {
      material.uniforms.imageAspect.value = texture.image.width / texture.image.height
      material.uniforms.viewportAspect.value = size.width / size.height
    }
  })

  return (
    <mesh ref={meshRef} frustumCulled={false} renderOrder={-1000} material={material}>
      <planeGeometry args={[2, 2]} />
    </mesh>
  )
}

export default Skybox
