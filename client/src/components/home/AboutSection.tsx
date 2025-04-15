import { useEffect, useState } from "react";
import { Code, Database, Brain, Box } from "lucide-react";
import { gsap } from "gsap";

const AboutSection = () => {
  const [counts, setCounts] = useState({
    projects: 0,
    problems: 0,
    workshops: 0,
    users: 0
  });

  useEffect(() => {
    // Set up ScrollTrigger for counter animation
    const counterTrigger = gsap.timeline({
      scrollTrigger: {
        trigger: "#counter-section",
        start: "top 80%",
        onEnter: () => {
          // Animate project count
          gsap.to({ count: 0 }, {
            count: 4,
            duration: 2,
            onUpdate: function() {
              setCounts(prev => ({ ...prev, projects: Math.floor(this.targets()[0].count) }));
            }
          });
          
          // Animate problems count
          gsap.to({ count: 0 }, {
            count: 200,
            duration: 2,
            onUpdate: function() {
              setCounts(prev => ({ ...prev, problems: Math.floor(this.targets()[0].count) }));
            }
          });
          
          // Animate workshops count
          gsap.to({ count: 0 }, {
            count: 10,
            duration: 2,
            onUpdate: function() {
              setCounts(prev => ({ ...prev, workshops: Math.floor(this.targets()[0].count) }));
            }
          });
          
          // Animate users count
          gsap.to({ count: 0 }, {
            count: 500,
            duration: 2,
            onUpdate: function() {
              setCounts(prev => ({ ...prev, users: Math.floor(this.targets()[0].count) }));
            }
          });
        }
      }
    });

    return () => {
      // Clean up
      counterTrigger.kill();
    };
  }, []);

  return (
    <section id="about" className="py-20 section">
      <div className="custom-container">
        <h2 className="text-4xl font-bold font-poppins text-center mb-16">
          About <span className="text-primary">Me</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="content-section p-8 rounded-2xl shadow-lg">
              <p className="text-lg mb-6">
                I'm a Computer Engineering student at KJ Somaiya College of Engineering (2022-2026) with a passion for frontend development and creating engaging user experiences.
              </p>
              <p className="text-lg mb-6">
                My expertise lies in React, Three.js, and GSAP animations. I've created projects like Horizon Dashboard (a banking solution), ChatSync (real-time messaging), and an Apple UI clone with 3D models and animations.
              </p>
              <p className="text-lg">
                As the Council Head of DataZen, I lead a team of 25+ members, organizing workshops and a 24-hour hackathon focused on AI/ML. I've conducted Python training sessions for over 300 participants and web scraping workshops for 100+ attendees.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-primary/20 dark:border-primary/10 flex flex-col items-center justify-center">
              <Code className="text-primary mb-3" size={40} />
              <h3 className="text-xl font-semibold">Frontend</h3>
              <p className="text-center mt-2 opacity-75">Creating beautiful UI with React</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-secondary/10 to-accent/10 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-secondary/20 dark:border-secondary/10 flex flex-col items-center justify-center">
              <Box className="text-secondary mb-3" size={40} />
              <h3 className="text-xl font-semibold">3D & Animation</h3>
              <p className="text-center mt-2 opacity-75">Three.js & GSAP expert</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-accent/10 to-primary/10 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-accent/20 dark:border-accent/10 flex flex-col items-center justify-center">
              <Database className="text-accent mb-3" size={40} />
              <h3 className="text-xl font-semibold">Data Science</h3>
              <p className="text-center mt-2 opacity-75">Python data analysis</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-primary/20 dark:border-primary/10 flex flex-col items-center justify-center">
              <Brain className="text-primary mb-3" size={40} />
              <h3 className="text-xl font-semibold">Problem Solving</h3>
              <p className="text-center mt-2 opacity-75">200+ problems solved</p>
            </div>
          </div>
        </div>
        
        <div id="counter-section" className="mt-16 flex justify-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">{counts.projects}+</div>
              <div className="text-lg opacity-75">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary mb-2">{counts.problems}+</div>
              <div className="text-lg opacity-75">DSA Problems</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">{counts.workshops}+</div>
              <div className="text-lg opacity-75">Workshops Led</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">{counts.users}+</div>
              <div className="text-lg opacity-75">Users Impacted</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
