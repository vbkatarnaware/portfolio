import React, { useState, useEffect } from 'react';
import { useWindows } from '../../context/WindowContext';
import FinderSidebar, { FAVORITES } from './FinderSidebar';
import AboutView from './AboutView';
import ExperienceView from './ExperienceView';
import ContactView from './ContactView';
import ProductsView from './ProductsView';
import ResumeView from './ResumeView';

export default function FinderApp() {
  const [activeTab, setActiveTab] = useState('products');
  const { openWindow, updateWindowTitle } = useWindows();

  useEffect(() => {
    const title = activeTab.charAt(0).toUpperCase() + activeTab.slice(1);
    updateWindowTitle('finder', title);
  }, [activeTab, updateWindowTitle]);

  useEffect(() => {
    const handlePopState = () => {
      const currentPath = window.location.pathname;
      const tab = currentPath.split('/')[1]; // e.g., '/about' -> 'about'
      
      if (tab) {
        // Validate tab against known routes
        const isValid = FAVORITES.some(f => f.id === tab) || tab === 'products';
        if (isValid) {
          setActiveTab(tab);
        } else {
          setActiveTab('about');
          window.history.replaceState(null, '', '/about');
        }
      } else {
        // If they are on root '/', Finder is usually hidden anyway by AppLayout logic,
        // but default to 'products' internally just in case.
        setActiveTab('products');
      }
    };

    // Initial load
    handlePopState();

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSidebarClick = (id: string) => {
    setActiveTab(id);
    window.history.pushState(null, '', `/${id}`);
  };

  const handleAppLaunch = (action: string) => {
    openWindow(action as any);
  };

  return (
    <div className="flex h-full text-white/90 font-sans select-none">
      <FinderSidebar activeTab={activeTab} onTabSelect={handleSidebarClick} />

      {/* Main Content Area */}
      <main className="flex-1 p-6 overflow-y-auto" role="main">
        {activeTab === 'products' && <ProductsView onAppLaunch={handleAppLaunch} />}
        {activeTab === 'about' && <AboutView />}
        {activeTab === 'resume' && <ResumeView />}
        {activeTab === 'experience' && <ExperienceView />}
        {activeTab === 'contact' && <ContactView />}
      </main>
    </div>
  );
}
