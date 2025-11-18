import { useRef } from 'react';
import { ProgramData } from '../../data/models';
import Card from '../common/Card';

interface JsonImportButtonProps {
  onImport: (data: ProgramData) => void;
}

export default function JsonImportButton({ onImport }: JsonImportButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const data = JSON.parse(text) as ProgramData;
      
      // Basic validation
      if (data.weeks && Array.isArray(data.weeks) && data.weeks.length === 12) {
        if (confirm('This will replace all current data. Continue?')) {
          onImport(data);
        }
      } else {
        alert('Invalid backup file format.');
      }
    } catch (error) {
      console.error('Failed to import JSON:', error);
      alert('Failed to import backup file. Please check the file format.');
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <Card>
      <h3 className="text-lg font-semibold mb-2">JSON Restore</h3>
      <p className="text-sm text-white/60 mb-4">Import data from JSON backup</p>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileSelect}
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
      >
        Import JSON
      </button>
    </Card>
  );
}

