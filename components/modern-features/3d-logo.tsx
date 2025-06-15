"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { Suspense } from "react"
import type * as THREE from "three"

// Fix the type import
type Group = THREE.Group

function LogoModel() {
  // Fix the ref type
  const group = useRef<any>(null)

  // Simple rotation animation
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2
    }
  })

  // Since we don't have an actual 3D model, we'll create a simple 3D object
  return (
    <group ref={group}>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#f59e0b" />
      </mesh>
    </group>
  )
}

export default function Logo3D() {
  return (
    <div className="w-20 h-20">
      <Canvas>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <LogoModel />
          <OrbitControls enableZoom={false} enablePan={false} />
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        </Suspense>
      </Canvas>
    </div>
  )
}
