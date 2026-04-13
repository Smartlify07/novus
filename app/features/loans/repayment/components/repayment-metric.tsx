type RepaymentMetricProps = {
  label: string;
  value: string;
};

export default function RepaymentMetric({
  label,
  value,
}: RepaymentMetricProps) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-muted-foreground truncate text-sm tracking-tight">
        {label}
      </p>
      <p className="text-foreground truncate text-sm font-medium">{value}</p>
    </div>
  );
}
