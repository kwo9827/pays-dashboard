import { apiClient } from "../lib/apiClient";
import type { PaymentListResponse } from "../types/payment";

// 결제 리스트 조회
export async function getPayments(): Promise<PaymentListResponse> {
  const response = await apiClient.get<PaymentListResponse>("/payments/list");
  return response.data;
}
