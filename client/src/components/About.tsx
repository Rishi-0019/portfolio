import { motion } from "framer-motion";
import { MapPin, GraduationCap, Code, Rocket } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold gradient-text mb-4">About Me</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[hsl(195,100%,45%)] to-[hsl(260,70%,60%)] mx-auto"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-[hsl(250,45%,25%)]/20 backdrop-blur-sm rounded-3xl p-8 border border-[hsl(260,70%,60%)]/30">
              <h3 className="text-2xl font-semibold text-[hsl(195,100%,45%)] mb-4">Hello! I'm Rishabh Tiwari</h3>
              <p className="text-lg text-[hsl(220,10%,55%)] leading-relaxed mb-6">
                A passionate Full Stack Developer from Delhi, India, currently pursuing my B.Tech from Abdul Kalam Technical University. 
                I specialize in creating innovative web applications with a focus on space-themed projects and cutting-edge technologies.
              </p>
              <p className="text-lg text-[hsl(220,10%,55%)] leading-relaxed mb-6">
                My journey in technology combines my love for coding with fascination for space exploration. I enjoy building applications 
                that push the boundaries of what's possible on the web, from satellite tracking systems to 3D interactive Earth models.
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="bg-[hsl(220,70%,50%)]/20 px-4 py-2 rounded-full text-[hsl(195,100%,45%)] border border-[hsl(220,70%,50%)]/30">Problem Solver</span>
                <span className="bg-[hsl(260,70%,60%)]/20 px-4 py-2 rounded-full text-[hsl(195,100%,45%)] border border-[hsl(260,70%,60%)]/30">Space Enthusiast</span>
                <span className="bg-[hsl(195,100%,45%)]/20 px-4 py-2 rounded-full text-[hsl(195,100%,45%)] border border-[hsl(195,100%,45%)]/30">Tech Innovator</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="bg-[hsl(220,20%,35%)]/20 backdrop-blur-sm rounded-3xl p-8 border border-[hsl(220,10%,55%)]/30">
              <h4 className="text-xl font-semibold text-[hsl(195,100%,45%)] mb-6">Quick Facts</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <MapPin className="text-[hsl(260,70%,60%)] w-6 h-6" />
                  <span className="text-[hsl(220,10%,55%)]">Delhi, India</span>
                </div>
                <div className="flex items-center gap-4">
                  <GraduationCap className="text-[hsl(260,70%,60%)] w-6 h-6" />
                  <span className="text-[hsl(220,10%,55%)]">B.Tech Student (2024-2028)</span>
                </div>
                <div className="flex items-center gap-4">
                  <Code className="text-[hsl(260,70%,60%)] w-6 h-6" />
                  <span className="text-[hsl(220,10%,55%)]">Full Stack Developer</span>
                </div>
                <div className="flex items-center gap-4">
                  <Rocket className="text-[hsl(260,70%,60%)] w-6 h-6" />
                  <span className="text-[hsl(220,10%,55%)]">Space Technology Enthusiast</span>
                </div>
              </div>
            </div>

            <div className="bg-[hsl(250,45%,25%)]/20 backdrop-blur-sm rounded-3xl p-8 border border-[hsl(260,70%,60%)]/30">
              <h4 className="text-xl font-semibold text-[hsl(195,100%,45%)] mb-6">What I Love</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-[hsl(220,70%,50%)]/10 rounded-xl">
                  <i className="fas fa-satellite text-3xl text-[hsl(195,100%,45%)] mb-2"></i>
                  <p className="text-sm text-[hsl(220,10%,55%)]">Satellite Tech</p>
                </div>
                <div className="text-center p-4 bg-[hsl(260,70%,60%)]/10 rounded-xl">
                  <i className="fas fa-cube text-3xl text-[hsl(195,100%,45%)] mb-2"></i>
                  <p className="text-sm text-[hsl(220,10%,55%)]">3D Graphics</p>
                </div>
                <div className="text-center p-4 bg-[hsl(195,100%,45%)]/10 rounded-xl">
                  <i className="fas fa-brain text-3xl text-[hsl(195,100%,45%)] mb-2"></i>
                  <p className="text-sm text-[hsl(220,10%,55%)]">AI/ML</p>
                </div>
                <div className="text-center p-4 bg-[hsl(220,70%,50%)]/10 rounded-xl">
                  <i className="fas fa-mobile-alt text-3xl text-[hsl(195,100%,45%)] mb-2"></i>
                  <p className="text-sm text-[hsl(220,10%,55%)]">Responsive Design</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
