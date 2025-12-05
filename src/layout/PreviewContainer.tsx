import React from 'react';

interface PreviewContainerProps {
  children: React.ReactNode;
}

const PreviewContainer: React.FC<PreviewContainerProps> = ({ children }) => {
  return (
    <div 
      style={{ 
        flex: 1, 
        padding: '24px', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'flex-start', 
        overflow: 'auto' 
      }}
    >
      {children}
    </div>
  );
};

export default PreviewContainer;

