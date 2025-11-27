import { useQuery } from "@tanstack/react-query";
import { getMerchantDetailByCode } from "../services/merchants";

export function useMerchantDetail(mchtCode: string) {
  return useQuery({
    queryKey: ["merchant", mchtCode],
    queryFn: () => getMerchantDetailByCode(mchtCode),
    enabled: !!mchtCode,
  });
}
