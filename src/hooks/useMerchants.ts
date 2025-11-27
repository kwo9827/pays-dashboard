import { useQuery } from "@tanstack/react-query";
import { getMerchants } from "../services/merchants";

export function useMerchants() {
  return useQuery({
    queryKey: ["merchants", "list"],
    queryFn: getMerchants,
  });
}
