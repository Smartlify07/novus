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
      <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </p>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}
