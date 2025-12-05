import { forwardRef } from 'react';
import BorderFrame from './BorderFrame';
import Stamp from './Stamp';
import DraggableText from './DraggableText';
import type { CertificateFormData, StampConfig, BorderStyle, TextLayoutConfig, TextElementConfig } from '../types/certificate';

interface CertificatePreviewProps {
  form: CertificateFormData;
  onStampChange: (stamp: StampConfig) => void;
  onBorderStyleChange: (style: BorderStyle) => void;
  onTextLayoutChange: (field: keyof TextLayoutConfig, config: TextElementConfig) => void;
  isEditable?: boolean;
}

const CertificatePreview = forwardRef<HTMLDivElement, CertificatePreviewProps>(
  ({ form, onStampChange, onBorderStyleChange, onTextLayoutChange, isEditable = true }, ref) => {
  
  const fontFamily = '"Noto Serif KR", "Nanum Myeongjo", "Batang", serif';

  return (
    <div
      ref={ref}
      style={{
        width: '595px',
        height: '842px',
        backgroundColor: '#fffef5',
        position: 'relative',
        boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
        overflow: 'hidden'
      }}
    >
      <BorderFrame 
        style={form.borderStyle} 
        onStyleChange={onBorderStyleChange}
        isEditable={isEditable}
      />

      {/* 텍스트 요소들을 배치할 영역 */}
      <div style={{ 
        position: 'absolute',
        inset: '60px',
        zIndex: 10
      }}>
        
        {/* 상장번호 */}
        <DraggableText
          config={form.textLayout.number}
          onChange={(config) => onTextLayoutChange('number', config)}
          isEditable={isEditable}
          defaultFontSize={12}
          minFontSize={8}
          maxFontSize={20}
          style={{
            color: '#666',
            fontFamily: 'serif',
            left: `${60 + form.textLayout.number.x}px`,
            top: `${30 + form.textLayout.number.y}px`,
            transform: 'none'
          }}
        >
          {form.number}
        </DraggableText>

        {/* 상장 제목 */}
        <DraggableText
          config={form.textLayout.title}
          onChange={(config) => onTextLayoutChange('title', config)}
          isEditable={isEditable}
          defaultFontSize={52}
          minFontSize={30}
          maxFontSize={80}
          style={{
            fontWeight: '700',
            color: '#1a1a1a',
            fontFamily,
            letterSpacing: '20px',
            left: `calc(50% + ${form.textLayout.title.x}px)`,
            top: `${100 + form.textLayout.title.y}px`,
            transform: 'translateX(-50%)'
          }}
        >
          {form.title}
        </DraggableText>

        {/* 상 종류 */}
        <DraggableText
          config={form.textLayout.awardTitle}
          onChange={(config) => onTextLayoutChange('awardTitle', config)}
          isEditable={isEditable}
          defaultFontSize={22}
          minFontSize={14}
          maxFontSize={36}
          style={{
            fontWeight: '600',
            color: '#333',
            fontFamily,
            borderBottom: '1px solid #d4af37',
            borderTop: '1px solid #d4af37',
            padding: '10px 20px',
            left: `calc(50% + ${form.textLayout.awardTitle.x}px)`,
            top: `${180 + form.textLayout.awardTitle.y}px`,
            transform: 'translateX(-50%)'
          }}
        >
          {form.awardTitle}
        </DraggableText>

        {/* 학년/반 */}
        <DraggableText
          config={form.textLayout.grade}
          onChange={(config) => onTextLayoutChange('grade', config)}
          isEditable={isEditable}
          defaultFontSize={18}
          minFontSize={12}
          maxFontSize={30}
          style={{
            color: '#444',
            fontFamily,
            left: `calc(40% + ${form.textLayout.grade.x}px)`,
            top: `${280 + form.textLayout.grade.y}px`,
            transform: 'translateX(-50%)'
          }}
        >
          {form.grade}
        </DraggableText>

        {/* 이름 */}
        <DraggableText
          config={form.textLayout.name}
          onChange={(config) => onTextLayoutChange('name', config)}
          isEditable={isEditable}
          defaultFontSize={28}
          minFontSize={18}
          maxFontSize={50}
          style={{
            fontWeight: '700',
            color: '#1a1a1a',
            fontFamily,
            left: `calc(60% + ${form.textLayout.name.x}px)`,
            top: `${280 + form.textLayout.name.y}px`,
            transform: 'translateX(-50%)'
          }}
        >
          {form.name}
        </DraggableText>

        {/* 내용 */}
        <DraggableText
          config={form.textLayout.content}
          onChange={(config) => onTextLayoutChange('content', config)}
          isEditable={isEditable}
          defaultFontSize={16}
          minFontSize={12}
          maxFontSize={28}
          style={{
            color: '#333',
            fontFamily,
            textAlign: 'center',
            whiteSpace: 'pre-line',
            lineHeight: '2.2',
            maxWidth: '400px',
            left: `calc(50% + ${form.textLayout.content.x}px)`,
            top: `${420 + form.textLayout.content.y}px`,
            transform: 'translateX(-50%)'
          }}
        >
          {form.content}
        </DraggableText>

        {/* 날짜 */}
        <DraggableText
          config={form.textLayout.date}
          onChange={(config) => onTextLayoutChange('date', config)}
          isEditable={isEditable}
          defaultFontSize={16}
          minFontSize={12}
          maxFontSize={24}
          style={{
            color: '#444',
            fontFamily,
            left: `calc(50% + ${form.textLayout.date.x}px)`,
            top: `${620 + form.textLayout.date.y}px`,
            transform: 'translateX(-50%)'
          }}
        >
          {form.date}
        </DraggableText>

        {/* 발급자 */}
        <DraggableText
          config={form.textLayout.issuer}
          onChange={(config) => onTextLayoutChange('issuer', config)}
          isEditable={isEditable}
          defaultFontSize={20}
          minFontSize={14}
          maxFontSize={32}
          style={{
            fontWeight: '600',
            color: '#1a1a1a',
            fontFamily,
            left: `calc(50% + ${form.textLayout.issuer.x}px)`,
            top: `${700 + form.textLayout.issuer.y}px`,
            transform: 'translateX(-50%)'
          }}
        >
          {form.issuer}
        </DraggableText>

        {/* 직인 */}
        <div style={{ 
          position: 'absolute',
          left: `calc(65% + ${form.textLayout.issuer.x}px)`,
          top: `${680 + form.textLayout.issuer.y}px`,
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
