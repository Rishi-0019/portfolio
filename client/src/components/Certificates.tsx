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
    link: "https://certificate.codingninjas.com/view/081c25a18d802445"
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
    link: "https://example.com/cert2"
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
    link: "https://certificate.codingninjas.com/view/9c688963d098c075"
  },
  {
    id: 4,
    title: "Web Development | Generative AI",
    organization: "Coding Ninjas",
    icon: <Globe className="w-6 h-6" />,
    color: "hsl(150,70%,40%)",
    achievements: [
      { icon: <Star className="w-4 h-4" />, text: "Integration of AI in web apps" },
      { icon: <Code className="w-4 h-4" />, text: "Generative AI concepts" },
      { icon: <Globe className="w-4 h-4" />, text: "Hands-on AI project experience" },
    ],
    link: "https://certificate.codingninjas.com/view/71aae3932937200nk"
  },
  {
    id: 5,
    title: "Mastering Google Spreadsheets for Data Analytics",
    organization: "Coding Ninjas",
    icon: <Code className="w-6 h-6" />,
    color: "hsl(45,90%,50%)",
    achievements: [
      { icon: <Medal className="w-4 h-4" />, text: "Advanced spreadsheet functions" },
      { icon: <Star className="w-4 h-4" />, text: "Data visualization techniques" },
      { icon: <Globe className="w-4 h-4" />, text: "Data-driven decision making" },
    ],
    link: "https://certificate.codingninjas.com/view/3caffa0d2eaa46d9"
  },
  {
    id: 6,
    title: "Hackhaven 2.0",
    organization: "GDB ABESEC",
    icon: <Trophy className="w-6 h-6" />,
    color: "hsl(10,80%,50%)",
    achievements: [
      { icon: <Trophy className="w-4 h-4" />, text: "Hackathon participation" },
      { icon: <Code className="w-4 h-4" />, text: "Innovative project development" },
      { icon: <Medal className="w-4 h-4" />, text: "Collaborative problem solving" },
    ],
    link: "https://drive.google.com/file/d/1cDwnCOX0vUnGIGvpxQsiq5MSH90VvCrf/view?usp=sharing"
  },
  {
    id: 7,
    title: "Coding Ninjas 10x HackerCup Hackathon",
    organization: "Coding Ninjas x WNCC IIT-Bombay",
    icon: <Trophy className="w-6 h-6" />,
    color: "hsl(300,80%,55%)",
    achievements: [
      { icon: <Trophy className="w-4 h-4" />, text: "Hackathon winner & finalist" },
      { icon: <Code className="w-4 h-4" />, text: "Collaborative coding and innovation" },
      { icon: <Medal className="w-4 h-4" />, text: "Real-world solution building" },
    ],
    link: "https://drive.google.com/file/d/1d6tFYROzvLj2U-gb85Vhji0vV4rNTg5m/view?usp=sharing"
  }
];


const spaceCardStyle = {
  background: 'radial-gradient(circle at center, rgba(25,40,65,0.85), rgba(10,15,25,0.95))',
  boxShadow: '0 0 20px 3px rgba(30,215,255,0.6), 0 0 30px 10px rgba(100,100,255,0.3)',
  border: '1px solid rgba(100,100,255,0.6)',
  color: '#d0e6f9',
  borderRadius: '1rem',
  padding: '2.25rem'
};


const iconAccentStyle = {
  boxShadow: '0 0 14px 3px rgba(30,215,255,0.7)',
  background: 'rgba(50,90,220,0.38)',
  borderRadius: '0.75rem',
  width: '4rem',
  height: '4rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 1rem'
};


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
          <p className="text-xl text-[hsl(220,10%,55%)] mt-6">
            Professional certifications and recognitions
          </p>
        </motion.div>
        <div className="grid lg:grid-cols-3 gap-10">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              style={spaceCardStyle}
              className="relative shadow-xl group hover:shadow-2xl hover:scale-[1.035] transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="text-center mb-6">
                {/* Glowing Icon */}
                <div style={{ ...iconAccentStyle, background: cert.color + '55' }}>
                  <div style={{ color: '#fff' }}>{cert.icon}</div>
                </div>
                {/* Title with accent color */}
                <h3
                  className="text-xl font-extrabold mb-1"
                  style={{
                    color: cert.color,
                    textShadow: `0 2px 12px ${cert.color}44`
                  }}
                >
                  {cert.title}
                </h3>
                <p className="text-[hsl(220,10%,70%)]">{cert.organization}</p>
              </div>
              <div className="space-y-3 mb-6">
                {cert.achievements.map((achievement, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div style={{ color: cert.color }}>
                      {achievement.icon}
                    </div>
                    <span className="text-[hsl(210,100%,96%)] text-sm">{achievement.text}</span>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <a
                  href={cert.link}
                  className="inline-flex items-center gap-2 font-medium transition-colors"
                  style={{ color: cert.color }}
                  target="_blank"
                  rel="noopener noreferrer"
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
