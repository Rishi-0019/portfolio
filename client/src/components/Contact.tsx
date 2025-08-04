import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Instagram, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();

  const socialLinks = [
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://linkedin.com/in/rishabh0019",
      label: "LinkedIn",
      color: "hsl(220,70%,50%)"
    },
    {
      icon: <Github className="w-5 h-5" />,
      href: "https://github.com/Rishi-0019",
      label: "GitHub",
      color: "hsl(260,70%,60%)"
    },
    {
      icon: <Mail className="w-5 h-5" />,
      href: "mailto:rishabhtiwari0019@gmail.com",
      label: "Mail",
      color: "hsl(195,100%,45%)"
    },
    {
      icon: <Instagram className="w-5 h-5" />,
      href: "https://instagram.com/your_instagram_username",
      label: "Instagram",
      color: "#E4405F"
    }
  ];

  return (
    <section id="contact" className="py-24 bg-[hsl(245,50%,16%)]/85 relative">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-extrabold gradient-text mb-4">Let's Connect</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[hsl(195,100%,45%)] to-[hsl(260,70%,60%)] mx-auto mb-6"></div>
          <p className="text-lg md:text-xl text-[hsl(220,10%,65%)]">Ready to launch your next project into orbit?</p>
        </motion.div>
        <motion.div
          className="max-w-xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="p-8 bg-[hsl(220,20%,35%)]/30 border border-[hsl(220,30%,55%)]/40 rounded-3xl shadow-xl backdrop-blur-md mb-10">
            <h4 className="font-semibold text-xl text-[hsl(195,100%,45%)] mb-4">
              Download Resume
            </h4>
            <p className="text-[hsl(220,10%,65%)] mb-6">
              Get a detailed overview of my experience, skills, and achievements.
            </p>
            <Button
              className="bg-gradient-to-r from-[hsl(195,100%,45%)] to-[hsl(260,70%,60%)] hover:scale-105 transition-transform text-white px-6 py-2"
              onClick={() => {
                window.open('/api/resume', '_blank');
                toast({
                  title: "Resume Download",
                  description: "Resume download started successfully!",
                });
              }}
            >
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-[hsl(195,100%,45%)] mb-4">
              Follow Me
            </h4>
            <div className="mb-6">
              <a
                href="https://linkedin.com/in/rishabh0019"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[hsl(220,70%,50%)] to-[hsl(195,100%,45%)] rounded-xl text-white font-semibold shadow hover:brightness-110 transition w-full justify-center"
              >
                <Linkedin className="w-5 h-5" />
                LinkedIn Profile
              </a>
            </div>
            <div className="flex gap-4 justify-center">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.label}
                  style={{
                    background: `${social.color}20`,
                    borderColor: `${social.color}40`,
                    color: social.color,
                  }}
                  className="w-12 h-12 rounded-full flex items-center justify-center border hover:bg-white hover:text-[hsl(245,50%,16%)] shadow-md transition-all text-xl"
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
