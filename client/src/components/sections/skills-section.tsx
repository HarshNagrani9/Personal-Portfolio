import { useState } from "react";
import { motion } from "framer-motion";

interface SkillCategory {
  name: string;
  icon: string;
  skills: {
    name: string;
    icon: string;
    description: string;
  }[];
}

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeSkill, setActiveSkill] = useState<number | null>(null);
  
  const skillCategories: SkillCategory[] = [
    {
      name: "Frontend",
      icon: "fas fa-laptop-code",
      skills: [
        {
          name: "React.js",
          icon: "fab fa-react",
          description: "Building interactive user interfaces with React, Redux, and modern React patterns like hooks and context."
        },
        {
          name: "JavaScript",
          icon: "fab fa-js",
          description: "Proficient in ES6+, TypeScript, DOM manipulation, and asynchronous programming with Promises and async/await."
        },
        {
          name: "HTML/CSS",
          icon: "fab fa-html5",
          description: "Creating responsive layouts with Flexbox, Grid, and component styling using Tailwind CSS and styled-components."
        },
        {
          name: "Three.js/GSAP",
          icon: "fas fa-cube",
          description: "Implementing 3D elements and complex animations to create engaging user experiences."
        }
      ]
    },
    {
      name: "Backend",
      icon: "fas fa-server",
      skills: [
        {
          name: "Node.js",
          icon: "fab fa-node-js",
          description: "Building scalable server-side applications with Express.js and RESTful API design."
        },
        {
          name: "Databases",
          icon: "fas fa-database",
          description: "Working with MongoDB, Firebase, and SQL databases for efficient data storage and retrieval."
        },
        {
          name: "API Development",
          icon: "fas fa-plug",
          description: "Designing and implementing secure, efficient APIs with authentication and authorization."
        },
        {
          name: "Python/Flask",
          icon: "fab fa-python",
          description: "Developing backend services and data processing pipelines with Python."
        }
      ]
    },
    {
      name: "Tools & DevOps",
      icon: "fas fa-tools",
      skills: [
        {
          name: "Git/GitHub",
          icon: "fab fa-git-alt",
          description: "Version control, collaborative development with pull requests, code reviews, and CI/CD workflows."
        },
        {
          name: "Docker",
          icon: "fab fa-docker",
          description: "Containerizing applications for consistent development and deployment environments."
        },
        {
          name: "Testing",
          icon: "fas fa-vial",
          description: "Writing unit, integration, and E2E tests with Jest, React Testing Library, and Cypress."
        },
        {
          name: "Performance",
          icon: "fas fa-tachometer-alt",
          description: "Optimizing web applications for speed, accessibility, and overall user experience."
        }
      ]
    },
    {
      name: "Other Skills",
      icon: "fas fa-layer-group",
      skills: [
        {
          name: "Data Structures",
          icon: "fas fa-project-diagram",
          description: "Implementing efficient data structures for solving complex programming problems."
        },
        {
          name: "Algorithms",
          icon: "fas fa-sitemap",
          description: "Developing and optimizing algorithms with a focus on time and space complexity."
        },
        {
          name: "UI/UX Design",
          icon: "fas fa-paint-brush",
          description: "Creating intuitive user interfaces with a focus on user experience and accessibility."
        },
        {
          name: "PHP/SQL",
          icon: "fab fa-php",
          description: "Developing dynamic web applications with PHP and relational databases."
        }
      ]
    }
  ];

  const handleCategoryClick = (index: number) => {
    setActiveCategory(index);
    setActiveSkill(null);
  };

  const handleSkillClick = (index: number) => {
    setActiveSkill(index === activeSkill ? null : index);
  };

  return (
    <section id="skills" className="py-20 bg-black/50">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title text-3xl md:text-4xl font-bold font-poppins mb-4">
            My <span className="text-primary">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Click on categories and skills to explore my technical expertise in detail.
          </p>
        </motion.div>
        
        {/* Skill Categories Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {skillCategories.map((category, index) => (
            <button
              key={category.name}
              className={`px-4 py-3 rounded-lg flex items-center space-x-2 transition-all duration-300 ${
                activeCategory === index 
                  ? 'bg-primary text-white shadow-lg' 
                  : 'bg-card hover:bg-card/80'
              }`}
              onClick={() => handleCategoryClick(index)}
            >
              <i className={`${category.icon} text-lg`}></i>
              <span className="font-medium">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Skills Grid for Active Category */}
        <div className="relative mb-12">
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={activeCategory}
            transition={{ duration: 0.5 }}
          >
            {skillCategories[activeCategory].skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className={`skill-card p-6 rounded-xl border cursor-pointer transition-all duration-300 ${
                  activeSkill === index 
                    ? 'bg-primary/10 border-primary shadow-lg' 
                    : 'bg-card/80 border-primary/10 hover:border-primary/30'
                }`}
                onClick={() => handleSkillClick(index)}
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                    <i className={`${skill.icon} text-xl text-primary`}></i>
                  </div>
                  <h3 className="text-lg font-bold">{skill.name}</h3>
                </div>
                
                {activeSkill === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-muted-foreground text-sm mt-2">{skill.description}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Interactive Skill Showcase */}
        <motion.div
          className="bg-card/80 p-6 rounded-xl border border-primary/20 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/3 mb-6 md:mb-0 md:pr-10">
              <h3 className="text-2xl font-bold mb-4 text-center md:text-left">Coding Experience</h3>
              <p className="text-muted-foreground mb-4">
                With over 5 years of programming experience, I've developed a range of projects from frontend web applications to backend services and API integrations.
              </p>
              <div className="flex justify-center md:justify-start space-x-4">
                <a 
                  href="https://github.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-card rounded-full hover:bg-primary/10 transition-colors duration-300"
                >
                  <i className="fab fa-github text-xl"></i>
                </a>
                <a 
                  href="https://leetcode.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-card rounded-full hover:bg-primary/10 transition-colors duration-300"
                >
                  <i className="fas fa-code text-xl"></i>
                </a>
                <a 
                  href="https://codepen.io/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-card rounded-full hover:bg-primary/10 transition-colors duration-300"
                >
                  <i className="fab fa-codepen text-xl"></i>
                </a>
              </div>
            </div>
            
            <div className="w-full md:w-2/3 flex justify-center">
              <div className="grid grid-cols-3 gap-4 w-full max-w-lg">
                {['React', 'Node.js', 'MongoDB', 'TypeScript', 'AWS', 'GraphQL'].map((tech, index) => (
                  <motion.div
                    key={tech}
                    className="bg-primary/5 p-3 rounded-lg text-center cursor-pointer hover:bg-primary/10 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <span className="font-medium text-sm">{tech}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
