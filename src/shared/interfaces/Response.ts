export type UserFinancesResponse = {
  data: {
    amount: number;
    createdAt: number;
    status: "recused" | "approved" | "pending";
    url: string;
  }[];
};

export type UserStatusResponse = {
  data: {
    totalAmountWithPercent: number;
    totalAmountWithoutPercent: number;
    percentOfMonth: number;
  };
};

export type UserStatisticsResponse = {
  data: {
    amount: number;
    percent: number;
    createdAt: number;
  }[];
};
