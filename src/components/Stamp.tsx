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
        const newSize = Math.max(30, Math.min(150, initialStamp.current.size + deltaX));
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

  // 폰트 크기를 도장 크기에 비례하되, 글자 수에 따라 조절
  const textLength = stamp.text.length;
  const baseFontSize = stamp.size * 0.3;
  const fontSize = Math.max(8, baseFontSize / Math.max(1, Math.sqrt(textLength / 2)));

  // 선택 핸들 스타일 (피그마 스타일)
  const handleStyle: React.CSSProperties = {
    position: 'absolute',
    width: '8px',
    height: '8px',
    backgroundColor: '#fff',
    border: '1px solid #0d99ff',
    borderRadius: '1px',
    zIndex: 2
  };

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
            top: '-4px',
            left: '-4px',
            right: '-4px',
            bottom: '-4px',
            border: '1px solid #0d99ff',
            borderRadius: '50%',
            pointerEvents: 'none',
            width: `${stamp.size + 6}px`,
            height: `${stamp.size + 6}px`,
          }}
        />
      )}

      {/* 도장 본체 */}
      <div
        onClick={handleStampClick}
        onMouseDown={isSelected ? handleDragStart : undefined}
        style={{
          width: `${stamp.size}px`,
          height: `${stamp.size}px`,
          border: `2px solid #cc3333`,
          borderRadius: '50%',
          cursor: isEditable ? (isSelected ? 'move' : 'pointer') : 'default',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          userSelect: 'none',
          padding: `${stamp.size * 0.1}px`,
          boxSizing: 'border-box',
          backgroundColor: 'transparent'
        }}
      >
        <span
          style={{
            fontSize: `${fontSize}px`,
            color: '#cc3333',
            fontWeight: '700',
            textAlign: 'center',
            lineHeight: '1.2',
            wordBreak: 'break-all',
            overflowWrap: 'break-word',
            fontFamily: '"Gungsuh", "궁서체", "Batang", serif',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%'
          }}
        >
          {stamp.text}
        </span>
      </div>
      
      {/* 피그마 스타일 리사이즈 핸들들 */}
      {isSelected && isEditable && (
        <>
          {/* 우하단 핸들 (리사이즈) */}
          <div
            onMouseDown={handleResizeStart}
            style={{
              ...handleStyle,
              right: '-4px',
              bottom: '-4px',
              cursor: 'nwse-resize'
            }}
          />
          {/* 우상단 핸들 (장식) */}
          <div
            style={{
              ...handleStyle,
              right: '-4px',
              top: '-4px',
              cursor: 'default',
              pointerEvents: 'none'
            }}
          />
          {/* 좌하단 핸들 (장식) */}
          <div
            style={{
              ...handleStyle,
              left: '-4px',
              bottom: '-4px',
              cursor: 'default',
              pointerEvents: 'none'
            }}
          />
          {/* 좌상단 핸들 (장식) */}
          <div
            style={{
              ...handleStyle,
              left: '-4px',
              top: '-4px',
              cursor: 'default',
              pointerEvents: 'none'
            }}
          />
        </>
      )}
    </div>
  );
};

export default Stamp;
