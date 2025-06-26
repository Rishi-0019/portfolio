import { motion } from "framer-motion";
import { Award, Trophy, Medal, Star, Code, Globe, ExternalLink } from "lucide-react";

const certificates = [
  {
    id: 1,
    title: "Certificate of Excellence in JAVA",
    organization: "Coding Ninjas",
    icon: <Code className="w-6 h-6" />,
    color: "hsl(195,100%,45%)",
    achievements: [
      { icon: <Award className="w-4 h-4" />, text: "Outstanding performance recognition" },
      { icon: <Code className="w-4 h-4" />, text: "Object-oriented programming mastery" },
      { icon: <Star className="w-4 h-4" />, text: "Core Java concepts expertise" },
    ],
    link: "#"
  },
  {
    id: 2,
    title: "Data Structure & Algorithm in JAVA",
    organization: "Coding Ninjas",
    icon: <Trophy className="w-6 h-6" />,
    color: "hsl(260,70%,60%)",
    achievements: [
      { icon: <Trophy className="w-4 h-4" />, text: "Excellence in algorithmic thinking" },
      { icon: <Code className="w-4 h-4" />, text: "Advanced problem-solving skills" },
      { icon: <Medal className="w-4 h-4" />, text: "Competitive programming foundation" },
    ],
    link: "#"
  },
  {
    id: 3,
    title: "Web Development Fundamentals",
    organization: "Coding Ninjas",
    icon: <Globe className="w-6 h-6" />,
    color: "hsl(220,70%,50%)",
    achievements: [
      { icon: <Star className="w-4 h-4" />, text: "Hands-on project completion" },
      { icon: <Code className="w-4 h-4" />, text: "HTML, CSS, JavaScript mastery" },
      { icon: <Globe className="w-4 h-4" />, text: "Responsive design fundamentals" },
    ],
    link: "#"
  }
];

export default function Certificates() {
  return (
    <section id="certificates" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold gradient-text mb-4">Certificates & Achievements</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[hsl(195,100%,45%)] to-[hsl(260,70%,60%)] mx-auto"></div>
          <p className="text-xl text-[hsl(220,10%,55%)] mt-6">Professional certifications and recognitions</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              className="bg-[hsl(250,45%,25%)]/20 backdrop-blur-sm rounded-3xl p-8 border border-[hsl(260,70%,60%)]/30 hover:border-[hsl(195,100%,45%)]/50 transition-all group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="text-center mb-6">
                <div className={`w-16 h-16 bg-gradient-to-br from-[${cert.color}] to-[hsl(220,70%,50%)] rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <div className="text-[hsl(220,50%,8%)]">
                    {cert.icon}
                  </div>
                </div>
                <h3 className={`text-xl font-bold text-[${cert.color}] group-hover:text-[hsl(210,100%,98%)] transition-colors`}>
                  {cert.title}
                </h3>
                <p className="text-[hsl(220,10%,55%)] mt-2">{cert.organization}</p>
              </div>
              
              <div className="space-y-3 mb-6">
                {cert.achievements.map((achievement, achievementIndex) => (
                  <div key={achievementIndex} className="flex items-center gap-3">
                    <div className={`text-[${cert.color}]`}>
                      {achievement.icon}
                    </div>
                    <span className="text-[hsl(210,100%,98%)] text-sm">{achievement.text}</span>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <a 
                  href={cert.link}
                  className={`inline-flex items-center gap-2 text-[${cert.color}] hover:text-[hsl(210,100%,98%)] transition-colors`}
                >
                  <span>View Certificate</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
