export type UserFinancesResponse = {
  data: {
    amount: number;
    createdAt: number;
    status: "recused" | "approved" | "pending";
    url: string;
  }[];
};
