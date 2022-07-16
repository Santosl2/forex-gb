import { useQuery, UseQueryResult } from "react-query";

import {
  AdminPercentResponse,
  AdminUserListResponse,
  AdminUserYieldDataResponse,
  UserFinancesResponse,
  UserStatisticsResponse,
  UserStatusResponse,
} from "../interfaces/Response";
import {
  getFinances,
  getPaymentYields,
  getUserList,
  getUserPayments,
} from "../services/finances/user";
import { getPercent } from "../services/requests/admin";
import { getStatistics, getStatus } from "../services/requests/user";

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
    staleTime: 1000 * 60 * 30,
    cacheTime: 1000 * 60 * 30,
  }) as UseQueryResult<AdminPercentResponse, unknown>;
}

export function useAdminUserList() {
  return useQuery(["adminUserList"], () => getUserList(), {
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60,
  }) as UseQueryResult<AdminUserListResponse, unknown>;
}

export function useUserPaymentData(id: string) {
  return useQuery(["adminPaymentData", id], () =>
    getUserPayments({ id })
  ) as UseQueryResult<UserFinancesResponse, unknown>;
}

export function usePaymentYieldData(id: string) {
  return useQuery(["adminYieldData", id], () =>
    getPaymentYields(id)
  ) as UseQueryResult<AdminUserYieldDataResponse, unknown>;
}
