import { useQuery, UseQueryResult } from "react-query";

import { UserFinancesResponse } from "../interfaces/Response";
import { getFinances } from "../services/finances/user";

export function useUserFinances() {
  return useQuery(["userFinances"], () => getFinances(), {
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60,
  }) as UseQueryResult<UserFinancesResponse, unknown>;
}
