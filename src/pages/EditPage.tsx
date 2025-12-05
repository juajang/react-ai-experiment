import { useState, useRef } from 'react';
import { CertificatePreview } from '../components';
import type { CertificateFormData, CertificateField, StampConfig, BorderStyle, TextLayoutConfig, TextElementConfig } from '../types/certificate';

// 기본 텍스트 레이아웃 설정
const defaultTextLayout: TextLayoutConfig = {
  number: { x: 0, y: 0, fontSize: 12 },
  title: { x: 0, y: 0, fontSize: 52 },
  awardTitle: { x: 0, y: 0, fontSize: 22 },
  grade: { x: 0, y: 0, fontSize: 18 },
  name: { x: 0, y: 0, fontSize: 28 },
  content: { x: 0, y: 0, fontSize: 16 },
  date: { x: 0, y: 0, fontSize: 16 },
  issuer: { x: 0, y: 0, fontSize: 20 }
};

const EditPage = () => {
  const [form, setForm] = useState<CertificateFormData>({
    number: '제 2021-010호',
    title: '상 장',
    awardTitle: '성적우수상 : 국어',
    grade: '2학년 5반',
    name: '홍길동',
    content: '위 학생은 2021학년도 2학기 상기 과목에서\n우수한 성적을 거두었으므로\n이 상장을 수여함.',
    date: '2021년 4월 21일',
    issuer: '중앙중학교장',
    stamp: {
      text: '중앙중',
      size: 60,
      x: 10,
      y: -5
    },
    borderStyle: 'border1',
    textLayout: defaultTextLayout
  });
  
  const certRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const handleChange = (field: CertificateField, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleStampChange = (stamp: StampConfig) => {
    setForm(prev => ({ ...prev, stamp }));
  };

  const handleBorderStyleChange = (borderStyle: BorderStyle) => {
    setForm(prev => ({ ...prev, borderStyle }));
  };

  const handleTextLayoutChange = (field: keyof TextLayoutConfig, config: TextElementConfig) => {
    setForm(prev => ({
      ...prev,
      textLayout: {
        ...prev.textLayout,
        [field]: config
      }
    }));
  };

  const downloadPNG = async () => {
    if (!certRef.current) return;
    setDownloading(true);
    
    try {
      // @ts-expect-error Dynamic import from CDN
      const html2canvas = (await import('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.esm.min.js')).default;
      const canvas = await html2canvas(certRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#fff'
      });
      const link = document.createElement('a');
      link.download = `상장_${form.name}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (e) {
      console.error('Download failed:', e);
      alert('다운로드에 실패했습니다.');
    }
    setDownloading(false);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f3f4f6',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        fontFamily: 'system-ui, sans-serif'
      }}
    >
      {/* 상장 프리뷰 */}
      <CertificatePreview 
        ref={certRef} 
        form={form} 
        onStampChange={handleStampChange}
        onBorderStyleChange={handleBorderStyleChange}
        onTextLayoutChange={handleTextLayoutChange}
        onFieldChange={handleChange}
      />
      
      {/* 다운로드 버튼 */}
      <button
        onClick={downloadPNG}
        disabled={downloading}
        style={{
          marginTop: '30px',
          padding: '16px 48px',
          fontSize: '18px',
          fontWeight: '600',
          color: '#fff',
          backgroundColor: downloading ? '#9ca3af' : '#2563eb',
          border: 'none',
          borderRadius: '12px',
          cursor: downloading ? 'not-allowed' : 'pointer',
          boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)',
          transition: 'all 0.2s',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}
        onMouseEnter={(e) => {
          if (!downloading) {
            e.currentTarget.style.backgroundColor = '#1d4ed8';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }
        }}
        onMouseLeave={(e) => {
          if (!downloading) {
            e.currentTarget.style.backgroundColor = '#2563eb';
            e.currentTarget.style.transform = 'translateY(0)';
          }
        }}
      >
        {downloading ? '⏳ 다운로드 중...' : '📥 PNG 다운로드'}
      </button>
      
      {/* 안내 텍스트 */}
      <p
        style={{
          marginTop: '20px',
          fontSize: '14px',
          color: '#6b7280',
          textAlign: 'center'
        }}
      >
        💡 텍스트를 <strong>더블클릭</strong>하여 수정 | <strong>드래그</strong>하여 이동 | <strong>모서리</strong>를 드래그하여 크기 조절
      </p>
    </div>
  );
};

export default EditPage;
