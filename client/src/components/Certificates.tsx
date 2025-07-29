// ...existing code...
import { motion } from "framer-motion";
import { Award, Trophy, Medal, Star, Code, Globe, ExternalLink, Mail } from "lucide-react";

const certificates = [
  {
    id: 1,
    title: "Certificate of Excellence in JAVA",
    organization: "Coding Ninjas",
    icon: <Code className="w-6 h-6" />,
    color: "from-cyan-500 text-cyan-400 border-cyan-400",
    achievements: [
      { icon: <Award className="w-4 h-4" />, text: "Outstanding performance recognition" },
      { icon: <Code className="w-4 h-4" />, text: "Object-oriented programming mastery" },
      { icon: <Star className="w-4 h-4" />, text: "Core Java concepts expertise" },
    ],
    link: "https://certificate.codingninjas.com/view/081c25a18d802445"
  },
  {
    id: 2,
    title: "Certificate of Excellence in DSA in JAVA",
    organization: "Coding Ninjas",
    icon: <Trophy className="w-6 h-6" />,
    color: "from-purple-500 text-purple-400 border-purple-400",
    achievements: [
      { icon: <Trophy className="w-4 h-4" />, text: "Excellence in algorithmic thinking" },
      { icon: <Code className="w-4 h-4" />, text: "Advanced problem-solving skills" },
      { icon: <Medal className="w-4 h-4" />, text: "Competitive programming foundation" },
    ],
    link: "https://certificate.codingninjas.com/view/a80f1fe4055a5f91"
  },
  {
    id: 3,
    title: "Web Development | Generative AI",
    organization: "Coding Ninjas",
    icon: <Globe className="w-6 h-6" />,
    color: "from-blue-500 text-blue-400 border-blue-400",
    achievements: [
      { icon: <Star className="w-4 h-4" />, text: "Built AI-powered web apps" },
      { icon: <Code className="w-4 h-4" />, text: "Integrated generative AI APIs" },
      { icon: <Globe className="w-4 h-4" />, text: "Modern web stack expertise" },
    ],
    link: "https://certificate.codingninjas.com/view/71aae39329372009"
  },
  {
    id: 4,
    title: "Mastering Google Spreadsheets for Analytics",
    organization: "Google",
    icon: <Medal className="w-6 h-6" />,
    color: "from-green-500 text-green-400 border-green-400",
    achievements: [
      { icon: <Medal className="w-4 h-4" />, text: "Advanced spreadsheet functions" },
      { icon: <Star className="w-4 h-4" />, text: "Data visualization & analytics" },
      { icon: <Globe className="w-4 h-4" />, text: "Automated reporting" },
    ],
    link: "https://certificate.codingninjas.com/view/3caffa0d2eaa46d9"
  },
  {
    id: 5,
    title: "HackHaven 2.0",
    organization: "Hackhaven",
    icon: <Trophy className="w-6 h-6" />,
    color: "from-orange-400 text-orange-400 border-orange-400",
    achievements: [
      { icon: <Trophy className="w-4 h-4" />, text: "Hackathon finalist" },
      { icon: <Star className="w-4 h-4" />, text: "Team collaboration" },
      { icon: <Code className="w-4 h-4" />, text: "Innovative project delivery" },
    ],
    link: "https://drive.google.com/file/d/1cDwnCOX0vUnGIGvpxQsiq5MSH90VvCrf/view?usp=sharing"
  },
  {
    id: 6,
    title: "Coding Ninjas 10x HackupCup",
    organization: "Coding Ninjas",
    icon: <Award className="w-6 h-6" />,
    color: "from-pink-500 text-pink-400 border-pink-400",
    achievements: [
      { icon: <Award className="w-4 h-4" />, text: "Top 10x performer" },
      { icon: <Trophy className="w-4 h-4" />, text: "HackupCup participant" },
      { icon: <Star className="w-4 h-4" />, text: "Coding excellence" },
    ],
    link: "https://drive.google.com/file/d/1d6tFYROzvLj2U-gb85Vhji0vV4rNTg5m/view?usp=sharing"
  },
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
              className="bg-[hsl(250,45%,25%)]/20 backdrop-blur-sm rounded-3xl p-8 border border-[hsl(260,70%,60%)]/30 hover:border-[hsl(195,100%,45%)]/50 transition-all group min-h-[32rem] flex flex-col justify-between"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="text-center mb-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${cert.color} to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <div className="text-[hsl(220,50%,8%)]">
                    {cert.icon}
                  </div>
                </div>
                <h3
                  className={`text-xl font-bold ${cert.color} group-hover:text-[hsl(210,100%,98%)] transition-colors leading-tight min-h-[3.5rem] line-clamp-2 break-words`}
                  style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                  title={cert.title}
                >
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
                {cert.title === "Instagram Profile" ? (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 text-[${cert.color}] hover:text-[hsl(210,100%,98%)] transition-colors`}
                  >
                    <span>View Profile</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ) : cert.title === "Get In Touch" ? (
                  <a
                    href={cert.link}
                    className={`inline-flex items-center gap-2 text-[${cert.color}] hover:text-[hsl(210,100%,98%)] transition-colors`}
                  >
                    <span>Get In Touch</span>
                    <Mail className="w-4 h-4" />
                  </a>
                ) : (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 text-[${cert.color}] hover:text-[hsl(210,100%,98%)] transition-colors`}
                  >
                    <span>View Certificate</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
