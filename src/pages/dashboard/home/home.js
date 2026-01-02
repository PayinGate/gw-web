import { DollarSign, Users, CreditCard, Activity } from 'lucide-react';

import { MetricCard } from './../../../components/overview/metric-card';
import { ChartCard } from '../../../components/overview/chart-card';
import useAPI from '../../../hooks/useApi';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { storeStats } from '../../../context/overview_slice';
import TransactionVolumeChart from '../../../components/overview/volume-chart';


export default function OverviewPage() {
  const { fetch } = useOverview();
  const dispatch = useDispatch();
  const stats = useSelector((state)=> state.overview.stats);


  useEffect(()=>{
      fetch().then(({data})=>{
          if(data){
            dispatch(storeStats(data));
          }
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if(!stats) return "loading";

  if(stats)
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Transaction Volume"
          value={`₦${stats.stats.current_month_amount}`}
          description={`${stats.stats.mom_change_pct} from last month`}
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
          value={stats.stats.total_transactions}
          description={`Today: ${stats.stats.today_transactions} / Last 7 days: ${stats.stats.last_7_days_transactions}`}
          Icon={CreditCard}
        />
        <MetricCard
          title="Active Customers"
          value={stats.stats.active_customers}
          description={`${stats.stats.hourly_active_customers} since last hour`}
          Icon={Users}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <ChartCard title={"Transaction Volume"} desciption={"Last 7 days"} chart={<TransactionVolumeChart volumeChartData={stats.volume_metric} />} />
        </div>
        <div className="lg:col-span-1">
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



const useOverview = () => {
    const { get } = useAPI();
    const fetch = async () => {
        try {
            const response = await get('/overview', []);
        
            if(response['success'] === true) {
                return {data : response["data"] };
            }
        }
        catch(error) {
            console.log(error);
            return { data: null };
        }
        return { data: null };
    }

    return { fetch };
}