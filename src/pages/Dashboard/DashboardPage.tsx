import DashboardLayout from "../../components/layout/DashboardLayout";
import { useQuery } from "@tanstack/react-query";
import { getPayments } from "../../services/payment";

import SummaryCard from "../../components/cards/SummaryCard";
import {
  filterByDateRange,
  sumAmount,
  countTransactions,
  averageAmount,
  groupBy,
} from "../../utils/stats";

export default function DashboardPage() {
  const { data: paymentsRes, isLoading } = useQuery({
    queryKey: ["payments"],
    queryFn: getPayments,
  });

  if (isLoading) return <DashboardLayout>Loading...</DashboardLayout>;
  if (!paymentsRes) return <DashboardLayout>데이터 없음</DashboardLayout>;

  const payments = paymentsRes.data;

  // 날짜는 추가 예정
  const start = new Date("2020-01-01");
  const end = new Date("2030-01-01");

  const filtered = filterByDateRange(payments, start, end, "paymentAt");
  const totalAmount = sumAmount(filtered);
  const totalCount = countTransactions(filtered);
  const avgAmount = averageAmount(totalAmount, totalCount);

  const groupedByPayType = groupBy(filtered, "payType");
  const topPayType =
    Object.entries(groupedByPayType).sort((a, b) => b[1].length - a[1].length)[0]?.[0] || "없음";

  return (
    <DashboardLayout>
      <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>

      {/* 상단 카드 4개 */}
      <div className="mb-8 grid grid-cols-4 gap-4">
        <SummaryCard label="총 매출" value={`${totalAmount.toLocaleString()} 원`} />
        <SummaryCard label="총 거래 건수" value={`${totalCount} 건`} />
        <SummaryCard label="평균 객단가" value={`${avgAmount.toLocaleString()} 원`} />
        <SummaryCard label="가장 많이 결제된 수단" value={topPayType} />
      </div>

      <div className="text-gray-400">여기는 차트/테이블 들어올 자리</div>
    </DashboardLayout>
  );
}
