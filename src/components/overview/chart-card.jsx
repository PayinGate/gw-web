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
    <div class="rounded-lg border   shadow-sm">
      <div class="flex flex-col space-y-1.5 p-6">
        <h3 class="text-lg font-semibold leading-none tracking-tight">{title}</h3>
        <p class="text-sm text-muted-foreground">{desciption}</p>
      </div>
      <div class="p-6 pt-0">

      </div>
    </div>
  );
}
