import React, { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import AdGeneratorTool from './pages/AdGeneratorTool';
import SocialPostWriterTool from './pages/SocialPostWriterTool';
import Dashboard from './pages/Dashboard';
import ThemeToggle from './components/ThemeToggle';
import type { Tool } from './types';

const App: React.FC = () => {
  const [activeTool, setActiveTool] = useState<Tool>('dashboard');

  const handleNavClick = useCallback((tool: Tool) => {
    setActiveTool(tool);
  }, []);

  const renderTool = () => {
    const backToDashboard = () => handleNavClick('dashboard');

    switch (activeTool) {
      case 'dashboard':
        return <Dashboard onNavClick={handleNavClick} />;
      case 'ad-generator':
        return <AdGeneratorTool onBackToDashboard={backToDashboard} />;
      case 'social-posts':
        return <SocialPostWriterTool onBackToDashboard={backToDashboard} />;
      default:
        return <Dashboard onNavClick={handleNavClick} />;
    }
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar activeTool={activeTool} onNavClick={handleNavClick} />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 relative">
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8 z-20">
            <ThemeToggle />
        </div>
        {renderTool()}
      </main>
    </div>
  );
};

export default App;