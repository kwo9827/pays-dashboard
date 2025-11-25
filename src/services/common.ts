import { apiClient } from "../lib/apiClient";
import type {
  PaymentStatusListResponse,
  PaymentTypeListResponse,
  MerchantStatusListResponse,
} from "../types/common";

// 결제 상태 코드 조회
export async function getPaymentStatuses(): Promise<PaymentStatusListResponse> {
  const res = await apiClient.get("/common/payment-status/all");
  return res.data;
}

// 결제 수단 코드 조회
export async function getPaymentTypes(): Promise<PaymentTypeListResponse> {
  const res = await apiClient.get("/common/payment-type/all");
  return res.data;
}

// 가맹점 상태 코드 조회
export async function getMerchantStatuses(): Promise<MerchantStatusListResponse> {
  const res = await apiClient.get("/common/mcht-status/all");
  return res.data;
}
