import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { Points } from 'three'
import { useMediaQuery } from '@heroui/react'

const PARTICLE_COUNT = 150

function Particles() {
  const ref = useRef<Points>(null)
  const isMobile = useMediaQuery('(max-width: 640px)')

  const count = isMobile ? 60 : PARTICLE_COUNT

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 10
    }
    return pos
  }, [count])

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.02
      ref.current.rotation.y += delta * 0.015
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#3b82f6"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Particles />
      </Canvas>
    </div>
  )
}
