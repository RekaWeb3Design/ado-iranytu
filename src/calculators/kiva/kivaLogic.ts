import { TaxParams } from '../../state/taxConfigStore';

export type KivaInput = {
  bevetelek: number;
  uzletiKoltsegek: number;
  berkoltseg: number;
  osztalek: number;
};

export type KivaResult = {
  kivaAlap: number;
  kivaAdo: number;
  szocho: number;
  osztalekAdo: number;
  osszesAdo: number;
  effektivAdoRata: number;
};

// A kalkuláció célja, hogy transzparensen megmutassa a kisvállalati adó várható terhét.
// A képlet leegyszerűsített, oktatási célokat szolgál, és a központi paramétereket használja.
export const calculateKiva = (input: KivaInput, params: TaxParams): KivaResult => {
  const nyereseg = input.bevetelek - input.uzletiKoltsegek;
  // A KIVA alapja a pénzforgalmi szemléletű eredmény + személyi jellegű kifizetések.
  const kivaAlap = Math.max(nyereseg + input.berkoltseg, 0);
  const kivaAdo = kivaAlap * params.kiva.rate;

  // A munkabér után fizetendő szocho, melyet KIVA esetén is meg kell fizetni.
  const szocho = input.berkoltseg * params.kiva.employerContributionRate;

  // Az osztalékkifizetésre alkalmazott személyi jövedelemadó.
  const osztalekAdo = input.osztalek * params.kiva.dividendTaxRate;

  const osszesAdo = kivaAdo + szocho + osztalekAdo;
  const effektivAdoRata = input.bevetelek > 0 ? osszesAdo / input.bevetelek : 0;

  return {
    kivaAlap,
    kivaAdo,
    szocho,
    osztalekAdo,
    osszesAdo,
    effektivAdoRata,
  };
};
