export interface StampConfig {
  text: string;
  size: number;
  x: number;
  y: number;
}

export interface TextElementConfig {
  x: number;
  y: number;
  fontSize: number;
  scaleX?: number;
}

export interface TextLayoutConfig {
  number: TextElementConfig;
  title: TextElementConfig;
  awardTitle: TextElementConfig;
  grade: TextElementConfig;
  name: TextElementConfig;
  content: TextElementConfig;
  date: TextElementConfig;
  issuer: TextElementConfig;
}

export type BorderStyle = 
  | 'border1' 
  | 'border2' 
  | 'border3' 
  | 'border4' 
  | 'border5' 
  | 'border6' 
  | 'border7' 
  | 'border9' 
  | 'border10';

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
  textLayout: TextLayoutConfig;
}

export type CertificateField = keyof Omit<CertificateFormData, 'stamp' | 'borderStyle' | 'textLayout'>;
export type TextLayoutField = keyof TextLayoutConfig;
