import React, { useState } from 'react';
import type { BorderStyle } from '../types/certificate';

import border1 from '../assets/1-기본테두리.png';
import border2 from '../assets/2-노란테두리-띠.png';
import border3 from '../assets/3-표창장-꽃테두리.png';
import border4 from '../assets/4-얇은-테두리.png';
import border5 from '../assets/5-수료증-테두리.png';
import border6 from '../assets/6-감사장-테두리.png';
import border7 from '../assets/7-테두리.png';
import border9 from '../assets/9-졸업장-테두리.png';
import border10 from '../assets/10-장학증서.png';

interface BorderFrameProps {
  style: BorderStyle;
  onStyleChange: (style: BorderStyle) => void;
  isEditable?: boolean;
}

const borderStyles: BorderStyle[] = [
  'border1', 'border2', 'border3', 'border4', 'border5', 
  'border6', 'border7', 'border9', 'border10'
];

const borderImages: Record<BorderStyle, string> = {
  border1, border2, border3, border4, border5, border6, border7, border9, border10
};

const borderNames: Record<BorderStyle, string> = {
  border1: '기본 테두리',
  border2: '노란 테두리',
  border3: '꽃 테두리',
  border4: '얇은 테두리',
  border5: '수료증',
  border6: '감사장',
  border7: '테두리',
  border9: '졸업장',
  border10: '장학증서'
};

const BorderFrame: React.FC<BorderFrameProps> = ({ style, onStyleChange, isEditable = true }) => {
  const [isHovered, setIsHovered] = useState(false);
  const currentIndex = borderStyles.indexOf(style);

  const handlePrev = () => {
    const newIndex = currentIndex === 0 ? borderStyles.length - 1 : currentIndex - 1;
    onStyleChange(borderStyles[newIndex]);
  };

  const handleNext = () => {
    const newIndex = currentIndex === borderStyles.length - 1 ? 0 : currentIndex + 1;
    onStyleChange(borderStyles[newIndex]);
  };

  const arrowButtonStyle: React.CSSProperties = {
    width: '36px',
    height: '60px',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: 'rgba(0,0,0,0.7)',
    color: '#fff',
    fontSize: '20px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
    boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
  };

  return (
    <>
      <img
        src={borderImages[style]}
        alt={borderNames[style]}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'fill',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
      
      {isEditable && (
        <div
          style={{ position: 'absolute', inset: '0', zIndex: 5 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div style={{ position: 'absolute', top: '50%', left: '-20px', transform: 'translateY(-50%)', opacity: isHovered ? 1 : 0, transition: 'opacity 0.2s', zIndex: 20 }}>
            <button onClick={handlePrev} style={arrowButtonStyle}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.9)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.7)'; }}>◀</button>
          </div>
          
          <div style={{ position: 'absolute', top: '50%', right: '-20px', transform: 'translateY(-50%)', opacity: isHovered ? 1 : 0, transition: 'opacity 0.2s', zIndex: 20 }}>
            <button onClick={handleNext} style={arrowButtonStyle}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.9)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.7)'; }}>▶</button>
          </div>
          
          <div style={{ position: 'absolute', top: '-30px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'rgba(0,0,0,0.75)', color: '#fff', padding: '6px 16px', borderRadius: '16px', fontSize: '13px', fontWeight: '500', opacity: isHovered ? 1 : 0, transition: 'opacity 0.2s', whiteSpace: 'nowrap', zIndex: 20 }}>
            🖼️ {borderNames[style]} ({currentIndex + 1}/{borderStyles.length})
          </div>
        </div>
      )}
    </>
  );
};

export default BorderFrame;

