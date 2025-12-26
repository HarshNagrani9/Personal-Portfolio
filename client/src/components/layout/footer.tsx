import { ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="py-8 bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="custom-container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <a href="#hero" className="text-xl font-bold font-poppins text-primary">Harsh Nagrani</a>
            <p className="text-sm mt-1 opacity-75">Frontend React Developer</p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <p className="text-sm opacity-75 mb-2">© {new Date().getFullYear()} Harsh Nagrani. All rights reserved.</p>
            <a 
              href="https://drive.google.com/file/d/1sgIgzjVzvXGNO3CpseSaF9JPRtdaRiT9/view?usp=sharing" 
              className="text-sm text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Resume
            </a>
          </div>
        </div>
        
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-primary hover:bg-primary/80 text-white p-3 rounded-full shadow-lg transition-all duration-300"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
