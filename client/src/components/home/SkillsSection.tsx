import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { 
  Code, Database, Cog, Laptop, Box, Users
} from "lucide-react";

const skills = [
  { name: "JavaScript / React / Redux", level: 90, gradient: "from-primary to-secondary" },
  { name: "HTML / CSS / Tailwind", level: 95, gradient: "from-accent to-primary" },
  { name: "Three.js / GSAP", level: 85, gradient: "from-secondary to-accent" },
  { name: "Node.js / Express / MongoDB", level: 75, gradient: "from-primary to-secondary" },
  { name: "Python / Pandas / NumPy", level: 80, gradient: "from-secondary to-accent" },
  { name: "C/C++", level: 70, gradient: "from-accent to-primary" }
];

const competencies = [
  {
    title: "Frontend Development",
    description: "Building responsive and interactive UIs with modern frameworks like React and Redux.",
    icon: <Code className="text-2xl text-primary" />
  },
  {
    title: "Database Management",
    description: "Working with MongoDB, SQL and Firebase Firestore for secure data storage.",
    icon: <Database className="text-2xl text-secondary" />
  },
  {
    title: "API Integration",
    description: "Integrating external services like Plaid API into applications with 67% better performance.",
    icon: <Cog className="text-2xl text-accent" />
  },
  {
    title: "Data Structures",
    description: "2-star Codechef rating and 200+ solved problems on Leetcode with a contest rating of 1525.",
    icon: <Laptop className="text-2xl text-primary" />
  },
  {
    title: "3D Visualization",
    description: "Creating engaging 3D graphics and animations with Three.js and GSAP for web applications.",
    icon: <Box className="text-2xl text-secondary" />
  },
  {
    title: "Team Leadership",
    description: "Leading a team of 25+ members as Council Head of DataZen, organizing workshops and hackathons.",
    icon: <Users className="text-2xl text-accent" />
  }
];

const SkillsSection = () => {
  const skillsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Animate skill bars
    if (skillsRef.current) {
      const progressBars = skillsRef.current.querySelectorAll('.progress-bar');
      
      progressBars.forEach((bar) => {
        const width = bar.getAttribute('data-width');
        
        gsap.to(bar, {
          width: width,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bar,
            start: "top 90%",
          }
        });
      });
    }
    
    // Animate competency cards
    gsap.utils.toArray('.competency-card').forEach((card: any, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: i * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          }
        }
      );
    });
  }, []);

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900 section">
      <div className="custom-container">
        <h2 className="text-4xl font-bold font-poppins text-center mb-16">
          Technical <span className="text-primary">Skills</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div ref={skillsRef}>
            <h3 className="text-2xl font-semibold mb-6">Languages & Frameworks</h3>
            
            {skills.map((skill, index) => (
              <div className="mb-6" key={index}>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="skill-progress">
                  <div 
                    className={`progress-bar bg-gradient-to-r ${skill.gradient}`} 
                    data-width={`${skill.level}%`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold mb-6">Core Competencies</h3>
            
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {competencies.map((competency, index) => (
                <div 
                  key={index} 
                  className="competency-card bg-white dark:bg-gray-800 rounded-xl p-6 shadow hover:shadow-md transition-all"
                >
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-${index % 3 === 0 ? 'primary' : index % 3 === 1 ? 'secondary' : 'accent'}/20 flex items-center justify-center mr-4`}>
                      {competency.icon}
                    </div>
                    <h4 className="text-lg font-semibold">{competency.title}</h4>
                  </div>
                  <p className="opacity-75">{competency.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
