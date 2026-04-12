"use client";
export default function QuickActionButton({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="ring-muted bg-popover hover:bg-accent/50 focus:ring-ring data-[state=open]:bg-accent flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium ring-1 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none"
    >
      {icon}
      {label}
    </button>
  );
}
