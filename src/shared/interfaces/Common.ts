import {
  GetServerSidePropsContext,
  NextPageContext,
  PreviewData,
} from "next/types";
import { ParsedUrlQuery } from "querystring";

export type NextCTX =
  | GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
  | NextPageContext
  | null;
