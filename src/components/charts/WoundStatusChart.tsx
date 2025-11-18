import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ProgramData } from '../../data/models';

interface WoundStatusChartProps {
  program: ProgramData;
}

export default function WoundStatusChart({ program }: WoundStatusChartProps) {
  const data = program.weeks.map((week) => {
    const statusCounts = {
      stable: 0,
      improving: 0,
      worse: 0
    };
    
    week.days.forEach((day) => {
      statusCounts[day.woundStatus]++;
    });

    return {
      week: `W${week.week}`,
      Stable: statusCounts.stable,
      Improving: statusCounts.improving,
      Worse: statusCounts.worse
    };
  });

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis
          dataKey="week"
          stroke="rgba(255,255,255,0.6)"
          tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 11 }}
        />
        <YAxis
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
        <Legend
          wrapperStyle={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px' }}
          iconType="square"
        />
        <Bar dataKey="Stable" stackId="a" fill="#6b7280" />
        <Bar dataKey="Improving" stackId="a" fill="#10b981" />
        <Bar dataKey="Worse" stackId="a" fill="#ef4444" />
      </BarChart>
    </ResponsiveContainer>
  );
}

