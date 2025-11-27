import { apiClient } from "../lib/apiClient";
import type {
  MerchantListResponse,
  MerchantDetailListResponse,
  MerchantDetailResponse,
} from "../types/merchant";

// 가맹점 리스트 조회
export async function getMerchants(): Promise<MerchantListResponse> {
  const res = await apiClient.get("/merchants/list");
  return res.data;
}

// 가맹점 상세 조회 (전체 리스트)
export async function getMerchantDetailsAll(): Promise<MerchantDetailListResponse> {
  const res = await apiClient.get("/merchants/details");
  return res.data;
}

// 가맹점 코드로 상세 조회 (단일)
export async function getMerchantDetailByCode(mchtCode: string): Promise<MerchantDetailResponse> {
  const res = await apiClient.get(`/merchants/details/${mchtCode}`);
  return res.data;
}
