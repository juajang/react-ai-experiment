import { forwardRef } from 'react';
import BorderFrame from './BorderFrame';
import Stamp from './Stamp';
import type { CertificateFormData, StampConfig, BorderStyle } from '../types/certificate';

interface CertificatePreviewProps {
  form: CertificateFormData;
  onStampChange: (stamp: StampConfig) => void;
  onBorderStyleChange: (style: BorderStyle) => void;
  isEditable?: boolean;
}

const CertificatePreview = forwardRef<HTMLDivElement, CertificatePreviewProps>(
  ({ form, onStampChange, onBorderStyleChange, isEditable = true }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        width: '595px',
        height: '842px',
        backgroundColor: '#fffef5',
        position: 'relative',
        boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
        padding: '40px',
        overflow: 'hidden'
      }}
    >
      <BorderFrame 
        style={form.borderStyle} 
        onStyleChange={onBorderStyleChange}
        isEditable={isEditable}
      />

      <div style={{ 
        position: 'relative', 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        padding: '20px',
        zIndex: 10,
        pointerEvents: 'none'
      }}>
        
        <div style={{ textAlign: 'left', fontSize: '12px', color: '#666', fontFamily: 'serif', marginBottom: '20px' }}>
          {form.number}
        </div>

        <div style={{ textAlign: 'center', fontSize: '52px', fontWeight: '700', color: '#1a1a1a', fontFamily: '"Noto Serif KR", "Nanum Myeongjo", "Batang", serif', letterSpacing: '20px', marginBottom: '30px' }}>
          {form.title}
        </div>

        <div style={{ textAlign: 'center', fontSize: '22px', fontWeight: '600', color: '#333', fontFamily: '"Noto Serif KR", "Nanum Myeongjo", "Batang", serif', marginBottom: '40px', borderBottom: '1px solid #d4af37', borderTop: '1px solid #d4af37', padding: '10px 0' }}>
          {form.awardTitle}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: '30px', marginBottom: '50px', fontFamily: '"Noto Serif KR", "Nanum Myeongjo", "Batang", serif' }}>
          <span style={{ fontSize: '18px', color: '#444' }}>{form.grade}</span>
          <span style={{ fontSize: '28px', fontWeight: '700', color: '#1a1a1a' }}>{form.name}</span>
        </div>

        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ fontSize: '16px', lineHeight: '2.2', color: '#333', fontFamily: '"Noto Serif KR", "Nanum Myeongjo", "Batang", serif', textAlign: 'center', whiteSpace: 'pre-line', maxWidth: '400px' }}>
            {form.content}
          </p>
        </div>

        <div style={{ textAlign: 'center', fontSize: '16px', color: '#444', fontFamily: '"Noto Serif KR", "Nanum Myeongjo", "Batang", serif', marginBottom: '40px' }}>
          {form.date}
        </div>

        <div style={{ textAlign: 'center', fontSize: '20px', fontWeight: '600', color: '#1a1a1a', fontFamily: '"Noto Serif KR", "Nanum Myeongjo", "Batang", serif', position: 'relative', height: '60px', pointerEvents: 'auto' }}>
          <span>{form.issuer}</span>
          <Stamp stamp={form.stamp} onStampChange={onStampChange} isEditable={isEditable} />
        </div>
      </div>
    </div>
  );
});

CertificatePreview.displayName = 'CertificatePreview';

export default CertificatePreview;
