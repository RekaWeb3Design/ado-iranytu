import { useMemo, useState } from 'react';
import CalculatorLayout from '../../components/CalculatorLayout';
import NumberInput from '../../components/NumberInput';
import ResultsCard from '../../components/ResultsCard';
import ResultsTable from '../../components/ResultsTable';
import ExportButtons from '../../components/ExportButtons';
import { useTaxConfigStore } from '../../state/taxConfigStore';
import { calculateKiva, KivaInput } from './kivaLogic';
import { formatCurrency, formatPercent } from '../../utils/formatters';

const defaultInput: KivaInput = {
  bevetelek: 60000000,
  uzletiKoltsegek: 25000000,
  berkoltseg: 18000000,
  osztalek: 5000000,
};

const KivaCalculator = () => {
  const { taxParams } = useTaxConfigStore();
  const [input, setInput] = useState<KivaInput>(defaultInput);

  const result = useMemo(() => calculateKiva(input, taxParams), [input, taxParams]);

  const exportData = {
    Bevétel: formatCurrency(input.bevetelek),
    'Üzleti költség': formatCurrency(input.uzletiKoltsegek),
    'Bérköltség (bruttó)': formatCurrency(input.berkoltseg),
    Osztalék: formatCurrency(input.osztalek),
    'KIVA alap': formatCurrency(result.kivaAlap),
    'KIVA adó': formatCurrency(result.kivaAdo),
    'Szocho bér után': formatCurrency(result.szocho),
    'Osztalékadó': formatCurrency(result.osztalekAdo),
    'Összes közteher': formatCurrency(result.osszesAdo),
    'Effektív adókulcs': formatPercent(result.effektivAdoRata),
  };

  return (
    <CalculatorLayout
      title="KIVA kalkulátor"
      description="Számold ki a kisvállalati adó várható terhét és az összesített közteher arányt."
    >
      <div className="space-y-4">
        <NumberInput
          label="Éves bevétel"
          helpText="Teljes árbevétel, áfa nélkül, forintban."
          tooltip="A bevétel tartalmazza az összes eladási és szolgáltatási díj bevételt a tárgyévben."
          value={input.bevetelek}
          onChange={(value) => setInput({ ...input, bevetelek: value })}
        />
        <NumberInput
          label="Üzleti költségek"
          helpText="Anyagköltség, igénybe vett szolgáltatások, egyéb működési kiadások."
          tooltip="Ide tartoznak a működéshez szükséges kiadások, amelyeket a pénzforgalmi eredmény számításakor figyelembe veszel."
          value={input.uzletiKoltsegek}
          onChange={(value) => setInput({ ...input, uzletiKoltsegek: value })}
        />
        <NumberInput
          label="Bérköltség (bruttó)"
          helpText="Munkavállalók bruttó bére, járulék alapja."
          tooltip="A KIVA alapja a személyi jellegű kifizetésekkel növekszik, ezért ezt a teljes bruttó bérrel érdemes megadni."
          value={input.berkoltseg}
          onChange={(value) => setInput({ ...input, berkoltseg: value })}
        />
        <NumberInput
          label="Tervezett osztalék"
          helpText="Tulajdonosoknak fizetendő osztalék a tárgyévben."
          tooltip="Az osztalék után 15% személyi jövedelemadó fizetendő, ezt a kalkulátor külön jelzi."
          value={input.osztalek}
          onChange={(value) => setInput({ ...input, osztalek: value })}
        />
      </div>

      <div className="space-y-4">
        <ResultsCard title="Adóalap és kulcsok">
          <p>
            KIVA alap: <strong>{formatCurrency(result.kivaAlap)}</strong> ({formatPercent(taxParams.kiva.rate)} kulcs)
          </p>
          <p>
            Szocho kulcs: <strong>{formatPercent(taxParams.kiva.employerContributionRate)}</strong>
          </p>
          <p>
            Osztalékadó kulcs: <strong>{formatPercent(taxParams.kiva.dividendTaxRate)}</strong>
          </p>
        </ResultsCard>

        <ResultsTable
          rows={[
            { label: 'KIVA adó', value: formatCurrency(result.kivaAdo) },
            { label: 'Szocho a bérekre', value: formatCurrency(result.szocho) },
            { label: 'Osztalékadó', value: formatCurrency(result.osztalekAdo) },
            { label: 'Összes várható közteher', value: formatCurrency(result.osszesAdo) },
            { label: 'Effektív adókulcs árbevételhez', value: formatPercent(result.effektivAdoRata) },
          ]}
        />

        <ExportButtons data={exportData} />
      </div>
    </CalculatorLayout>
  );
};

export default KivaCalculator;
