import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: {
    date: string;
    amount: number; // 매출
    count: number; // 건수
  }[];
}

export default function DailyLineChart({ data }: Props) {
  return (
    <div className="h-80 w-full rounded-lg border bg-white p-4 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold">일별 매출 & 거래 건수</h3>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          {/* X축: 날짜 */}
          <XAxis dataKey="date" />

          {/* 왼쪽축: 매출 */}
          <YAxis yAxisId="left" />

          {/* 오른쪽축: 거래건수 */}
          <YAxis yAxisId="right" orientation="right" />

          <Tooltip />
          <Legend />

          {/* 매출 라인 (왼쪽축) */}
          <Line
            type="monotone"
            dataKey="amount"
            name="매출"
            stroke="#4F46E5"
            strokeWidth={2}
            yAxisId="left"
          />

          {/* 건수 라인 (오른쪽축) */}
          <Line
            type="monotone"
            dataKey="count"
            name="건수"
            stroke="#10B981"
            strokeWidth={2}
            yAxisId="right"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
