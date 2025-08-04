import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();

  const socialLinks = [
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://linkedin.com/in/rishabh0019",
      color: "hsl(220,70%,50%)"
    },
    {
      icon: <Github className="w-5 h-5" />,
      href: "https://github.com/Rishi-0019",
      color: "hsl(220,10%,55%)"
    },
    {
      icon: <Mail className="w-5 h-5" />,
      href: "mailto:rishabhtiwari0019@gmail.com",
      color: "hsl(195,100%,45%)"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-[hsl(250,45%,25%)]/10">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold gradient-text mb-4">Let's Connect</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[hsl(195,100%,45%)] to-[hsl(260,70%,60%)] mx-auto"></div>
          <p className="text-xl text-[hsl(220,10%,55%)] mt-6">Ready to launch your next project into orbit?</p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Social Links and Resume Download */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-[hsl(220,20%,35%)]/20 backdrop-blur-sm rounded-3xl p-8 border border-[hsl(220,10%,55%)]/30">
              <h4 className="text-xl font-semibold text-[hsl(195,100%,45%)] mb-4">Download Resume</h4>
              <p className="text-[hsl(220,10%,55%)] mb-6">Get a detailed overview of my experience, skills, and achievements.</p>
              <Button
                className="bg-gradient-to-r from-[hsl(195,100%,45%)] to-[hsl(260,70%,60%)] hover:scale-105 transition-transform"
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
              <h4 className="text-lg font-semibold text-[hsl(195,100%,45%)] mb-4">Follow Me</h4>

              {/* Prominent LinkedIn button */}
              <div className="mb-6">
                <a
                  href="https://linkedin.com/in/rishabh0019"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[hsl(220,70%,50%)] to-[hsl(195,100%,45%)] rounded-lg text-white font-semibold hover:brightness-110 transition"
                >
                  <Linkedin className="w-5 h-5" />
                  LinkedIn Profile
                </a>
              </div>

              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 bg-[${social.color}]/20 rounded-xl flex items-center justify-center border border-[${social.color}]/30 hover:bg-[${social.color}] hover:text-[hsl(220,50%,8%)] transition-all`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
