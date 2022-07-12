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
  userId: string;
  amount: number;
};
