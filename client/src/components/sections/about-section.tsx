import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useGSAPFrom } from "@/hooks/use-gsap";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // GSAP animations
  useGSAPFrom(".about-content", {
    opacity: 0,
    y: 50,
    duration: 0.8,
    ease: "power3.out"
  }, {
    trigger: "#about",
    start: "top 80%",
    once: true
  });

  return (
    <section id="about" ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title text-3xl md:text-4xl font-bold font-poppins mb-4">
            About <span className="text-primary">Me</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full section-divider"></div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="w-full lg:w-1/2 about-content">
            <motion.h3
              className="text-2xl font-bold mb-6 font-poppins"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Frontend React Developer & Computer Engineering Student
            </motion.h3>

            <motion.p
              className="text-muted-foreground mb-6 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              I'm a passionate Frontend React Developer and Computer Engineering student at KJ Somaiya College of Engineering with a strong focus on creating seamless user experiences.
              With experience in building interactive web applications, I enjoy bringing ideas to life through code.
            </motion.p>

            <motion.p
              className="text-muted-foreground mb-6 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              My expertise lies in React, JavaScript, and modern web technologies. I'm continuously learning and expanding my skills in data structures, algorithms, and full-stack development.
            </motion.p>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center">
                <i className="fas fa-map-marker-alt text-primary mr-3"></i>
                <span>Mumbai, Maharashtra</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-envelope text-primary mr-3"></i>
                <span>harshnagrani0910@gmail.com</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-phone text-primary mr-3"></i>
                <span>+91 9638088873</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-graduation-cap text-primary mr-3"></i>
                <span>Computer Engineering (2022-2026)</span>
              </div>
            </motion.div>

            <motion.a
              href="https://drive.google.com/file/d/1sgIgzjVzvXGNO3CpseSaF9JPRtdaRiT9/view?usp=sharing"
              className="inline-block bg-card hover:bg-muted border border-primary/30 text-foreground font-medium px-6 py-3 rounded-full transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Resume <i className="fas fa-external-link-alt ml-2"></i>
            </motion.a>
          </div>

          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-card rounded-xl p-8 border border-primary/10 shadow-lg">
              <h3 className="text-xl font-bold mb-6 font-poppins">What I Do</h3>

              <div className="space-y-6">
                <motion.div
                  className="flex"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <i className="fas fa-code text-primary"></i>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-2">Frontend Development</h4>
                    <p className="text-muted-foreground">Building responsive, interactive user interfaces with React, Redux, and modern CSS frameworks.</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                      <i className="fas fa-database text-secondary"></i>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-2">Backend Integration</h4>
                    <p className="text-muted-foreground">Connecting frontend applications with Node.js, Express, and MongoDB backends.</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                      <i className="fas fa-paint-brush text-accent"></i>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-2">UI/UX Design</h4>
                    <p className="text-muted-foreground">Creating intuitive user experiences with attention to detail and modern design principles.</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <i className="fas fa-chart-line text-primary"></i>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-2">Data Structures & Algorithms</h4>
                    <p className="text-muted-foreground">Solved 400+ problems on LeetCode (Rating: 1540, Top 34%). CodeChef 3-Star Coder. Codeforces Specialist (Rating: 1525).</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
