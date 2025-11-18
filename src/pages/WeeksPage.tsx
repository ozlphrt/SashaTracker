import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrackerStore } from '../store/useTrackerStore';
import AppShell from '../components/layout/AppShell';
import WeekChip from '../components/common/WeekChip';
import DaySummaryCard from '../components/common/DaySummaryCard';

export default function WeeksPage() {
  const navigate = useNavigate();
  const program = useTrackerStore((state) => state.program);
  const [selectedWeek, setSelectedWeek] = useState(1);

  const weekData = program.weeks[selectedWeek - 1];

  return (
    <AppShell title="Weeks">
      <div className="p-4 space-y-6 max-w-md mx-auto">
        {/* Week Selector */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {program.weeks.map((week) => (
            <WeekChip
              key={week.week}
              week={week.week}
              isSelected={selectedWeek === week.week}
              onClick={() => setSelectedWeek(week.week)}
            />
          ))}
        </div>

        {/* Week Summary */}
        {weekData && (
          <div className="glass rounded-2xl p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Week {weekData.week}</h2>
              <span className="text-sm text-white/60">
                {weekData.days.filter((d) => d.dietCompliance || d.antibioticsTaken || d.bathApplied || d.earTreatment).length} / 7 days logged
              </span>
            </div>
          </div>
        )}

        {/* Day Cards */}
        <div className="space-y-3">
          {weekData?.days.map((day, dayIndex) => (
            <DaySummaryCard
              key={dayIndex}
              dayIndex={dayIndex}
              entry={day}
              onClick={() => navigate(`/week/${selectedWeek}/day/${dayIndex + 1}`)}
            />
          ))}
        </div>
      </div>
    </AppShell>
  );
}

