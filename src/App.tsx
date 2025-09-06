import { FloatingExportActions } from "./components/FloatingExportActions";
import { Background } from "./components/layout/Background";
import { DesktopLayout } from "./components/layout/DesktopLayout";
import { MobileLayout } from "./components/layout/MobileLayout";
import { ToastConfig } from "./components/layout/ToastConfig";
import { memo, useState, useEffect } from "react";

const App = memo(() => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="dark min-h-screen relative overflow-hidden bg-black">
      <Background isLoaded={isLoaded} />

      <div className="relative z-10 h-screen">
        <DesktopLayout isLoaded={isLoaded} />
        <MobileLayout isLoaded={isLoaded} />
        <FloatingExportActions />
      </div>

      <ToastConfig />
    </div>
  );
});

export default App;
