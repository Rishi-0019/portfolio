import Stars from "@/components/Stars";
import Particles from "@/components/Particles";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Games from "@/components/Games";
import Education from "@/components/Education";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";

export default function Portfolio() {
  return (
    <div className="bg-[hsl(220,50%,8%)] text-[hsl(210,100%,98%)] min-h-screen">
      <Stars />
      <Particles />
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Games />
      <Education />
      <Certificates />
      <Contact />
      
      {/* Footer */}
      <footer className="py-12 border-t border-[hsl(250,30%,25%)]">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-8">
            <h3 className="text-3xl font-bold gradient-text mb-4">Rishabh Tiwari</h3>
            <p className="text-[hsl(220,10%,55%)]">Full Stack Developer • Space Technology Enthusiast</p>
          </div>

          <div className="flex justify-center space-x-8 mb-8">
            <a href="https://linkedin.com/in/rishabh0019" target="_blank" rel="noopener noreferrer" 
               className="text-2xl hover:text-[hsl(195,100%,45%)] transition-colors">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://github.com/Rishi-0019" target="_blank" rel="noopener noreferrer" 
               className="text-2xl hover:text-[hsl(195,100%,45%)] transition-colors">
              <i className="fab fa-github"></i>
            </a>
            <a href="mailto:rishabhtiwari0019@gmail.com" 
               className="text-2xl hover:text-[hsl(195,100%,45%)] transition-colors">
              <i className="fas fa-envelope"></i>
            </a>
          </div>

          <div className="text-[hsl(220,10%,55%)] text-sm">
            <p>&copy; 2025 Rishabh Tiwari. All rights reserved.</p>
            <p className="mt-2">Built with passion for innovation and exploration</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
