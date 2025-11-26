import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useQuery } from "@tanstack/react-query";
import { getPayments } from "../../services/payment";

import SummaryCard from "../../components/cards/SummaryCard";
import DateRangePicker from "../../components/DateRangePicker";
import {
  filterByDateRange,
  sumAmount,
  countTransactions,
  averageAmount,
  groupBy,
} from "../../utils/stats";
import type { DateRange } from "react-day-picker";
import PayTypePieChart from "../../components/charts/PayTypePieChart";

export default function DashboardPage() {
  const { data: paymentsRes, isLoading } = useQuery({
    queryKey: ["payments"],
    queryFn: getPayments,
  });

  const [rage, setRange] = useState<DateRange | undefined>({
    from: new Date("2025-11-01"),
    to: new Date("2025-11-30"),
  });

  if (isLoading) return <DashboardLayout>Loading...</DashboardLayout>;
  if (!paymentsRes) return <DashboardLayout>데이터 없음</DashboardLayout>;

  const payments = paymentsRes.data;

  // 날짜는 추가 예정
  const start = rage?.from || new Date("1900-01-01");
  const end = rage?.to || new Date("2100-01-01");

  const filtered = filterByDateRange(payments, start, end, "paymentAt");

  const totalAmount = sumAmount(filtered);
  const totalCount = countTransactions(filtered);
  const avgAmount = averageAmount(totalAmount, totalCount);

  // 결제 수단 통계
  const groupedByPayType = groupBy(filtered, "payType");
  // 결제수단 PieChart용 데이터
  const payTypeChartData = Object.entries(groupedByPayType).map(([key, items]) => ({
    name: key,
    value: items.length,
  }));

  const topPayType =
    Object.entries(groupedByPayType).sort((a, b) => b[1].length - a[1].length)[0]?.[0] || "없음";

  return (
    <DashboardLayout>
      {/* <h1 className="mb-6 text-2xl font-bold">Dashboard</h1> */}

      {/* 날짜 선택 */}
      <div className="mb-6">
        <DateRangePicker range={rage} onChange={setRange} />
      </div>

      {/* 상단 카드 4개 */}
      <div className="mb-8 grid grid-cols-4 gap-4">
        <SummaryCard label="총 매출" value={`${totalAmount.toLocaleString()} 원`} />
        <SummaryCard label="총 거래 건수" value={`${totalCount} 건`} />
        <SummaryCard label="평균 객단가" value={`${avgAmount.toLocaleString()} 원`} />
        <SummaryCard label="가장 많이 결제된 수단" value={topPayType} />
      </div>

      {/* 하단 차트 영역(일별 매출, 결제 타입) */}
      <div className="grid grid-cols-3 gap-6">
        {/* 왼쪽: 라인 차트 자리 (일별 매출) */}
        <div className="col-span-2">
          <div className="flex h-80 items-center justify-center rounded-lg border bg-white p-6 text-gray-400 shadow-sm">
            LineChart 자리
          </div>
        </div>

        {/* 오른쪽: 결제 수단 파이 차트 */}
        <PayTypePieChart data={payTypeChartData} />
      </div>
    </DashboardLayout>
  );
}
