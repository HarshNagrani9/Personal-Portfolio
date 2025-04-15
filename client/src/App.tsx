import { Toaster } from "@/components/ui/toaster";
import { useEffect, useState } from "react";
import Cursor from "./components/ui/cursor";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import Footer from "./components/layout/Footer";
import ScrollProgress from "./components/ui/ScrollProgress";
import ParticlesBackground from "./components/ui/ParticlesBackground";

function App() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    
    // Handle theme based on user preference
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Only render the cursor component on client-side
  return (
    <div className="font-sans bg-background dark:bg-background text-gray-800 dark:text-gray-200 transition-colors duration-300 no-scrollbar">
      <ParticlesBackground />
      {isMounted && <Cursor />}
      <ScrollProgress />
      <Navbar />
      <Home />
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
