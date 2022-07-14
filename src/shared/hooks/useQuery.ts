import { useQuery, UseQueryResult } from "react-query";

import {
  AdminPercentResponse,
  UserFinancesResponse,
  UserStatisticsResponse,
  UserStatusResponse,
} from "../interfaces/Response";
import { getPercent } from "../services/auth/admin,";
import { getStatistics, getStatus } from "../services/auth/user";
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

export function useUserStatistics() {
  return useQuery(["userStatistics"], () => getStatistics(), {
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60,
  }) as UseQueryResult<UserStatisticsResponse, unknown>;
}

export function useGLobalPercent() {
  return useQuery(["adminPercent"], () => getPercent(), {
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60,
  }) as UseQueryResult<AdminPercentResponse, unknown>;
}
