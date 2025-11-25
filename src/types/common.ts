import type { ApiListResponse } from "./api";

// 결제 상태 코드 조회
export interface PaymentStatusCode {
  code: string;
  description: string;
}

// 결제 수단 코드 조회
export interface PaymentTypeCode {
  type: string;
  description: string;
}

// 가맹점 상태 코드 조회
export interface MerchantStatusCode {
  code: string;
  description: string;
}

// 결제 상태 코드 리스트 API 응답 타입
export type PaymentStatusListResponse = ApiListResponse<PaymentStatusCode>;

// 결제 수단 코드 리스트 API 응답 타입
export type PaymentTypeListResponse = ApiListResponse<PaymentTypeCode>;

// 가맹점 상태 코드 리스트 API 응답 타입
export type MerchantStatusListResponse = ApiListResponse<MerchantStatusCode>;
