import { DollarSign, Users, CreditCard, Activity } from 'lucide-react';

import { MetricCard } from './../../../components/overview/metric-card';
import { ChartCard } from '../../../components/overview/chart-card';

export default function OverviewPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Transaction Volume"
          value="$45,231.89"
          description="+20.1% from last month"
          Icon={DollarSign}
        />
        <MetricCard
          title="Total Crypto Received"
          value="3.45 BTC"
          description="+180.1% from last month"
          Icon={Activity}
        />
        <MetricCard
          title="Transactions"
          value="+12,234"
          description="Today: 234 / Last 7 days: 1,890"
          Icon={CreditCard}
        />
        <MetricCard
          title="Active Customers"
          value="+573"
          description="+2 since last hour"
          Icon={Users}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <ChartCard title={"Transaction Volume"} desciption={"Last 7 days"} />
        </div>
    8    <div className="lg:col-span-1">
            <ChartCard title={"Transaction Status"} desciption={"Distribution of transaction statuses"} />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <ChartCard title="Recent Transactions" desciption={""}/>
        </div> 
        <div className="lg:col-span-1">
          <ChartCard title={"Volume by Coin"} desciption={"Total transaction volume per cryptocurrency"} />
        </div>
      </div>
    </div>
  );
}
