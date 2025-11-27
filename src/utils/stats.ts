// 날짜 범위 필터링
export function filterByDateRange<T>(list: T[], start: Date, end: Date, dateKey: keyof T): T[] {
  return list.filter((item) => {
    const raw = item[dateKey];
    if (!raw) return false;

    const date = new Date(String(raw));
    return date >= start && date <= end;
  });
}

// 총 매출 금액
export function sumAmount(list: { amount: string }[]): number {
  return list.reduce((acc, cur) => acc + Number(cur.amount), 0);
}

// 거래 건수
export function countTransactions(list: any[]): number {
  return list.length;
}

// 평균 매출
export function averageAmount(totalAmount: number, count: number): number {
  return count === 0 ? 0 : Math.round(totalAmount / count);
}

// 결제수단 그룹화
export function groupBy<T>(list: T[], key: keyof T) {
  return list.reduce<Record<string, T[]>>((acc, item) => {
    const groupKey = String(item[key] ?? "");
    if (!acc[groupKey]) acc[groupKey] = [];
    acc[groupKey].push(item);
    return acc;
  }, {});
}

// 날짜별 매출
export function calcDailyStats(list: { amount: string; paymentAt: string }[]) {
  const map = new Map<string, { date: string; count: number; sum: number }>();

  list.forEach((item) => {
    const date = item.paymentAt.split("T")[0]; // YYYY-MM-DD

    if (!map.has(date)) {
      map.set(date, { date, count: 0, sum: 0 });
    }

    const data = map.get(date)!;
    data.count += 1;
    data.sum += Number(item.amount);
  });

  // 날짜 순 정렬
  return Array.from(map.values()).sort((a, b) => a.date.localeCompare(b.date));
}

// 가맹점별 총 매출
export function calcMerchantSales(list: { mchtCode: string; amount: string }[]) {
  const map = new Map<string, { mchtCode: string; totalAmount: number; count: number }>();

  list.forEach((item) => {
    const { mchtCode, amount } = item;

    if (!map.has(mchtCode)) {
      map.set(mchtCode, { mchtCode, totalAmount: 0, count: 0 });
    }

    const data = map.get(mchtCode)!;
    data.totalAmount += Number(amount);
    data.count += 1;
  });

  // 매출 기준 내림차순
  return Array.from(map.values()).sort((a, b) => b.totalAmount - a.totalAmount);
}
