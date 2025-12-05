import React from 'react';
import InputField from './InputField';
import { CertificateFormData, CertificateField } from '../types/certificate';

interface CertificateFormProps {
  form: CertificateFormData;
  onChange: (field: CertificateField, value: string) => void;
  onDownload: () => void;
  downloading: boolean;
}

const CertificateForm: React.FC<CertificateFormProps> = ({ form, onChange, onDownload, downloading }) => {
  return (
    <div 
      style={{ 
        width: '320px', 
        padding: '20px', 
        backgroundColor: '#fff', 
        borderRight: '1px solid #e5e7eb', 
        overflowY: 'auto' 
      }}
    >
      <h2 
        style={{ 
          fontSize: '20px', 
          fontWeight: '700', 
          marginBottom: '20px', 
          color: '#111827' 
        }}
      >
        📝 상장 정보 입력
      </h2>
      
      <InputField label="상장 번호" field="number" value={form.number} onChange={onChange} />
      <InputField label="상장명" field="title" value={form.title} onChange={onChange} />
      <InputField label="상장 제목 (예: 성적우수상)" field="awardTitle" value={form.awardTitle} onChange={onChange} />
      <InputField label="소속 (학년/반)" field="grade" value={form.grade} onChange={onChange} />
      <InputField label="이름" field="name" value={form.name} onChange={onChange} />
      <InputField label="문장 내용" field="content" value={form.content} onChange={onChange} multiline />
      <InputField label="날짜" field="date" value={form.date} onChange={onChange} />
      <InputField label="발급자" field="issuer" value={form.issuer} onChange={onChange} />

      <button
        onClick={onDownload}
        disabled={downloading}
        style={{
          width: '100%',
          marginTop: '16px',
          padding: '12px',
          backgroundColor: downloading ? '#9ca3af' : '#2563eb',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '15px',
          fontWeight: '600',
          cursor: downloading ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.2s'
        }}
      >
        {downloading ? '다운로드 중...' : '📥 PNG 다운로드'}
      </button>
    </div>
  );
};

export default CertificateForm;

