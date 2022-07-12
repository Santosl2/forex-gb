import { useQuery, UseQueryResult } from "react-query";

import {
  UserFinancesResponse,
  UserStatusResponse,
} from "../interfaces/Response";
import { getStatus } from "../services/auth/user";
import { getFinances } from "../services/finances/user";

export function useUserFinances() {
  return useQuery(["userFinances"], () => getFinances(), {
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60,
  }) as UseQueryResult<UserFinancesResponse, unknown>;
}

export function useUserStatus() {
  return useQuery(["userStatus"], () => getStatus(), {
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60,
  }) as UseQueryResult<UserStatusResponse, unknown>;
}
