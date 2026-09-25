/** Minimal printable order PDF (text stream) — no jspdf dependency. */

export interface FarmOrderPdfInput {
  orderNumber: string;
  customerName: string;
  apartmentName: string;
  flatNumber: string;
  growerName: string;
  cropName: string;
  units: number;
  unitPrice: number;
  currency: string;
  area: string;
  createdAt: string;
}

function escapePdfText(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

export function downloadFarmOrderPdf(input: FarmOrderPdfInput): void {
  const lines = [
    'Junction Earth — mushroom order',
    `Order: ${input.orderNumber}`,
    `Date: ${input.createdAt}`,
    `Area: ${input.area}`,
    `Customer: ${input.customerName}`,
    `Apartment: ${input.apartmentName}`,
    `Flat: ${input.flatNumber}`,
    `Grower: ${input.growerName}`,
    `Crop: ${input.cropName}`,
    `Units: ${input.units}`,
    `Unit price: ${input.currency} ${input.unitPrice}`,
    `Total: ${input.currency} ${(input.unitPrice * input.units).toFixed(2)}`,
    'Payment: cash / pending',
  ];

  const contentLines = lines
    .map((line, index) => `BT /F1 11 Tf 48 ${750 - index * 18} Td (${escapePdfText(line)}) Tj ET`)
    .join('\n');

  const objects: string[] = [];
  objects.push('1 0 obj<< /Type /Catalog /Pages 2 0 R >>endobj\n');
  objects.push('2 0 obj<< /Type /Pages /Kids [3 0 R] /Count 1 >>endobj\n');
  objects.push(
    '3 0 obj<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources<< /Font<< /F1 5 0 R >> >> >>endobj\n',
  );
  objects.push(`4 0 obj<< /Length ${contentLines.length} >>stream\n${contentLines}\nendstream\nendobj\n`);
  objects.push('5 0 obj<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>endobj\n');

  let pdf = '%PDF-1.4\n';
  const offsets: number[] = [0];
  for (const obj of objects) {
    offsets.push(pdf.length);
    pdf += obj;
  }
  const xrefStart = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += '0000000000 65535 f \n';
  for (let i = 1; i < offsets.length; i++) {
    pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  }
  pdf += `trailer<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

  const blob = new Blob([pdf], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `jearth-mushroom-order-${input.orderNumber}.pdf`;
  anchor.click();
  URL.revokeObjectURL(url);
}
