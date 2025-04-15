import { useState } from "react";
import { RectangleEllipsis, Phone, MapPin, Github, Linkedin, Code, Twitter } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const ContactSection = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: ""
  });
  
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const contactMutation = useMutation({
    mutationFn: (data: ContactFormData) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
    },
    onError: (error) => {
      toast({
        title: "Error sending message",
        description: error.message || "Please try again later.",
        variant: "destructive"
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  return (
    <section id="contact" className="py-20 section">
      <div className="custom-container">
        <h2 className="text-4xl font-bold font-poppins text-center mb-6">
          Get In <span className="text-primary">Touch</span>
        </h2>
        <p className="text-center max-w-2xl mx-auto mb-16">
          I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block mb-2 font-medium">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="Your name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="your.email@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-2 font-medium">Message</label>
                <textarea 
                  id="message" 
                  rows={5}
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="Your message here..."
                  required
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>
              
              <button 
                type="submit" 
                className="bg-primary hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 w-full"
                disabled={contactMutation.isPending}
              >
                {contactMutation.isPending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
          
          <div>
            <div className="content-section p-8 rounded-2xl shadow-lg h-full">
              <h3 className="text-2xl font-semibold mb-8">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                    <RectangleEllipsis className="text-xl text-primary" />
                  </div>
                  <div>
                    <div className="text-sm opacity-75 mb-1">Email</div>
                    <a href="mailto:harshnagrani0910@gmail.com" className="hover:text-primary transition-colors">harshnagrani0910@gmail.com</a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                    <Phone className="text-xl text-primary" />
                  </div>
                  <div>
                    <div className="text-sm opacity-75 mb-1">Phone</div>
                    <a href="tel:9638088873" className="hover:text-primary transition-colors">+91 9638088873</a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                    <MapPin className="text-xl text-primary" />
                  </div>
                  <div>
                    <div className="text-sm opacity-75 mb-1">Location</div>
                    <div>Mumbai, Maharashtra</div>
                  </div>
                </div>
                
                <div className="pt-8">
                  <div className="text-sm opacity-75 mb-4">Connect with me on social media</div>
                  <div className="flex space-x-4">
                    <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white transition-all">
                      <Github size={20} />
                    </a>
                    <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white transition-all">
                      <Linkedin size={20} />
                    </a>
                    <a href="https://leetcode.com/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white transition-all">
                      <Code size={20} />
                    </a>
                    <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white transition-all">
                      <Twitter size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
