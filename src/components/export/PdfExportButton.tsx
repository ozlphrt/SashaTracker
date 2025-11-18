import { useState } from 'react';
import jsPDF from 'jspdf';
import { ProgramData } from '../../data/models';
import Card from '../common/Card';

interface PdfExportButtonProps {
  program: ProgramData;
}

export default function PdfExportButton({ program }: PdfExportButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      let yPosition = margin;

      // Title
      pdf.setFontSize(20);
      pdf.text('Anallergenic Tracker Report', margin, yPosition);
      yPosition += 10;

      // Program info
      pdf.setFontSize(12);
      pdf.text(`Created: ${new Date(program.createdAt).toLocaleDateString()}`, margin, yPosition);
      yPosition += 5;
      pdf.text(`Updated: ${new Date(program.updatedAt).toLocaleDateString()}`, margin, yPosition);
      yPosition += 15;

      // Weekly summaries
      program.weeks.forEach((week) => {
        if (yPosition > pageHeight - 60) {
          pdf.addPage();
          yPosition = margin;
        }

        pdf.setFontSize(16);
        pdf.text(`Week ${week.week}`, margin, yPosition);
        yPosition += 8;

        const dietCompliance = week.days.filter((d) => d.dietCompliance).length;
        const antibioticsCompliance = week.days.filter((d) => d.antibioticsTaken).length;
        const avgItching = week.days.reduce((sum, d) => sum + d.itchingLevel, 0) / 7;

        pdf.setFontSize(10);
        pdf.text(`Diet Compliance: ${Math.round((dietCompliance / 7) * 100)}%`, margin, yPosition);
        yPosition += 5;
        pdf.text(`Antibiotics Compliance: ${Math.round((antibioticsCompliance / 7) * 100)}%`, margin, yPosition);
        yPosition += 5;
        pdf.text(`Average Itching Level: ${avgItching.toFixed(1)}`, margin, yPosition);
        yPosition += 10;
      });

      pdf.save('anallergenic-tracker-report.pdf');
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card>
      <h3 className="text-lg font-semibold mb-2">PDF Export</h3>
      <p className="text-sm text-white/60 mb-4">Generate a veterinary report PDF</p>
      <button
        onClick={generatePDF}
        disabled={isGenerating}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isGenerating ? 'Generating...' : 'Export PDF'}
      </button>
    </Card>
  );
}

