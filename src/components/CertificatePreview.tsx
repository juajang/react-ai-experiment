import React, { forwardRef } from 'react';
import CornerDecoration from './CornerDecoration';
import { CertificateFormData } from '../types/certificate';

interface CertificatePreviewProps {
  form: CertificateFormData;
}

const CertificatePreview = forwardRef<HTMLDivElement, CertificatePreviewProps>(({ form }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        width: '595px',
        height: '842px',
        backgroundColor: '#fffef5',
        position: 'relative',
        boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
        padding: '40px'
      }}
    >
      {/* 금색 테두리 프레임 */}
      <div style={{
        position: 'absolute',
        inset: '20px',
        border: '4px double #c9a227',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        inset: '30px',
        border: '2px solid #d4af37',
        pointerEvents: 'none'
      }} />
      
      {/* 코너 장식 */}
      <CornerDecoration position="top-left" />
      <CornerDecoration position="top-right" />
      <CornerDecoration position="bottom-left" />
      <CornerDecoration position="bottom-right" />

      {/* 상장 내용 */}
      <div style={{ 
        position: 'relative', 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        padding: '20px' 
      }}>
        
        {/* 상장 번호 */}
        <div style={{ 
          textAlign: 'left', 
          fontSize: '12px', 
          color: '#666', 
          fontFamily: 'serif', 
          marginBottom: '20px' 
        }}>
          {form.number}
        </div>

        {/* 상장명 (큰 제목) */}
        <div style={{
          textAlign: 'center',
          fontSize: '52px',
          fontWeight: '700',
          color: '#1a1a1a',
          fontFamily: '"Nanum Myeongjo", "Batang", serif',
          letterSpacing: '20px',
          marginBottom: '30px'
        }}>
          {form.title}
        </div>

        {/* 상장 제목 */}
        <div style={{
          textAlign: 'center',
          fontSize: '22px',
          fontWeight: '600',
          color: '#333',
          fontFamily: '"Nanum Myeongjo", "Batang", serif',
          marginBottom: '40px',
          borderBottom: '1px solid #d4af37',
          borderTop: '1px solid #d4af37',
          padding: '10px 0'
        }}>
          {form.awardTitle}
        </div>

        {/* 소속 및 이름 */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'baseline',
          gap: '30px',
          marginBottom: '50px',
          fontFamily: '"Nanum Myeongjo", "Batang", serif'
        }}>
          <span style={{ fontSize: '18px', color: '#444' }}>{form.grade}</span>
          <span style={{ fontSize: '28px', fontWeight: '700', color: '#1a1a1a' }}>{form.name}</span>
        </div>

        {/* 본문 내용 */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <p style={{
            fontSize: '16px',
            lineHeight: '2.2',
            color: '#333',
            fontFamily: '"Nanum Myeongjo", "Batang", serif',
            textAlign: 'center',
            whiteSpace: 'pre-line',
            maxWidth: '400px'
          }}>
            {form.content}
          </p>
        </div>

        {/* 날짜 */}
        <div style={{
          textAlign: 'center',
          fontSize: '16px',
          color: '#444',
          fontFamily: '"Nanum Myeongjo", "Batang", serif',
          marginBottom: '40px'
        }}>
          {form.date}
        </div>

        {/* 발급자 */}
        <div style={{
          textAlign: 'center',
          fontSize: '20px',
          fontWeight: '600',
          color: '#1a1a1a',
          fontFamily: '"Nanum Myeongjo", "Batang", serif'
        }}>
          {form.issuer}
          {/* 직인 자리 */}
          <div style={{
            display: 'inline-block',
            marginLeft: '10px',
            width: '50px',
            height: '50px',
            border: '2px solid #cc3333',
            borderRadius: '50%',
            position: 'relative',
            verticalAlign: 'middle'
          }}>
            <span style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '10px',
              color: '#cc3333',
              fontWeight: '700'
            }}>직인</span>
          </div>
        </div>
      </div>
    </div>
  );
});

CertificatePreview.displayName = 'CertificatePreview';

export default CertificatePreview;

