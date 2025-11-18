import { ProgramData } from '../../data/models';
import Card from '../common/Card';

interface JsonExportButtonProps {
  program: ProgramData;
}

export default function JsonExportButton({ program }: JsonExportButtonProps) {
  const handleExport = () => {
    const dataStr = JSON.stringify(program, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `anallergenic-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <h3 className="text-lg font-semibold mb-2">JSON Backup</h3>
      <p className="text-sm text-white/60 mb-4">Export all data as JSON file</p>
      <button
        onClick={handleExport}
        className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
      >
        Export JSON
      </button>
    </Card>
  );
}

