import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real implementation, we would send the form data to an API
      // For now, simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I will get back to you soon.",
      });
      
      // Reset the form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title text-3xl md:text-4xl font-bold font-poppins mb-4">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Feel free to contact me for any work or suggestions below.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-card rounded-xl p-8 border border-primary/10 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 font-poppins">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <i className="fas fa-map-marker-alt text-primary"></i>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">Location</h4>
                    <p className="text-muted-foreground">Mumbai, Maharashtra, India</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <i className="fas fa-envelope text-primary"></i>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">Email</h4>
                    <p className="text-muted-foreground">harshnagrani0910@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <i className="fas fa-phone text-primary"></i>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">Phone</h4>
                    <p className="text-muted-foreground">+91 9638088873</p>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mt-10 mb-4 font-poppins">Follow Me</h3>
              
              <div className="flex space-x-4">
                <a 
                  href="https://github.com/HarshNagrani9" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 bg-black hover:bg-primary/20 rounded-full flex items-center justify-center text-foreground hover:text-primary transition-colors social-icon" 
                  aria-label="GitHub"
                >
                  <i className="fab fa-github text-xl"></i>
                </a>
                <a 
                  href="https://www.linkedin.com/in/harsh-nagrani-1ab98623a/"
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 bg-black hover:bg-primary/20 rounded-full flex items-center justify-center text-foreground hover:text-primary transition-colors social-icon" 
                  aria-label="LinkedIn"
                >
                  <i className="fab fa-linkedin-in text-xl"></i>
                </a>
                <a 
                  href="https://leetcode.com/u/harshnagrani009" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 bg-black hover:bg-primary/20 rounded-full flex items-center justify-center text-foreground hover:text-primary transition-colors social-icon" 
                  aria-label="LeetCode"
                >
                  <i className="fas fa-code text-xl"></i>
                </a>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-card rounded-xl p-8 border border-primary/10 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 font-poppins">Send Me a Message</h3>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-foreground mb-2">Your Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-black border border-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-foreground" 
                      required 
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-foreground mb-2">Your Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-black border border-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-foreground" 
                      required 
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-foreground mb-2">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-black border border-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-foreground" 
                    required 
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-foreground mb-2">Your Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={5} 
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-black border border-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-foreground resize-none" 
                    required
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-lg transition-all flex items-center justify-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i> Sending...
                    </>
                  ) : (
                    <>
                      Send Message <i className="fas fa-paper-plane ml-2"></i>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
