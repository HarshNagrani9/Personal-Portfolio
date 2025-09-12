import { motion } from "framer-motion";
import { useEffect } from "react";
import { animateTimeline } from "@/lib/animation-utils";

export default function ExperienceSection() {
  useEffect(() => {
    // Animate the timeline elements
    animateTimeline(".timeline-container");
  }, []);

  return (
    <section id="experience" className="py-20 bg-black/50">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title text-3xl md:text-4xl font-bold font-poppins mb-4">
            Experience & <span className="text-primary">Education</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold mb-6 font-poppins flex items-center">
              <i className="fas fa-briefcase text-primary mr-3"></i> Work Experience
            </h3>
            
            <div className="timeline-container">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="bg-card rounded-lg p-6 shadow-lg border border-primary/10">
                  <div className="flex flex-wrap justify-between items-start mb-2">
                    <h4 className="text-xl font-semibold">Software Engineering Intern</h4>
                    <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full inline-block mt-1">Jun 2025 - Aug 2025</span>
                  </div>
                  <h5 className="text-lg text-muted-foreground mb-4">ConnectWise</h5>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <i className="fas fa-circle text-xs text-primary mt-1.5 mr-2"></i>
                      <span>Designed a data pipeline from Snowflake for large-scale data ingestion and transformation, fueling a recommendation system efficiently recommending 81% users.</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-circle text-xs text-primary mt-1.5 mr-2"></i>
                      <span>Developed and optimized clustering algorithms, identifying 20-90 optimal groups (validated by Silhouette Score) to derive actionable insights from complex operational data.</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-circle text-xs text-primary mt-1.5 mr-2"></i>
                      <span>Established seamless data persistence to PostgreSQL for weekly/monthly synchronization, enabling GoLang backend microservices to deliver real-time, data-driven recommendations to React frontends.</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="bg-card rounded-lg p-6 shadow-lg border border-primary/10">
                  <div className="flex flex-wrap justify-between items-start mb-2">
                    <h4 className="text-xl font-semibold">Frontend React Developer</h4>
                    <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full inline-block mt-1">Mar - Apr 2024</span>
                  </div>
                  <h5 className="text-lg text-muted-foreground mb-4">PressX India</h5>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <i className="fas fa-circle text-xs text-primary mt-1.5 mr-2"></i>
                      <span>Programmed seamless custom user profiles utilizing React JS, resulting in enhanced access to order history; streamlined the onboarding process resulted in collecting over 500 new users within one month.</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-circle text-xs text-primary mt-1.5 mr-2"></i>
                      <span>Engineered an interactive platform with custom profiles that streamlined access to order history and personal information; resulted in 150+ new daily active users within the first month of launch.</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-circle text-xs text-primary mt-1.5 mr-2"></i>
                      <span>Established custom user profiles for seamless access to order and personal information, resulting in a 170% increase in user participation.</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="bg-card rounded-lg p-6 shadow-lg border border-primary/10">
                  <div className="flex flex-wrap justify-between items-start mb-2">
                    <h4 className="text-xl font-semibold">Council Head</h4>
                    <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full inline-block mt-1">Jul 2024 - Present</span>
                  </div>
                  <h5 className="text-lg text-muted-foreground mb-4">DataZen</h5>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <i className="fas fa-circle text-xs text-primary mt-1.5 mr-2"></i>
                      <span>Lead a team of 25+ members to promote data science, AI, and ML among students.</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-circle text-xs text-primary mt-1.5 mr-2"></i>
                      <span>Foster collaboration and knowledge sharing within the council and across disciplines.</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-circle text-xs text-primary mt-1.5 mr-2"></i>
                      <span>Organize workshops, events, and online meets to engage the community.</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="bg-card rounded-lg p-6 shadow-lg border border-primary/10">
                  <div className="flex flex-wrap justify-between items-start mb-2">
                    <h4 className="text-xl font-semibold">Tech Member</h4>
                    <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full inline-block mt-1">Jul 2023 - Jul 2024</span>
                  </div>
                  <h5 className="text-lg text-muted-foreground mb-4">DataZen</h5>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <i className="fas fa-circle text-xs text-primary mt-1.5 mr-2"></i>
                      <span>Contributed to the organization of a 24-hour offline hackathon focused on AI/ML.</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-circle text-xs text-primary mt-1.5 mr-2"></i>
                      <span>Spearheaded the organization and delivery of a web scraping workshop attended by over 100 enthusiastic participants.</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-circle text-xs text-primary mt-1.5 mr-2"></i>
                      <span>Conducted comprehensive training sessions on foundational Python programming for data analysis, equipping a cohort of over 300 participants.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold mb-6 font-poppins flex items-center">
              <i className="fas fa-graduation-cap text-primary mr-3"></i> Education
            </h3>
            
            <div className="timeline-container">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="bg-card rounded-lg p-6 shadow-lg border border-primary/10">
                  <div className="flex flex-wrap justify-between items-start mb-2">
                    <h4 className="text-xl font-semibold">Bachelors in Computer Engineering</h4>
                    <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full inline-block mt-1">2022 - 2026</span>
                  </div>
                  <h5 className="text-lg text-muted-foreground mb-4">KJ Somaiya College of Engineering, Mumbai</h5>
                  <p className="text-muted-foreground">Pursuing a comprehensive education in computer engineering, focusing on software development, data structures, and algorithms.</p>
                </div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="bg-card rounded-lg p-6 shadow-lg border border-primary/10">
                  <div className="flex flex-wrap justify-between items-start mb-2">
                    <h4 className="text-xl font-semibold">High Secondary Education</h4>
                    <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full inline-block mt-1">2020 - 2022</span>
                  </div>
                  <h5 className="text-lg text-muted-foreground mb-4">St Xavier's High School, Adipur, Gujarat</h5>
                  <p className="text-muted-foreground">Completed high secondary education with a focus on science and mathematics.</p>
                </div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="bg-card rounded-lg p-6 shadow-lg border border-primary/10">
                  <div className="flex flex-wrap justify-between items-start mb-2">
                    <h4 className="text-xl font-semibold">Data Structures & Algorithms</h4>
                    <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full inline-block mt-1">Certificate Course</span>
                  </div>
                  <h5 className="text-lg text-muted-foreground mb-4">CodeHelp</h5>
                  <p className="text-muted-foreground">Successfully completed a comprehensive 5-month online course on data structures and algorithms, gaining valuable expertise in this fundamental aspect of computer science.</p>
                  <div className="mt-3">
                    <span className="text-sm text-muted-foreground">
                      <i className="fas fa-trophy text-yellow-500 mr-1"></i> LeetCode Rating: 1525 | 200+ Problems Solved
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
