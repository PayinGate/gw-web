'use client';

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

export function ChartCard({
  title,
  desciption,
  chart
}) {
  return (
    <div className="rounded-lg border   shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-lg font-semibold leading-none tracking-tight">{title}</h3>
        <p className="text-sm text-muted-foreground">{desciption}</p>
      </div>
      <div className="p-6 pt-0">

      </div>
    </div>
  );
}
