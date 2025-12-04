import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MouseEvent, useRef } from "react";

// --- Data ---
const experienceData = [
  {
    title: "Software Engineering Intern",
    company: "ConnectWise",
    period: "Jun 2025 - Aug 2025",
    description: [
      "Designed a data pipeline from Snowflake for large-scale data ingestion and transformation, fueling a recommendation system efficiently recommending 81% users.",
      "Developed and optimized clustering algorithms, identifying 20-90 optimal groups (validated by Silhouette Score) to derive actionable insights from complex operational data.",
      "Established seamless data persistence to PostgreSQL for weekly/monthly synchronization, enabling GoLang backend microservices to deliver real-time, data-driven recommendations to React frontends."
    ]
  },
  {
    title: "Frontend React Developer",
    company: "PressX India",
    period: "Mar - Apr 2024",
    description: [
      "Programmed seamless custom user profiles utilizing React JS, resulting in enhanced access to order history; streamlined the onboarding process resulted in collecting over 500 new users within one month.",
      "Engineered an interactive platform with custom profiles that streamlined access to order history and personal information; resulted in 150+ new daily active users within the first month of launch.",
      "Established custom user profiles for seamless access to order and personal information, resulting in a 170% increase in user participation."
    ]
  },
  {
    title: "Council Head",
    company: "DataZen",
    period: "Jul 2024 - Jul 2025",
    description: [
      "Lead a team of 25+ members to promote data science, AI, and ML among students.",
      "Foster collaboration and knowledge sharing within the council and across disciplines.",
      "Organize workshops, events, and online meets to engage the community."
    ]
  }
];

const educationData = [
  {
    title: "Bachelors in Computer Engineering",
    institution: "KJ Somaiya College of Engineering, Mumbai",
    period: "2022 - 2026",
    description: "Pursuing a comprehensive education in computer engineering, focusing on software development, data structures, and algorithms."
  },
  {
    title: "High Secondary Education",
    institution: "St Xavier's High School, Adipur, Gujarat",
    period: "2020 - 2022",
    description: "Completed high secondary education with a focus on science and mathematics."
  },
  {
    title: "Data Structures & Algorithms",
    institution: "CodeHelp",
    period: "Certificate Course",
    description: "Successfully completed a comprehensive 5-month online course on data structures and algorithms, gaining valuable expertise in this fundamental aspect of computer science.",
    extra: "LeetCode: 1540 (Top 34%) | CodeChef: 3★ | Codeforces: 1525 (Specialist)"
  }
];

// --- Components ---

const SpotlightCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const xPct = (clientX - left) / width - 0.5;
    const yPct = (clientY - top) / height - 0.5;
    x.set(xPct);
    y.set(yPct);

    // For spotlight
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      ref.current.style.setProperty("--mouse-x", `${clientX - rect.left}px`);
      ref.current.style.setProperty("--mouse-y", `${clientY - rect.top}px`);
    }
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative group transform-gpu ${className}`}
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

      <div
        className="relative h-full bg-card/50 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden"
        style={{ transform: "translateZ(20px)" }}
      >
        {/* Spotlight gradient */}
        <div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(var(--primary-rgb), 0.15), transparent 40%)`,
          }}
        />

        <div className="p-6 h-full flex flex-col relative z-10">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title text-4xl md:text-5xl font-bold font-poppins mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Experience & <span className="text-primary">Education</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Experience Column */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-10 flex items-center gap-4"
            >
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                <i className="fas fa-briefcase text-2xl text-primary"></i>
              </div>
              <h3 className="text-3xl font-bold font-poppins">Work Experience</h3>
            </motion.div>

            <div className="space-y-8">
              {experienceData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <SpotlightCard className="h-full">
                    <div className="flex flex-col h-full">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-xl font-bold text-white mb-1">{item.title}</h4>
                          <h5 className="text-lg text-primary font-medium">{item.company}</h5>
                        </div>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 text-xs font-medium rounded-full text-white/70 whitespace-nowrap">
                          {item.period}
                        </span>
                      </div>

                      <ul className="space-y-3 mt-2 text-muted-foreground text-sm flex-grow">
                        {item.description.map((desc, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                            <span className="leading-relaxed">{desc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-10 flex items-center gap-4"
            >
              <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <i className="fas fa-graduation-cap text-2xl text-purple-400"></i>
              </div>
              <h3 className="text-3xl font-bold font-poppins">Education</h3>
            </motion.div>

            <div className="space-y-8">
              {educationData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <SpotlightCard className="h-full">
                    <div className="flex flex-col h-full">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-xl font-bold text-white mb-1">{item.title}</h4>
                          <h5 className="text-lg text-purple-400 font-medium">{item.institution}</h5>
                        </div>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 text-xs font-medium rounded-full text-white/70 whitespace-nowrap">
                          {item.period}
                        </span>
                      </div>

                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {item.extra && (
                        <div className="mt-auto pt-4 border-t border-white/5">
                          <span className="inline-flex items-center gap-2 text-sm text-yellow-500/90 font-medium">
                            <i className="fas fa-trophy"></i> {item.extra}
                          </span>
                        </div>
                      )}
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
