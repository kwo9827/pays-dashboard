import { useNavigate } from "react-router-dom";

interface Props {
  data: {
    mchtCode: string;
    totalAmount: number;
    count: number;
  }[];
}

export default function MerchantTopTable({ data }: Props) {
  const navigate = useNavigate(); 

  return (
    <div className="mt-6 rounded-lg border bg-white p-4 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold">가맹점 매출 TOP</h3>

      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b">
            <th className="px-2 py-2">순위</th>
            <th className="px-2 py-2" onClick={() => {}}>가맹점 코드</th>
            <th className="px-2 py-2">거래 건수</th>
            <th className="px-2 py-2">총 매출</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan={4} className="py-6 text-center text-gray-500">
                데이터가 없습니다.
              </td>
            </tr>
          )}

          {data.map((item, idx) => (
            <tr key={item.mchtCode} style={{cursor: "pointer"}} className="border-b hover:bg-gray-50"
            onClick={() => navigate(`/merchants/${item.mchtCode}`)}>
              <td className="px-2 py-2 font-medium">{idx + 1}</td>
              <td className="px-2 py-2">{item.mchtCode}</td>
              <td className="px-2 py-2">{item.count.toLocaleString()} 건</td>
              <td className="px-2 py-2">{item.totalAmount.toLocaleString()} 원</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
