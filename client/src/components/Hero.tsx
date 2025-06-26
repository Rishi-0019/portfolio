import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const fullText = "Full Stack Developer & Space Enthusiast";

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Background with cosmic effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(220,50%,8%)] via-[hsl(250,45%,25%)] to-[hsl(220,50%,8%)] opacity-90"></div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div 
          className="floating-element"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="gradient-text">RISHABH</span>
          </h1>
          <h2 className="text-4xl md:text-6xl font-light mb-8">
            <span className="gradient-text">TIWARI</span>
          </h2>
        </motion.div>
        
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <p className="text-2xl md:text-3xl text-[hsl(220,10%,55%)] mb-4 h-12 flex items-center justify-center">
            <span className="typing-effect">{typedText}</span>
          </p>
        </motion.div>

        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <button 
            onClick={() => scrollToSection('contact')}
            className="bg-gradient-to-r from-[hsl(195,100%,45%)] to-[hsl(260,70%,60%)] px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform animate-pulse"
          >
            Get In Touch
          </button>
          <button 
            onClick={() => scrollToSection('projects')}
            className="border-2 border-[hsl(195,100%,45%)] px-8 py-4 rounded-full font-semibold hover:bg-[hsl(195,100%,45%)] hover:text-[hsl(220,50%,8%)] transition-all"
          >
            View My Work
          </button>
        </motion.div>

        <motion.div 
          className="flex justify-center space-x-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          <a 
            href="https://linkedin.com/in/rishabh0019" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-3xl hover:text-[hsl(195,100%,45%)] transition-colors hover:scale-110 transform"
          >
            <Linkedin size={32} />
          </a>
          <a 
            href="https://github.com/Rishi-0019" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-3xl hover:text-[hsl(195,100%,45%)] transition-colors hover:scale-110 transform"
          >
            <Github size={32} />
          </a>
          <a 
            href="mailto:rishabhtiwari0019@gmail.com"
            className="text-3xl hover:text-[hsl(195,100%,45%)] transition-colors hover:scale-110 transform"
          >
            <Mail size={32} />
          </a>
        </motion.div>
      </div>

      {/* Floating cosmic elements */}
      <motion.div 
        className="absolute top-20 left-10 w-4 h-4 bg-[hsl(195,100%,45%)] rounded-full floating-element opacity-60"
        animate={{ y: [-20, 20, -20] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div 
        className="absolute top-40 right-20 w-3 h-3 bg-[hsl(260,70%,60%)] rounded-full floating-element opacity-40"
        animate={{ y: [20, -20, 20] }}
        transition={{ duration: 6, repeat: Infinity, delay: -2 }}
      />
      <motion.div 
        className="absolute bottom-40 left-20 w-5 h-5 bg-[hsl(220,70%,50%)] rounded-full floating-element opacity-50"
        animate={{ y: [-10, 30, -10] }}
        transition={{ duration: 6, repeat: Infinity, delay: -4 }}
      />
    </section>
  );
}
