import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
  NextPageContext,
  PreviewData,
} from "next/types";
import { ParsedUrlQuery } from "querystring";

export type NextCTX =
  | GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
  | NextPageContext
  | null;

export type CustomRequest = NextApiRequest & {
  user: string;
  headers: {
    authorization: string;
  };
};

export type CustomResponse = NextApiResponse & {
  headers: {
    authorization: string;
  };
};

export type yieldCronResponse = {
  [key: string]: {
    docId: string;
    amount: number | string;
  };
};

export const statusTypes = [
  "Approved",
  "Pending",
  "Declined",
  "Paid",
  "Request_withdraw",
];

export const borderColor: any = {
  approved: "border-green-500",
  pending: "border-yellow-500",
  declined: "border-red-500",
  paid: "border-green-500",
  request_withdraw: "border-orange-500",
};

export const badgeTypes = {
  declined: {
    color: "error",
    text: statusTypes[2],
  },
  approved: {
    color: "info",
    text: statusTypes[0],
  },
  paid: {
    color: "success",
    text: statusTypes[3],
  },
  pending: {
    color: "warning",
    text: statusTypes[1],
  },
  request_withdraw: {
    color: "warning",
    text: "Wait payment",
  },
} as any;

export type StatisticsTypes = {
  percent: number;
  createdAt: number;
  status?: string;
};
