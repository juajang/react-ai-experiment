export interface StampConfig {
  text: string;
  size: number;
  x: number;
  y: number;
}

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
}

export type CertificateField = keyof Omit<CertificateFormData, 'stamp'>;
