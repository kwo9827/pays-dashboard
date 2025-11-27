interface SummaryCardProps {
  label: string;
  value: string | number;
}

export default function SummaryCard({ label, value }: SummaryCardProps) {
  return (
    <div className="h-full rounded-lg border bg-white p-4 shadow-sm">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}
