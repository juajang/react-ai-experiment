import React, { useState, useRef, useEffect } from 'react';
import type { TextElementConfig } from '../types/certificate';

interface SnapState {
  horizontal: boolean;
  vertical: boolean;
}

interface DraggableTextProps {
  config: TextElementConfig;
  onChange: (config: TextElementConfig) => void;
  onTextChange?: (text: string) => void;
  onSnapChange?: (snap: SnapState) => void;
  text: string;
  isEditable?: boolean;
  defaultFontSize: number;
  minFontSize?: number;
  maxFontSize?: number;
  style?: React.CSSProperties;
  allowHorizontalResize?: boolean;
  defaultWidth?: number;
  multiline?: boolean;
  snapThreshold?: number;
}

const DraggableText: React.FC<DraggableTextProps> = ({
  config,
  onChange,
  onTextChange,
  onSnapChange,
  text,
  isEditable = true,
  defaultFontSize,
  minFontSize = 10,
  maxFontSize = 80,
  style = {},
  allowHorizontalResize = false,
  defaultWidth = 400,
  multiline = false,
  snapThreshold = 8
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isResizingWidth, setIsResizingWidth] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLSpanElement>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const initialConfig = useRef({ x: 0, y: 0, fontSize: 0, width: 400 });

  useEffect(() => {
    if (contentRef.current && !isEditing) {
      if (multiline) {
        contentRef.current.innerHTML = text.replace(/\n/g, '<br>');
      } else {
        contentRef.current.textContent = text;
      }
    }
  }, [text, isEditing, multiline]);

  useEffect(() => {
    if (isEditing && contentRef.current) {
      contentRef.current.focus();
      const range = document.createRange();
      range.selectNodeContents(contentRef.current);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }, [isEditing]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (elementRef.current && !elementRef.current.contains(e.target as Node)) {
        if (isEditing) {
          handleFinishEditing();
        }
        setIsSelected(false);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - dragStartPos.current.x;
        const deltaY = e.clientY - dragStartPos.current.y;
        
        let newX = initialConfig.current.x + deltaX;
        let newY = initialConfig.current.y + deltaY;
        
        // 스냅 체크 (중앙은 x=0, y는 컨테이너 중앙 기준)
        const snapH = Math.abs(newX) < snapThreshold;
        const snapV = Math.abs(newY) < snapThreshold;
        
        // 부드러운 스냅 적용
        if (snapH) {
          newX = 0;
        }
        if (snapV) {
          newY = 0;
        }
        
        // 스냅 상태 콜백
        if (onSnapChange) {
          onSnapChange({ horizontal: snapH, vertical: snapV });
        }
        
        onChange({
          ...config,
          x: newX,
          y: newY
        });
      } else if (isResizing) {
        const deltaY = e.clientY - dragStartPos.current.y;
        const newFontSize = Math.max(minFontSize, Math.min(maxFontSize, initialConfig.current.fontSize + deltaY * 0.5));
        onChange({
          ...config,
          fontSize: Math.round(newFontSize)
        });
      } else if (isResizingWidth) {
        const deltaX = e.clientX - dragStartPos.current.x;
        const newWidth = Math.max(100, Math.min(500, initialConfig.current.width + deltaX));
        onChange({
          ...config,
          width: Math.round(newWidth)
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setIsResizingWidth(false);
      // 드래그 종료 시 스냅 해제
      if (onSnapChange) {
        onSnapChange({ horizontal: false, vertical: false });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, isResizingWidth, isEditing, config, onChange, minFontSize, maxFontSize, onSnapChange, snapThreshold]);

  const handleFinishEditing = () => {
    if (contentRef.current && onTextChange) {
      let newText = contentRef.current.innerHTML
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<div>/gi, '\n')
        .replace(/<\/div>/gi, '')
        .replace(/<[^>]*>/g, '');
      const textarea = document.createElement('textarea');
      textarea.innerHTML = newText;
      newText = textarea.value;
      
      if (newText !== text) {
        onTextChange(newText);
      }
    }
    setIsEditing(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isEditable && !isEditing) {
      setIsSelected(true);
    }
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isEditable && onTextChange) {
      setIsEditing(true);
      setIsSelected(true);
    }
  };

  const handleDragStart = (e: React.MouseEvent) => {
    if (isEditing) return;
    e.stopPropagation();
    e.preventDefault();
    setIsDragging(true);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    initialConfig.current = { x: config.x, y: config.y, fontSize: config.fontSize, width: config.width || defaultWidth };
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsResizing(true);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    initialConfig.current = { x: config.x, y: config.y, fontSize: config.fontSize, width: config.width || defaultWidth };
  };

  const handleResizeWidthStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsResizingWidth(true);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    initialConfig.current = { x: config.x, y: config.y, fontSize: config.fontSize, width: config.width || defaultWidth };
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (contentRef.current) {
        if (multiline) {
          contentRef.current.innerHTML = text.replace(/\n/g, '<br>');
        } else {
          contentRef.current.textContent = text;
        }
      }
      setIsEditing(false);
    }
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleFinishEditing();
    }
  };

  const currentFontSize = config.fontSize || defaultFontSize;
  const currentWidth = config.width || defaultWidth;

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
      onDoubleClick={handleDoubleClick}
      onMouseDown={isSelected && !isEditing ? handleDragStart : undefined}
      style={{
        position: 'absolute',
        left: `calc(50% + ${config.x}px)`,
        top: `calc(50% + ${config.y}px)`,
        cursor: isEditable ? (isEditing ? 'text' : isSelected ? 'move' : 'pointer') : 'default',
        userSelect: isEditing ? 'text' : 'none',
        pointerEvents: 'auto',
        ...style,
        fontSize: `${currentFontSize}px`,
        ...(allowHorizontalResize ? { width: `${currentWidth}px` } : {})
      }}
    >
      {/* 선택 테두리 */}
      {isSelected && isEditable && !isEditing && (
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

      {/* 편집 중 테두리 */}
      {isEditing && (
        <div
          style={{
            position: 'absolute',
            top: '-4px',
            left: '-4px',
            right: '-4px',
            bottom: '-4px',
            border: '2px solid #0d99ff',
            borderRadius: '3px',
            pointerEvents: 'none',
            zIndex: 99
          }}
        />
      )}

      {/* 콘텐츠 */}
      <span
        ref={contentRef}
        contentEditable={isEditing}
        suppressContentEditableWarning
        onKeyDown={handleKeyDown}
        onBlur={isEditing ? handleFinishEditing : undefined}
        style={{
          outline: 'none',
          display: 'block',
          minWidth: '10px',
          minHeight: '1em'
        }}
      />

      {/* 리사이즈 핸들 */}
      {isSelected && isEditable && !isEditing && (
        <>
          <div
            onMouseDown={handleResizeStart}
            style={{
              ...handleStyle,
              right: '-5px',
              bottom: '-5px',
              cursor: 'ns-resize'
            }}
          />
          {allowHorizontalResize && (
            <div
              onMouseDown={handleResizeWidthStart}
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
