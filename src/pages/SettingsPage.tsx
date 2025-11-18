import { useState } from 'react';
import { useTrackerStore } from '../store/useTrackerStore';
import AppShell from '../components/layout/AppShell';
import Card from '../components/common/Card';
import PdfExportButton from '../components/export/PdfExportButton';
import JsonExportButton from '../components/export/JsonExportButton';
import JsonImportButton from '../components/export/JsonImportButton';
import ToggleRow from '../components/common/ToggleRow';

export default function SettingsPage() {
  const resetProgram = useTrackerStore((state) => state.resetProgram);
  const program = useTrackerStore((state) => state.program);
  const importProgram = useTrackerStore((state) => state.importProgram);
  const [darkMode, setDarkMode] = useState(true);

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all data? This cannot be undone.')) {
      resetProgram();
    }
  };

  return (
    <AppShell title="More">
      <div className="p-4 space-y-6 max-w-md mx-auto pb-24">
        {/* Export Card */}
        <Card>
          <h3 className="text-lg font-semibold mb-4">Export</h3>
          <PdfExportButton program={program} />
          <div className="mt-4 text-xs text-white/60">
            Includes 12-week charts, daily logs, and notes.
          </div>
        </Card>

        {/* Data Card */}
        <Card>
          <h3 className="text-lg font-semibold mb-4">Data</h3>
          <div className="space-y-3">
            <JsonExportButton program={program} />
            <JsonImportButton onImport={importProgram} />
          </div>
        </Card>

        {/* Appearance & Behavior Card */}
        <Card>
          <h3 className="text-lg font-semibold mb-4">Appearance & Behavior</h3>
          <div className="space-y-1">
            <ToggleRow
              label="Dark mode"
              checked={darkMode}
              onChange={setDarkMode}
            />
            <div className="pt-2 border-t border-white/10">
              <label className="block text-sm font-medium mb-2">Remind me to log every day at</label>
              <input
                type="time"
                defaultValue="20:00"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </Card>

        {/* Reset Data Card */}
        <Card>
          <h3 className="text-lg font-semibold mb-2">Reset Data</h3>
          <p className="text-sm text-white/60 mb-4">Clear all tracking data and start fresh</p>
          <button
            onClick={handleReset}
            className="w-full tap-target bg-danger hover:bg-danger-dark text-white font-medium py-3 px-4 rounded-xl transition-colors active:scale-[0.98]"
          >
            Reset All Data
          </button>
        </Card>

        {/* App Information Card */}
        <Card>
          <h3 className="text-lg font-semibold mb-4">App Information</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-white/60">Version:</span>
              <span>1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Created:</span>
              <span>{new Date(program.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Last Updated:</span>
              <span>{new Date(program.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
