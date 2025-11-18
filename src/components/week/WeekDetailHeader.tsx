import { WeekData } from '../../data/models';
import Badge from '../common/Badge';

interface WeekDetailHeaderProps {
  weekData: WeekData;
}

export default function WeekDetailHeader({ weekData }: WeekDetailHeaderProps) {
  const completedDays = weekData.days.filter(
    (day) => day.dietCompliance || day.antibioticsTaken || day.bathApplied || day.earTreatment
  ).length;

  const dietCompliance = weekData.days.filter((day) => day.dietCompliance).length;
  const antibioticsCompliance = weekData.days.filter((day) => day.antibioticsTaken).length;
  const avgItching = weekData.days.reduce((sum, day) => sum + day.itchingLevel, 0) / 7;

  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold mb-2">Week {weekData.week}</h1>
      <div className="flex flex-wrap gap-2">
        <Badge variant="default">{completedDays}/7 days logged</Badge>
        <Badge variant="success">Diet: {Math.round((dietCompliance / 7) * 100)}%</Badge>
        <Badge variant="success">Antibiotics: {Math.round((antibioticsCompliance / 7) * 100)}%</Badge>
        <Badge variant="warning">Avg Itch: {avgItching.toFixed(1)}</Badge>
      </div>
    </div>
  );
}

