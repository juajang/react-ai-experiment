import React, { useState, useRef, useEffect } from 'react';
import type { StampConfig } from '../types/certificate';

interface StampProps {
  stamp: StampConfig;
  onStampChange: (stamp: StampConfig) => void;
  isEditable?: boolean;
}

const Stamp: React.FC<StampProps> = ({ stamp, onStampChange, isEditable = true }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const stampRef = useRef<HTMLDivElement>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const initialStamp = useRef({ x: 0, y: 0, size: 0 });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (stampRef.current && !stampRef.current.contains(e.target as Node)) {
        setIsSelected(false);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - dragStartPos.current.x;
        const deltaY = e.clientY - dragStartPos.current.y;
        onStampChange({
          ...stamp,
          x: initialStamp.current.x + deltaX,
          y: initialStamp.current.y + deltaY
        });
      } else if (isResizing) {
        const deltaX = e.clientX - dragStartPos.current.x;
        const newSize = Math.max(40, Math.min(120, initialStamp.current.size + deltaX));
        onStampChange({
          ...stamp,
          size: newSize
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, stamp, onStampChange]);

  const handleStampClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isEditable) {
      setIsSelected(true);
    }
  };

  const handleDragStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsDragging(true);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    initialStamp.current = { x: stamp.x, y: stamp.y, size: stamp.size };
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsResizing(true);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    initialStamp.current = { x: stamp.x, y: stamp.y, size: stamp.size };
  };

  // 글자를 세로로 배치하기 위해 각 글자를 분리
  const characters = stamp.text.split('');
  const charCount = characters.length;
  
  // 글자 수에 따른 레이아웃 계산
  // 2x2, 2x3 등의 그리드로 배치
  const cols = charCount <= 2 ? 1 : charCount <= 4 ? 2 : charCount <= 6 ? 2 : 3;
  const rows = Math.ceil(charCount / cols);
  
  // 폰트 크기 계산 (도장 크기와 글자 수에 따라)
  const innerSize = stamp.size * 0.75;
  const fontSize = Math.max(10, innerSize / Math.max(cols, rows) * 0.85);

  // 선택 핸들 스타일 (피그마 스타일)
  const handleStyle: React.CSSProperties = {
    position: 'absolute',
    width: '8px',
    height: '8px',
    backgroundColor: '#fff',
    border: '1.5px solid #0d99ff',
    borderRadius: '2px',
    zIndex: 2
  };

  // 인장 색상
  const stampColor = '#c23a2e';

  return (
    <div
      ref={stampRef}
      style={{
        position: 'absolute',
        left: `calc(50% + ${stamp.x}px)`,
        top: `${stamp.y}px`,
      }}
    >
      {/* 피그마 스타일 선택 UI */}
      {isSelected && isEditable && (
        <div
          style={{
            position: 'absolute',
            top: '-5px',
            left: '-5px',
            width: `${stamp.size + 8}px`,
            height: `${stamp.size + 8}px`,
            border: '1.5px solid #0d99ff',
            borderRadius: '3px',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* 도장 본체 - 사각형 인장 스타일 */}
      <div
        onClick={handleStampClick}
        onMouseDown={isSelected ? handleDragStart : undefined}
        style={{
          width: `${stamp.size}px`,
          height: `${stamp.size}px`,
          border: `3px solid ${stampColor}`,
          borderRadius: '4px',
          cursor: isEditable ? (isSelected ? 'move' : 'pointer') : 'default',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          userSelect: 'none',
          boxSizing: 'border-box',
          backgroundColor: 'rgba(255, 252, 245, 0.3)',
          position: 'relative'
        }}
      >
        {/* 내부 테두리 (전통 인장 스타일) */}
        <div
          style={{
            position: 'absolute',
            inset: '3px',
            border: `1.5px solid ${stampColor}`,
            borderRadius: '2px',
            pointerEvents: 'none'
          }}
        />
        
        {/* 글자 영역 - 그리드 레이아웃 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            gap: '1px',
            width: `${innerSize}px`,
            height: `${innerSize}px`,
            alignItems: 'center',
            justifyItems: 'center'
          }}
        >
          {characters.map((char, index) => (
            <span
              key={index}
              style={{
                fontSize: `${fontSize}px`,
                color: stampColor,
                fontWeight: '900',
                fontFamily: '"Noto Serif KR", "Nanum Myeongjo", "Gowun Batang", serif',
                lineHeight: '1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%'
              }}
            >
              {char}
            </span>
          ))}
        </div>
      </div>
      
      {/* 피그마 스타일 리사이즈 핸들들 */}
      {isSelected && isEditable && (
        <>
          {/* 우하단 핸들 (리사이즈) */}
          <div
            onMouseDown={handleResizeStart}
            style={{
              ...handleStyle,
              right: '-5px',
              bottom: '-5px',
              cursor: 'nwse-resize'
            }}
          />
          {/* 우상단 핸들 */}
          <div
            style={{
              ...handleStyle,
              right: '-5px',
              top: '-5px',
              pointerEvents: 'none'
            }}
          />
          {/* 좌하단 핸들 */}
          <div
            style={{
              ...handleStyle,
              left: '-5px',
              bottom: '-5px',
              pointerEvents: 'none'
            }}
          />
          {/* 좌상단 핸들 */}
          <div
            style={{
              ...handleStyle,
              left: '-5px',
              top: '-5px',
              pointerEvents: 'none'
            }}
          />
        </>
      )}
    </div>
  );
};

export default Stamp;
