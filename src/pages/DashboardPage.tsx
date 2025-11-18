import { useNavigate } from 'react-router-dom';
import { useTrackerStore } from '../store/useTrackerStore';
import AppShell from '../components/layout/AppShell';
import Card from '../components/common/Card';
import StatusChip from '../components/common/StatusChip';
import ProgressRing from '../components/common/ProgressRing';
import LedIndicator from '../components/common/LedIndicator';

export default function DashboardPage() {
  const navigate = useNavigate();
  const program = useTrackerStore((state) => state.program);
  const isLoading = useTrackerStore((state) => state.isLoading);

  // Calculate current week and day
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  let currentWeek = 1;
  let currentDay = 1;
  let todayEntry = null;

  for (const week of program.weeks) {
    const dayIndex = week.days.findIndex((d) => d.date === todayStr);
    if (dayIndex !== -1) {
      currentWeek = week.week;
      currentDay = dayIndex + 1;
      todayEntry = week.days[dayIndex];
      break;
    }
  }

  // Calculate weekly progress
  const currentWeekData = program.weeks[currentWeek - 1];
  const weekCompletedDays = currentWeekData?.days.filter(
    (d) => d.dietCompliance || d.antibioticsTaken || d.bathApplied || d.earTreatment
  ).length || 0;
  const weekProgress = Math.round((weekCompletedDays / 7) * 100);

  // Calculate average itchiness this week
  const weekItchScores = (currentWeekData?.days.map((d) => d.itchingLevel) || []) as number[];
  const avgItch = weekItchScores.length > 0
    ? weekItchScores.reduce((sum, score) => sum + score, 0) / weekItchScores.length
    : 0;

  // Check compliance status
  const allTodayTasksDone = todayEntry && 
    todayEntry.dietCompliance &&
    todayEntry.antibioticsTaken &&
    todayEntry.bathApplied &&
    todayEntry.earTreatment;

  if (isLoading) {
    return (
      <AppShell>
        <div className="p-4 flex items-center justify-center min-h-screen">
          <p className="text-white/60">Loading...</p>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="p-4 space-y-6 max-w-md mx-auto">
        {/* Dog Profile Section */}
        <Card variant="strong">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
              <img 
                src={import.meta.env.PROD ? '/SashaTracker/sasha2.jpg' : '/sasha2.jpg'}
                alt="Sasha" 
                className="w-full h-full object-cover scale-90 translate-y-1"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = import.meta.env.PROD ? '/SashaTracker/sasha.jpg' : '/sasha.jpg';
                }}
              />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">Sasha</h2>
              <div className="flex items-center gap-2 mt-1">
                <StatusChip variant={allTodayTasksDone ? 'success' : 'default'}>
                  Week {currentWeek} · Day {currentDay}
                </StatusChip>
                {allTodayTasksDone ? (
                  <StatusChip variant="success">On track</StatusChip>
                ) : (
                  <button
                    onClick={() => navigate('/log')}
                    className="tap-target"
                  >
                    <StatusChip variant="warning">Log today</StatusChip>
                  </button>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Today at a glance */}
        {todayEntry && (
          <Card>
            <h3 className="text-lg font-semibold mb-4">Today at a glance</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className={`p-3 rounded-xl ${todayEntry.dietCompliance ? 'bg-success/20' : 'bg-white/5'}`}>
                <div className="flex items-center gap-2">
                  <LedIndicator status={todayEntry.dietCompliance ? 'on' : 'off'} />
                  <span className="text-sm">Diet</span>
                </div>
              </div>
              <div className={`p-3 rounded-xl ${todayEntry.antibioticsTaken ? 'bg-success/20' : 'bg-white/5'}`}>
                <div className="flex items-center gap-2">
                  <LedIndicator status={todayEntry.antibioticsTaken ? 'on' : 'off'} />
                  <span className="text-sm">Antibiotic</span>
                </div>
              </div>
              <div className={`p-3 rounded-xl ${todayEntry.bathApplied ? 'bg-success/20' : 'bg-white/5'}`}>
                <div className="flex items-center gap-2">
                  <LedIndicator status={todayEntry.bathApplied ? 'on' : 'off'} />
                  <span className="text-sm">Bath</span>
                </div>
              </div>
              <div className={`p-3 rounded-xl ${todayEntry.earTreatment ? 'bg-success/20' : 'bg-white/5'}`}>
                <div className="flex items-center gap-2">
                  <LedIndicator status={todayEntry.earTreatment ? 'on' : 'off'} />
                  <span className="text-sm">Ear</span>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Weekly Progress */}
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-1">Week {currentWeek} Progress</h3>
              <p className="text-sm text-white/60">{weekCompletedDays} of 7 days logged</p>
            </div>
            <ProgressRing percentage={weekProgress} size={70} />
          </div>
        </Card>

        {/* Symptoms Snapshot */}
        <Card>
          <h3 className="text-lg font-semibold mb-4">Symptoms Snapshot</h3>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/70">Average itchiness this week</span>
                <span className="text-2xl font-bold text-warning">{avgItch.toFixed(1)}</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-warning rounded-full transition-all"
                  style={{ width: `${(avgItch / 5) * 100}%` }}
                />
              </div>
            </div>
            {todayEntry && todayEntry.itchingLevel > 0 && (
              <div className="pt-2 border-t border-white/10">
                <span className="text-sm text-white/60">Today's level: </span>
                <span className="text-sm font-semibold text-warning">{todayEntry.itchingLevel}/5</span>
              </div>
            )}
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate('/weeks')}
            className="tap-target glass rounded-2xl p-4 text-left hover:bg-white/5 transition-all active:scale-[0.98]"
          >
            <div className="text-2xl mb-2">📅</div>
            <div className="text-sm font-medium">View Weeks</div>
          </button>
          <button
            onClick={() => navigate('/insights')}
            className="tap-target glass rounded-2xl p-4 text-left hover:bg-white/5 transition-all active:scale-[0.98]"
          >
            <div className="text-2xl mb-2">📈</div>
            <div className="text-sm font-medium">View Insights</div>
          </button>
        </div>
      </div>
    </AppShell>
  );
}
