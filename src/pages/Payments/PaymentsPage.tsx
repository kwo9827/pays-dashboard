import DashboardLayout from "../../components/layout/DashboardLayout";
import { usePayments } from "../../hooks/usePayments";
import { useState, useMemo } from "react";
import { formatDateTime } from "../../utils/date";

export default function PaymentsPage() {
  const { data, isLoading, isError } = usePayments();

  const list = data?.data ?? [];

  // 상태 관리
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [selectedPayType, setSelectedPayType] = useState("ALL");
  const [keyword, setKeyword] = useState("");
  const [sortField, setSortField] = useState<"amount" | "paymentAt">("paymentAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // 상태 색상
  const statusColor: Record<string, string> = {
    SUCCESS: "bg-green-100 text-green-700",
    CANCELLED: "bg-yellow-100 text-yellow-700",
    FAILED: "bg-red-100 text-red-700",
  };

  // 1) 정렬
  const sorted = useMemo(() => {
    return [...list].sort((a, b) => {
      if (sortField === "paymentAt") {
        const diff = new Date(a.paymentAt).getTime() - new Date(b.paymentAt).getTime();
        return sortOrder === "asc" ? diff : -diff;
      }

      if (sortField === "amount") {
        const diff = Number(a.amount) - Number(b.amount);
        return sortOrder === "asc" ? diff : -diff;
      }

      return 0;
    });
  }, [list, sortField, sortOrder]);

  // 2) 필터 (상태, 결제수단)
  const filtered = sorted.filter((item) => {
    const matchStatus = selectedStatus === "ALL" || item.status === selectedStatus;
    const matchType = selectedPayType === "ALL" || item.payType === selectedPayType;

    return matchStatus && matchType;
  });

  // 3) 검색
  const searched = filtered.filter((item) => {
    return (
      item.paymentCode.toLowerCase().includes(keyword.toLowerCase()) ||
      item.mchtCode.toLowerCase().includes(keyword.toLowerCase())
    );
  });

  // 4) 정렬 토글
  const toggleSort = (field: "amount" | "paymentAt") => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      return;
    }
    setSortField(field);
    setSortOrder("desc");
  };

  // 로딩 UI
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="animate-pulse">
          <div className="mb-4 h-6 w-1/4 rounded bg-gray-200"></div>
          <div className="h-64 rounded bg-gray-200"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (isError) {
    return <DashboardLayout>데이터를 불러오지 못했습니다.</DashboardLayout>;
  }

  return (
    <DashboardLayout>
      <h1 className="mb-6 text-2xl font-bold">거래 내역</h1>

      {/* 필터 영역 */}
      <div className="mb-6 flex gap-4">
        {/* 상태 필터 */}
        <select
          className="rounded-lg border p-2"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="ALL">상태 전체</option>
          <option value="SUCCESS">SUCCESS</option>
          <option value="CANCELLED">CANCELLED</option>
          <option value="FAILED">FAILED</option>
        </select>

        {/* 결제수단 필터 */}
        <select
          className="rounded-lg border p-2"
          value={selectedPayType}
          onChange={(e) => setSelectedPayType(e.target.value)}
        >
          <option value="ALL">결제 수단 전체</option>
          <option value="VACT">VACT</option>
          <option value="ONLINE">ONLINE</option>
          <option value="BILLING">BILLING</option>
          <option value="DEVICE">DEVICE</option>
          <option value="MOBILE">MOBILE</option>
        </select>

        {/* 검색 */}
        <input
          type="text"
          placeholder="결제코드 / 가맹점코드 검색"
          className="flex-1 rounded-lg border p-2"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      {/* 테이블 */}
      <div className="rounded-lg border bg-white p-4 shadow-sm">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b text-sm text-gray-500">
              <th className="px-2 py-2">코드</th>
              <th className="px-2 py-2">가맹점</th>

              {/* 금액 정렬 */}
              <th
                className="cursor-pointer select-none px-2 py-2"
                onClick={() => toggleSort("amount")}
              >
                금액 {sortField === "amount" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>

              <th className="px-2 py-2">수단</th>

              <th className="px-2 py-2">상태</th>

              {/* 날짜 정렬 */}
              <th
                className="cursor-pointer select-none px-2 py-2"
                onClick={() => toggleSort("paymentAt")}
              >
                결제시간 {sortField === "paymentAt" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
            </tr>
          </thead>

          <tbody>
            {searched.length === 0 && (
              <tr>
                <td colSpan={6} className="py-10 text-center text-gray-500">
                  검색 결과가 없습니다.
                </td>
              </tr>
            )}

            {searched.map((item) => (
              <tr key={item.paymentCode} className="border-b hover:bg-gray-50">
                <td className="px-2 py-2">{item.paymentCode}</td>
                <td className="px-2 py-2">{item.mchtCode}</td>

                {/* 금액 */}
                <td className="px-2 py-2">{Number(item.amount).toLocaleString()} 원</td>

                <td className="px-2 py-2">{item.payType}</td>

                {/* 상태 색상 */}
                <td className="px-2 py-2">
                  <span className={`rounded px-2 py-1 text-sm ${statusColor[item.status]}`}>
                    {item.status}
                  </span>
                </td>

                {/* 날짜 */}
                <td className="px-2 py-2 text-gray-600">{formatDateTime(item.paymentAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
