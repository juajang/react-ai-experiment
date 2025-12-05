import { forwardRef, useState } from 'react';
import BorderFrame from './BorderFrame';
import Stamp from './Stamp';
import DraggableText from './DraggableText';
import type { CertificateFormData, StampConfig, BorderStyle, TextLayoutConfig, TextElementConfig, CertificateField } from '../types/certificate';

interface CertificatePreviewProps {
  form: CertificateFormData;
  onStampChange: (stamp: StampConfig) => void;
  onBorderStyleChange: (style: BorderStyle) => void;
  onTextLayoutChange: (field: keyof TextLayoutConfig, config: TextElementConfig) => void;
  onFieldChange: (field: CertificateField, value: string) => void;
  isEditable?: boolean;
}

interface SnapState {
  horizontal: boolean;
  vertical: boolean;
  isDragging: boolean;
}

const CertificatePreview = forwardRef<HTMLDivElement, CertificatePreviewProps>(
  ({ form, onStampChange, onBorderStyleChange, onTextLayoutChange, onFieldChange, isEditable = true }, ref) => {
  
  const fontFamily = '"Noto Serif KR", "Nanum Myeongjo", "Batang", serif';
  const [snapState, setSnapState] = useState<SnapState>({ horizontal: false, vertical: false, isDragging: false });

  const handleSnapChange = (snap: SnapState) => {
    setSnapState(snap);
  };

  const activeColor = '#0d99ff';
  const inactiveColor = '#ddd';

  return (
    <div
      ref={ref}
      style={{
        width: '595px',
        height: '842px',
        backgroundColor: '#fffef5',
        position: 'relative',
        boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
        overflow: 'visible'
      }}
    >
      <BorderFrame 
        style={form.borderStyle} 
        onStyleChange={onBorderStyleChange}
        isEditable={isEditable}
      />

      {/* 수직 중앙 보조선 - 드래그 중에만 표시 */}
      {snapState.isDragging && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '55px',
            bottom: '55px',
            width: snapState.horizontal ? '2px' : '1px',
            marginLeft: snapState.horizontal ? '-1px' : '-0.5px',
            borderLeft: snapState.horizontal 
              ? `2px solid ${activeColor}` 
              : `1px dashed ${inactiveColor}`,
            opacity: snapState.horizontal ? 1 : 0.5,
            boxShadow: snapState.horizontal ? `0 0 8px ${activeColor}` : 'none',
            pointerEvents: 'none',
            zIndex: 1000,
            transition: 'opacity 0.1s ease-out'
          }}
        />
      )}

      {/* 수평 중앙 보조선 - 드래그 중에만 표시 */}
      {snapState.isDragging && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '55px',
            right: '55px',
            height: snapState.vertical ? '2px' : '1px',
            marginTop: snapState.vertical ? '-1px' : '-0.5px',
            borderTop: snapState.vertical 
              ? `2px solid ${activeColor}` 
              : `1px dashed ${inactiveColor}`,
            opacity: snapState.vertical ? 1 : 0.5,
            boxShadow: snapState.vertical ? `0 0 8px ${activeColor}` : 'none',
            pointerEvents: 'none',
            zIndex: 1000,
            transition: 'opacity 0.1s ease-out'
          }}
        />
      )}

      {/* 텍스트 요소들을 배치할 영역 */}
      <div style={{ 
        position: 'absolute',
        top: '55px',
        left: '55px',
        right: '55px',
        bottom: '55px',
        zIndex: 10
      }}>
        
        {/* 상장번호 - 왼쪽 상단 */}
        <DraggableText
          config={form.textLayout.number}
          onChange={(config) => onTextLayoutChange('number', config)}
          text={form.number}
          onTextChange={(text) => onFieldChange('number', text)}
          onSnapChange={handleSnapChange}
          isEditable={isEditable}
          defaultFontSize={14}
          minFontSize={10}
          maxFontSize={20}
          style={{
            color: '#888',
            fontFamily: 'serif',
            fontStyle: 'italic',
            left: `${0 + form.textLayout.number.x}px`,
            top: `${0 + form.textLayout.number.y}px`,
            transform: 'none'
          }}
        />

        {/* 상장 제목 - 중앙 */}
        <DraggableText
          config={form.textLayout.title}
          onChange={(config) => onTextLayoutChange('title', config)}
          text={form.title}
          onTextChange={(text) => onFieldChange('title', text)}
          onSnapChange={handleSnapChange}
          isEditable={isEditable}
          defaultFontSize={48}
          minFontSize={30}
          maxFontSize={70}
          style={{
            fontWeight: '700',
            color: '#1a1a1a',
            fontFamily,
            letterSpacing: '40px',
            paddingLeft: '40px',
            whiteSpace: 'nowrap',
            left: `calc(50% + ${form.textLayout.title.x}px)`,
            top: `${70 + form.textLayout.title.y}px`,
            transform: 'translateX(-50%)'
          }}
        />

        {/* 상 종류 - 중앙, 위아래 선 */}
        <DraggableText
          config={form.textLayout.awardTitle}
          onChange={(config) => onTextLayoutChange('awardTitle', config)}
          text={form.awardTitle}
          onTextChange={(text) => onFieldChange('awardTitle', text)}
          onSnapChange={handleSnapChange}
          isEditable={isEditable}
          defaultFontSize={20}
          minFontSize={14}
          maxFontSize={32}
          style={{
            color: '#333',
            fontFamily,
            borderTop: '1px solid #c9a227',
            borderBottom: '1px solid #c9a227',
            padding: '15px 80px',
            whiteSpace: 'nowrap',
            left: `calc(50% + ${form.textLayout.awardTitle.x}px)`,
            top: `${160 + form.textLayout.awardTitle.y}px`,
            transform: 'translateX(-50%)'
          }}
        />

        {/* 학년/반 */}
        <DraggableText
          config={form.textLayout.grade}
          onChange={(config) => onTextLayoutChange('grade', config)}
          text={form.grade}
          onTextChange={(text) => onFieldChange('grade', text)}
          onSnapChange={handleSnapChange}
          isEditable={isEditable}
          defaultFontSize={18}
          minFontSize={12}
          maxFontSize={28}
          style={{
            color: '#555',
            fontFamily,
            left: `calc(35% + ${form.textLayout.grade.x}px)`,
            top: `${270 + form.textLayout.grade.y}px`,
            transform: 'translateX(-50%)'
          }}
        />

        {/* 이름 */}
        <DraggableText
          config={form.textLayout.name}
          onChange={(config) => onTextLayoutChange('name', config)}
          text={form.name}
          onTextChange={(text) => onFieldChange('name', text)}
          onSnapChange={handleSnapChange}
          isEditable={isEditable}
          defaultFontSize={28}
          minFontSize={18}
          maxFontSize={44}
          style={{
            fontWeight: '700',
            color: '#1a1a1a',
            fontFamily,
            left: `calc(60% + ${form.textLayout.name.x}px)`,
            top: `${265 + form.textLayout.name.y}px`,
            transform: 'translateX(-50%)'
          }}
        />

        {/* 내용 */}
        <DraggableText
          config={form.textLayout.content}
          onChange={(config) => onTextLayoutChange('content', config)}
          text={form.content}
          onTextChange={(text) => onFieldChange('content', text)}
          onSnapChange={handleSnapChange}
          isEditable={isEditable}
          defaultFontSize={16}
          minFontSize={12}
          maxFontSize={24}
          allowHorizontalResize={true}
          defaultWidth={400}
          multiline={true}
          style={{
            color: '#333',
            fontFamily,
            textAlign: 'center',
            whiteSpace: 'pre-wrap',
            wordBreak: 'keep-all',
            lineHeight: '2',
            left: `calc(50% + ${form.textLayout.content.x}px)`,
            top: `${400 + form.textLayout.content.y}px`,
            transform: 'translateX(-50%)'
          }}
        />

        {/* 날짜 */}
        <DraggableText
          config={form.textLayout.date}
          onChange={(config) => onTextLayoutChange('date', config)}
          text={form.date}
          onTextChange={(text) => onFieldChange('date', text)}
          onSnapChange={handleSnapChange}
          isEditable={isEditable}
          defaultFontSize={16}
          minFontSize={12}
          maxFontSize={22}
          style={{
            color: '#333',
            fontFamily,
            left: `calc(50% + ${form.textLayout.date.x}px)`,
            top: `${550 + form.textLayout.date.y}px`,
            transform: 'translateX(-50%)'
          }}
        />

        {/* 발급자 */}
        <DraggableText
          config={form.textLayout.issuer}
          onChange={(config) => onTextLayoutChange('issuer', config)}
          text={form.issuer}
          onTextChange={(text) => onFieldChange('issuer', text)}
          onSnapChange={handleSnapChange}
          isEditable={isEditable}
          defaultFontSize={20}
          minFontSize={14}
          maxFontSize={28}
          style={{
            fontWeight: '600',
            color: '#1a1a1a',
            fontFamily,
            left: `calc(50% + ${form.textLayout.issuer.x}px)`,
            top: `${630 + form.textLayout.issuer.y}px`,
            transform: 'translateX(-50%)'
          }}
        />

        {/* 직인 */}
        <div style={{ 
          position: 'absolute',
          left: `calc(70% + ${form.stamp.x}px)`,
          top: `${620 + form.stamp.y}px`,
          pointerEvents: 'auto'
        }}>
          <Stamp stamp={form.stamp} onStampChange={onStampChange} isEditable={isEditable} />
        </div>
      </div>
    </div>
  );
});

CertificatePreview.displayName = 'CertificatePreview';

export default CertificatePreview;
