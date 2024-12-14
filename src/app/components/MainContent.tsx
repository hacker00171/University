"use client";

import { useSidebar } from '../context/SidebarContext';

export function MainContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();
  
  return (
    <main 
      className={`flex-1 transition-all duration-300 
      ${isCollapsed ? 'ml-20' : 'ml-72'} 
     min-h-screen relative z-10`}
    >
      <div className="bg-[#1E2875]/40 p-6 backdrop-blur-sm shadow-xl border border-[#2E3895]/30 relative z-20">
        {children}
      </div>
    </main>
  );
}
