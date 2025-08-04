import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Code, Server, Settings } from "lucide-react";

// Updated skill levels according to your request
const skillsData = {
  frontend: [
    { skill: "HTML5 & CSS3", level: 95 },
    { skill: "JavaScript & TypeScript", level: 80 }, // changed to 80%
    { skill: "React & Tailwind CSS", level: 85 },
    { skill: "Bootstrap & SASS", level: 80 },
  ],
  backend: [
    { skill: "Python & JAVA", level: 90 },
    { skill: "RESTful APIs", level: 80 },
    { skill: "Firebase & PostgreSQL", level: 70 }, // changed to 70%
    { skill: "MySQL & MongoDB", level: 80 },
  ],
  tools: [
    { skill: "Git & GitHub", level: 90 },
    { skill: "TensorFlow & Pandas", level: 50 }, // changed to 50%
    { skill: "VS Code & IntelliJ", level: 85 },
    { skill: "Three.js & WebGL", level: 80 },
  ],
};

const technologies = [
  { name: "HTML5", icon: "fab fa-html5" },
  { name: "CSS3", icon: "fab fa-css3-alt" },
  { name: "JavaScript", icon: "fab fa-js-square" },
  { name: "React", icon: "fab fa-react" },
  { name: "Python", icon: "fab fa-python" },
  { name: "Java", icon: "fab fa-java" },
  { name: "Database", icon: "fas fa-database" },
  { name: "Git", icon: "fab fa-git-alt" },
];

// SkillBar Component
function SkillBar({ skill, level, color }: { skill: string; level: number; color: string }) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && barRef.current) {
            setTimeout(() => {
              if (barRef.current) {
                barRef.current.style.width = `${level}%`;
              }
            }, 200);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (barRef.current) {
      observer.observe(barRef.current.parentElement!);
    }

    return () => observer.disconnect();
  }, [level]);

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-2">
        <span className="text-[hsl(210,100%,98%)]">{skill}</span>
        <span className={`text-[${color}]`}>{level}%</span>
      </div>
      <div className="bg-[hsl(220,50%,8%)] rounded-full h-3 relative overflow-hidden">
        <div
          ref={barRef}
          className={`
            skill-bar 
            bg-gradient-to-r 
            transition-all duration-[1200ms] ease-in-out 
            ${color === 'hsl(195,100%,45%)' ? 'from-[hsl(195,100%,45%)] to-[hsl(260,70%,60%)]' : 
              color === 'hsl(260,70%,60%)' ? 'from-[hsl(260,70%,60%)] to-[hsl(220,70%,50%)]' : 
              'from-[hsl(220,70%,50%)] to-[hsl(195,100%,45%)]'}
            h-3 rounded-full
          `}
          style={{ width: '0%' }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-[hsl(250,45%,25%)]/10">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold gradient-text mb-4">Skills & Technologies</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[hsl(195,100%,45%)] to-[hsl(260,70%,60%)] mx-auto"></div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Frontend Skills */}
          <motion.div 
            className="bg-[hsl(220,20%,35%)]/20 backdrop-blur-sm rounded-3xl p-8 border border-[hsl(220,10%,55%)]/30 hover:border-[hsl(195,100%,45%)]/50 transition-all"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-8">
              <Code className="w-12 h-12 text-[hsl(195,100%,45%)] mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-[hsl(195,100%,45%)]">Frontend</h3>
            </div>
            <div className="space-y-4">
              {skillsData.frontend.map((item, index) => (
                <SkillBar 
                  key={index}
                  skill={item.skill}
                  level={item.level}
                  color="hsl(195,100%,45%)"
                />
              ))}
            </div>
          </motion.div>

          {/* Backend Skills */}
          <motion.div 
            className="bg-[hsl(220,20%,35%)]/20 backdrop-blur-sm rounded-3xl p-8 border border-[hsl(220,10%,55%)]/30 hover:border-[hsl(195,100%,45%)]/50 transition-all"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-8">
              <Server className="w-12 h-12 text-[hsl(260,70%,60%)] mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-[hsl(260,70%,60%)]">Backend</h3>
            </div>
            <div className="space-y-4">
              {skillsData.backend.map((item, index) => (
                <SkillBar 
                  key={index}
                  skill={item.skill}
                  level={item.level}
                  color="hsl(260,70%,60%)"
                />
              ))}
            </div>
          </motion.div>

          {/* Tools & Frameworks */}
          <motion.div 
            className="bg-[hsl(220,20%,35%)]/20 backdrop-blur-sm rounded-3xl p-8 border border-[hsl(220,10%,55%)]/30 hover:border-[hsl(195,100%,45%)]/50 transition-all"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-8">
              <Settings className="w-12 h-12 text-[hsl(220,70%,50%)] mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-[hsl(220,70%,50%)]">Tools & Frameworks</h3>
            </div>
            <div className="space-y-4">
              {skillsData.tools.map((item, index) => (
                <SkillBar 
                  key={index}
                  skill={item.skill}
                  level={item.level}
                  color="hsl(220,70%,50%)"
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Technology Icons */}
        <motion.div 
          className="grid grid-cols-4 md:grid-cols-8 gap-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {technologies.map((tech, index) => (
            <motion.div 
              key={index}
              className="group"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <i className={`${tech.icon} text-4xl text-[hsl(220,10%,55%)] group-hover:text-[hsl(195,100%,45%)] transition-colors`}></i>
              <p className="text-sm mt-2 text-[hsl(220,10%,55%)]">{tech.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
