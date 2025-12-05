import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div 
      style={{ 
        display: 'flex', 
        minHeight: '100vh', 
        backgroundColor: '#f3f4f6', 
        fontFamily: 'system-ui, sans-serif' 
      }}
    >
      {children}
    </div>
  );
};

export default MainLayout;

