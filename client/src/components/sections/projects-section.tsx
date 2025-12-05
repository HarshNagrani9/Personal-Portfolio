
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const Projects3DShowcase = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const meshRef = useRef(null);
  const scrollProgressRef = useRef(0);
  const [activeProject, setActiveProject] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const projects = [
    {
      id: 1,
      title: "MediVault",
      category: "Blockchain + AI",
      description: "Full-stack healthcare management platform with blockchain-based file access control, end-to-end encryption, and AI-powered RAG system.",
      tech: ["Next.js 14", "Solidity", "FastAPI", "Google Gemini"],
      color: "#10b981", // green-500
      year: "2024",
      github: "https://github.com/HarshNagrani9/LY-Project",
      demo: "https://drive.google.com/file/d/1ZbuSqx1R1kmCBXEVOeHAo4sB2raFj24z/view?usp=sharing"
    },
    {
      id: 2,
      title: "Horizon Dashboard",
      category: "Fintech",
      description: "A banking dashboard integrating Plaid API, achieving a 67% increase in speed compared to other sample banking solutions.",
      tech: ["React", "Node.js", "Firebase", "Plaid"],
      color: "#eab308", // yellow-500
      year: "2023",
      github: "https://github.com/HarshNagrani9/Devopia",
      demo: "https://www.youtube.com/watch?v=ATHQPB16e_4"
    },
    {
      id: 3,
      title: "ChatSync",
      category: "Real-time App",
      description: "A real-time chat application with robust user profiles and secure authentication using JWT tokens and WebSockets.",
      tech: ["React", "Node.js", "MongoDB", "WebSockets"],
      color: "#60a5fa", // blue-400
      year: "2024",
      github: "https://github.com/HarshNagrani9/MERN-ChatSync",
      demo: "https://github.com/HarshNagrani9/MERN-ChatSync" // Fallback since demo was empty
    },
    {
      id: 4,
      title: "Apple UI Clone",
      category: "UI/UX",
      description: "A stunning Apple UI clone with 3D model interactions and smooth animations using ThreeJS and GSAP.",
      tech: ["React", "Three.js", "GSAP"],
      color: "#c084fc", // purple-400
      year: "2024",
      github: "https://github.com/HarshNagrani9/apple",
      demo: "https://apple-eta-liart.vercel.app/"
    },
    {
      id: 5,
      title: "Movie Rec System",
      category: "Machine Learning",
      description: "A web-based content-based filtering system that recommends movies based on genre similarity using ML techniques.",
      tech: ["Python", "Flask", "scikit-learn", "Pandas"],
      color: "#3b82f6", // blue-500
      year: "2024",
      github: "https://github.com/HarshNagrani9/Movie-Recomendation-System",
      demo: "https://github.com/HarshNagrani9/Movie-Recomendation-System"
    },
    {
      id: 6,
      title: "E-Commerce Dashboard",
      category: "Full Stack",
      description: "Full-stack e-commerce admin dashboard with inventory management, sales analytics, and order processing.",
      tech: ["React", "Node.js", "Express", "Chart.js"],
      color: "#6366f1", // indigo-500
      year: "2024",
      github: "https://github.com",
      demo: "https://demo.com"
    }
  ];

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0a0a0a, 10, 50);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    // Adjust camera distance based on screen width
    const isSmallScreen = window.innerWidth < 1024; // tablets and mobile
    camera.position.z = isSmallScreen ? 8 : 5;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Create central geometry with responsive size
    // Laptop: 2.5, Tablet/Mobile: 1.2
    const geometrySize = isSmallScreen ? 1.2 : 2.5;

    const geometry = new THREE.IcosahedronGeometry(geometrySize, 1);
    const material = new THREE.MeshPhongMaterial({
      color: projects[0].color,
      wireframe: false,
      transparent: true,
      opacity: 0.6,
      emissive: projects[0].color,
      emissiveIntensity: 0.2
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    meshRef.current = mesh;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(projects[0].color, 1.5);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 0.8);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 50;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.02,
      transparent: true,
      opacity: 0.6
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Animation loop
    const animate = () => {
      // Check if component is still mounted (renderer present)
      if (!rendererRef.current) return;

      requestAnimationFrame(animate);

      const targetRotationX = scrollProgressRef.current * Math.PI * 2;
      const targetRotationY = scrollProgressRef.current * Math.PI * 4;

      if (meshRef.current) {
        meshRef.current.rotation.x += (targetRotationX - meshRef.current.rotation.x) * 0.05;
        meshRef.current.rotation.y += (targetRotationY - meshRef.current.rotation.y) * 0.05;

        const scale = 1 + Math.sin(Date.now() * 0.001) * 0.1;
        meshRef.current.scale.setScalar(scale);
      }

      if (particles) {
        particles.rotation.y += 0.0005;
        particles.rotation.x += 0.0003;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;

      const camera = cameraRef.current;
      const renderer = rendererRef.current;

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);

      // Adjust camera distance and mesh size on resize
      const isSmallScreen = window.innerWidth < 1024;
      camera.position.z = isSmallScreen ? 8 : 5;

      if (meshRef.current) {
        const baseSize = isSmallScreen ? 1.2 : 2.5;
        // Don't shrink too much on resize if logic differs from init
        // The original code had: meshRef.current.scale.setScalar(baseSize / 2);
        // But the init was radius=geometrySize. 
        // Let's rely on the geometry remaining constant but maybe we need to scale if using same geometry
        // Actually IcosahedronGeometry is created once. 
        // To resize mesh "physically", we scale it.
        // But the animation loop overrides scale with pulse.
        // So we should rely on Camera Distance for responsiveness primarily.
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      material.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      // Check if renderer exists before disposing
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current = null; // Prevent further renders
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      const scrolled = container.scrollTop;
      const progress = scrolled / scrollHeight;
      scrollProgressRef.current = progress;

      const projectIndex = Math.min(
        Math.floor(progress * projects.length),
        projects.length - 1
      );

      if (projectIndex !== activeProject && !isTransitioning) {
        setIsTransitioning(true);
        setActiveProject(projectIndex);

        if (meshRef.current) {
          const newColor = projects[projectIndex].color;
          const material = meshRef.current.material;

          const startColor = new THREE.Color(material.color);
          const endColor = new THREE.Color(newColor);
          let transitionProgress = 0;

          const colorTransition = setInterval(() => {
            transitionProgress += 0.05;
            // Check if material is still valid
            if (material) {
              material.color.lerpColors(startColor, endColor, transitionProgress);
              material.emissive.lerpColors(startColor, endColor, transitionProgress);
            }

            if (transitionProgress >= 1) {
              clearInterval(colorTransition);
              setTimeout(() => setIsTransitioning(false), 300);
            }
          }, 16);
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [activeProject, isTransitioning, projects]);

  return (
    <div id="projects" className="relative w-full h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />

      <div
        ref={containerRef}
        className="relative z-10 w-full h-full overflow-y-scroll scrollbar-hide"
        style={{ scrollBehavior: 'smooth' }}
      >
        <div className="h-[50vh]" />

        {projects.map((project, index) => (
          <div
            key={project.id}
            className="min-h-screen flex items-center justify-center px-8"
            style={{
              opacity: activeProject === index ? 1 : 0.3,
              transform: activeProject === index ? 'scale(1)' : 'scale(0.9)',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <div className="max-w-4xl w-full">
              <div
                className="backdrop-blur-xl bg-black/40 rounded-3xl p-12 border border-white/20 shadow-2xl"
                style={{
                  boxShadow: `0 0 80px ${project.color}30, 0 20px 60px rgba(0,0,0,0.6)`,
                  transform: activeProject === index ? 'translateY(0)' : 'translateY(40px)',
                  transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: project.color }}
                  />
                  <span className="text-gray-400 text-sm uppercase tracking-wider">
                    {project.category}
                  </span>
                  <span className="text-gray-500 text-sm ml-auto">{project.year}</span>
                </div>

                <h2
                  className="text-3xl md:text-5xl font-bold mb-6 text-white drop-shadow-2xl"
                  style={{
                    textShadow: `0 0 40px rgba(0,0,0,0.8), 0 0 20px ${project.color}60, 2px 2px 4px rgba(0,0,0,0.9)`
                  }}
                >
                  {project.title}
                </h2>

                <p className="text-gray-100 text-lg mb-8 leading-relaxed drop-shadow-lg" style={{
                  textShadow: '0 2px 10px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.6)'
                }}>
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-3 mb-8">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm"
                      style={{
                        backgroundColor: `${project.color}20`,
                        color: project.color,
                        border: `1px solid ${project.color}40`
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 text-white"
                      style={{
                        backgroundColor: project.color,
                        boxShadow: `0 10px 30px ${project.color}40`
                      }}
                    >
                      View Project
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-xl font-medium border border-white/20 hover:bg-white/5 transition-all duration-300 text-white"
                    >
                      GitHub
                    </a>
                  )}

                </div>

                <div className="mt-8 flex items-center gap-4 text-sm text-gray-500">
                  <span>Project {index + 1} of {projects.length}</span>
                  <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${((index + 1) / projects.length) * 100}%`,
                        backgroundColor: project.color
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="h-[50vh]" />
      </div>



      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Projects3DShowcase;
