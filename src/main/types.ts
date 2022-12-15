import { UrlObject } from "url";

export interface RouteProps<
  Params extends Record<string, string> | undefined =
    | Record<string, string>
    | undefined,
  Query extends Record<string, string> | undefined =
    | Record<string, string>
    | undefined
> {
  params: Params;
  query: Query;
}

export interface TransitionOptions {
  shallow?: boolean;
  locale?: string | false;
  scroll?: boolean;
  unstable_skipClientCache?: boolean;
}

export interface UrlObjectGeneric<
  RouteDefinitions extends Record<string, RouteProps>
> extends Omit<UrlObject, "pathname" | "query"> {
  pathname: keyof RouteDefinitions;
  query: RouteDefinitions[keyof RouteDefinitions] extends RouteProps
    ? RouteDefinitions[keyof RouteDefinitions]["query"]
    : undefined;
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
