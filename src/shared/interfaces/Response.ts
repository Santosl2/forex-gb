export type UserFinancesResponse = {
  data: {
    amount: number;
    createdAt: number;
    status: "recused" | "approved" | "pending";
    url: string;
    walletId: string;
  }[];
};

export type UserStatusResponse = {
  data: {
    totalAmountWithPercent: number;
    totalAmountWithoutPercent: number;
    totalAmountPercent: number;
    percentOfMonth: number;
    canYield: boolean;
  };
};

export type UserStatisticsResponse = {
  data: {
    amount: number;
    createdAt: number;
  };
};
export type AdminPercentResponse = {
  percent: number;
};

export type AdminUserListResponse = {
  data: {
    id: number;
    email: string;
    name: string;
    totalAmountApproved: string;
    totalAmountPending: string;
    lastLogin?: number;
    createdAt: number;
  }[];
};

export type AdminUserUpdateStatusResponse = {
  status: string;
  id: string;
};

export type AdminUserYieldDataResponse = {
  data: {
    amount: string;
    percent: string;
    status: string;
    createdAt: number;
  }[];
};
