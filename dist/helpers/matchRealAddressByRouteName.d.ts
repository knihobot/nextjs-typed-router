import { RouteInputType, RouteProps, UrlObjectGeneric } from "@types-app/index";
export declare function matchRealAddressByRouteName<RouteDefinitions extends Record<string, RouteProps>>(routeName: RouteInputType<RouteDefinitions>, routes: Record<keyof RouteDefinitions, string>): string | UrlObjectGeneric<RouteDefinitions> | null;
