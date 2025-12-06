import jsPDF from 'jspdf';

export const exportToPdf = (data: Record<string, string | number>, filename = 'adoiranytu-export.pdf') => {
  const doc = new jsPDF();
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(14);
  doc.text('AdóIránytű - Eredmények', 10, 15);
  doc.setFontSize(11);

  let y = 25;
  Object.entries(data).forEach(([label, value]) => {
    doc.text(`${label}: ${value}`, 10, y);
    y += 8;
  });

  doc.save(filename);
};
