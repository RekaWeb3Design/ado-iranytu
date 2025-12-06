interface ResultsTableProps {
  rows: { label: string; value: string | number }[];
}

const ResultsTable = ({ rows }: ResultsTableProps) => (
  <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm dark:border-gray-800">
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
      <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
        {rows.map((row) => (
          <tr key={row.label} className="bg-white dark:bg-gray-900">
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">{row.label}</td>
            <td className="px-4 py-3 text-right text-sm font-semibold text-gray-900 dark:text-gray-100">{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ResultsTable;
