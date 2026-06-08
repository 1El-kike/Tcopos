import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useMediaQuery } from '@heroui/react'
import * as THREE from 'three'

function createDollarTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const ctx = canvas.getContext('2d')!

  ctx.shadowColor = '#d4af37'
  ctx.shadowBlur = 20
  ctx.font = 'Bold 72px Inter, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = '#d4af37'
  ctx.globalAlpha = 1
  ctx.fillText('$', 64, 64)

  ctx.shadowBlur = 0
  ctx.fillStyle = '#fef3c7'
  ctx.globalAlpha = 0.5
  ctx.fillText('$', 64, 64)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

function Particles() {
  const ref = useRef<THREE.Points>(null)
  const isMobile = useMediaQuery('(max-width: 640px)')
  const count = isMobile ? 40 : 100

  const texture = useMemo(() => createDollarTexture(), [])
  const velocities = useRef<number[]>([])

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel: number[] = []
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2
      vel.push(0.03 + Math.random() * 0.08)
    }
    velocities.current = vel
    return pos
  }, [count])

  useFrame((_, delta) => {
    if (ref.current) {
      const pos = ref.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < count; i++) {
        pos[i * 3 + 1] += velocities.current[i] * delta
        if (pos[i * 3 + 1] > 8) {
          pos[i * 3 + 1] = -8
          pos[i * 3] = (Math.random() - 0.5) * 20
        }
      }
      ref.current.geometry.attributes.position.needsUpdate = true
      ref.current.rotation.y += delta * 0.004
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
        map={texture}
        size={0.6}
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 " aria-hidden="true">
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
