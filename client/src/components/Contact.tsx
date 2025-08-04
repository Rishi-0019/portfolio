import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Instagram, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();

  const socialLinks = [
    {
      icon: <Linkedin className="w-6 h-6" />,
      href: "https://linkedin.com/in/rishabh0019",
      label: "LinkedIn",
      color: "hsl(220,70%,50%)"
    },
    {
      icon: <Github className="w-6 h-6" />,
      href: "https://github.com/Rishi-0019",
      label: "GitHub",
      color: "hsl(260,70%,60%)"
    },
    {
      icon: <Instagram className="w-6 h-6" />,
      href: "https://instagram.com/rishabh_0019",
      label: "Instagram",
      color: "#E4405F"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      href: "mailto:rishabhtiwari0019@gmail.com",
      label: "Mail",
      color: "hsl(195,100%,45%)"
    }
  ];

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center bg-[hsl(245,50%,16%)] py-24"
    >
      <div className="w-full max-w-2xl mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-extrabold gradient-text mb-4">
            Let's Connect
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[hsl(195,100%,45%)] to-[hsl(260,70%,60%)] mx-auto mb-6"></div>
          <p className="text-lg md:text-xl text-[hsl(220,10%,65%)]">
            Ready to launch your next project into orbit?
          </p>
        </motion.div>
        <motion.div
          className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl px-8 py-10 flex flex-col items-center gap-10 border border-white/20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {/* Resume Download */}
          <div className="w-full max-w-md mb-4">
            <h4 className="font-bold text-xl text-[hsl(195,100%,45%)] mb-2">
              Download Resume
            </h4>
            <p className="text-[hsl(220,10%,65%)] mb-5">
              Get a detailed overview of my experience, skills, and achievements.
            </p>
            <Button
              className="w-full text-base font-semibold py-3 bg-gradient-to-r from-[hsl(195,100%,45%)] to-[hsl(260,70%,60%)] hover:scale-105 transition-transform text-white rounded-xl shadow-lg"
              onClick={() => {
                window.open('/api/resume', '_blank');
                toast({
                  title: "Resume Download",
                  description: "Resume download started successfully!",
                });
              }}
            >
              <Download className="mr-2 h-5 w-5" />
              Download PDF
            </Button>
          </div>
          {/* Social Section */}
          <div className="w-full max-w-md text-center">
            <h4 className="text-lg font-semibold text-[hsl(195,100%,45%)] mb-4">
              Follow Me
            </h4>
            <div className="mb-6">
              <a
                href="https://linkedin.com/in/rishabh0019"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full gap-2 px-5 py-3 bg-gradient-to-r from-[hsl(220,70%,50%)] to-[hsl(195,100%,45%)] rounded-xl text-white font-semibold shadow hover:brightness-110 transition"
              >
                <Linkedin className="w-6 h-6" />
                LinkedIn Profile
              </a>
            </div>
            <div className="flex flex-wrap gap-5 justify-center mt-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.label}
                  style={{
                    background: social.color,
                    color: "#fff",
                    boxShadow: `0 4px 18px 0 ${social.color}55`
                  }}
                  className="w-14 h-14 flex items-center justify-center rounded-full border-0 shadow-lg transition-all duration-150 text-2xl hover:scale-110 hover:ring-4 hover:ring-white/30"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
