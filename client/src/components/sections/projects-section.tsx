// // import { useState } from "react";
// // import { motion, AnimatePresence } from "framer-motion";

// // type ProjectCategory = "All" | "React" | "MERN" | "UI/UX";

// // interface Project {
// //   id: number;
// //   title: string;
// //   description: string;
// //   date: string;
// //   image: string;
// //   categories: ProjectCategory[];
// //   technologies: string[];
// //   github: string;
// //   demo: string;
// //   badge?: {
// //     text: string;
// //     icon: string;
// //     color: string;
// //   };
// // }

// // export default function ProjectsSection() {
// //   const [filter, setFilter] = useState<ProjectCategory>("All");
// //   const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
// //   const projects: Project[] = [
// //     {
// //       id: 1,
// //       title: "Horizon Dashboard",
// //       description: "A banking dashboard integrating Plaid API, achieving a 67% increase in speed compared to other sample banking solutions.",
// //       date: "Oct 2023",
// //       image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
// //       categories: ["React", "MERN"],
// //       technologies: ["React", "Node.js", "Firebase"],
// //       github: "https://github.com/",
// //       demo: "https://demo.com/",
// //       badge: {
// //         text: "Hackathon Finalist",
// //         icon: "fas fa-trophy",
// //         color: "yellow-500"
// //       }
// //     },
// //     {
// //       id: 2,
// //       title: "ChatSync",
// //       description: "A real-time chat application with robust user profiles and secure authentication using JWT tokens.",
// //       date: "Aug 2024",
// //       image: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
// //       categories: ["React", "MERN"],
// //       technologies: ["React", "Express", "MongoDB", "WebSockets"],
// //       github: "https://github.com/",
// //       demo: "https://demo.com/",
// //       badge: {
// //         text: "100% Real-time",
// //         icon: "fas fa-comment",
// //         color: "blue-400"
// //       }
// //     },
// //     {
// //       id: 3,
// //       title: "Apple UI Clone",
// //       description: "A stunning Apple UI clone with 3D model interactions and smooth animations using ThreeJS and GSAP.",
// //       date: "Jun 2024",
// //       image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
// //       categories: ["React", "UI/UX"],
// //       technologies: ["React", "Three.js", "GSAP"],
// //       github: "https://github.com/",
// //       demo: "https://demo.com/",
// //       badge: {
// //         text: "3D Interactions",
// //         icon: "fas fa-cube",
// //         color: "purple-400"
// //       }
// //     },
// //     {
// //       id: 4,
// //       title: "Algorithm Visualizer",
// //       description: "Interactive tool for visualizing various sorting and pathfinding algorithms with step-by-step animation.",
// //       date: "May 2024",
// //       image: "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
// //       categories: ["React", "UI/UX"],
// //       technologies: ["React", "TypeScript", "GSAP", "Data Structures"],
// //       github: "https://github.com/",
// //       demo: "https://demo.com/",
// //       badge: {
// //         text: "Educational Tool",
// //         icon: "fas fa-graduation-cap",
// //         color: "green-500"
// //       }
// //     },
// //     {
// //       id: 5,
// //       title: "3D Portfolio Website",
// //       description: "Immersive portfolio website with interactive 3D elements, particle effects, and smooth scrolling animations.",
// //       date: "Apr 2024",
// //       image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
// //       categories: ["React", "UI/UX"],
// //       technologies: ["React", "Framer Motion", "GSAP"],
// //       github: "https://github.com/",
// //       demo: "https://demo.com/",
// //       badge: {
// //         text: "Interactive 3D",
// //         icon: "fas fa-cubes",
// //         color: "blue-500"
// //       }
// //     },
// //     {
// //       id: 6,
// //       title: "E-Commerce Dashboard",
// //       description: "Full-stack e-commerce admin dashboard with inventory management, sales analytics, and order processing.",
// //       date: "Mar 2024",
// //       image: "https://images.unsplash.com/photo-1661956602944-249bcd04b63f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
// //       categories: ["React", "MERN"],
// //       technologies: ["React", "Node.js", "Express", "MongoDB", "Chart.js"],
// //       github: "https://github.com/",
// //       demo: "https://demo.com/",
// //       badge: {
// //         text: "Business Solution",
// //         icon: "fas fa-store",
// //         color: "indigo-500"
// //       }
// //     }
// //   ];

// //   const filteredProjects = filter === "All" 
// //     ? projects 
// //     : projects.filter(project => project.categories.includes(filter));

// //   // Handle card click to open expanded view
// //   const handleCardClick = (project: Project) => {
// //     setSelectedProject(project);
// //   };

// //   // Close expanded view
// //   const closeExpandedView = () => {
// //     setSelectedProject(null);
// //   };

// //   return (
// //     <section id="projects" className="py-20">
// //       <div className="container mx-auto px-6">
// //         <div className="text-center mb-12">
// //           <h2 className="section-title text-3xl md:text-4xl font-bold font-poppins mb-4">
// //             My <span className="text-primary">Projects</span>
// //           </h2>
// //           <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
// //           <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
// //             Here are some of the projects I've worked on, showcasing my skills in web development and UI/UX design.
// //           </p>
// //         </div>
        
// //         <div className="filters flex flex-wrap justify-center gap-3 mb-10">
// //           {(["All", "React", "MERN", "UI/UX"] as ProjectCategory[]).map((category) => (
// //             <button
// //               key={category}
// //               className={`px-5 py-2 rounded-full bg-card hover:bg-primary/10 transition-all duration-300 ${
// //                 filter === category ? 'border-2 border-primary text-primary' : 'border border-transparent'
// //               }`}
// //               onClick={() => setFilter(category)}
// //             >
// //               {category}
// //             </button>
// //           ))}
// //         </div>
        
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
// //           {filteredProjects.map((project) => (
// //             <motion.div 
// //               key={project.id}
// //               className="project-card bg-card rounded-xl overflow-hidden shadow-md border border-primary/5 cursor-pointer"
// //               whileHover={{ scale: 1.03, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
// //               onClick={() => handleCardClick(project)}
// //               layoutId={`project-card-${project.id}`}
// //               transition={{ duration: 0.3 }}
// //             >
// //               <div className="relative project-image-container h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
// //                 <img 
// //                   src={project.image} 
// //                   alt={project.title} 
// //                   className="object-cover w-full h-full opacity-90 transition-transform duration-700 hover:scale-105"
// //                 />
// //                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
// //               </div>
              
// //               <div className="p-5">
// //                 <div className="flex justify-between items-start mb-2">
// //                   <h3 className="text-lg font-bold font-poppins">{project.title}</h3>
// //                   <span className="px-2 py-1 bg-primary/5 text-primary text-xs rounded-full">{project.date}</span>
// //                 </div>
                
// //                 <p className="text-sm text-muted-foreground mb-3 h-12 overflow-hidden">{project.description}</p>
                
// //                 <div className="flex flex-wrap gap-1.5 mb-4">
// //                   {project.technologies.slice(0, 4).map((tech) => (
// //                     <span key={tech} className="px-2 py-0.5 bg-black/20 text-muted-foreground text-xs rounded-full">
// //                       {tech}
// //                     </span>
// //                   ))}
// //                   {project.technologies.length > 4 && (
// //                     <span className="px-2 py-0.5 bg-primary/5 text-primary text-xs rounded-full">
// //                       +{project.technologies.length - 4}
// //                     </span>
// //                   )}
// //                 </div>
                
// //                 <div className="flex justify-between items-center">
// //                   <div className="flex space-x-4">
// //                     <a 
// //                       href={project.github} 
// //                       className="text-foreground hover:text-primary transition-colors duration-300" 
// //                       aria-label="View Code" 
// //                       target="_blank" 
// //                       rel="noopener noreferrer"
// //                       onClick={(e) => e.stopPropagation()}
// //                     >
// //                       <i className="fab fa-github"></i>
// //                     </a>
// //                     <a 
// //                       href={project.demo} 
// //                       className="text-foreground hover:text-primary transition-colors duration-300" 
// //                       aria-label="View Demo" 
// //                       target="_blank" 
// //                       rel="noopener noreferrer"
// //                       onClick={(e) => e.stopPropagation()}
// //                     >
// //                       <i className="fas fa-external-link-alt"></i>
// //                     </a>
// //                   </div>
                  
// //                   {project.badge && (
// //                     <span className="text-xs flex items-center bg-primary/5 px-2 py-1 rounded-full">
// //                       <i className={`${project.badge.icon} text-${project.badge.color} mr-1`}></i> {project.badge.text}
// //                     </span>
// //                   )}
// //                 </div>
// //               </div>
// //             </motion.div>
// //           ))}
// //         </div>
        
// //         <div className="text-center mt-12">
// //           <a 
// //             href="#" 
// //             className="inline-block bg-card hover:bg-card/80 border border-primary/30 text-foreground font-medium px-6 py-3 rounded-full transition-all"
// //           >
// //             View All Projects <i className="fas fa-arrow-right ml-2"></i>
// //           </a>
// //         </div>
// //       </div>

// //       {/* Expanded Project View Modal */}
// //       <AnimatePresence>
// //         {selectedProject && (
// //           <motion.div 
// //             className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             exit={{ opacity: 0 }}
// //             onClick={closeExpandedView}
// //           >
// //             <motion.div 
// //               className="relative w-full max-w-4xl bg-card rounded-xl overflow-hidden shadow-2xl"
// //               layoutId={`project-card-${selectedProject.id}`}
// //               onClick={(e) => e.stopPropagation()}
// //               transition={{ duration: 0.4 }}
// //             >
// //               <button 
// //                 className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-primary transition-all"
// //                 onClick={closeExpandedView}
// //               >
// //                 <i className="fas fa-times"></i>
// //               </button>
              
// //               <div className="md:flex">
// //                 <div className="md:w-1/2">
// //                   <div className="h-64 md:h-full relative overflow-hidden">
// //                     <img 
// //                       src={selectedProject.image} 
// //                       alt={selectedProject.title} 
// //                       className="h-full w-full object-cover"
// //                     />
// //                     <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-transparent to-transparent"></div>
// //                     <div className="absolute bottom-4 left-4 flex space-x-2">
// //                       {selectedProject.badge && (
// //                         <span className="text-xs flex items-center bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
// //                           <i className={`${selectedProject.badge.icon} text-${selectedProject.badge.color} mr-1.5`}></i> 
// //                           {selectedProject.badge.text}
// //                         </span>
// //                       )}
// //                       <span className="text-xs flex items-center bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full text-white">
// //                         {selectedProject.date}
// //                       </span>
// //                     </div>
// //                   </div>
// //                 </div>
                
// //                 <div className="md:w-1/2 p-6 md:p-8">
// //                   <h2 className="text-2xl font-bold font-poppins mb-3">{selectedProject.title}</h2>
                  
// //                   <p className="text-muted-foreground mb-6">{selectedProject.description}</p>
                  
// //                   <div className="mb-6">
// //                     <h3 className="text-lg font-medium mb-3">Technologies</h3>
// //                     <div className="flex flex-wrap gap-2">
// //                       {selectedProject.technologies.map((tech) => (
// //                         <span key={tech} className="px-3 py-1 bg-black/20 text-muted-foreground text-sm rounded-full">
// //                           {tech}
// //                         </span>
// //                       ))}
// //                     </div>
// //                   </div>
                  
// //                   <div className="mb-6">
// //                     <h3 className="text-lg font-medium mb-3">Categories</h3>
// //                     <div className="flex flex-wrap gap-2">
// //                       {selectedProject.categories.map((category) => (
// //                         <span key={category} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
// //                           {category}
// //                         </span>
// //                       ))}
// //                     </div>
// //                   </div>
                  
// //                   <div className="flex space-x-4">
// //                     <a 
// //                       href={selectedProject.github} 
// //                       className="flex-1 bg-card hover:bg-card/80 border border-primary/30 text-center py-3 rounded-lg transition-all"
// //                       target="_blank" 
// //                       rel="noopener noreferrer"
// //                     >
// //                       <i className="fab fa-github mr-2"></i> View Code
// //                     </a>
// //                     <a 
// //                       href={selectedProject.demo} 
// //                       className="flex-1 bg-primary hover:bg-primary/90 text-white text-center py-3 rounded-lg transition-all"
// //                       target="_blank" 
// //                       rel="noopener noreferrer"
// //                     >
// //                       <i className="fas fa-external-link-alt mr-2"></i> Live Demo
// //                     </a>
// //                   </div>
// //                 </div>
// //               </div>
// //             </motion.div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>
// //     </section>
// //   );
// // }


// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// type ProjectCategory = "All" | "React" | "MERN" | "UI/UX" | "Python" | "ML";

// interface Project {
//   id: number;
//   title: string;
//   description: string;
//   date: string;
//   image: string;
//   categories: ProjectCategory[];
//   technologies: string[];
//   github: string;
//   demo: string;
//   badge?: {
//     text: string;
//     icon: string;
//     color: string;
//   };
// }

// export default function ProjectsSection() {
//   const [filter, setFilter] = useState<ProjectCategory>("All");
//   const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
//   const projects: Project[] = [
//     {
//       id: 1,
//       title: "Horizon Dashboard",
//       description: "A banking dashboard integrating Plaid API, achieving a 67% increase in speed compared to other sample banking solutions.",
//       date: "Oct 2023",
//       image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
//       categories: ["React", "MERN"],
//       technologies: ["React", "Node.js", "Firebase"],
//       github: "https://github.com/HarshNagrani9/Devopia",
//       demo: "https://www.youtube.com/watch?v=ATHQPB16e_4",
//       badge: {
//         text: "Hackathon Finalist",
//         icon: "fas fa-trophy",
//         color: "yellow-500"
//       }
//     },
//     {
//       id: 2,
//       title: "ChatSync",
//       description: "A real-time chat application with robust user profiles and secure authentication using JWT tokens.",
//       date: "Aug 2024",
//       image: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
//       categories: ["React", "MERN"],
//       technologies: ["React", "Express", "MongoDB", "WebSockets"],
//       github: "https://github.com/HarshNagrani9/MERN-ChatSync",
//       demo: "",
//       badge: {
//         text: "100% Real-time",
//         icon: "fas fa-comment",
//         color: "blue-400"
//       }
//     },
//     {
//       id: 3,
//       title: "Apple UI Clone",
//       description: "A stunning Apple UI clone with 3D model interactions and smooth animations using ThreeJS and GSAP.",
//       date: "Jun 2024",
//       image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
//       categories: ["React", "UI/UX"],
//       technologies: ["React", "Three.js", "GSAP"],
//       github: "https://github.com/HarshNagrani9/apple",
//       demo: "https://apple-eta-liart.vercel.app/",
//       badge: {
//         text: "3D Interactions",
//         icon: "fas fa-cube",
//         color: "purple-400"
//       }
//     },
//     {
//       id: 4,
//       title: "Movie Recommendation System",
//       description: "A web-based content-based filtering system that recommends movies based on genre similarity using machine learning techniques.",
//       date: "May 2024",
//       image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
//       categories: ["Python", "ML"],
//       technologies: ["Python", "Flask", "Pandas", "scikit-learn", "NumPy"],
//       github: "https://github.com/HarshNagrani9/Movie-Recomendation-System",
//       demo: "",
//       badge: {
//         text: "ML Project",
//         icon: "fas fa-brain",
//         color: "blue-500"
//       }
//     },
//     {
//       id: 5,
//       title: "Portfolio Website",
//       description: "Immersive portfolio website with interactive 3D elements, particle effects, and smooth scrolling animations.",
//       date: "",
//       image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
//       categories: ["React", "UI/UX"],
//       technologies: ["React", "Framer Motion", "GSAP"],
//       github: "https://github.com/HarshNagrani9/Personal-Portfolio",
//       demo: "",
//       badge: {
//         text: "Interactive 3D",
//         icon: "fas fa-cubes",
//         color: "blue-500"
//       }
//     },
//     {
//       id: 6,
//       title: "E-Commerce Dashboard",
//       description: "Full-stack e-commerce admin dashboard with inventory management, sales analytics, and order processing.",
//       date: "",
//       image: "https://images.unsplash.com/photo-1661956602944-249bcd04b63f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
//       categories: ["React", "MERN"],
//       technologies: ["React", "Node.js", "Express", "MongoDB", "Chart.js"],
//       github: "https://github.com/",
//       demo: "https://demo.com/",
//       badge: {
//         text: "Business Solution",
//         icon: "fas fa-store",
//         color: "indigo-500"
//       }
//     }
//   ];

//   const filteredProjects = filter === "All" 
//     ? projects 
//     : projects.filter(project => project.categories.includes(filter));

//   // Handle card click to open expanded view
//   const handleCardClick = (project: Project) => {
//     setSelectedProject(project);
//   };

//   // Close expanded view
//   const closeExpandedView = () => {
//     setSelectedProject(null);
//   };

//   return (
//     <section id="projects" className="py-20">
//       <div className="container mx-auto px-6">
//         <div className="text-center mb-12">
//           <h2 className="section-title text-3xl md:text-4xl font-bold font-poppins mb-4">
//             My <span className="text-primary">Projects</span>
//           </h2>
//           <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
//           <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
//             Here are some of the projects I've worked on, showcasing my skills in web development and UI/UX design.
//           </p>
//         </div>
        
//         <div className="filters flex flex-wrap justify-center gap-3 mb-10">
//           {(["All", "React", "MERN", "UI/UX", "Python", "ML"] as ProjectCategory[]).map((category) => (
//             <button
//               key={category}
//               className={`px-5 py-2 rounded-full bg-card hover:bg-primary/10 transition-all duration-300 ${
//                 filter === category ? 'border-2 border-primary text-primary' : 'border border-transparent'
//               }`}
//               onClick={() => setFilter(category)}
//             >
//               {category}
//             </button>
//           ))}
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
//           {filteredProjects.map((project) => (
//             <motion.div 
//               key={project.id}
//               className="project-card bg-card rounded-xl overflow-hidden shadow-md border border-primary/5 cursor-pointer"
//               whileHover={{ scale: 1.03, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
//               onClick={() => handleCardClick(project)}
//               layoutId={`project-card-${project.id}`}
//               transition={{ duration: 0.3 }}
//             >
//               <div className="relative project-image-container h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
//                 <img 
//                   src={project.image} 
//                   alt={project.title} 
//                   className="object-cover w-full h-full opacity-90 transition-transform duration-700 hover:scale-105"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
//               </div>
              
//               <div className="p-5">
//                 <div className="flex justify-between items-start mb-2">
//                   <h3 className="text-lg font-bold font-poppins">{project.title}</h3>
//                   <span className="px-2 py-1 bg-primary/5 text-primary text-xs rounded-full">{project.date}</span>
//                 </div>
                
//                 <p className="text-sm text-muted-foreground mb-3 h-12 overflow-hidden">{project.description}</p>
                
//                 <div className="flex flex-wrap gap-1.5 mb-4">
//                   {project.technologies.slice(0, 4).map((tech) => (
//                     <span key={tech} className="px-2 py-0.5 bg-black/20 text-muted-foreground text-xs rounded-full">
//                       {tech}
//                     </span>
//                   ))}
//                   {project.technologies.length > 4 && (
//                     <span className="px-2 py-0.5 bg-primary/5 text-primary text-xs rounded-full">
//                       +{project.technologies.length - 4}
//                     </span>
//                   )}
//                 </div>
                
//                 <div className="flex justify-between items-center">
//                   <div className="flex space-x-4">
//                     <a 
//                       href={project.github} 
//                       className="text-foreground hover:text-primary transition-colors duration-300" 
//                       aria-label="View Code" 
//                       target="_blank" 
//                       rel="noopener noreferrer"
//                       onClick={(e) => e.stopPropagation()}
//                     >
//                       <i className="fab fa-github"></i>
//                     </a>
//                     <a 
//                       href={project.demo} 
//                       className="text-foreground hover:text-primary transition-colors duration-300" 
//                       aria-label="View Demo" 
//                       target="_blank" 
//                       rel="noopener noreferrer"
//                       onClick={(e) => e.stopPropagation()}
//                     >
//                       <i className="fas fa-external-link-alt"></i>
//                     </a>
//                   </div>
                  
//                   {project.badge && (
//                     <span className="text-xs flex items-center bg-primary/5 px-2 py-1 rounded-full">
//                       <i className={`${project.badge.icon} text-${project.badge.color} mr-1`}></i> {project.badge.text}
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
        
//         <div className="text-center mt-12">
//           <a 
//             href="#" 
//             className="inline-block bg-card hover:bg-card/80 border border-primary/30 text-foreground font-medium px-6 py-3 rounded-full transition-all"
//           >
//             View All Projects <i className="fas fa-arrow-right ml-2"></i>
//           </a>
//         </div>
//       </div>

//       {/* Expanded Project View Modal */}
//       <AnimatePresence>
//         {selectedProject && (
//           <motion.div 
//             className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={closeExpandedView}
//           >
//             <motion.div 
//               className="relative w-full max-w-4xl bg-card rounded-xl overflow-hidden shadow-2xl"
//               layoutId={`project-card-${selectedProject.id}`}
//               onClick={(e) => e.stopPropagation()}
//               transition={{ duration: 0.4 }}
//             >
//               <button 
//                 className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-primary transition-all"
//                 onClick={closeExpandedView}
//               >
//                 <i className="fas fa-times"></i>
//               </button>
              
//               <div className="md:flex">
//                 <div className="md:w-1/2">
//                   <div className="h-64 md:h-full relative overflow-hidden">
//                     <img 
//                       src={selectedProject.image} 
//                       alt={selectedProject.title} 
//                       className="h-full w-full object-cover"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-transparent to-transparent"></div>
//                     <div className="absolute bottom-4 left-4 flex space-x-2">
//                       {selectedProject.badge && (
//                         <span className="text-xs flex items-center bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
//                           <i className={`${selectedProject.badge.icon} text-${selectedProject.badge.color} mr-1.5`}></i> 
//                           {selectedProject.badge.text}
//                         </span>
//                       )}
//                       <span className="text-xs flex items-center bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full text-white">
//                         {selectedProject.date}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="md:w-1/2 p-6 md:p-8">
//                   <h2 className="text-2xl font-bold font-poppins mb-3">{selectedProject.title}</h2>
                  
//                   <p className="text-muted-foreground mb-6">{selectedProject.description}</p>
                  
//                   <div className="mb-6">
//                     <h3 className="text-lg font-medium mb-3">Technologies</h3>
//                     <div className="flex flex-wrap gap-2">
//                       {selectedProject.technologies.map((tech) => (
//                         <span key={tech} className="px-3 py-1 bg-black/20 text-muted-foreground text-sm rounded-full">
//                           {tech}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
                  
//                   <div className="mb-6">
//                     <h3 className="text-lg font-medium mb-3">Categories</h3>
//                     <div className="flex flex-wrap gap-2">
//                       {selectedProject.categories.map((category) => (
//                         <span key={category} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
//                           {category}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
                  
//                   <div className="flex space-x-4">
//                     <a 
//                       href={selectedProject.github} 
//                       className="flex-1 bg-card hover:bg-card/80 border border-primary/30 text-center py-3 rounded-lg transition-all"
//                       target="_blank" 
//                       rel="noopener noreferrer"
//                     >
//                       <i className="fab fa-github mr-2"></i> View Code
//                     </a>
//                     {selectedProject.demo ? (
//                       <a 
//                         href={selectedProject.demo} 
//                         className="flex-1 bg-primary hover:bg-primary/90 text-white text-center py-3 rounded-lg transition-all"
//                         target="_blank" 
//                         rel="noopener noreferrer"
//                       >
//                         <i className="fas fa-external-link-alt mr-2"></i> Live Demo
//                       </a>
//                     ) : null}
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </section>
//   );
// }

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

type ProjectCategory = "All" | "React" | "MERN" | "UI/UX" | "Python" | "ML";

interface Project {
  id: number;
  title: string;
  description: string;
  detailedDescription?: string[];
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const projects: Project[] = [
    {
      id: 1,
      title: "MediVault",
      description: "Full-stack healthcare management platform with blockchain-based file access control, end-to-end encryption, and AI-powered RAG system for intelligent health record analysis.",
      detailedDescription: [
        "Built a full-stack healthcare management platform using Next.js 14, TypeScript, and Firebase with role-based authentication, separate dashboards for patients and doctors, and a microservices architecture featuring Python FastAPI for vector search operations, ensuring real-time Firestore synchronization and responsive UI with Tailwind CSS and shadcn/ui.",
        "Implemented comprehensive security architecture with blockchain-based file access control using Ethereum smart contracts (Solidity) on Sepolia testnet and IPFS for decentralized storage, combined with end-to-end encryption using AES-256-GCM for HIPAA-compliant protection, ensuring patient data ownership and consent-based sharing.",
        "Designed and implemented a RAG (Retrieval-Augmented Generation) pipeline using Google Gemini 2.0 Flash with FAISS-based vector search, creating separate indices for static medical knowledge (400+ disease entries) and dynamic patient records using Google Embedding API for 768-dimensional vectors, achieving sub-second similarity search performance.",
        "Developed AI-powered health assistant chatbot that combines static medical knowledge with patient-specific data, providing automated health record analysis, personalized health summaries, actionable recommendations based on vitals, and context-aware responses with source citations for accurate, personalized medical guidance."
      ],
      date: "Dec 2024",
      image: "/images/Google Gemini.jpg",
      categories: ["React", "MERN", "Python", "ML"],
      technologies: ["Next.js 14", "TypeScript", "Firebase", "Solidity", "Ethers.js", "IPFS", "FastAPI", "Python", "Google Gemini", "FAISS", "Tailwind CSS", "shadcn/ui"],
      github: "https://github.com/HarshNagrani9/LY-Project",
      demo: "https://drive.google.com/file/d/1ZbuSqx1R1kmCBXEVOeHAo4sB2raFj24z/view?usp=sharing",
      badge: {
        text: "Blockchain + AI",
        icon: "fas fa-shield-alt",
        color: "green-500"
      }
    },
    {
      id: 2,
      title: "Horizon Dashboard",
      description: "A banking dashboard integrating Plaid API, achieving a 67% increase in speed compared to other sample banking solutions.",
      date: "Oct 2023",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      categories: ["React", "MERN"],
      technologies: ["React", "Node.js", "Firebase"],
      github: "https://github.com/HarshNagrani9/Devopia",
      demo: "https://www.youtube.com/watch?v=ATHQPB16e_4",
      badge: {
        text: "Hackathon Finalist",
        icon: "fas fa-trophy",
        color: "yellow-500"
      }
    },
    {
      id: 3,
      title: "ChatSync",
      description: "A real-time chat application with robust user profiles and secure authentication using JWT tokens.",
      date: "Aug 2024",
      image: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      categories: ["React", "MERN"],
      technologies: ["React", "Express", "MongoDB", "WebSockets"],
      github: "https://github.com/HarshNagrani9/MERN-ChatSync",
      demo: "",
      badge: {
        text: "100% Real-time",
        icon: "fas fa-comment",
        color: "blue-400"
      }
    },
    {
      id: 4,
      title: "Apple UI Clone",
      description: "A stunning Apple UI clone with 3D model interactions and smooth animations using ThreeJS and GSAP.",
      date: "Jun 2024",
      image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      categories: ["React", "UI/UX"],
      technologies: ["React", "Three.js", "GSAP"],
      github: "https://github.com/HarshNagrani9/apple",
      demo: "https://apple-eta-liart.vercel.app/",
      badge: {
        text: "3D Interactions",
        icon: "fas fa-cube",
        color: "purple-400"
      }
    },
    {
      id: 5,
      title: "Movie Recommendation System",
      description: "A web-based content-based filtering system that recommends movies based on genre similarity using machine learning techniques.",
      date: "May 2024",
      image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      categories: ["Python", "ML"],
      technologies: ["Python", "Flask", "Pandas", "scikit-learn", "NumPy"],
      github: "https://github.com/HarshNagrani9/Movie-Recomendation-System",
      demo: "",
      badge: {
        text: "ML Project",
        icon: "fas fa-brain",
        color: "blue-500"
      }
    },
    {
      id: 6,
      title: "Portfolio Website",
      description: "Immersive portfolio website with interactive 3D elements, particle effects, and smooth scrolling animations.",
      date: "April 2025",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      categories: ["React", "UI/UX"],
      technologies: ["React", "Framer Motion", "GSAP"],
      github: "https://github.com/HarshNagrani9/Personal-Portfolio",
      demo: "harshnagrani.vercel.app",
      badge: {
        text: "Interactive 3D",
        icon: "fas fa-cubes",
        color: "blue-500"
      }
    }
  ];

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(project => project.categories.includes(filter));

  // Handle card click to open expanded view
  const handleCardClick = (project: Project) => {
    setSelectedProject(project);
  };

  // Close expanded view
  const closeExpandedView = () => {
    setSelectedProject(null);
  };

  // Spotlight effect logic
  const initSpotlight = (card: HTMLElement) => {
    const spotlight = document.createElement("div");
    spotlight.className = "spotlight-effect";
    card.appendChild(spotlight);
    
    // Initial spotlight positioning
    gsap.set(spotlight, {
      width: 300,
      height: 300,
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(var(--primary-rgb), 0.25) 0%, rgba(var(--primary-rgb), 0.05) 50%, rgba(var(--primary-rgb), 0) 70%)",
      position: "absolute",
      pointerEvents: "none",
      top: 0,
      left: 0,
      opacity: 0,
      zIndex: 1
    });

    // Mouse move handler for spotlight
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      gsap.to(spotlight, {
        duration: 0.5,
        left: x - 150,
        top: y - 150,
        opacity: 1,
        ease: "power2.out"
      });
    };

    // Mouse enter handler
    const handleMouseEnter = () => {
      gsap.to(spotlight, {
        duration: 0.5,
        opacity: 1,
        ease: "power2.out"
      });
      
      // Add subtle glow to the card
      gsap.to(card, {
        duration: 0.5,
        boxShadow: "0 15px 35px rgba(var(--primary-rgb), 0.2)",
        ease: "power2.out"
      });
    };

    // Mouse leave handler
    const handleMouseLeave = () => {
      gsap.to(spotlight, {
        duration: 0.5,
        opacity: 0,
        ease: "power2.out"
      });
      
      // Reset card shadow
      gsap.to(card, {
        duration: 0.5,
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        ease: "power2.out"
      });
    };

    // Add event listeners
    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    // Return cleanup function
    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
      if (spotlight.parentNode === card) {
        card.removeChild(spotlight);
      }
    };
  };

  // Initialize spotlight effect on cards
  useEffect(() => {
    const cards = document.querySelectorAll('.project-card');
    const cleanupFunctions: (() => void)[] = [];
    
    // Add CSS variable for primary color RGB values
    const root = document.documentElement;
    const primaryColor = getComputedStyle(root).getPropertyValue('--primary') || '#3b82f6';
    
    // Convert hex to RGB
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.trim());
      return result ? 
        `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : 
        "59, 130, 246"; // Default blue if conversion fails
    };
    
    root.style.setProperty('--primary-rgb', hexToRgb(primaryColor));
    
    // Initialize spotlight on each card
    cards.forEach((card) => {
      cleanupFunctions.push(initSpotlight(card as HTMLElement));
    });
    
    // Cleanup on unmount
    return () => {
      cleanupFunctions.forEach(cleanup => cleanup());
    };
  }, [filteredProjects]); // Re-initialize when filtered projects change

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="section-title text-3xl md:text-4xl font-bold font-poppins mb-4">
            My <span className="text-primary">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Here are some of the projects I've worked on, showcasing my skills in web development and UI/UX design.
          </p>
        </div>
        
        <div className="filters flex flex-wrap justify-center gap-3 mb-10">
          {(["All", "React", "MERN", "UI/UX", "Python", "ML"] as ProjectCategory[]).map((category) => (
            <button
              key={category}
              className={`px-5 py-2 rounded-full bg-card hover:bg-primary/10 transition-all duration-300 ${
                filter === category ? 'border-2 border-primary text-primary' : 'border border-transparent'
              }`}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProjects.map((project) => (
            <motion.div 
              key={project.id}
              className="project-card bg-card rounded-xl overflow-hidden shadow-md border border-primary/5 cursor-pointer relative"
              whileHover={{ scale: 1.03 }}
              onClick={() => handleCardClick(project)}
              layoutId={`project-card-${project.id}`}
              transition={{ duration: 0.3 }}
            >
              <div className="relative project-image-container h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 z-10">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="object-cover w-full h-full opacity-90 transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
              
              <div className="p-5 relative z-10">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold font-poppins">{project.title}</h3>
                  {project.date && (
                    <span className="px-2 py-1 bg-primary/5 text-primary text-xs rounded-full">{project.date}</span>
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground mb-3 h-12 overflow-hidden">{project.description}</p>
                
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span key={tech} className="px-2 py-0.5 bg-black/20 text-muted-foreground text-xs rounded-full">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2 py-0.5 bg-primary/5 text-primary text-xs rounded-full">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex space-x-4">
                    <a 
                      href={project.github} 
                      className="text-foreground hover:text-primary transition-colors duration-300" 
                      aria-label="View Code" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <i className="fab fa-github"></i>
                    </a>
                    {project.demo && (
                      <a 
                        href={project.demo} 
                        className="text-foreground hover:text-primary transition-colors duration-300" 
                        aria-label="View Demo" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <i className="fas fa-external-link-alt"></i>
                      </a>
                    )}
                  </div>
                  
                  {project.badge && (
                    <span className="text-xs flex items-center bg-primary/5 px-2 py-1 rounded-full">
                      <i className={`${project.badge.icon} text-${project.badge.color} mr-1`}></i> {project.badge.text}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="#" 
            className="inline-block bg-card hover:bg-card/80 border border-primary/30 text-foreground font-medium px-6 py-3 rounded-full transition-all"
          >
            View All Projects <i className="fas fa-arrow-right ml-2"></i>
          </a>
        </div>
      </div>

      {/* Expanded Project View Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeExpandedView}
          >
            <motion.div 
              className="relative w-full max-w-4xl bg-card rounded-xl overflow-hidden shadow-2xl"
              layoutId={`project-card-${selectedProject.id}`}
              onClick={(e) => e.stopPropagation()}
              transition={{ duration: 0.4 }}
            >
              <button 
                className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-primary transition-all"
                onClick={closeExpandedView}
              >
                <i className="fas fa-times"></i>
              </button>
              
              <div className="md:flex">
                <div className="md:w-1/2">
                  <div className="h-64 md:h-full relative overflow-hidden">
                    <img 
                      src={selectedProject.image} 
                      alt={selectedProject.title} 
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 flex space-x-2">
                      {selectedProject.badge && (
                        <span className="text-xs flex items-center bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
                          <i className={`${selectedProject.badge.icon} text-${selectedProject.badge.color} mr-1.5`}></i> 
                          {selectedProject.badge.text}
                        </span>
                      )}
                      {selectedProject.date && (
                        <span className="text-xs flex items-center bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full text-white">
                          {selectedProject.date}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="md:w-1/2 p-6 md:p-8 max-h-[calc(100vh-4rem)] overflow-y-auto">
                  <h2 className="text-2xl font-bold font-poppins mb-3">{selectedProject.title}</h2>
                  
                  {selectedProject.detailedDescription ? (
                    <div className="mb-6">
                      <ul className="space-y-3 text-muted-foreground">
                        {selectedProject.detailedDescription.map((point, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-primary mr-2 mt-1">•</span>
                            <span className="flex-1">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-muted-foreground mb-6">{selectedProject.description}</p>
                  )}
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-black/20 text-muted-foreground text-sm rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.categories.map((category) => (
                        <span key={category} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    <a 
                      href={selectedProject.github} 
                      className="flex-1 bg-card hover:bg-card/80 border border-primary/30 text-center py-3 rounded-lg transition-all"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-github mr-2"></i> View Code
                    </a>
                    {selectedProject.demo && (
                      <a 
                        href={selectedProject.demo} 
                        className="flex-1 bg-primary hover:bg-primary/90 text-white text-center py-3 rounded-lg transition-all"
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <i className="fas fa-external-link-alt mr-2"></i> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}


