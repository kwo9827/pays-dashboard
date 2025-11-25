import type { ApiListResponse } from "./api";

// 거래 내역 조회
export interface Payment {
  paymentCode: string;
  mchtCode: string;
  amount: string;
  currency: string;
  payType: string;
  status: string;
  paymentAt: string;
}

// 거래 내역 리스트 API 응답 타입
export type PaymentListResponse = ApiListResponse<Payment>;
