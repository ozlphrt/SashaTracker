import { useNavigate } from 'react-router-dom';
import { WeekData } from '../../data/models';
import Card from '../common/Card';
import Badge from '../common/Badge';

interface WeekCardProps {
  weekData: WeekData;
}

export default function WeekCard({ weekData }: WeekCardProps) {
  const navigate = useNavigate();

  const completedDays = weekData.days.filter(
    (day) => day.dietCompliance || day.antibioticsTaken || day.bathApplied || day.earTreatment
  ).length;

  const completionPercentage = Math.round((completedDays / 7) * 100);

  const getStatusVariant = (): 'default' | 'success' | 'warning' => {
    if (completionPercentage === 100) return 'success';
    if (completionPercentage >= 50) return 'warning';
    return 'default';
  };

  return (
    <Card onClick={() => navigate(`/week/${weekData.week}`)}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-1">Week {weekData.week}</h3>
          <p className="text-sm text-white/60">{completedDays} / 7 days logged</p>
        </div>
        <Badge variant={getStatusVariant()}>{completionPercentage}%</Badge>
      </div>
    </Card>
  );
}

