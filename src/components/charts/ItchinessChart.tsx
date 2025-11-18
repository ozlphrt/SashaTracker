import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ProgramData } from '../../data/models';

interface ItchinessChartProps {
  program: ProgramData;
}

export default function ItchinessChart({ program }: ItchinessChartProps) {
  // Calculate average per week
  const data = program.weeks.map((week) => {
    const avgItch = week.days.reduce((sum, day) => sum + day.itchingLevel, 0) / week.days.length;
    return {
      week: week.week,
      label: `Week ${week.week}`,
      itchingLevel: avgItch
    };
  });

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis
          dataKey="label"
          stroke="rgba(255,255,255,0.6)"
          tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 11 }}
        />
        <YAxis
          domain={[0, 5]}
          stroke="rgba(255,255,255,0.6)"
          tick={{ fill: 'rgba(255,255,255,0.6)' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(0,0,0,0.9)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '12px',
            color: '#fff'
          }}
        />
        <Line
          type="monotone"
          dataKey="itchingLevel"
          stroke="#f97316"
          strokeWidth={3}
          dot={{ fill: '#f97316', r: 5 }}
          activeDot={{ r: 7 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

