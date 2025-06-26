import { motion } from "framer-motion";
import { GraduationCap, MapPin, Code, Database, Brain } from "lucide-react";

const focusAreas = [
  { icon: <Code className="w-6 h-6" />, title: "Software Engineering" },
  { icon: <Database className="w-6 h-6" />, title: "Data Structures" },
  { icon: <Brain className="w-6 h-6" />, title: "AI & Machine Learning" },
];

export default function Education() {
  return (
    <section id="education" className="py-20 bg-[hsl(250,45%,25%)]/10">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold gradient-text mb-4">Education</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[hsl(195,100%,45%)] to-[hsl(260,70%,60%)] mx-auto"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="bg-[hsl(250,45%,25%)]/20 backdrop-blur-sm rounded-3xl p-12 border border-[hsl(260,70%,60%)]/30"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gradient-to-br from-[hsl(195,100%,45%)] to-[hsl(260,70%,60%)] rounded-2xl flex items-center justify-center">
                  <GraduationCap className="w-8 h-8 text-[hsl(220,50%,8%)]" />
                </div>
              </div>
              
              <div className="flex-grow">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <h3 className="text-3xl font-bold text-[hsl(195,100%,45%)] mb-2 lg:mb-0">Bachelor of Technology</h3>
                  <span className="bg-[hsl(220,70%,50%)]/20 px-4 py-2 rounded-full text-[hsl(195,100%,45%)] border border-[hsl(220,70%,50%)]/30">
                    2024 - 2028
                  </span>
                </div>
                
                <h4 className="text-xl font-semibold text-[hsl(210,100%,98%)] mb-4">Abdul Kalam Technical University</h4>
                <p className="text-[hsl(220,10%,55%)] mb-6 leading-relaxed">
                  Currently pursuing my Bachelor's degree in Technology with a focus on computer science and engineering. 
                  Gaining comprehensive knowledge in software development, data structures, algorithms, and emerging technologies 
                  while maintaining academic excellence.
                </p>
                
                <div className="flex items-center gap-3 text-[hsl(220,10%,55%)]">
                  <MapPin className="text-[hsl(195,100%,45%)] w-5 h-5" />
                  <span>Lucknow, India</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-[hsl(260,70%,60%)]/30">
              <h5 className="text-lg font-semibold text-[hsl(195,100%,45%)] mb-4">Key Focus Areas</h5>
              <div className="grid md:grid-cols-3 gap-4">
                {focusAreas.map((area, index) => (
                  <motion.div 
                    key={index}
                    className="bg-[hsl(220,70%,50%)]/10 p-4 rounded-xl text-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-[hsl(195,100%,45%)] mb-2 flex justify-center">
                      {area.icon}
                    </div>
                    <p className="text-[hsl(210,100%,98%)] font-medium">{area.title}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
