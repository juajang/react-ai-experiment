import React from 'react';
import InputField from './InputField';
import type { CertificateFormData, CertificateField, StampConfig } from '../types/certificate';

interface CertificateFormProps {
  form: CertificateFormData;
  onChange: (field: CertificateField, value: string) => void;
  onStampChange: (stamp: StampConfig) => void;
  onDownload: () => void;
  downloading: boolean;
}

const CertificateForm: React.FC<CertificateFormProps> = ({ 
  form, 
  onChange, 
  onStampChange,
  onDownload, 
  downloading 
}) => {
  const handleStampTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onStampChange({ ...form.stamp, text: e.target.value });
  };

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

      {/* 직인 설정 섹션 */}
      <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #e5e7eb' }}>
        <h3 
          style={{ 
            fontSize: '16px', 
            fontWeight: '600', 
            marginBottom: '12px', 
            color: '#374151' 
          }}
        >
          🔴 직인 설정
        </h3>
        
        <div style={{ marginBottom: '12px' }}>
          <label 
            style={{ 
              display: 'block', 
              fontSize: '13px', 
              fontWeight: '600', 
              color: '#374151', 
              marginBottom: '4px' 
            }}
          >
            직인 텍스트
          </label>
          <input
            type="text"
            value={form.stamp.text}
            onChange={handleStampTextChange}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <p 
          style={{ 
            fontSize: '12px', 
            color: '#6b7280', 
            marginTop: '8px',
            lineHeight: '1.5'
          }}
        >
          💡 미리보기에서 직인을 클릭하면 크기와 위치를 조절할 수 있습니다.
        </p>
      </div>

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
