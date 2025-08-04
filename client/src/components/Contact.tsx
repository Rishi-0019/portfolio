import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Phone, MapPin, Linkedin, Github, Download, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. I'll get back to you soon!",
    });

    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "rishabhtiwari0019@gmail.com",
      href: "mailto:rishabhtiwari0019@gmail.com",
      color: "hsl(195,100%,45%)"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Phone",
      value: "(+91) 9452302696",
      href: "tel:+919452302696",
      color: "hsl(260,70%,60%)"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Location",
      value: "Delhi, India",
      href: "#",
      color: "hsl(220,70%,50%)"
    }
  ];

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
          {/* Contact Information */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-[hsl(250,45%,25%)]/20 backdrop-blur-sm rounded-3xl p-8 border border-[hsl(260,70%,60%)]/30">
              <h3 className="text-2xl font-bold text-[hsl(195,100%,45%)] mb-6">Get In Touch</h3>
              <p className="text-[hsl(220,10%,55%)] leading-relaxed mb-8">
              </p>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-br from-[${info.color}] to-[hsl(260,70%,60%)] rounded-xl flex items-center justify-center`}>
                      <div className="text-[hsl(220,50%,8%)]">
                        {info.icon}
                      </div>
                    </div>
                    <div>
                      <p className="text-[hsl(210,100%,98%)] font-semibold">{info.label}</p>
                      <a 
                        href={info.href}
                        className="text-[hsl(195,100%,45%)] hover:text-[hsl(210,100%,98%)] transition-colors"
                      >
                        {info.value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-[hsl(260,70%,60%)]/30">
                <h4 className="text-lg font-semibold text-[hsl(195,100%,45%)] mb-4">Follow Me</h4>
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
            </div>

            {/* Resume Download */}
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
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            className="bg-[hsl(250,45%,25%)]/20 backdrop-blur-sm rounded-3xl p-8 border border-[hsl(260,70%,60%)]/30"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-[hsl(195,100%,45%)] mb-6">Send Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[hsl(210,100%,98%)] font-medium mb-2">Name</label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    required
                    className="bg-[hsl(220,50%,8%)]/50 border-[hsl(220,10%,55%)]/30 text-[hsl(210,100%,98%)] placeholder-[hsl(220,10%,55%)] focus:border-[hsl(195,100%,45%)]"
                  />
                </div>
                <div>
                  <label className="block text-[hsl(210,100%,98%)] font-medium mb-2">Email</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    required
                    className="bg-[hsl(220,50%,8%)]/50 border-[hsl(220,10%,55%)]/30 text-[hsl(210,100%,98%)] placeholder-[hsl(220,10%,55%)] focus:border-[hsl(195,100%,45%)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[hsl(210,100%,98%)] font-medium mb-2">Subject</label>
                <Input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Project Discussion"
                  required
                  className="bg-[hsl(220,50%,8%)]/50 border-[hsl(220,10%,55%)]/30 text-[hsl(210,100%,98%)] placeholder-[hsl(220,10%,55%)] focus:border-[hsl(195,100%,45%)]"
                />
              </div>

              <div>
                <label className="block text-[hsl(210,100%,98%)] font-medium mb-2">Message</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  placeholder="Tell me about your project or idea..."
                  required
                  className="bg-[hsl(220,50%,8%)]/50 border-[hsl(220,10%,55%)]/30 text-[hsl(210,100%,98%)] placeholder-[hsl(220,10%,55%)] focus:border-[hsl(195,100%,45%)] resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[hsl(195,100%,45%)] to-[hsl(260,70%,60%)] hover:scale-105 transition-transform animate-pulse"
              >
                <Send className="mr-2 h-4 w-4" />
                {isSubmitting ? 'Launching...' : 'Launch Message'}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
