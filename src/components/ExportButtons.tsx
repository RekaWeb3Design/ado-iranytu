import { exportToExcel } from '../utils/exportToExcel';
import { exportToPdf } from '../utils/exportToPdf';

interface ExportButtonsProps {
  data: Record<string, string | number>;
}

const ExportButtons = ({ data }: ExportButtonsProps) => (
  <div className="flex flex-wrap gap-3">
    <button
      type="button"
      className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-300"
      onClick={() => exportToExcel(data)}
    >
      Excel export
    </button>
    <button
      type="button"
      className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
      onClick={() => exportToPdf(data)}
    >
      PDF export
    </button>
  </div>
);

export default ExportButtons;
