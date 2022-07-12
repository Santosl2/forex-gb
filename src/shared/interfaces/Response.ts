export type UserFinancesResponse = {
  data: {
    amount: number;
    createdAt: number;
    approved: boolean;
    url: string;
  }[];
};
