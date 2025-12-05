import React, { useState } from 'react';
import type { BorderStyle } from '../types/certificate';

interface BorderFrameProps {
  style: BorderStyle;
  onStyleChange: (style: BorderStyle) => void;
  isEditable?: boolean;
}

const borderStyles: BorderStyle[] = ['simple', 'classic', 'elegant', 'ornate', 'royal'];

const borderNames: Record<BorderStyle, string> = {
  simple: '심플',
  classic: '클래식',
  elegant: '우아한',
  ornate: '화려한',
  royal: '로얄'
};

// L자 형태 코너 장식
const CornerBracket: React.FC<{ position: string; size?: number; thickness?: number }> = ({ 
  position, 
  size = 30,
  thickness = 3 
}) => {
  const isTop = position.includes('top');
  const isLeft = position.includes('left');

  return (
    <div
      style={{
        position: 'absolute',
        [isTop ? 'top' : 'bottom']: '15px',
        [isLeft ? 'left' : 'right']: '15px',
        width: `${size}px`,
        height: `${size}px`,
        borderTop: isTop ? `${thickness}px solid` : 'none',
        borderBottom: !isTop ? `${thickness}px solid` : 'none',
        borderLeft: isLeft ? `${thickness}px solid` : 'none',
        borderRight: !isLeft ? `${thickness}px solid` : 'none',
        borderImage: 'linear-gradient(135deg, #ffd700, #c9a227, #b8860b, #c9a227, #ffd700) 1',
        pointerEvents: 'none'
      }}
    />
  );
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

  const renderBorder = () => {
    switch (style) {
      case 'simple':
        return (
          <>
            {/* 단일 그라데이션 테두리 */}
            <div style={{
              position: 'absolute',
              inset: '20px',
              border: '4px solid',
              borderImage: 'linear-gradient(180deg, #ffd700, #c9a227, #b8860b, #c9a227, #ffd700) 1',
              pointerEvents: 'none'
            }} />
          </>
        );

      case 'classic':
        return (
          <>
            {/* 외부 그라데이션 테두리 */}
            <div style={{
              position: 'absolute',
              inset: '15px',
              border: '4px solid',
              borderImage: 'linear-gradient(180deg, #ffd700, #c9a227, #b8860b, #c9a227, #ffd700) 1',
              pointerEvents: 'none'
            }} />
            {/* 내부 테두리 */}
            <div style={{
              position: 'absolute',
              inset: '28px',
              border: '1px solid #c9a227',
              pointerEvents: 'none'
            }} />
            {/* L자 코너 장식 */}
            <CornerBracket position="top-left" />
            <CornerBracket position="top-right" />
            <CornerBracket position="bottom-left" />
            <CornerBracket position="bottom-right" />
          </>
        );

      case 'elegant':
        return (
          <>
            {/* 외부 그라데이션 테두리 */}
            <div style={{
              position: 'absolute',
              inset: '12px',
              border: '5px solid',
              borderImage: 'linear-gradient(180deg, #ffd700 0%, #c9a227 25%, #8b7355 50%, #c9a227 75%, #ffd700 100%) 1',
              pointerEvents: 'none'
            }} />
            {/* 중간 테두리 */}
            <div style={{
              position: 'absolute',
              inset: '22px',
              border: '2px solid',
              borderImage: 'linear-gradient(180deg, #daa520, #b8860b, #daa520) 1',
              pointerEvents: 'none'
            }} />
            {/* 내부 테두리 */}
            <div style={{
              position: 'absolute',
              inset: '30px',
              border: '1px solid #c9a227',
              pointerEvents: 'none'
            }} />
            {/* L자 코너 장식 */}
            <CornerBracket position="top-left" size={35} thickness={4} />
            <CornerBracket position="top-right" size={35} thickness={4} />
            <CornerBracket position="bottom-left" size={35} thickness={4} />
            <CornerBracket position="bottom-right" size={35} thickness={4} />
          </>
        );

      case 'ornate':
        return (
          <>
            {/* 외부 두꺼운 그라데이션 테두리 */}
            <div style={{
              position: 'absolute',
              inset: '10px',
              border: '6px solid',
              borderImage: 'linear-gradient(135deg, #ffd700 0%, #c9a227 20%, #8b7355 50%, #c9a227 80%, #ffd700 100%) 1',
              pointerEvents: 'none'
            }} />
            {/* 중간 장식 테두리 */}
            <div style={{
              position: 'absolute',
              inset: '20px',
              border: '3px double',
              borderImage: 'linear-gradient(180deg, #daa520, #b8860b, #8b7355, #b8860b, #daa520) 1',
              pointerEvents: 'none'
            }} />
            {/* 내부 테두리 */}
            <div style={{
              position: 'absolute',
              inset: '32px',
              border: '1px solid #c9a227',
              pointerEvents: 'none'
            }} />
            {/* 큰 L자 코너 장식 */}
            <CornerBracket position="top-left" size={45} thickness={5} />
            <CornerBracket position="top-right" size={45} thickness={5} />
            <CornerBracket position="bottom-left" size={45} thickness={5} />
            <CornerBracket position="bottom-right" size={45} thickness={5} />
          </>
        );

      case 'royal':
        return (
          <>
            {/* 외부 테두리 */}
            <div style={{
              position: 'absolute',
              inset: '8px',
              border: '7px solid',
              borderImage: 'linear-gradient(180deg, #ffd700 0%, #daa520 15%, #8b7355 30%, #c9a227 50%, #8b7355 70%, #daa520 85%, #ffd700 100%) 1',
              pointerEvents: 'none'
            }} />
            {/* 중간 이중 테두리 */}
            <div style={{
              position: 'absolute',
              inset: '20px',
              border: '3px double',
              borderImage: 'linear-gradient(180deg, #c9a227, #b8860b, #c9a227) 1',
              pointerEvents: 'none'
            }} />
            {/* 내부 테두리 */}
            <div style={{
              position: 'absolute',
              inset: '30px',
              border: '1px solid #daa520',
              pointerEvents: 'none'
            }} />
            {/* 가장 안쪽 테두리 */}
            <div style={{
              position: 'absolute',
              inset: '36px',
              border: '1px solid #c9a227',
              pointerEvents: 'none'
            }} />
            {/* 큰 L자 코너 장식 */}
            <CornerBracket position="top-left" size={50} thickness={6} />
            <CornerBracket position="top-right" size={50} thickness={6} />
            <CornerBracket position="bottom-left" size={50} thickness={6} />
            <CornerBracket position="bottom-right" size={50} thickness={6} />
          </>
        );

      default:
        return null;
    }
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
      {renderBorder()}
      
      {/* 호버 감지 및 컨트롤 영역 */}
      {isEditable && (
        <div
          style={{
            position: 'absolute',
            inset: '0',
            zIndex: 5
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* 화살표 버튼들 */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '-20px',
              transform: 'translateY(-50%)',
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.2s',
              zIndex: 20
            }}
          >
            <button
              onClick={handlePrev}
              style={arrowButtonStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.9)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.7)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              ◀
            </button>
          </div>
          
          <div
            style={{
              position: 'absolute',
              top: '50%',
              right: '-20px',
              transform: 'translateY(-50%)',
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.2s',
              zIndex: 20
            }}
          >
            <button
              onClick={handleNext}
              style={arrowButtonStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.9)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.7)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              ▶
            </button>
          </div>
          
          {/* 현재 스타일 표시 */}
          <div
            style={{
              position: 'absolute',
              top: '-30px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(0,0,0,0.75)',
              color: '#fff',
              padding: '6px 16px',
              borderRadius: '16px',
              fontSize: '13px',
              fontWeight: '500',
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.2s',
              whiteSpace: 'nowrap',
              zIndex: 20
            }}
          >
            🖼️ 테두리: {borderNames[style]} ({currentIndex + 1}/{borderStyles.length})
          </div>
        </div>
      )}
    </>
  );
};

export default BorderFrame;
