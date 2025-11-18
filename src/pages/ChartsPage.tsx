import { useState } from 'react';
import { useTrackerStore } from '../store/useTrackerStore';
import AppShell from '../components/layout/AppShell';
import Card from '../components/common/Card';
import ItchinessChart from '../components/charts/ItchinessChart';
import DietComplianceChart from '../components/charts/DietComplianceChart';
import WoundStatusChart from '../components/charts/WoundStatusChart';

export default function ChartsPage() {
  const program = useTrackerStore((state) => state.program);
  const [timeRange, setTimeRange] = useState<'all' | 'last4' | 'thisweek'>('all');

  const filterWeeks = () => {
    if (timeRange === 'all') return program.weeks;
    if (timeRange === 'last4') return program.weeks.slice(-4);
    // thisweek - get current week
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const currentWeekIndex = program.weeks.findIndex((w) =>
      w.days.some((d) => d.date === todayStr)
    );
    if (currentWeekIndex !== -1) {
      return [program.weeks[currentWeekIndex]];
    }
    return program.weeks.slice(-1);
  };

  const filteredProgram = {
    ...program,
    weeks: filterWeeks()
  };

  return (
    <AppShell title="Insights">
      <div className="p-4 space-y-6 max-w-md mx-auto pb-24">
        {/* Time Range Filter */}
        <div className="flex gap-2">
          <button
            onClick={() => setTimeRange('all')}
            className={`flex-1 tap-target py-2 px-4 rounded-xl text-sm font-medium transition-all ${
              timeRange === 'all'
                ? 'bg-primary text-white'
                : 'glass text-white/70 hover:text-white'
            }`}
          >
            All 12 weeks
          </button>
          <button
            onClick={() => setTimeRange('last4')}
            className={`flex-1 tap-target py-2 px-4 rounded-xl text-sm font-medium transition-all ${
              timeRange === 'last4'
                ? 'bg-primary text-white'
                : 'glass text-white/70 hover:text-white'
            }`}
          >
            Last 4 weeks
          </button>
          <button
            onClick={() => setTimeRange('thisweek')}
            className={`flex-1 tap-target py-2 px-4 rounded-xl text-sm font-medium transition-all ${
              timeRange === 'thisweek'
                ? 'bg-primary text-white'
                : 'glass text-white/70 hover:text-white'
            }`}
          >
            This week
          </button>
        </div>

        {/* Itching Trend */}
        <Card>
          <h3 className="text-lg font-semibold mb-4">Itching Trend</h3>
          <ItchinessChart program={filteredProgram} />
        </Card>

        {/* Diet Compliance */}
        <Card>
          <h3 className="text-lg font-semibold mb-4">Diet Compliance</h3>
          <DietComplianceChart program={filteredProgram} />
        </Card>

        {/* Wound Improvement */}
        <Card>
          <h3 className="text-lg font-semibold mb-4">Wound Improvement</h3>
          <WoundStatusChart program={filteredProgram} />
        </Card>
      </div>
    </AppShell>
  );
}
