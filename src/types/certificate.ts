export interface StampConfig {
  text: string;
  size: number;
  x: number;
  y: number;
}

export type BorderStyle = 'simple' | 'classic' | 'elegant' | 'ornate' | 'royal';

export interface CertificateFormData {
  number: string;
  title: string;
  awardTitle: string;
  grade: string;
  name: string;
  content: string;
  date: string;
  issuer: string;
  stamp: StampConfig;
  borderStyle: BorderStyle;
}

export type CertificateField = keyof Omit<CertificateFormData, 'stamp' | 'borderStyle'>;
