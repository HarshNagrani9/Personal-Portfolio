// import { Toaster } from "@/components/ui/toaster";
// import HomePage from "@/pages/Home";
// import { CustomCursor } from "@/components/ui/custom-cursor";
// import { useState, useEffect } from "react";

// function App() {
//   // Initialize with system preference or dark as fallback
//   const [theme, setTheme] = useState(() => {
//     // Check localStorage first
//     const savedTheme = localStorage.getItem('theme');
//     if (savedTheme) return savedTheme;
    
//     // Then check system preference
//     if (typeof window !== 'undefined') {
//       return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
//     }
    
//     return 'dark'; // Default fallback
//   });
  
//   // Update theme when it changes
//   useEffect(() => {
//     localStorage.setItem('theme', theme);
//   }, [theme]);
  
//   return (
//     <div className={theme === 'dark' ? 'dark' : ''}>
//       <div className="min-h-screen bg-background text-foreground font-inter overflow-x-hidden">
//         <CustomCursor />
//         <HomePage />
//         <Toaster />
//       </div>
//     </div>
//   );
// }

// export default App;


// App.tsx (Updated)
// App.tsx
import { Toaster } from "@/components/ui/toaster";
import HomePage from "@/pages/Home";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { useState, useEffect } from "react";
import Loader from "@/components/sections/loader";

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;

    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    return 'dark';
  });

  const [loading, setLoading] = useState(true);

  const handleLoadComplete = () => {
    setLoading(false);
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-background text-foreground font-inter overflow-x-hidden">
        {loading ? (
          <Loader onComplete={handleLoadComplete} />
        ) : (
          <>
            <CustomCursor />
            <HomePage />
            <Toaster />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
