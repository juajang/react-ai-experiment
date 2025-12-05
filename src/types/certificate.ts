export interface CertificateFormData {
  number: string;
  title: string;
  awardTitle: string;
  grade: string;
  name: string;
  content: string;
  date: string;
  issuer: string;
}

export type CertificateField = keyof CertificateFormData;
