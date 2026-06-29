import React from "react";

interface AmbientCanvasEffectsProps {
  section: "all" | "hero" | "ceremony" | "none";
}

interface Particle {
  x: number;
  y: number;
  z: number; // For depth calculations
  size: number;
  speedX: number;
  speedY: number;
  speedZ: number;
  rotation: number;
  rotSpeed: number;
  opacity: number;
  color: string;
  type: "dust" | "bean" | "steam";
  angle?: number;
  orbitRadius?: number;
  orbitSpeed?: number;
  pulseSpeed?: number;
  pulsePhase?: number;
}

export default function AmbientCanvasEffects(props: AmbientCanvasEffectsProps) {
  const { section } = props;
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const requestRef = React.useRef<number | null>(null);
  const particles = React.useRef<Particle[]>([]);
  const scrollY = React.useRef<number>(0);
  const targetScrollY = React.useRef<number>(0);
  const mouse = React.useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  // Update scroll values smoothly
  React.useEffect(() => {
    const handleScroll = () => {
      targetScrollY.current = window.scrollY;
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.tx = e.clientX;
      mouse.current.ty = e.clientY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Initialize particles
  const initParticles = (width: number, height: number) => {
    const list: Particle[] = [];
    
    // 1. Create 80-100 glowing gold dust particles
    for (let i = 0; i < 90; i++) {
      list.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 2 + 0.1, // 0.1 (far) to 2.1 (close)
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.3 - 0.1, // slowly drift upwards
        speedZ: 0,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: 0,
        opacity: Math.random() * 0.5 + 0.3,
        color: i % 2 === 0 ? "rgba(212, 175, 55, " : "rgba(184, 124, 43, ",
        type: "dust"
      });
    }

    // 2. Create 15 floating coffee beans (highly detailed)
    for (let i = 0; i < 15; i++) {
      list.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 3 + 0.5, // wide depth range
        size: Math.random() * 12 + 6,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.2 - 0.15, // drifting
        speedZ: (Math.random() - 0.5) * 0.02,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.015,
        opacity: Math.random() * 0.4 + 0.4,
        color: "rgba(35, 23, 14, ", // Roasted coffee brown base
        type: "bean"
      });
    }

    // 3. Create Yirgacheffe orbiting coffee beans for the ceremony
    for (let i = 0; i < 8; i++) {
      list.push({
        x: width / 2,
        y: height / 2,
        z: Math.random() * 1 + 1,
        size: Math.random() * 6 + 6,
        speedX: 0,
        speedY: 0,
        speedZ: 0,
        rotation: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.04,
        opacity: 0, // faded out initially, fades in when ceremony is active
        color: "rgba(184, 124, 43, ", // Golden roasted
        type: "bean",
        angle: (i * (Math.PI * 2)) / 8, // equally spaced
        orbitRadius: Math.random() * 100 + 150,
        orbitSpeed: 0.008 + Math.random() * 0.005,
        pulseSpeed: 0.02,
        pulsePhase: Math.random() * Math.PI
      });
    }

    // 4. Steam particles for coffee ceremony section
    for (let i = 0; i < 20; i++) {
      list.push({
        x: width * 0.7 + (Math.random() - 0.5) * 30, // Pos centered around expected Jebena pos
        y: height * 0.5 + Math.random() * 150,
        z: Math.random() * 1.5 + 0.5,
        size: Math.random() * 15 + 10,
        speedX: (Math.random() - 0.5) * 0.6,
        speedY: -Math.random() * 0.8 - 0.5, // moving straight up
        speedZ: 0,
        rotation: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.01,
        opacity: 0, // shown only when ceremony active
        color: "rgba(220, 215, 205, ", // Wispy smoke
        type: "steam"
      });
    }

    particles.current = list;
  };

  // Main drawing engine loop
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    initParticles(width, height);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles(width, height);
    };

    window.addEventListener("resize", handleResize);

    const drawBean = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      opacity: number,
      isGilded: boolean
    ) => {
      c.save();
      c.translate(x, y);
      c.rotate(rotation);

      // Create coffee bean radial gradient
      const grad = c.createRadialGradient(0, 0, size * 0.1, 0, 0, size);
      if (isGilded) {
        grad.addColorStop(0, `rgba(217, 160, 43, ${opacity})`);
        grad.addColorStop(0.5, `rgba(184, 124, 43, ${opacity * 0.82})`);
        grad.addColorStop(1, `rgba(90, 60, 15, ${opacity * 0.15})`);
      } else {
        grad.addColorStop(0, `rgba(75, 45, 28, ${opacity})`);
        grad.addColorStop(0.4, `rgba(45, 25, 15, ${opacity * 0.9})`);
        grad.addColorStop(1, `rgba(18, 10, 5, ${opacity * 0.2})`);
      }

      // Outer bean contour ellipse
      c.beginPath();
      c.ellipse(0, 0, size * 1.3, size, 0, 0, Math.PI * 2);
      c.fillStyle = grad;
      c.fill();

      // Golden aura highlights
      c.strokeStyle = isGilded ? `rgba(212, 175, 55, ${opacity * 0.4})` : `rgba(110, 75, 50, ${opacity * 0.35})`;
      c.lineWidth = 1;
      c.stroke();

      // Signature coffee bean crease/slit down the center (organically curved)
      c.beginPath();
      c.moveTo(-size * 1.1, 0);
      c.bezierCurveTo(-size * 0.4, size * 0.15, size * 0.4, -size * 0.2, size * 1.1, 0);
      c.strokeStyle = isGilded ? `rgba(100, 70, 20, ${opacity * 0.9})` : `rgba(20, 10, 5, ${opacity * 0.95})`;
      c.lineWidth = size * 0.14;
      c.lineCap = "round";
      c.stroke();

      c.restore();
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      // Smooth scroll interpolation
      scrollY.current += (targetScrollY.current - scrollY.current) * 0.08;
      
      // Smooth mouse spotlight interpolation
      mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.08;
      mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // Scroll speed impacts particles speed and depth translation
      const scrollDiff = targetScrollY.current - scrollY.current;
      const zSpeedModifier = Math.min(Math.abs(scrollDiff) * 0.005, 0.15);

      particles.current.forEach((p) => {
        // Apply interactive mouse ripples for elements near cursor
        if (p.type !== "steam") {
          const dx = mouse.current.x - p.x;
          const dy = mouse.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            const force = (180 - dist) / 180;
            p.x -= (dx / dist) * force * 1.5;
            p.y -= (dy / dist) * force * 1.5;
          }
        }

        // ------------------
        // Particle rendering by Type
        // ------------------
        if (p.type === "dust") {
          // Normal flow
          p.x += p.speedX;
          p.y += p.speedY;

          // Scroll causes micro-push downstream
          p.y += scrollDiff * 0.05 * p.z;

          // Infinite wraps
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          // Glowing dust drawing
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * (p.z * 0.5), 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${p.opacity * p.z})`;
          ctx.shadowColor = "rgba(212, 175, 55, 0.4)";
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        } 
        
        else if (p.type === "bean") {
          if (p.angle !== undefined && p.orbitRadius !== undefined && p.orbitSpeed !== undefined) {
            // ORBIT BEANS around expected Jebena node in Ceremony block (approx 70% width, 60% height)
            const cerY = height * 0.55;
            const cerX = width > 768 ? width * 0.65 : width * 0.5;

            // Increment orbital trajectory
            p.angle += p.orbitSpeed;
            p.rotation += p.rotSpeed * 2;

            if (p.pulsePhase !== undefined && p.pulseSpeed !== undefined) {
              p.pulsePhase += p.pulseSpeed;
            }

            // High-fidelity depth mapping: z coordinate correlates with cosine projection
            p.z = Math.cos(p.angle) + 1.2; // [0.2, 2.2]
            
            // Calculate elliptical coordinate matrix
            const radiusX = p.orbitRadius * (width > 768 ? 1.4 : 0.8);
            const radiusY = p.orbitRadius * 0.4;
            p.x = cerX + Math.sin(p.angle) * radiusX;
            p.y = cerY + Math.cos(p.angle) * radiusY;

            // Transition opacity based on scroll alignment to ceremony
            const isCeremonyActive = window.scrollY > height * 1.8 && window.scrollY < height * 3.8;
            const targetOpacity = isCeremonyActive ? Math.max(0, p.z * 0.4) : 0;
            p.opacity += (targetOpacity - p.opacity) * 0.1;

            if (p.opacity > 0.02) {
              // Draw orbital beans with golden glow (isGilded = true)
              drawBean(ctx, p.x, p.y, p.size * (p.z * 0.8), p.rotation, p.opacity, true);
            }
          } else {
            // NORMAL FLOATING BEANS
            p.x += p.speedX;
            p.y += p.speedY;
            p.rotation += p.rotSpeed;

            // Advanced Scroll Zoom: Z axis moves dramatically outwards with scroll
            // Creating luxurious camera push-through effect!
            p.z += zSpeedModifier * 0.4;
            
            // Wrap or recycle beans if they fly off/passed viewport zoom threshold
            if (p.z > 3.5) {
              p.z = 0.2;
              p.x = Math.random() * width;
              p.y = height + 50;
            }

            p.y += scrollDiff * 0.12 * p.z;

            if (p.x < -100) p.x = width + 100;
            if (p.x > width + 100) p.x = -100;
            if (p.y < -100) {
              p.y = height + 100;
              p.z = Math.random() * 3 + 0.5;
            }
            if (p.y > height + 100) {
              p.y = -100;
              p.z = Math.random() * 3 + 0.5;
            }

            // Depth of Field (DoF) blurring: elements extremely close (large z) or far (small z) get blur
            const sizeProj = p.size * p.z;
            let blurAmount = 0;
            if (p.z > 2.6) blurAmount = (p.z - 2.6) * 6; // Heavy foreground camera lens defocus
            else if (p.z < 0.6) blurAmount = (0.6 - p.z) * 4; // Atmospheric background blur

            if (blurAmount > 0) {
              ctx.filter = `blur(${Math.min(blurAmount, 10)}px)`;
            }

            // Limit opacity on extreme bounds to keep smooth styling
            const finalOpacity = Math.min(p.opacity, 1 - Math.max(0, p.z - 2.8) / 0.7);

            drawBean(ctx, p.x, p.y, sizeProj, p.rotation, finalOpacity, false);
            ctx.filter = "none"; // restore filter
          }
        } 
        
        else if (p.type === "steam") {
          // Ceremony steam simulations - drift beautifully upwards and expand
          p.x += p.speedX + Math.sin(p.y * 0.01) * 0.15; // wavy winding
          p.y += p.speedY;
          p.size += 0.08; // swell
          
          // Only show when viewing the ceremony
          const isCeremonyActive = window.scrollY > height * 1.8 && window.scrollY < height * 3.8;
          const targetOpacity = isCeremonyActive ? Math.max(0, 0.45 - (height * 0.55 - p.y) / 250) : 0;
          p.opacity += (targetOpacity - p.opacity) * 0.05;

          // Recycle when steam floats too high or fades out fully
          if (p.y < height * 0.2 || p.size > 40) {
            p.y = height * 0.55 + Math.random() * 80;
            p.x = (width > 768 ? width * 0.65 : width * 0.5) + (Math.random() - 0.5) * 45;
            p.size = Math.random() * 10 + 8;
            p.opacity = 0;
          }

          if (p.opacity > 0.01) {
            ctx.save();
            ctx.beginPath();
            const grad = ctx.createRadialGradient(p.x, p.y, p.size * 0.15, p.x, p.y, p.size);
            grad.addColorStop(0, `${p.color}${p.opacity * 0.25})`);
            grad.addColorStop(0.4, `${p.color}${p.opacity * 0.15})`);
            grad.addColorStop(1, `${p.color}0)`);
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = grad;
            ctx.fill();
            ctx.restore();
          }
        }
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [section]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-10 opacity-70"
    />
  );
}
