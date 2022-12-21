import { RouteInputType, RouteProps } from "./types";
export declare function resolveExactAddressByRouteName<RouteDefinitions extends Record<string, RouteProps>>(routeName: RouteInputType<RouteDefinitions>, routes: Record<keyof RouteDefinitions, string>): string | Record<string, unknown>;
