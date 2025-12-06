import * as XLSX from 'xlsx';

export const exportToExcel = (data: Record<string, string | number>, filename = 'adoiranytu-export.xlsx') => {
  const rows = Object.entries(data).map(([key, value]) => ({ Megnevezes: key, Ertek: value }));
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Eredmények');
  XLSX.writeFile(workbook, filename);
};
