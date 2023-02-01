import { UrlObject } from "url";
import { ParsedUrlQuery } from "querystring";
import {
  GetStaticPropsResult,
  NextComponentType,
  NextPageContext as NextPageContextDefault,
  PreviewData,
  Redirect,
} from "next";

import {
  GetServerSidePropsContext as GetServerSidePropsContextNext,
  GetStaticPropsContext as GetStaticPropsContextNext,
} from "next/types";

/**
 * Optional route props
 */
export interface RouteProps<
  Params extends Record<string, string | (string | undefined)[]> | undefined =
    | Record<string, string | (string | undefined)[]>
    | undefined,
  Query extends Record<string, string> | undefined =
    | Record<string, string>
    | undefined
> {
  params: Params;
  query: Query;
}

/**
 * Options for router push function
 */
export interface TransitionOptions {
  shallow?: boolean;
  locale?: string | false;
  scroll?: boolean;
  unstable_skipClientCache?: boolean;
}

export interface UrlObjectGeneric<
  RouteDefinitions extends Record<string, RouteProps>
> extends Omit<UrlObject, "pathname" | "query"> {
  pathname: keyof RouteDefinitions | string;
  query: GetRoutePropType<
    RouteDefinitions,
    keyof RouteDefinitions,
    "query",
    undefined
  >;
}

export type RouteInputType<
  RouteDefinitions extends Record<string, RouteProps>
> = UrlObjectGeneric<RouteDefinitions> | keyof RouteDefinitions;

/**
 * Enhanced router functions types
 */
export interface GetRouteByName<
  RouteDefinitions extends Record<string, RouteProps>
> {
  (
    route: keyof RouteDefinitions,
    params: RouteDefinitions[keyof RouteDefinitions]["params"]
  ): Record<keyof RouteDefinitions, string>[keyof RouteDefinitions];
}

export interface Push<RouteDefinitions extends Record<string, RouteProps>> {
  (
    route: RouteInputType<RouteDefinitions>,
    as?: RouteInputType<RouteDefinitions>,
    options?: TransitionOptions
  ): Promise<void>;
}

export interface PushShallow<
  RouteDefinitions extends Record<string, RouteProps>
> {
  (
    route: RouteInputType<RouteDefinitions>,
    as?: RouteInputType<RouteDefinitions>
  ): Promise<void>;
}

export interface GetCurrentRoute<
  RouteDefinitions extends Record<string, RouteProps>
> {
  (): keyof RouteDefinitions | undefined;
}

export interface IsCurrentRoute<
  RouteDefinitions extends Record<string, RouteProps>
> {
  (route: keyof RouteDefinitions): boolean;
}

export interface GetCurrentDomain {
  (): string | undefined;
}

export interface PushCustomUrl {
  (
    url: UrlObject | string,
    as?: UrlObject | string,
    options?: TransitionOptions
  ): Promise<void>;
}

/**
 * NextPage
 */
export interface NextPageContext<
  RouteDefinitions extends Record<string, RouteProps>,
  RouteName extends keyof RouteDefinitions
> extends Omit<NextPageContextDefault, "query"> {
  query: GetRoutePropType<RouteDefinitions, RouteName, "query", undefined>;
}

export type NextPage<
  RouteDefinitions extends Record<string, RouteProps>,
  RouteName extends keyof RouteDefinitions,
  PageProps = Record<string, never>,
  IPageProps = PageProps
> = NextComponentType<
  NextPageContext<RouteDefinitions, RouteName>,
  IPageProps,
  PageProps
>;

/**
 * GetStaticProps
 */
export interface GetStaticProps<
  RouteDefinitions extends Record<string, RouteProps>,
  RouteName extends keyof RouteDefinitions,
  Props extends Record<string, string> = Record<string, string>,
  Data extends PreviewData = PreviewData
> {
  (context: GetStaticPropsContext<RouteDefinitions, RouteName, Data>):
    | Promise<GetStaticPropsResult<Props>>
    | GetStaticPropsResult<Props>;
}

// TODO: Why?
// @ts-ignore
export interface GetStaticPropsContext<
  RouteDefinitions extends Record<string, RouteProps>,
  RouteName extends keyof RouteDefinitions,
  Data extends PreviewData = PreviewData
> extends Exclude<GetStaticPropsContextNext<ParsedUrlQuery, Data>, "params"> {
  params: RouteDefinitions[RouteName] extends RouteProps
    ? RouteDefinitions[RouteName]["params"]
    : undefined;
}

/**
 * GetServerSideProps
 */
export interface GetServerSideProps<
  RouteDefinitions extends Record<string, RouteProps>,
  RouteName extends keyof RouteDefinitions,
  Props = unknown,
  Data extends PreviewData = PreviewData
> {
  (
    context: GetServerSidePropsContext<RouteDefinitions, RouteName, Data>
  ): Promise<GetServerSidePropsResult<Props>>;
}

export type GetServerSidePropsContext<
  RouteDefinitions extends Record<string, RouteProps>,
  RouteName extends keyof RouteDefinitions,
  Data extends PreviewData = PreviewData
> = Exclude<
  GetServerSidePropsContextNext<ParsedUrlQuery, Data>,
  "params" | "query"
> & {
  params: GetRoutePropType<RouteDefinitions, RouteName, "params", object>;
  query: GetRoutePropType<RouteDefinitions, RouteName, "query", ParsedUrlQuery>;
};

export type GetServerSidePropsResult<Props> =
  | { props: Props | Promise<Props> }
  | { redirect: Redirect }
  | { notFound: true };

/**
 * Utility
 */
type GetRoutePropType<
  RouteDefinitions extends Record<string, RouteProps>,
  RouteName extends keyof RouteDefinitions,
  RouteProp extends keyof RouteProps,
  NotAvailableRoutePropType extends object | undefined
> = RouteDefinitions[RouteName] extends RouteProps
  ? RouteDefinitions[RouteName][RouteProp]
  : NotAvailableRoutePropType;

export type RouteDefinitions<RouteName extends string> = Record<
  RouteName,
  RouteProps
>;
