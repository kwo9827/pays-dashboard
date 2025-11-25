import type { ApiListResponse, ApiResponse } from "./api";

// 가맹점 목록 조회
export interface Merchant {
  mchtCode: string;
  mchtName: string;
  status: string;
  bizType: string;
}

// 가맹점 상세 조회
export interface MerchantDetail {
  mchtCode: string;
  mchtName: string;
  status: string;
  bizType: string;
  bizNo: string;
  address: string;
  phone: string;
  email: string;
  registeredAt: string;
  updatedAt: string;
}

// 가맹점 리스트 API 응답 타입
export type MerchantListResponse = ApiListResponse<Merchant>;

// 가맹점 디테일 리스트 API 응답 타입
export type MerchantDetailListResponse = ApiListResponse<MerchantDetail>;

// 가맹점 디테일 API 응답 타입
export type MerchantDetailResponse = ApiResponse<MerchantDetail>;
