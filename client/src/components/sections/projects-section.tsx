import { useState } from "react";
import { motion } from "framer-motion";
import { useGSAPFrom } from "@/hooks/use-gsap";

type ProjectCategory = "All" | "React" | "MERN" | "UI/UX";

interface Project {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
  categories: ProjectCategory[];
  technologies: string[];
  github: string;
  demo: string;
  badge?: {
    text: string;
    icon: string;
    color: string;
  };
}

export default function ProjectsSection() {
  const [filter, setFilter] = useState<ProjectCategory>("All");
  
  const projects: Project[] = [
    {
      id: 1,
      title: "Horizon Dashboard",
      description: "A banking dashboard integrating Plaid API, achieving a 67% increase in speed compared to other sample banking solutions.",
      date: "Oct 2023",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      categories: ["React", "MERN"],
      technologies: ["React", "Node.js", "Firebase"],
      github: "https://github.com/",
      demo: "https://demo.com/",
      badge: {
        text: "Hackathon Finalist",
        icon: "fas fa-trophy",
        color: "yellow-500"
      }
    },
    {
      id: 2,
      title: "ChatSync",
      description: "A real-time chat application with robust user profiles and secure authentication using JWT tokens.",
      date: "Aug 2024",
      image: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      categories: ["React", "MERN"],
      technologies: ["React", "Express", "MongoDB", "WebSockets"],
      github: "https://github.com/",
      demo: "https://demo.com/",
      badge: {
        text: "100% Real-time",
        icon: "fas fa-comment",
        color: "blue-400"
      }
    },
    {
      id: 3,
      title: "Apple UI Clone",
      description: "A stunning Apple UI clone with 3D model interactions and smooth animations using ThreeJS and GSAP.",
      date: "Jun 2024",
      image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      categories: ["React", "UI/UX"],
      technologies: ["React", "Three.js", "GSAP"],
      github: "https://github.com/",
      demo: "https://demo.com/",
      badge: {
        text: "3D Interactions",
        icon: "fas fa-cube",
        color: "purple-400"
      }
    },
    {
      id: 4,
      title: "Algorithm Visualizer",
      description: "Interactive tool for visualizing various sorting and pathfinding algorithms with step-by-step animation.",
      date: "May 2024",
      image: "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      categories: ["React", "UI/UX"],
      technologies: ["React", "TypeScript", "GSAP", "Data Structures"],
      github: "https://github.com/",
      demo: "https://demo.com/",
      badge: {
        text: "Educational Tool",
        icon: "fas fa-graduation-cap",
        color: "green-500"
      }
    },
    {
      id: 5,
      title: "3D Portfolio Website",
      description: "Immersive portfolio website with interactive 3D elements, particle effects, and smooth scrolling animations.",
      date: "Apr 2024",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      categories: ["React", "UI/UX"],
      technologies: ["React", "Three.js", "Framer Motion", "GSAP"],
      github: "https://github.com/",
      demo: "https://demo.com/",
      badge: {
        text: "Interactive 3D",
        icon: "fas fa-cubes",
        color: "blue-500"
      }
    },
    {
      id: 6,
      title: "E-Commerce Dashboard",
      description: "Full-stack e-commerce admin dashboard with inventory management, sales analytics, and order processing.",
      date: "Mar 2024",
      image: "https://images.unsplash.com/photo-1661956602944-249bcd04b63f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      categories: ["React", "MERN"],
      technologies: ["React", "Node.js", "Express", "MongoDB", "Chart.js"],
      github: "https://github.com/",
      demo: "https://demo.com/",
      badge: {
        text: "Business Solution",
        icon: "fas fa-store",
        color: "indigo-500"
      }
    }
  ];

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(project => project.categories.includes(filter));
  
  // GSAP animations for project cards
  useGSAPFrom(".project-card", {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: "power3.out"
  }, {
    trigger: "#projects",
    start: "top 80%",
    once: true
  });

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title text-3xl md:text-4xl font-bold font-poppins mb-4">
            My <span className="text-primary">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Here are some of the projects I've worked on, showcasing my skills in web development and UI/UX design.
          </p>
        </motion.div>
        
        <motion.div 
          className="filters flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {(["All", "React", "MERN", "UI/UX"] as ProjectCategory[]).map((category) => (
            <button
              key={category}
              className={`px-5 py-2 rounded-full bg-card text-foreground hover:bg-primary/20 transition-colors ${
                filter === category ? 'border border-primary/30' : 'border border-transparent'
              }`}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <motion.div 
              key={project.id}
              className="project-card bg-card rounded-xl overflow-hidden shadow-lg border border-primary/10"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative project-image-container h-52 overflow-hidden bg-gradient-to-br from-primary/30 to-accent/30">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="object-cover w-full h-full opacity-80 hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold font-poppins">{project.title}</h3>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">{project.date}</span>
                </div>
                
                <p className="text-muted-foreground mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-black text-muted-foreground text-xs rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    <a href={project.github} className="text-primary hover:text-primary/80" aria-label="View Code" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-github text-lg"></i>
                    </a>
                    <a href={project.demo} className="text-primary hover:text-primary/80" aria-label="View Demo" target="_blank" rel="noopener noreferrer">
                      <i className="fas fa-external-link-alt text-lg"></i>
                    </a>
                  </div>
                  
                  {project.badge && (
                    <span className="text-xs text-muted-foreground flex items-center">
                      <i className={`${project.badge.icon} text-${project.badge.color} mr-1`}></i> {project.badge.text}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a 
            href="#" 
            className="inline-block bg-card hover:bg-card/80 border border-primary/30 text-foreground font-medium px-6 py-3 rounded-full transition-all"
          >
            View All Projects <i className="fas fa-arrow-right ml-2"></i>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
