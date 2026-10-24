import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';
import { getStatusDistribution } from '@/data/mockData';
import { ApplicationRecord } from '@/types';
import { useApplicationContext } from '@/context/ApplicationContext';

export function StatusDistributionChart({ applications: propApps }: { applications?: ApplicationRecord[] }) {
  const { applications: contextApps } = useApplicationContext();
  const apps = propApps || contextApps;
  const data = getStatusDistribution(apps);
  const total = apps.length || 1;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-5 py-1">
      {/* Donut Chart */}
      <div className="h-40 w-40 relative shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              contentStyle={{
                backgroundColor: '#0F172A',
                borderColor: '#1E293B',
                borderRadius: '8px',
                color: '#F8FAFC',
                fontSize: '12px',
                padding: '6px 10px',
              }}
              formatter={(val: number) => [`${val} (${Math.round((val / total) * 100)}%)`, 'Dossiers']}
            />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={46}
              outerRadius={68}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-extrabold text-slate-900 tracking-tight">{total}</span>
          <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
            Total
          </span>
        </div>
      </div>

      {/* Legend & Breakdown List */}
      <div className="flex-1 w-full min-w-0 space-y-1.5 text-xs">
        {data.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span
                className="h-2.5 w-2.5 rounded-full shrink-0 ring-2 ring-white shadow-xs"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-slate-700 font-medium truncate">{item.name}</span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0 font-mono">
              <span className="font-bold text-slate-900">{item.value}</span>
              <span className="text-[11px] text-slate-400">
                ({Math.round((item.value / total) * 100)}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
