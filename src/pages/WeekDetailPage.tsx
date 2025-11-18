import { useParams, useNavigate } from 'react-router-dom';
import { useTrackerStore } from '../store/useTrackerStore';
import WeekDetailHeader from '../components/week/WeekDetailHeader';
import DailyEntryCard from '../components/week/DailyEntryCard';

export default function WeekDetailPage() {
  const { weekNumber } = useParams<{ weekNumber: string }>();
  const navigate = useNavigate();
  const program = useTrackerStore((state) => state.program);
  const updateDay = useTrackerStore((state) => state.updateDay);

  const weekIndex = weekNumber ? parseInt(weekNumber, 10) - 1 : -1;
  
  if (weekIndex < 0 || weekIndex >= program.weeks.length) {
    return (
      <div className="p-4">
        <p className="text-red-400">Invalid week number</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 text-blue-400 hover:text-blue-300"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const weekData = program.weeks[weekIndex];

  return (
    <div className="p-4 pb-24">
      <WeekDetailHeader weekData={weekData} />
      {weekData.days.map((day, dayIndex) => (
        <DailyEntryCard
          key={dayIndex}
          dayIndex={dayIndex}
          entry={day}
          onUpdate={(changes) => updateDay(weekIndex, dayIndex, changes)}
        />
      ))}
    </div>
  );
}

