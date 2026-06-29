import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

interface SteamParticle {
  id: number;
  pos: [number, number, number];
  speed: [number, number, number];
  opacity: number;
  size: number;
}

// 3D Steam particle generation centered on the Jebena's spout coordinates
function JebenaSteamSystem() {
  const count = 18;
  const positions = useMemo(() => {
    const list: SteamParticle[] = [];
    for (let i = 0; i < count; i++) {
      list.push({
        id: i,
        // Spout position is roughly x = -0.7, y = 0.5, z = 0
        pos: [-0.65, 0.6, 0] as [number, number, number],
        // Drift upwards and slightly left
        speed: [-0.01 - Math.random() * 0.01, 0.035 + Math.random() * 0.025, (Math.random() - 0.5) * 0.01],
        opacity: Math.random() * 0.35 + 0.1,
        size: Math.random() * 0.08 + 0.05
      });
    }
    return list;
  }, []);

  const [particles, setParticles] = React.useState<SteamParticle[]>(positions);

  useFrame(() => {
    setParticles((prev) =>
      prev.map((p) => {
        const nextY = p.pos[1] + p.speed[1];
        const nextX = p.pos[0] + p.speed[0];
        const nextZ = p.pos[2] + p.speed[2];
        const nextSize = p.size + 0.005; // inflate as it rises
        const distFromSpout = nextY - 0.6;
        
        // Drastically fade out as it floats upwards
        const nextOpacity = Math.max(0, p.opacity - 0.007);

        // Recycle particle once faded or too high
        if (nextOpacity <= 0 || nextY > 3.0) {
          return {
            ...p,
            pos: [-0.65, 0.6, 0],
            opacity: Math.random() * 0.35 + 0.15,
            size: Math.random() * 0.08 + 0.05
          };
        }

        return {
          ...p,
          pos: [nextX, nextY, nextZ],
          size: nextSize,
          opacity: nextOpacity
        };
      })
    );
  });

  return (
    <group>
      {particles.map((p) => (
        <mesh key={p.id} position={p.pos}>
          <sphereGeometry args={[p.size, 10, 10]} />
          <meshBasicMaterial 
            color="#ebdcc5" 
            transparent 
            opacity={p.opacity * 0.45} 
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

function JebenaBodyMesh() {
  const groupRef = useRef<THREE.Group>(null);

  // Rotate and tilt the Jebena organically
  useFrame((state) => {
    if (groupRef.current) {
      // Automatic extremely slow turning
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
      
      // Gentle micro floating
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.06;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. Spherical belly body */}
      <mesh castShadow receiveShadow position={[0, -0.6, 0]}>
        <sphereGeometry args={[0.9, 36, 36]} />
        <meshStandardMaterial 
          color="#231913" // Classic black clay
          roughness={0.78}
          metalness={0.15}
          bumpScale={0.05}
        />
      </mesh>

      {/* Decorative center ring belt around the belly */}
      <mesh position={[0, -0.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.91, 0.02, 8, 48]} />
        <meshStandardMaterial 
          color="#c59b27" // Burnished gold bead trim
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* 2. Jebena conical/cylindrical Neck top */}
      <mesh castShadow position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.2, 0.3, 1.2, 24]} />
        <meshStandardMaterial 
          color="#1b120c"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Traditional decorative collar on the neck */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.26, 0.26, 0.08, 24]} />
        <meshStandardMaterial 
          color="#c59b27" // Gilded neck collar
          roughness={0.25}
          metalness={0.75}
        />
      </mesh>

      {/* Decorative upper straw band */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.25, 0.28, 0.06, 24]} />
        <meshStandardMaterial 
          color="#b0841f"
          roughness={0.4}
          metalness={0.6}
        />
      </mesh>

      {/* 3. Diagonal Spout */}
      {/* Placement intersects belly and neck top, pointing left */}
      <mesh 
        castShadow 
        position={[-0.45, 0.0, 0]} 
        rotation={[0, 0.2, 0.65]}
      >
        <cylinderGeometry args={[0.07, 0.14, 0.7, 16]} />
        <meshStandardMaterial 
          color="#1e140f"
          roughness={0.75}
          metalness={0.1}
        />
      </mesh>

      {/* Golden tip on Spout */}
      <mesh 
        position={[-0.67, 0.19, 0]} 
        rotation={[0, 0.2, 0.65]}
      >
        <cylinderGeometry args={[0.072, 0.075, 0.06, 16]} />
        <meshStandardMaterial 
          color="#c59b27"
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* 4. Elegant loop handle */}
      {/* Curved torus shape that links neck and belly body on the right side */}
      <mesh 
        castShadow 
        position={[0.38, -0.05, 0]} 
        rotation={[0, 0, -0.2]}
      >
        <torusGeometry args={[0.42, 0.06, 12, 32, Math.PI * 1.05]} />
        <meshStandardMaterial 
          color="#1b120c"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* 5. Braided straw ring base stand (the traditional 'Mat') */}
      <mesh position={[0, -1.48, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.62, 0.12, 12, 36]} />
        <meshStandardMaterial 
          color="#c59b27" // Golden-braided fiber straw
          roughness={0.5}
          metalness={0.6}
        />
      </mesh>
    </group>
  );
}

export default function ThreeDJebena() {
  return (
    <div className="w-full h-full relative" id="three-jebena-canvas">
      <Canvas
        shadows
        camera={{ position: [0, 0, 4.0], fov: 50 }}
        className="w-full h-full"
      >
        {/* Fill light */}
        <ambientLight intensity={1.5} />
        
        {/* Warm crackling embers key spotlight from below-left */}
        <spotLight 
          position={[-3, -6, 2]} 
          angle={0.4} 
          penumbra={1} 
          intensity={5.0} 
          color="#ff7f30" // Warm heat orange
          castShadow 
        />

        {/* Studio spotlight from top right */}
        <spotLight 
          position={[4, 8, 4]} 
          angle={0.35} 
          penumbra={1} 
          intensity={4.5} 
          color="#fff0cc"
          castShadow 
        />
        
        {/* Backlight glow */}
        <directionalLight 
          position={[-2, 4, -4]} 
          intensity={1.2} 
          color="#a8b5e0" 
        />

        <Suspense fallback={null}>
          <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.1}>
            <JebenaBodyMesh />
            {/* Live 3D Steam particles ascending up from spout */}
            <JebenaSteamSystem />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}
