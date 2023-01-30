// Type guard for passing both query and params
import { RouteProps } from "@types-app/index";

export type ParamsOrQueryType<
  RouteDefinitions extends Record<string, RouteProps>,
  RouteName extends keyof RouteDefinitions
> =
  | {
      query?: RouteDefinitions[RouteName] extends RouteProps
        ? RouteDefinitions[RouteName]["query"]
        : never;
      params?: never;
    }
  | {
      query?: never;
      params?: RouteDefinitions[RouteName] extends RouteProps
        ? RouteDefinitions[RouteName]["params"]
        : never;
    };
