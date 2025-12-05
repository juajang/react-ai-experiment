import React, { useState, useRef, useEffect } from 'react';
import type { TextElementConfig } from '../types/certificate';

interface DraggableTextProps {
  config: TextElementConfig;
  onChange: (config: TextElementConfig) => void;
  isEditable?: boolean;
  children: React.ReactNode;
  defaultFontSize: number;
  minFontSize?: number;
  maxFontSize?: number;
  style?: React.CSSProperties;
  allowHorizontalResize?: boolean;
}

const DraggableText: React.FC<DraggableTextProps> = ({
  config,
  onChange,
  isEditable = true,
  children,
  defaultFontSize,
  minFontSize = 10,
  maxFontSize = 80,
  style = {},
  allowHorizontalResize = false
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isResizingX, setIsResizingX] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const initialConfig = useRef({ x: 0, y: 0, fontSize: 0, scaleX: 1 });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (elementRef.current && !elementRef.current.contains(e.target as Node)) {
        setIsSelected(false);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - dragStartPos.current.x;
        const deltaY = e.clientY - dragStartPos.current.y;
        onChange({
          ...config,
          x: initialConfig.current.x + deltaX,
          y: initialConfig.current.y + deltaY
        });
      } else if (isResizing) {
        const deltaY = e.clientY - dragStartPos.current.y;
        const newFontSize = Math.max(minFontSize, Math.min(maxFontSize, initialConfig.current.fontSize + deltaY * 0.5));
        onChange({
          ...config,
          fontSize: Math.round(newFontSize)
        });
      } else if (isResizingX) {
        const deltaX = e.clientX - dragStartPos.current.x;
        const newScaleX = Math.max(0.5, Math.min(2, initialConfig.current.scaleX + deltaX * 0.005));
        onChange({
          ...config,
          scaleX: Math.round(newScaleX * 100) / 100
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setIsResizingX(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, isResizingX, config, onChange, minFontSize, maxFontSize]);

  const handleClick = (e: React.MouseEvent) => {
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
    initialConfig.current = { x: config.x, y: config.y, fontSize: config.fontSize, scaleX: config.scaleX || 1 };
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsResizing(true);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    initialConfig.current = { x: config.x, y: config.y, fontSize: config.fontSize, scaleX: config.scaleX || 1 };
  };

  const handleResizeXStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsResizingX(true);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    initialConfig.current = { x: config.x, y: config.y, fontSize: config.fontSize, scaleX: config.scaleX || 1 };
  };

  const currentFontSize = config.fontSize || defaultFontSize;
  const currentScaleX = config.scaleX || 1;

  const handleStyle: React.CSSProperties = {
    position: 'absolute',
    width: '8px',
    height: '8px',
    backgroundColor: '#fff',
    border: '1.5px solid #0d99ff',
    borderRadius: '2px',
    zIndex: 100
  };

  return (
    <div
      ref={elementRef}
      onClick={handleClick}
      onMouseDown={isSelected ? handleDragStart : undefined}
      style={{
        position: 'absolute',
        left: `calc(50% + ${config.x}px)`,
        top: `calc(50% + ${config.y}px)`,
        transform: `translate(-50%, -50%) scaleX(${currentScaleX})`,
        cursor: isEditable ? (isSelected ? 'move' : 'pointer') : 'default',
        userSelect: 'none',
        pointerEvents: 'auto',
        ...style,
        fontSize: `${currentFontSize}px`
      }}
    >
      {/* 선택 테두리 */}
      {isSelected && isEditable && (
        <div
          style={{
            position: 'absolute',
            top: '-6px',
            left: '-6px',
            right: '-6px',
            bottom: '-6px',
            border: '1.5px solid #0d99ff',
            borderRadius: '3px',
            pointerEvents: 'none',
            zIndex: 99
          }}
        />
      )}

      {/* 콘텐츠 */}
      {children}

      {/* 리사이즈 핸들 */}
      {isSelected && isEditable && (
        <>
          {/* 우하단 - 세로 리사이즈 */}
          <div
            onMouseDown={handleResizeStart}
            style={{
              ...handleStyle,
              right: '-5px',
              bottom: '-5px',
              cursor: 'ns-resize'
            }}
          />
          {/* 우측 중앙 - 가로 리사이즈 */}
          {allowHorizontalResize && (
            <div
              onMouseDown={handleResizeXStart}
              style={{
                ...handleStyle,
                right: '-5px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'ew-resize'
              }}
            />
          )}
          <div style={{ ...handleStyle, right: '-5px', top: '-5px', pointerEvents: 'none' }} />
          <div style={{ ...handleStyle, left: '-5px', bottom: '-5px', pointerEvents: 'none' }} />
          <div style={{ ...handleStyle, left: '-5px', top: '-5px', pointerEvents: 'none' }} />
        </>
      )}
    </div>
  );
};

export default DraggableText;
