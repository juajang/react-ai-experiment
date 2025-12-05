import { useState, useRef } from 'react';
import { CertificateForm, CertificatePreview } from '../components';
import { MainLayout, PreviewContainer } from '../layout';
import type { CertificateFormData, CertificateField } from '../types/certificate';

const EditPage = () => {
  const [form, setForm] = useState<CertificateFormData>({
    number: '제 2021-010호',
    title: '상 장',
    awardTitle: '성적우수상 : 국어',
    grade: '2학년 5반',
    name: '홍길동',
    content: '위 학생은 2021학년도 2학기 상기 과목에서\n우수한 성적을 거두었으므로\n이 상장을 수여함.',
    date: '2021년 4월 21일',
    issuer: '중앙중학교장'
  });
  
  const certRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const handleChange = (field: CertificateField, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
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
    <MainLayout>
      <CertificateForm
        form={form}
        onChange={handleChange}
        onDownload={downloadPNG}
        downloading={downloading}
      />
      <PreviewContainer>
        <CertificatePreview ref={certRef} form={form} />
      </PreviewContainer>
    </MainLayout>
  );
};

export default EditPage;

