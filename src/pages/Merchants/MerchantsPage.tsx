import DashboardLayout from "../../components/layout/DashboardLayout";
import { useMerchants } from "../../hooks/useMerchants";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export default function MerchantsPage() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useMerchants();
  const list = data?.data ?? [];

  // 상태 관리
  const [keyword, setKeyword] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [selectedBizType, setSelectedBizType] = useState("ALL");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // 상태 색상
  const statusColor: Record<string, string> = {
    ACTIVE: "bg-green-100 text-green-700",
    INACTIVE: "bg-gray-200 text-gray-700",
    READY: "bg-blue-100 text-blue-700",
    CLOSED: "bg-red-100 text-red-700",
  };

  // 1) 정렬 (가맹점 코드 기준)
  const sorted = useMemo(() => {
    return [...list].sort((a, b) => {
      return sortOrder === "asc"
        ? a.mchtCode.localeCompare(b.mchtCode)
        : b.mchtCode.localeCompare(a.mchtCode);
    });
  }, [list, sortOrder]);

  // 2) 필터 (상태 / 업종)
  const filtered = sorted.filter((item) => {
    const matchStatus = selectedStatus === "ALL" || item.status === selectedStatus;
    const matchBiz = selectedBizType === "ALL" || item.bizType === selectedBizType;

    return matchStatus && matchBiz;
  });

  // 3) 검색
  const searched = filtered.filter((item) => {
    const text = keyword.toLowerCase();
    return item.mchtCode.toLowerCase().includes(text) || item.mchtName.toLowerCase().includes(text);
  });

  // 4) 정렬 토글
  const toggleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
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
    return <DashboardLayout>가맹점 정보를 불러오지 못했습니다.</DashboardLayout>;
  }

  return (
    <DashboardLayout>
      <h1 className="mb-6 text-2xl font-bold">가맹점 목록</h1>

      {/* 필터 영역 */}
      <div className="mb-6 flex gap-4">
        {/* 상태 필터 */}
        <select
          className="rounded-lg border p-2"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="ALL">상태 전체</option>
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE">INACTIVE</option>
          <option value="READY">READY</option>
          <option value="CLOSED">CLOSED</option>
        </select>

        {/* 업종 필터 */}
        <select
          className="rounded-lg border p-2"
          value={selectedBizType}
          onChange={(e) => setSelectedBizType(e.target.value)}
        >
          <option value="ALL">업종 전체</option>
          <option value="EDU">EDU</option>
          <option value="TRAVEL">TRAVEL</option>
          <option value="SHOP">SHOP</option>
        </select>

        {/* 검색 */}
        <input
          type="text"
          placeholder="가맹점명 또는 코드 검색"
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
              <th className="cursor-pointer select-none px-2 py-2" onClick={toggleSort}>
                가맹점 코드 {sortOrder === "asc" ? "▲" : "▼"}
              </th>
              <th className="px-2 py-2">가맹점명</th>
              <th className="px-2 py-2">업종</th>
              <th className="px-2 py-2">상태</th>
            </tr>
          </thead>

          <tbody>
            {searched.length === 0 && (
              <tr>
                <td colSpan={4} className="py-10 text-center text-gray-500">
                  검색 결과가 없습니다.
                </td>
              </tr>
            )}

            {searched.map((item) => (
              <tr
                key={item.mchtCode}
                onClick={() => navigate(`/merchants/${item.mchtCode}`)}
                className="cursor-pointer border-b hover:bg-gray-50"
              >
                <td className="px-2 py-2">{item.mchtCode}</td>
                <td className="px-2 py-2">{item.mchtName}</td>
                <td className="px-2 py-2">{item.bizType}</td>

                <td className="px-2 py-2">
                  <span
                    className={`rounded px-2 py-1 text-sm ${
                      statusColor[item.status] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
