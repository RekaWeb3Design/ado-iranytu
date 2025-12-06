import { create } from 'zustand';

export type TaxParams = {
  kiva: {
    rate: number; // KIVA kulcs
    employerContributionRate: number; // szocho bérekre
    dividendTaxRate: number; // osztalék utáni adó
  };
  socialSecurity: {
    healthContributionRate: number;
    pensionContributionRate: number;
    labourMarketContributionRate: number;
  };
};

type TaxConfigState = {
  currentYear: number;
  configVersion: string;
  taxParams: TaxParams;
};

export const useTaxConfigStore = create<TaxConfigState>(() => ({
  currentYear: 2025,
  configVersion: '2025.01',
  taxParams: {
    kiva: {
      rate: 0.1,
      employerContributionRate: 0.13,
      dividendTaxRate: 0.15,
    },
    socialSecurity: {
      healthContributionRate: 0.07,
      pensionContributionRate: 0.1,
      labourMarketContributionRate: 0.015,
    },
  },
}));
