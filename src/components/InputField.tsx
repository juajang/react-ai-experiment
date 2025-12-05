import React from 'react';
import type { CertificateField } from '../types/certificate';

interface InputFieldProps {
  label: string;
  field: CertificateField;
  value: string;
  onChange: (field: CertificateField, value: string) => void;
  multiline?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, field, value, onChange, multiline = false }) => {
  return (
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
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(field, e.target.value)}
          rows={3}
          style={{
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '14px',
            fontFamily: 'inherit',
            resize: 'vertical',
            boxSizing: 'border-box'
          }}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(field, e.target.value)}
          style={{
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '14px',
            boxSizing: 'border-box'
          }}
        />
      )}
    </div>
  );
};

export default InputField;

