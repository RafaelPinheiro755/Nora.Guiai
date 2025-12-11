export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}

export enum PricingTier {
  ONE_MONTH = 'Viajante (1 Mês)',
  RESIDENT = 'Morador (6 Meses)',
  ENTERPRISE = 'Empresarial'
}

export interface PricingPlan {
  name: PricingTier;
  price: string;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
  bgColor?: string; // Optional custom bg class
}