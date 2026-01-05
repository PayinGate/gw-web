import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { ChartContainer, ChartTooltipContent } from "./chart-container";
import { useEffect } from "react";


const COLORS = {
    'Completed': 'hsl(var(--chart-2))',
    'Pending': 'hsl(var(--chart-1))',
    'Cancelled': 'hsl(var(--destructive))',
};


export function StatusChart({transactionStatusData}){
    useEffect(()=>{console.log(transactionStatusData)}, [transactionStatusData])
    return (
        <ChartContainer config={{}} className="h-[300px] w-full">
          <ResponsiveContainer>
            <PieChart>
              <Tooltip
                cursor={{ fill: 'hsl(var(--accent) / 0.1)' }}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={transactionStatusData.map((value)=>{return {status: value.status, count: parseInt(value.count)}})}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                labelLine={false}
                label={({
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  value,
                  index,
                  percent
                }) => {
                  const RADIAN = Math.PI / 180;
                  const radius = 12 + innerRadius + (outerRadius - innerRadius);
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);

                  return (
                    <text
                      x={x}
                      y={y}
                      className="fill-muted-foreground text-xs"
                      textAnchor={x > cx ? 'start' : 'end'}
                      dominantBaseline="central"
                    >
                      {transactionStatusData[index].status} ({(percent * 100).toFixed(0)}%)
                    </text>
                  );
                }}
              >
                {transactionStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.status] || COLORS['Cancelled']} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
    );
}