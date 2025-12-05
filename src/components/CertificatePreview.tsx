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

  const guideColor = '#0d99ff';

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
            width: '0',
            borderLeft: snapState.horizontal 
              ? `2px dashed ${guideColor}` 
              : `1px dashed ${guideColor}`,
            opacity: snapState.horizontal ? 1 : 0.4,
            pointerEvents: 'none',
            zIndex: 1000
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
            height: '0',
            borderTop: snapState.vertical 
              ? `2px dashed ${guideColor}` 
              : `1px dashed ${guideColor}`,
            opacity: snapState.vertical ? 1 : 0.4,
            pointerEvents: 'none',
            zIndex: 1000
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

        {/* 학년/반과 이름을 함께 배치 */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: `${270 + form.textLayout.grade.y}px`,
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'baseline',
          gap: '20px'
        }}>
          <DraggableText
            config={{ ...form.textLayout.grade, x: 0, y: 0 }}
            onChange={(config) => onTextLayoutChange('grade', { ...config, x: form.textLayout.grade.x, y: form.textLayout.grade.y })}
            text={form.grade}
            onTextChange={(text) => onFieldChange('grade', text)}
            onSnapChange={handleSnapChange}
            isEditable={isEditable}
            defaultFontSize={18}
            minFontSize={12}
            maxFontSize={28}
            style={{
              position: 'relative',
              color: '#555',
              fontFamily,
              left: 'auto',
              top: 'auto',
              transform: 'none'
            }}
          />
          <DraggableText
            config={{ ...form.textLayout.name, x: 0, y: 0 }}
            onChange={(config) => onTextLayoutChange('name', { ...config, x: form.textLayout.name.x, y: form.textLayout.name.y })}
            text={form.name}
            onTextChange={(text) => onFieldChange('name', text)}
            onSnapChange={handleSnapChange}
            isEditable={isEditable}
            defaultFontSize={28}
            minFontSize={18}
            maxFontSize={44}
            style={{
              position: 'relative',
              fontWeight: '700',
              color: '#1a1a1a',
              fontFamily,
              left: 'auto',
              top: 'auto',
              transform: 'none'
            }}
          />
        </div>

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

        {/* 발급자와 직인을 함께 배치 */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: `${630 + form.textLayout.issuer.y}px`,
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <DraggableText
            config={{ ...form.textLayout.issuer, x: 0, y: 0 }}
            onChange={(config) => onTextLayoutChange('issuer', { ...config, x: form.textLayout.issuer.x, y: form.textLayout.issuer.y })}
            text={form.issuer}
            onTextChange={(text) => onFieldChange('issuer', text)}
            onSnapChange={handleSnapChange}
            isEditable={isEditable}
            defaultFontSize={20}
            minFontSize={14}
            maxFontSize={28}
            style={{
              position: 'relative',
              fontWeight: '600',
              color: '#1a1a1a',
              fontFamily,
              left: 'auto',
              top: 'auto',
              transform: 'none'
            }}
          />
          <div style={{ 
            position: 'relative',
            left: `${form.stamp.x}px`,
            top: `${form.stamp.y}px`,
            pointerEvents: 'auto'
          }}>
            <Stamp stamp={form.stamp} onStampChange={onStampChange} isEditable={isEditable} />
          </div>
        </div>
      </div>
    </div>
  );
});

CertificatePreview.displayName = 'CertificatePreview';

export default CertificatePreview;
