import { useQuery } from "@tanstack/react-query";
import { getPayments } from "../services/payment";

export function usePayments() {
  return useQuery({
    queryKey: ["payments"],
    queryFn: getPayments,
  });
}
