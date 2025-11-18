import { useTrackerStore } from '../store/useTrackerStore';
import PdfExportButton from '../components/export/PdfExportButton';
import JsonExportButton from '../components/export/JsonExportButton';
import JsonImportButton from '../components/export/JsonImportButton';

export default function ExportPage() {
  const program = useTrackerStore((state) => state.program);
  const importProgram = useTrackerStore((state) => state.importProgram);

  return (
    <div className="p-4 space-y-6 pb-24">
      <h1 className="text-2xl font-bold">Export & Backup</h1>
      <PdfExportButton program={program} />
      <JsonExportButton program={program} />
      <JsonImportButton onImport={importProgram} />
    </div>
  );
}

