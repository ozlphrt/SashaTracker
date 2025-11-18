import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ProgramData } from '../../data/models';

interface DietComplianceChartProps {
  program: ProgramData;
}

export default function DietComplianceChart({ program }: DietComplianceChartProps) {
  const data = program.weeks.map((week) => {
    const compliantDays = week.days.filter((day) => day.dietCompliance).length;
    return {
      week: `W${week.week}`,
      compliance: Math.round((compliantDays / 7) * 100)
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
          domain={[0, 100]}
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
          formatter={(value: number) => [`${value}%`, 'Compliance']}
        />
        <Bar dataKey="compliance" fill="#10b981" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

