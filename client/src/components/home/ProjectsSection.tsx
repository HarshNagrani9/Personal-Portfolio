import { useEffect } from "react";
import { gsap } from "gsap";
import { Github, ExternalLink, Trophy, Zap, TrendingUp } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  demo?: string;
  achievement?: {
    icon: React.ReactNode;
    text: string;
  };
  gradientFrom: string;
  gradientTo: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Horizon Dashboard",
    description: "Banking dashboard with Plaid API integration that achieved a 67% increase in speed compared to other banking solutions.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3",
    tags: ["React", "Node.js", "Firebase", "MERN"],
    github: "https://github.com/harshnagrani0910/horizon-dashboard",
    demo: "https://youtu.be/horizon-demo",
    achievement: {
      icon: <Trophy className="h-4 w-4 text-yellow-500 mr-1" />,
      text: "Finalist at Devopia Hackathon"
    },
    gradientFrom: "from-primary",
    gradientTo: "to-secondary"
  },
  {
    id: 2,
    title: "ChatSync",
    description: "Real-time chat application with profile system, image uploads using Multer, and JWT authentication for secure access.",
    image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3",
    tags: ["React", "Express", "MongoDB", "Node.js", "WebSockets"],
    github: "https://github.com/harshnagrani0910/chat-sync",
    achievement: {
      icon: <Zap className="h-4 w-4 text-yellow-500 mr-1" />,
      text: "100% Real-time messaging"
    },
    gradientFrom: "from-secondary",
    gradientTo: "to-accent"
  },
  {
    id: 3,
    title: "Apple UI Clone",
    description: "UI clone utilizing React, Three.js Fiber, and GSAP for advanced 3D graphics and smooth animations, enhancing user interaction.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.0.3",
    tags: ["React", "Three.js", "GSAP"],
    github: "https://github.com/harshnagrani0910/apple-ui-clone",
    demo: "https://apple-ui-clone-demo.vercel.app/",
    achievement: {
      icon: <TrendingUp className="h-4 w-4 text-green-500 mr-1" />,
      text: "30% higher engagement"
    },
    gradientFrom: "from-accent",
    gradientTo: "to-primary"
  }
];

const ProjectsSection = () => {
  useEffect(() => {
    // GSAP animation for project cards
    gsap.utils.toArray('.project-card').forEach((card: any, i) => {
      gsap.fromTo(
        card,
        { 
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: i * 0.2,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
          ease: "power2.out"
        }
      );
    });
  }, []);

  return (
    <section id="projects" className="py-20 section">
      <div className="custom-container">
        <h2 className="text-4xl font-bold font-poppins text-center mb-6">
          <span className="text-primary">Projects</span> I've Built
        </h2>
        <p className="text-center max-w-2xl mx-auto mb-16">
          I enjoy building applications that solve real problems and provide great user experiences.
          Here are some of my recent projects.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="project-card bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-r ${project.gradientFrom} ${project.gradientTo} opacity-80`}></div>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 flex space-x-3">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-white bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full w-8 h-8 flex items-center justify-center transition-all"
                  >
                    <Github size={16} />
                  </a>
                  {project.demo && (
                    <a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-white bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full w-8 h-8 flex items-center justify-center transition-all"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>
              <div className="p-6 flex-grow">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="mb-4 opacity-80">
                  {project.description}
                </p>
                <div className="mb-4 flex flex-wrap">
                  {project.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="inline-block px-3 py-1 mr-2 mb-2 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              {project.achievement && (
                <div className="p-6 pt-0">
                  <div className="flex items-center text-xs">
                    <span className="flex items-center">
                      {project.achievement.icon}
                      {project.achievement.text}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
