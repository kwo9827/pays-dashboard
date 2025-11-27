import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useMerchantDetail } from "../../hooks/useMerchantDetail";
import { formatDateTime } from "../../utils/date";
import { usePayments } from "../../hooks/usePayments";

export default function MerchantDetailPage() {
  const { mchtCode } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useMerchantDetail(mchtCode!);
  const detail = data?.data;

  // 상태 색상
  const statusColor: Record<string, string> = {
    ACTIVE: "bg-green-100 text-green-700",
    INACTIVE: "bg-gray-200 text-gray-700",
    READY: "bg-blue-100 text-blue-700",
    CLOSED: "bg-pink-100 text-red-700",
    SUCCESS: "bg-green-100 text-green-700",
    CANCELLED: "bg-yellow-100 text-yellow-700",
    FAILED: "bg-red-100 text-red-700",
  };

  // 가맹점 매출 
  const {data: payData} = usePayments()
  const payments = payData?.data || [];
  const myPayments = payments.filter(p => p.mchtCode === mchtCode);

  // 로딩 UI
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="animate-pulse">
          <div className="mb-4 h-6 w-1/5 rounded bg-gray-200"></div>
          <div className="h-40 rounded bg-gray-200"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (isError || !detail) {
    return <DashboardLayout>가맹점 정보를 불러오지 못했습니다.</DashboardLayout>;
  }

  return (
    <DashboardLayout>
      {/* 헤더 */}
      <div className="mb-6 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="rounded bg-gray-200 px-4 py-2 text-sm hover:bg-gray-300"
        >
          ← 뒤로가기
        </button>

        <h1 className="text-2xl font-bold">가맹점 상세 정보</h1>
      </div>

      {/* 상세 카드 */}
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <div className="grid grid-cols-2 gap-6">
          <DetailItem label="가맹점 코드" value={detail.mchtCode} />
          <DetailItem label="가맹점명" value={detail.mchtName} />

          <DetailItem label="업종(bizType)" value={detail.bizType} />

          <div>
            <p className="mb-1 text-sm text-gray-500">상태(status)</p>
            <span
              className={`inline-block rounded px-2 py-1 text-sm ${statusColor[detail.status]}`}
            >
              {detail.status}
            </span>
          </div>

          <DetailItem label="사업자번호" value={detail.bizNo} />
          <DetailItem label="전화번호" value={detail.phone} />
          <DetailItem label="이메일" value={detail.email} />
          <DetailItem label="주소" value={detail.address} />

          <DetailItem label="등록일" value={formatDateTime(detail.registeredAt)} />
          <DetailItem label="최근 수정일" value={formatDateTime(detail.updatedAt)} />
        </div>

        {/* 가맹점 거래 내역 */}
        <div className="mt-8 rounded-lg border bg-white p-4 shadow-sm">
          <h2 className="mb-4 text-lg font-bold">해당 가맹점 거래 내역</h2>

          {myPayments.length === 0 ? (
            <p className="text-gray-500">거래 내역이 없습니다.</p>
          ) : (
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b text-sm text-gray-500">
                  <th className="px-2 py-2">결제코드</th>
                  <th className="px-2 py-2">금액</th>
                  <th className="px-2 py-2">결제상태</th>
                  <th className="px-2 py-2">결제수단</th>
                  <th className="px-2 py-2">결제시간</th>
                </tr>
              </thead>

              <tbody>
                {myPayments.map((item) => (
                  <tr key={item.paymentCode} className="border-b hover:bg-gray-50">
                    <td className="px-2 py-2">{item.paymentCode}</td>
                    <td className="px-2 py-2">{Number(item.amount).toLocaleString()} 원</td>
                    <td className="px-2 py-2">
                      <span className={`rounded px-2 py-1 text-sm ${statusColor[item.status]}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-2 py-2">
                      {/* <span className={`rounded px-2 py-1 text-sm ${statusColor[item.status]}`}> */}
                        {item.payType}
                      {/* </span> */}
                      </td>
                    <td className="px-2 py-2">{formatDateTime(item.paymentAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

// 공통 상세 컴포넌트
function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mb-1 text-sm text-gray-500">{label}</p>
      <p className="text-gray-800">{value}</p>
    </div>
  );
}
