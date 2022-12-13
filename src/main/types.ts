/*
import { UrlObject } from "url";
import { NextComponentType, NextPageContext } from "next";
import {
  GetServerSidePropsContext as GetServerSidePropsContextNext,
  GetStaticPropsContext as GetStaticPropsContextNext,
  GetStaticPropsResult,
  PreviewData,
  Redirect,
} from "next/types";
import { ParsedUrlQuery } from "querystring";

// Router
export interface TransitionOptions {
  shallow?: boolean;
  locale?: string | false;
  scroll?: boolean;
}

export type RouteInputType<RouteName extends RoutesKeys> =
  | UrlObjectGeneric<RouteName>
  | RouteName;

export type RoutesKeys = keyof typeof routes;

export interface UrlObjectGeneric<RouteName extends RoutesKeys>
  extends Omit<UrlObject, "pathname" | "query"> {
  pathname: RouteName;
  query: RouteLabelsAndParamsType[RouteName] extends RouteProps
    ? RouteLabelsAndParamsType[RouteName]["query"]
    : undefined;
}

// KnihobotPage
type KnihobotPageContext<RouteName extends RoutesKeys> = Omit<
  NextPageContext,
  "query"
> & {
  query: RouteLabelsAndParamsType[RouteName] extends RouteProps
    ? RouteLabelsAndParamsType[RouteName]["query"]
    : undefined;
};

export type KnihobotPage<
  RouteName extends RoutesKeys = RoutesKeys,
  PageProps = Record<string, never>,
  IPageProps = PageProps
> = NextComponentType<KnihobotPageContext<RouteName>, IPageProps, PageProps>;

// GetStaticProps
export type GetStaticProps<
  RouteName extends RoutesKeys = RoutesKeys,
  Props extends Record<string, string> = Record<string, string>,
  Data extends PreviewData = PreviewData
> = (
  context: GetStaticPropsContext<RouteName, Data>
) => Promise<GetStaticPropsResult<Props>> | GetStaticPropsResult<Props>;

type GetStaticPropsContext<
  RouteName extends RoutesKeys = RoutesKeys,
  Data extends PreviewData = PreviewData
> = Exclude<GetStaticPropsContextNext<ParsedUrlQuery, Data>, "params"> & {
  params: RouteLabelsAndParamsType[RouteName] extends RouteProps
    ? RouteLabelsAndParamsType[RouteName]["params"]
    : object;
};

// GetServerSideProps
type GetServerSidePropsResult<Props> =
  | { props: Props | Promise<Props> }
  | { redirect: Redirect }
  | { notFound: true };

export type GetServerSideProps<
  RouteName extends RoutesKeys = RoutesKeys,
  Props = unknown,
  Data extends PreviewData = PreviewData
> = (
  context: GetServerSidePropsContext<RouteName, Data>,
  axiosConfig?: AxiosRequestConfig
) => Promise<GetServerSidePropsResult<Props>>;

export type GetServerSidePropsContext<
  RouteName extends RoutesKeys = RoutesKeys,
  Data extends PreviewData = PreviewData
> = Exclude<
  GetServerSidePropsContextNext<ParsedUrlQuery, Data>,
  "params" | "query"
> & {
  params: RouteLabelsAndParamsType[RouteName] extends RouteProps
    ? RouteLabelsAndParamsType[RouteName]["params"]
    : object;
  query: RouteLabelsAndParamsType[RouteName] extends RouteProps
    ? RouteLabelsAndParamsType[RouteName]["query"]
    : ParsedUrlQuery;
};
*/
