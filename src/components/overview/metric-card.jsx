

export function MetricCard({
  title,
  value,
  description,
  Icon,}) {
  return (
    <div class="rounded-lg border bg-[##ffffff] text-[#0a0a0a] shadow-sm">
        <div class="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 class="tracking-tight text-sm font-medium">{title}</h3>
            <Icon color={'#737373'} size={16} />
        </div>
        <div class="p-6 pt-0">
            <div class="text-2xl font-bold">{value}</div>
            <p class="text-xs text-[#0a0a0a]">{description}</p>
        </div>
    </div>
  );
}
