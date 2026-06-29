import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface BeanData {
  id: number;
  initialX: number;
  initialY: number;
  z: number;
  scale: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  speedX: number;
  speedY: number;
  rotSpeed: [number, number, number];
}

function CoffeeBeanSingle(props: { data: BeanData }) {
  const { data } = props;
  const meshRef = useRef<THREE.Group>(null);

  // Smooth continuous animation of floating 3D Coffee Beans
  useFrame((state) => {
    if (meshRef.current) {
      // Slow rotation
      meshRef.current.rotation.x += data.rotSpeed[0] * 0.5;
      meshRef.current.rotation.y += data.rotSpeed[1] * 0.5;
      meshRef.current.rotation.z += data.rotSpeed[2] * 0.5;

      // Slow drift downward
      meshRef.current.position.y -= data.speedY * 0.7;

      // Drifting side-to-side wavy movement
      meshRef.current.position.x = data.initialX + Math.sin(state.clock.getElapsedTime() * 0.4 + data.id) * 0.4;

      // Wrap-around boundaries (standard screen viewport coordinates roughly range from -5 to +5)
      if (meshRef.current.position.y < -7) {
        meshRef.current.position.y = 7;
      }
    }
  });

  return (
    <group
      ref={meshRef}
      position={[data.initialX, data.initialY, data.z]}
      scale={[data.scale, data.scale, data.scale]}
    >
      {/* Authentic split-halves geometry representation of an Arabica coffee bean */}
      {/* Left half lobe */}
      <mesh position={[-0.07, 0, 0]} scale={[1.15, 0.68, 0.54]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshStandardMaterial 
          color="#381d0c" // Dark roasted coffee
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>
      
      {/* Right half lobe */}
      <mesh position={[0.07, 0, 0]} scale={[1.15, 0.68, 0.54]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshStandardMaterial 
          color="#381d0c"
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>

      {/* Center cleft trench accent (thin dark separator box) */}
      <mesh position={[0, 0, 0.43]} scale={[1.2, 0.6, 0.08]}>
        <boxGeometry args={[0.08, 1, 1]} />
        <meshBasicMaterial color="#120602" />
      </mesh>
    </group>
  );
}

// Glowing golden background embers/dust (uses simple point mesh particles or miniature spheres)
function GoldDustDust() {
  const count = 35;
  const points = useMemo(() => {
    const list = [];
    for (let i = 0; i < count; i++) {
      list.push({
        id: i,
        pos: [
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 4 - 3 // slightly pushed back
        ] as [number, number, number],
        speedY: Math.random() * 0.003 + 0.001,
        waveFreq: Math.random() * 0.5 + 0.1,
        size: Math.random() * 0.08 + 0.04
      });
    }
    return list;
  }, []);

  return (
    <group>
      {points.map((p) => {
        const ref = React.useRef<THREE.Mesh>(null);
        useFrame((state) => {
          if (ref.current) {
            ref.current.position.y += p.speedY;
            ref.current.position.x += Math.sin(state.clock.getElapsedTime() * p.waveFreq) * 0.002;
            
            if (ref.current.position.y > 7) {
              ref.current.position.y = -7;
            }
          }
        });

        return (
          <mesh key={p.id} ref={ref} position={p.pos}>
            <sphereGeometry args={[p.size, 6, 6]} />
            <meshBasicMaterial color="#d4b24c" transparent opacity={0.65} />
          </mesh>
        );
      })}
    </group>
  );
}

function GlobalThreeDScene() {
  const { viewport } = useThree();

  // Create 20 distributed floating coffee beans
  const beans = useMemo(() => {
    const list: BeanData[] = [];
    for (let i = 0; i < 18; i++) {
      list.push({
        id: i,
        initialX: (Math.random() - 0.5) * 9,
        initialY: (Math.random() - 0.5) * 12,
        z: (Math.random() - 0.5) * 4 - 1.5, // layered depth mapping
        scale: Math.random() * 0.3 + 0.2, // robust sizing
        rotX: Math.random() * Math.PI,
        rotY: Math.random() * Math.PI,
        rotZ: Math.random() * Math.PI,
        speedX: (Math.random() - 0.5) * 0.005,
        speedY: Math.random() * 0.01 + 0.005,
        rotSpeed: [
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        ]
      });
    }
    return list;
  }, []);

  return (
    <group>
      {/* Soft fill light */}
      <ambientLight intensity={0.9} />
      
      {/* Warm accent spot spotlight */}
      <spotLight position={[3, 8, 5]} intensity={2} angle={0.4} color="#ffd580" />

      {/* Floating 3D coffee beans on their beautiful journey */}
      {beans.map((b) => (
        <CoffeeBeanSingle key={b.id} data={b} />
      ))}

      {/* Golden embers */}
      <GoldDustDust />
    </group>
  );
}

export function GlobalThreeDBackground() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-transparent">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        className="w-full h-full opacity-35"
      >
        <GlobalThreeDScene />
      </Canvas>
    </div>
  );
}
