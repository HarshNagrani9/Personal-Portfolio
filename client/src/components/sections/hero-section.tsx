import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// Extend Window interface for GSAP
declare global {
  interface Window {
    gsap?: {
      to: (target: any, vars: any) => any;
    };
  }
}

type ShapeType = 'torus' | 'sphere' | 'cube' | 'random';

const HeroSection = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [currentShape, setCurrentShape] = useState<ShapeType>('torus');

  // Refs for Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const geometryRef = useRef<THREE.BufferGeometry | null>(null);
  const mouseRef = useRef(new THREE.Vector2(9999, 9999));
  const isExplodedRef = useRef(false);
  const reqRef = useRef<number | null>(null);

  // Configuration - Optimized for performance
  const CONFIG = {
    particleCount: 4500, // Reduced from 6000 for better performance
    particleSize: 0.15,  // Slightly larger to compensate for count
    explosionForce: 15,
    reassembleSpeed: 1.5,
    mouseRepulsionRadius: 5,
    mouseRepulsionForce: 2,
  };

  // Shape Definitions
  const shapesRef = useRef<{
    sphere: number[];
    cube: number[];
    torus: number[];
    random: number[];
  }>({
    sphere: [],
    cube: [],
    torus: [],
    random: [],
  });

  // Load External Scripts (GSAP & FontAwesome)
  useEffect(() => {
    const scripts = [
      { src: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js", id: "gsap-script" },
      { src: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js", id: "fa-script" }
    ];

    scripts.forEach(({ src, id }) => {
      if (!document.getElementById(id)) {
        const script = document.createElement('script');
        script.src = src;
        script.id = id;
        script.async = true;
        document.body.appendChild(script);
      }
    });
  }, []);

  // Helper ref to access current shape inside the effect closure
  const currentShapeRef = useRef<ShapeType>(currentShape);
  useEffect(() => {
    currentShapeRef.current = currentShape;
  }, [currentShape]);

  // --- TRANSITION LOGIC ---
  const handleShapeTransition = (shapeName: ShapeType) => {
    if (shapeName === currentShapeRef.current && !isExplodedRef.current) return;

    setCurrentShape(shapeName);
    isExplodedRef.current = true;

    const particles = particlesRef.current;
    const geom = geometryRef.current;

    if (!particles || !geom) return;

    const targets = geom.attributes.targetPosition.array as Float32Array;
    const shapeData = shapesRef.current[shapeName];

    // Helper to update colors
    const updateColors = () => {
      const colors = geom.attributes.color.array as Float32Array;
      const newColor = new THREE.Color();
      let hueStart = 0.6; // Default Blue
      if (shapeName === 'cube') hueStart = 0.1; // Orange/Gold
      if (shapeName === 'sphere') hueStart = 0.0; // Red
      if (shapeName === 'torus') hueStart = 0.55; // Blue/Cyan
      if (shapeName === 'random') hueStart = 0.8; // Pink/Purple

      for (let i = 0; i < CONFIG.particleCount; i++) {
        newColor.setHSL((hueStart + Math.random() * 0.2) % 1, 0.8, 0.6);
        colors[i * 3] = newColor.r;
        colors[i * 3 + 1] = newColor.g;
        colors[i * 3 + 2] = newColor.b;
      }
      geom.attributes.color.needsUpdate = true;
    };

    if (window.gsap) {
      // Explode
      window.gsap.to(particles.scale, {
        x: 1.5, y: 1.5, z: 1.5,
        duration: 0.4,
        ease: "back.in(2)",
        onComplete: () => {
          // Move targets
          for (let i = 0; i < CONFIG.particleCount * 3; i++) {
            targets[i] = shapeData[i];
          }
          geom.attributes.targetPosition.needsUpdate = true;
          updateColors();

          // Implode
          window.gsap?.to(particles.scale, {
            x: 1, y: 1, z: 1,
            duration: 1.2,
            ease: "elastic.out(1, 0.4)",
          });
          isExplodedRef.current = false;
        }
      });
    }
  };

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    // --- INIT THREE.JS ---
    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
    camera.position.z = 30;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }
    rendererRef.current = renderer;

    // --- PARTICLE SYSTEM GENERATION ---
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(CONFIG.particleCount * 3);
    const colors = new Float32Array(CONFIG.particleCount * 3);
    const targetPositions = new Float32Array(CONFIG.particleCount * 3);

    // Pre-calculate shape positions
    for (let i = 0; i < CONFIG.particleCount; i++) {
      // 1. SPHERE
      const phi = Math.acos(-1 + (2 * i) / CONFIG.particleCount);
      const theta = Math.sqrt(CONFIG.particleCount * Math.PI) * phi;
      const r = 11;
      shapesRef.current.sphere.push(
        r * Math.cos(theta) * Math.sin(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(phi)
      );

      // 2. CUBE
      const size = 15;
      shapesRef.current.cube.push(
        (Math.random() - 0.5) * size,
        (Math.random() - 0.5) * size,
        (Math.random() - 0.5) * size
      );

      // 3. TORUS
      const u = Math.random() * Math.PI * 2;
      const v = Math.random() * Math.PI * 2;
      const tubeRadius = 3.5;
      const ringRadius = 9;
      shapesRef.current.torus.push(
        (ringRadius + tubeRadius * Math.cos(v)) * Math.cos(u),
        (ringRadius + tubeRadius * Math.cos(v)) * Math.sin(u),
        tubeRadius * Math.sin(v)
      );

      // 4. RANDOM
      shapesRef.current.random.push(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 60
      );

      // Initial Color (Blue/Cyan Gradient)
      const color = new THREE.Color();
      color.setHSL(0.55 + Math.random() * 0.1, 0.8, 0.6);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      // Start & Target = Torus
      const x = shapesRef.current.torus[i * 3];
      const y = shapesRef.current.torus[i * 3 + 1];
      const z = shapesRef.current.torus[i * 3 + 2];

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      targetPositions[i * 3] = x;
      targetPositions[i * 3 + 1] = y;
      targetPositions[i * 3 + 2] = z;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('targetPosition', new THREE.BufferAttribute(targetPositions, 3));
    geometryRef.current = geometry;

    // Material - Optimized
    const sprite = new THREE.TextureLoader().load(
      'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/sprites/disc.png'
    );

    const material = new THREE.PointsMaterial({
      size: CONFIG.particleSize,
      vertexColors: true,
      map: sprite,
      alphaTest: 0.5,
      transparent: true,
      opacity: 0.3, // Start slightly visible for immediate feedback
      blending: THREE.AdditiveBlending,
      depthWrite: false // Improves performance for transparent particles
    });

    const particles = new THREE.Points(geometry, material);
    // Start at slightly smaller scale for subtle entrance effect
    particles.scale.set(0.9, 0.9, 0.9);
    // Add slight initial rotation for dynamic feel
    particles.rotation.z = Math.PI / 12;
    scene.add(particles);
    particlesRef.current = particles;

    // Subtle Entrance Animation - Torus appears with gentle movement
    setTimeout(() => {
      if (window.gsap && particlesRef.current) {
        // Fade in opacity (from 0.3 to 0.8)
        window.gsap.to(material, {
          opacity: 0.8,
          duration: 1.8,
          ease: "power2.out"
        });
        
        // Gentle scale animation (slight grow from 0.9 to 1.0)
        window.gsap.to(particlesRef.current.scale, {
          x: 1, y: 1, z: 1,
          duration: 2.2,
          ease: "power2.out"
        });
        
        // Subtle rotation animation for gentle movement
        window.gsap.to(particlesRef.current.rotation, {
          z: Math.PI / 8, // Slight tilt
          duration: 3,
          ease: "power1.out"
        });
      } else if (particlesRef.current) {
        // Fallback if GSAP not loaded
        particlesRef.current.scale.set(1, 1, 1);
        material.opacity = 0.8;
      }
    }, 100);

    // --- EVENT LISTENERS ---
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    // Touch event handler for mobile devices
    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        mouseRef.current.x = (touch.clientX / window.innerWidth) * 2 - 1;
        mouseRef.current.y = -(touch.clientY / window.innerHeight) * 2 + 1;
      }
    };

    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('resize', handleResize);

    // --- ANIMATION LOOP ---
    const clock = new THREE.Clock();

    // Reusable objects to avoid GC
    const vector = new THREE.Vector3();
    const dir = new THREE.Vector3();
    const mousePos3D = new THREE.Vector3();

    const animate = () => {
      reqRef.current = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();
      const particles = particlesRef.current;
      const geom = geometryRef.current;

      if (!particles || !geom) return;

      const positions = geom.attributes.position.array as Float32Array;
      const targets = geom.attributes.targetPosition.array as Float32Array;

      // Mouse Calculation
      vector.set(mouseRef.current.x, mouseRef.current.y, 0.5);
      vector.unproject(camera);
      dir.copy(vector).sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      mousePos3D.copy(camera.position).add(dir.multiplyScalar(distance));

      // Physics Loop
      for (let i = 0; i < CONFIG.particleCount; i++) {
        const ix = i * 3;
        const iy = i * 3 + 1;
        const iz = i * 3 + 2;

        const speed = isExplodedRef.current ? 0.05 : 0.08;

        // 1. Seek Target
        positions[ix] += (targets[ix] - positions[ix]) * speed;
        positions[iy] += (targets[iy] - positions[iy]) * speed;
        positions[iz] += (targets[iz] - positions[iz]) * speed;

        // 2. Mouse Repulsion
        if (!isExplodedRef.current) {
          const dx = positions[ix] - mousePos3D.x;
          const dy = positions[iy] - mousePos3D.y;
          const dz = positions[iz] - mousePos3D.z;
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < CONFIG.mouseRepulsionRadius * CONFIG.mouseRepulsionRadius) {
            const dist = Math.sqrt(distSq);
            const force = (CONFIG.mouseRepulsionRadius - dist) / CONFIG.mouseRepulsionRadius;

            positions[ix] += dx * force * CONFIG.mouseRepulsionForce;
            positions[iy] += dy * force * CONFIG.mouseRepulsionForce;
            positions[iz] += dz * force * CONFIG.mouseRepulsionForce;
          }
        }

        // 3. Ambient Float (Simplified trig for perf)
        positions[ix] += Math.sin(time * 0.5 + positions[iy] * 0.05) * 0.02;
        positions[iy] += Math.cos(time * 0.3 + positions[iz] * 0.05) * 0.02;
      }

      geom.attributes.position.needsUpdate = true;

      // Global Rotation
      if (!isExplodedRef.current) {
        particles.rotation.y += 0.001;

        // Soft Mouse Parallax
        particles.rotation.x += (mouseRef.current.y * 0.2 - particles.rotation.x) * 0.05;
        particles.rotation.y += (mouseRef.current.x * 0.2 - particles.rotation.y) * 0.05;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  const socialLinks = [
    { href: "https://github.com/HarshNagrani9", icon: "fab fa-github", label: "GitHub" },
    { href: "https://www.linkedin.com/in/harsh-nagrani-1ab98623a/", icon: "fab fa-linkedin", label: "LinkedIn" },
    { href: "https://leetcode.com/u/harshnagrani009/", icon: "fas fa-code", label: "LeetCode" },
    { href: "mailto:harshnagrani0910@gmail.com", icon: "fas fa-envelope", label: "Email" },
  ];

  const glassPanelClass = "bg-slate-900/40 backdrop-blur-md border border-white/5 shadow-2xl";

  return (
    <div className="relative w-full h-screen bg-[#020617] overflow-hidden text-slate-200 font-sans selection:bg-indigo-500/30">
      {/* 3D Canvas */}
      <div
        ref={mountRef}
        className="absolute top-0 left-0 w-full h-full z-0 cursor-crosshair opacity-60 md:opacity-100 transition-opacity duration-1000"
        onClick={() => {
          const shapes: ShapeType[] = ['torus', 'sphere', 'cube', 'random'];
          const next = shapes[(shapes.indexOf(currentShape) + 1) % shapes.length];
          handleShapeTransition(next);
        }}
      />

      {/* UI Layer */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between p-6 md:p-12 pointer-events-none">
        {/* Header */}
        <header className="flex justify-between items-center pointer-events-auto">
          {/* Simplified Logo */}
          <div className="w-12 h-12 border border-white/10 flex items-center justify-center font-bold text-xl bg-white/5 backdrop-blur-md rounded-xl shadow-lg hover:border-indigo-500/50 transition-colors">
            <span className="bg-clip-text text-transparent bg-gradient-to-br from-indigo-400 to-cyan-400">HN</span>
          </div>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('contact');
            }}
            className="px-6 py-2.5 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all text-xs font-bold tracking-widest uppercase bg-white/5 backdrop-blur-sm"
          >
            Contact
          </a>
        </header>

        {/* Center Content: Name & Bio */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-auto w-full max-w-4xl px-4">
          <h2 className="text-lg md:text-2xl font-medium text-indigo-400 mb-2 animate-fade-in-up">
                Hello, I'm
          </h2>
              
          <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-6 leading-tight drop-shadow-2xl">
            <span className="text-slate-100">Harsh </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Nagrani</span>
              </h1>
              
          <h3 className="text-xl md:text-2xl text-slate-400 font-light tracking-wide mb-8">
                Software Developer
          </h3>

          <p className="max-w-xl mx-auto text-slate-400 text-sm md:text-base leading-relaxed mb-10">
                Building interactive web experiences with modern technologies and a passion for clean code.
            Specializing in MERN Stack and Real-time Applications.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-12">
            <button
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('projects');
              }}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold transition-all transform hover:-translate-y-1 shadow-[0_0_20px_rgba(79,70,229,0.3)]"
            >
              View Projects <i className="fas fa-arrow-right ml-2 text-xs"></i>
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}
              className="px-8 py-3 border border-white/20 hover:border-white text-white rounded-full font-bold transition-all hover:bg-white/5"
            >
              Contact Me
            </button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6">
                {socialLinks.map((link) => (
                  <a 
                    key={link.label}
                    href={link.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                className="text-slate-400 hover:text-indigo-400 text-2xl transition-transform hover:-translate-y-1 hover:scale-110"
                title={link.label}
                  >
                    <i className={link.icon}></i>
                  </a>
                ))}
          </div>
        </div>

        {/* Footer: Controls & Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 items-end pointer-events-auto">
          {/* Left: Stats (Hidden on mobile) */}
          <div className="hidden md:flex flex-col space-y-4">
            <div className={`${glassPanelClass} p-4 rounded-xl inline-block max-w-[220px]`}>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Status</div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]"></span>
                <span className="font-mono text-xs font-semibold text-slate-300">Open for Work</span>
              </div>
            </div>
          </div>

          {/* Center: Shape Controls */}
          <div className="col-span-2 md:col-span-1 flex flex-col items-center gap-4">
            <div className={`flex gap-2 ${glassPanelClass} p-1.5 rounded-full`}>
              {[
                { id: 'torus' as ShapeType, icon: '◎', title: 'Torus' },
                { id: 'sphere' as ShapeType, icon: '●', title: 'Sphere' },
                { id: 'cube' as ShapeType, icon: '■', title: 'Cube' },
                { id: 'random' as ShapeType, icon: '⚄', title: 'Chaos' },
              ].map((shape) => (
                <button
                  key={shape.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShapeTransition(shape.id);
                  }}
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-sm transition-all duration-300
                    ${currentShape === shape.id
                      ? 'bg-indigo-600 text-white shadow-lg scale-110'
                      : 'text-slate-400 hover:text-white hover:bg-white/10'}
                  `}
                  title={shape.title}
                >
                  {shape.icon}
                </button>
              ))}
            </div>
            <div className="text-[10px] text-slate-600 font-mono tracking-wider">
              INTERACTIVE 3D CORE
            </div>
          </div>

          {/* Right: Coding Stats */}
          <div className="hidden md:flex justify-end gap-6 text-right">
            <div>
              <div className="text-xl font-bold text-white">1525</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider">LeetCode</div>
            </div>
            <div>
              <div className="text-xl font-bold text-white">8.0</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider">CGPA</div>
  </div>
</div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center opacity-50">
          <span className="text-[10px] uppercase tracking-widest text-slate-500 mb-2">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-indigo-500 to-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
