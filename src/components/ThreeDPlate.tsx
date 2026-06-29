import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useScroll } from "motion/react";
import * as THREE from "three";
import { IMAGES } from "../data";

function PlateMesh() {
  const diskRef = useRef<THREE.Group>(null);
  const [texture, setTexture] = React.useState<THREE.Texture | null>(null);
  
  // Directly read the document level scroll progress
  const { scrollYProgress } = useScroll();

  // Create resilient client-side canvas-backed dynamic texture
  React.useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Beautiful procedural fallback representing traditional Ethiopian doro wot platter
    const drawProceduralFallback = () => {
      // 1. Platter Injera baseline
      ctx.fillStyle = "#f5ebd5";
      ctx.fillRect(0, 0, 512, 512);

      // Injera porous texture spiral
      ctx.strokeStyle = "#decba6";
      ctx.lineWidth = 5;
      ctx.beginPath();
      const cx = 256;
      const cy = 256;
      for (let theta = 0; theta < 45; theta += 0.1) {
        const r = theta * 5.6;
        const x = cx + r * Math.cos(theta);
        const y = cy + r * Math.sin(theta);
        if (theta === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Outer golden-brown ring garnish border
      ctx.strokeStyle = "#8c491e";
      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.arc(cx, cy, 238, 0, Math.PI * 2);
      ctx.stroke();

      // 2. Berbere spicy red curry bases (rich warm dark burgundy stews)
      ctx.fillStyle = "#8a2a14";
      ctx.beginPath();
      ctx.arc(cx, cy, 185, 0, Math.PI * 2);
      ctx.fill();

      // Additional concentric dollops of delicious stews (e.g. key wat, shiro, alicha)
      // Yellow lentil (Alicha) dollop
      ctx.fillStyle = "#e0ad1b";
      ctx.beginPath();
      ctx.arc(360, 256, 52, 0, Math.PI * 2);
      ctx.fill();

      // Green herb/spinach dollop
      ctx.fillStyle = "#4a5a2e";
      ctx.beginPath();
      ctx.arc(256, 360, 48, 0, Math.PI * 2);
      ctx.fill();

      // Shiro stew (golden-orange) dollop
      ctx.fillStyle = "#b25e26";
      ctx.beginPath();
      ctx.arc(160, 240, 55, 0, Math.PI * 2);
      ctx.fill();

      // Spicy deep Berbere beef dollop
      ctx.fillStyle = "#691404";
      ctx.beginPath();
      ctx.arc(240, 160, 60, 0, Math.PI * 2);
      ctx.fill();

      // 3. Centered Golden Hard boiled egg (traditional delicacy in Doro Wot)
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(cx, cy, 32, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#fcb900";
      ctx.beginPath();
      ctx.arc(cx, cy, 18, 0, Math.PI * 2);
      ctx.fill();

      // Warm berbere glaze drop in center
      ctx.fillStyle = "#801d0a";
      ctx.beginPath();
      ctx.arc(cx - 3, cy - 3, 6, 0, Math.PI * 2);
      ctx.fill();
    };

    // Draw beautiful fallback immediately to guarantee zero-flicker render
    drawProceduralFallback();

    // Instantiate CanvasTexture
    const canvasTexture = new THREE.CanvasTexture(canvas);
    canvasTexture.colorSpace = THREE.SRGBColorSpace;
    canvasTexture.anisotropy = 8;
    canvasTexture.minFilter = THREE.LinearMipmapLinearFilter;
    canvasTexture.generateMipmaps = true;
    setTexture(canvasTexture);

    // Asynchronously stream the live food photograph
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.referrerPolicy = "no-referrer";
    img.src = IMAGES.doroWot;

    img.onload = () => {
      // Clear fallback and draw the premium design
      ctx.clearRect(0, 0, 512, 512);

      // Nice circular backdrop
      ctx.fillStyle = "#0D0805";
      ctx.fillRect(0, 0, 512, 512);

      // Rounded container outline clip
      ctx.save();
      ctx.beginPath();
      ctx.arc(256, 256, 254, 0, Math.PI * 2);
      ctx.clip();

      ctx.drawImage(img, 0, 0, 512, 512);
      ctx.restore();

      canvasTexture.needsUpdate = true;
    };

    img.onerror = () => {
      console.warn("Could not load texture from " + IMAGES.doroWot + ", continuing with premium procedural platter rendering.");
    };

    return () => {
      canvasTexture.dispose();
    };
  }, []);

  // Animate the plate spinning and reacting to scroll
  useFrame((state) => {
    if (diskRef.current) {
      const scrollValue = scrollYProgress.get();
      // Continuous slow automatic spin
      const baseRotation = state.clock.getElapsedTime() * 0.08;
      // Scroll offset rotation
      const scrollRotation = scrollValue * 2.5;
      diskRef.current.rotation.z = -(baseRotation + scrollRotation);
      
      // Organic tilt responsive tracking
      diskRef.current.rotation.x = 0.5 + Math.sin(state.clock.getElapsedTime() * 0.8) * 0.04;
      diskRef.current.rotation.y = Math.cos(state.clock.getElapsedTime() * 0.8) * 0.04;
    }
  });

  return (
    <group ref={diskRef}>
      {/* 1. Main outer clay container (a real 3D raised shadow rim) */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[2.0, 1.85, 0.25, 64]} />
        <meshStandardMaterial 
          color="#161210"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* 2. Traditional Gilded Gold Rim (thin border ring overlay) */}
      <mesh position={[0, 0.041, 0]}>
        <cylinderGeometry args={[2.02, 2.02, 0.06, 64, 1, false]} />
        <meshStandardMaterial 
          color="#EFB238" // Brand Gold Accent
          roughness={0.18}
          metalness={0.85}
        />
      </mesh>

      {/* 3. The 3D Doro Wot Dish Stew Face (flat texture plate) */}
      <mesh position={[0, 0.126, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.90, 64]} />
        <meshStandardMaterial 
          map={texture || undefined}
          roughness={0.4}
          metalness={0.0}
        />
      </mesh>
    </group>
  );
}

export default function ThreeDPlate() {
  return (
    <div className="w-full h-full relative" id="three-doro-wot-canvas">
      <Canvas
        shadows
        camera={{ position: [0, 0, 4.3], fov: 55 }}
        className="w-full h-full"
      >
        <ambientLight intensity={1.8} />
        {/* Soft elegant warm spotlit sunshaft */}
        <spotLight 
          position={[5, 12, 6]} 
          angle={0.3} 
          penumbra={1} 
          intensity={4.5} 
          color="#F2CF88" // Brand Light Cream Gold
          castShadow 
        />
        {/* Dynamic back edge lighting */}
        <directionalLight 
          position={[-4, -6, -3]} 
          intensity={1.0} 
          color="#CF914B" // Brand Warm Bronze
        />
        
        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.15}>
          <PlateMesh />
        </Float>
      </Canvas>
    </div>
  );
}
