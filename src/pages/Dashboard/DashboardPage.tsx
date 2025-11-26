import { useQuery } from "@tanstack/react-query";
import { getPayments } from "../../services/payment";
import {
  filterByDateRange,
  sumAmount,
  countTransactions,
  averageAmount,
  calcDailyStats,
  calcMerchantSales,
} from "../../utils/stats";

export default function DashboardPage() {
  const { data: paymentsRes, isLoading } = useQuery({
    queryKey: ["payments"],
    queryFn: getPayments,
  });

  if (isLoading) return <div>Loading...</div>;
  if (!paymentsRes) return <div>데이터 없음</div>;

  const payments = paymentsRes.data;

  // 날짜 테스트 (전체 기간 기준)
  const start = new Date("2020-01-01");
  const end = new Date("2030-01-01");

  const filtered = filterByDateRange(payments, start, end, "paymentAt");

  const totalAmount = sumAmount(filtered);
  const totalCount = countTransactions(filtered);
  const avg = averageAmount(totalAmount, totalCount);

  const daily = calcDailyStats(filtered);
  const merchantSales = calcMerchantSales(filtered);

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">📊 Dashboard Test</h1>

      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className="rounded bg-gray-100 p-4">
          <p className="font-medium">총 매출</p>
          <p className="text-xl font-bold">{totalAmount.toLocaleString()} 원</p>
        </div>

        <div className="rounded bg-gray-100 p-4">
          <p className="font-medium">총 거래 건수</p>
          <p className="text-xl font-bold">{totalCount} 건</p>
        </div>

        <div className="rounded bg-gray-100 p-4">
          <p className="font-medium">평균 객단가</p>
          <p className="text-xl font-bold">{avg.toLocaleString()} 원</p>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="mb-2 text-xl font-semibold">📅 일별 통계</h2>
        <pre className="rounded bg-gray-200 p-4 text-sm">
          {JSON.stringify(daily.slice(0, 5), null, 2)}
        </pre>
      </div>

      <div>
        <h2 className="mb-2 text-xl font-semibold">🏪 가맹점 매출 TOP</h2>
        <pre className="rounded bg-gray-200 p-4 text-sm">
          {JSON.stringify(merchantSales.slice(0, 5), null, 2)}
        </pre>
      </div>
    </div>
  );
}
