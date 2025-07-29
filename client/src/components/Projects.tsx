import { motion } from "framer-motion";
import { ExternalLink, Github, Satellite, Globe } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "AstroTrack",
    description: "A comprehensive full-stack satellite tracking web application that visualizes real-time space-based data. Built with React, TypeScript, Firebase, and PostgreSQL to provide accurate satellite trajectory estimation and orbital path forecasting using integrated AI models.",
    image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    icon: <Satellite className="w-8 h-8" />,
    period: "April 2025 - Present",
    features: [
      "Real-time satellite tracking and visualization",
      "AI-powered trajectory prediction algorithms",
      "Secure authentication and user management",
      "Scalable backend architecture for efficient data handling"
    ],
    technologies: ["React", "TypeScript", "Firebase", "PostgreSQL", "Tailwind CSS"],
    color: "hsl(195,100%,45%)",
    links: {
      demo: "#",
      github: "#"
    }
  },
  {
    id: 2,
    title: "3D Cloud Tracking System",
    description: "An immersive 3D interactive Earth model that visualizes real-time cloud movement using satellite data from INSAT-3DR/3DS. Leverages Three.js and WebGL for smooth rendering of dynamic atmospheric patterns with integrated weather APIs and predictive algorithms for meteorological research.",
    image: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    icon: <Globe className="w-8 h-8" />,
    period: "Dec 2025 - Present",
    features: [
      "3D interactive Earth model with real-time data",
      "Live cloud movement visualization from satellite data",
      "Immersive WebGL rendering with smooth performance",
      "Weather prediction algorithms for research applications"
    ],
    technologies: ["Three.js", "WebGL", "JavaScript", "Weather API", "INSAT Data"],
    color: "hsl(260,70%,60%)",
    links: {
      demo: "#",
      github: "#"
    }
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold gradient-text mb-4">Featured Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[hsl(195,100%,45%)] to-[hsl(260,70%,60%)] mx-auto"></div>
          <p className="text-xl text-[hsl(220,10%,55%)] mt-6">Exploring the cosmos through code</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card bg-[hsl(250,45%,25%)]/20 backdrop-blur-sm rounded-3xl p-8 border border-[hsl(260,70%,60%)]/30 hover:border-[hsl(195,100%,45%)]/50 transition-all"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <img 
                src={project.image}
                alt={`${project.title} visualization`}
                className="w-full h-64 object-cover rounded-2xl mb-6"
                loading="lazy"
              />
              
              <div className="flex items-center gap-4 mb-4">
                <div className={`text-[${project.color}]`}>
                  {project.icon}
                </div>
                <h3 className={`text-2xl font-bold text-[${project.color}]`}>{project.title}</h3>
                <span className="bg-[hsl(220,70%,50%)]/20 px-3 py-1 rounded-full text-sm border border-[hsl(220,70%,50%)]/30">
                  {project.period}
                </span>
              </div>

              <p className="text-[hsl(220,10%,55%)] leading-relaxed mb-6">
                {project.description}
              </p>

              <div className="space-y-4 mb-6">
                {project.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-3">
                    <div className={`w-2 h-2 bg-[${project.color}] rounded-full`}></div>
                    <span className="text-[hsl(210,100%,98%)] text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mb-6">
                {project.technologies.map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    className={`bg-[${project.color}]/20 px-3 py-1 rounded-full text-sm border border-[${project.color}]/30`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <a 
                  href={project.links.demo}
                  className={`flex items-center gap-2 bg-gradient-to-r from-[${project.color}] to-[hsl(260,70%,60%)] px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform`}
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
                <a 
                  href={project.links.github}
                  className={`flex items-center gap-2 border-2 border-[${project.color}] px-6 py-3 rounded-full font-semibold hover:bg-[${project.color}] hover:text-[hsl(220,50%,8%)] transition-all`}
                >
                  <Github className="w-4 h-4" />
                  Code
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
