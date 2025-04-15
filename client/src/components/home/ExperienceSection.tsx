import { useEffect } from "react";
import { gsap } from "gsap";

const ExperienceSection = () => {
  useEffect(() => {
    // Animation for timeline items
    gsap.utils.toArray('.timeline-item').forEach((item: any, i) => {
      gsap.fromTo(
        item,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: i * 0.2,
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
          }
        }
      );
    });
    
    // Animation for education cards
    gsap.utils.toArray('.education-card').forEach((card: any, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.3,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          }
        }
      );
    });
  }, []);

  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-900 section">
      <div className="custom-container">
        <h2 className="text-4xl font-bold font-poppins text-center mb-16">
          Work <span className="text-primary">Experience</span>
        </h2>
        
        <div className="max-w-3xl mx-auto">
          <div className="timeline-item">
            <div className="mb-2 flex items-center">
              <h3 className="text-2xl font-semibold">Frontend React Developer</h3>
              <span className="ml-auto text-primary font-medium">Mar 2024 - Apr 2024</span>
            </div>
            <div className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-3">PressX India</div>
            <ul className="space-y-3 list-disc pl-5">
              <li>
                Programmed seamless custom user profiles utilizing React JS, resulting in enhanced access to order history;
                streamlined the onboarding process resulted in collecting over 500 new users within one month.
              </li>
              <li>
                Engineered an interactive platform with custom profiles that streamlined access to order history and personal
                information; resulted in 150+ new daily active users within the first month of launch.
              </li>
              <li>
                Established custom user profiles for seamless access to order and personal information, resulting in a 170% increase
                in user participation.
              </li>
            </ul>
          </div>
          
          <div className="timeline-item">
            <div className="mb-2 flex items-center">
              <h3 className="text-2xl font-semibold">Council Head</h3>
              <span className="ml-auto text-primary font-medium">Jul 2024 - Present</span>
            </div>
            <div className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-3">DataZen</div>
            <ul className="space-y-3 list-disc pl-5">
              <li>Lead a team of 25+ members to promote data science, AI, and ML among students.</li>
              <li>Foster collaboration and knowledge sharing within the council and across disciplines.</li>
              <li>Organize workshops, events, and online meets to engage the community.</li>
            </ul>
          </div>
          
          <div className="timeline-item">
            <div className="mb-2 flex items-center">
              <h3 className="text-2xl font-semibold">Tech Member</h3>
              <span className="ml-auto text-primary font-medium">Jul 2023 - Jul 2024</span>
            </div>
            <div className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-3">DataZen</div>
            <ul className="space-y-3 list-disc pl-5">
              <li>Contributed to the organization of a 24-hour offline hackathon focused on AI/ML.</li>
              <li>
                Spearheaded the organization and delivery of a web scraping workshop attended by over 100 enthusiastic
                participants, providing expert guidance and facilitating hands-on learning experiences in data extraction
                techniques.
              </li>
              <li>
                Conducted comprehensive training sessions on foundational Python programming for data analysis, equipping a
                cohort of over 300 participants with the essential tools to extract, manipulate, and analyze data effectively.
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold mb-4">Education</h3>
          <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="education-card p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <h4 className="text-xl font-semibold mb-2">Computer Engineering</h4>
              <p className="text-primary font-medium mb-2">KJ Somaiya College of Engineering</p>
              <p className="text-sm opacity-75 mb-2">Mumbai, Maharashtra</p>
              <p className="font-medium">Oct 2022 - May 2026</p>
            </div>
            <div className="education-card p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <h4 className="text-xl font-semibold mb-2">High Secondary Education</h4>
              <p className="text-primary font-medium mb-2">St Xavier's High School</p>
              <p className="text-sm opacity-75 mb-2">Adipur, Gujarat</p>
              <p className="font-medium">Jun 2020 - Mar 2022</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
