import { useEffect } from "react";
import { motion } from "framer-motion";
import { animateProgressBars } from "@/lib/animation-utils";

interface Skill {
  name: string;
  percentage: number;
}

interface SkillBox {
  name: string;
  icon: string;
}

export default function SkillsSection() {
  const developmentSkills: Skill[] = [
    { name: "JavaScript/React.js", percentage: 90 },
    { name: "HTML/CSS/Tailwind", percentage: 85 },
    { name: "Node.js/Express", percentage: 75 },
    { name: "MongoDB/Firebase", percentage: 70 },
    { name: "Three.js/GSAP", percentage: 65 },
    { name: "Python/Flask", percentage: 60 },
  ];

  const toolsAndTechnologies: SkillBox[] = [
    { name: "Git/GitHub", icon: "fab fa-git-alt" },
    { name: "React", icon: "fab fa-react" },
    { name: "Node.js", icon: "fab fa-node-js" },
    { name: "JavaScript", icon: "fab fa-js" },
    { name: "Python", icon: "fab fa-python" },
    { name: "MongoDB", icon: "fas fa-database" },
    { name: "C/C++", icon: "fas fa-code" },
    { name: "Express", icon: "fas fa-server" },
    { name: "Tailwind", icon: "fab fa-css3-alt" },
  ];

  useEffect(() => {
    // Initialize progress bars animation
    animateProgressBars();
  }, []);

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
            Technical <span className="text-primary">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Here's an overview of my technical skills and proficiency levels.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold mb-6 font-poppins flex items-center">
              <i className="fas fa-code text-primary mr-3"></i> Development Skills
            </h3>
            
            <div className="space-y-6">
              {developmentSkills.map((skill, index) => (
                <motion.div 
                  key={skill.name}
                  className="skill-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span>{skill.percentage}%</span>
                  </div>
                  <div className="progress-bar-container">
                    <div className="progress-bar" data-width={skill.percentage}></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold mb-6 font-poppins flex items-center">
                <i className="fas fa-laptop-code text-primary mr-3"></i> Tools & Technologies
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {toolsAndTechnologies.map((tool, index) => (
                  <motion.div 
                    key={tool.name}
                    className="skill-box p-4 bg-card rounded-lg border border-primary/10 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <i className={`${tool.icon} text-2xl text-primary`}></i>
                    </div>
                    <h4 className="font-medium">{tool.name}</h4>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h3 className="text-xl font-bold mb-4 font-poppins flex items-center">
                <i className="fas fa-chart-line text-primary mr-3"></i> DSA Achievements
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.div 
                  className="p-4 bg-card rounded-lg border border-primary/10"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                      <i className="fas fa-code text-primary"></i>
                    </div>
                    <div>
                      <h4 className="font-medium">LeetCode</h4>
                      <p className="text-sm text-muted-foreground">Rating: 1525 | 200+ Problems</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="p-4 bg-card rounded-lg border border-primary/10"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                      <i className="fas fa-award text-primary"></i>
                    </div>
                    <div>
                      <h4 className="font-medium">CodeChef</h4>
                      <p className="text-sm text-muted-foreground">2 Stars | Active Participant</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
