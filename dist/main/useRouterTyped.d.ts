import { NextRouter } from "next/router";
export interface RouteProps<Params extends Record<string, string> | undefined = Record<string, string> | undefined, Query extends Record<string, string> | undefined = Record<string, string> | undefined> {
    params: Params;
    query: Query;
}
export declare function useRouterTyped<RouteDefinitions extends Record<string, RouteProps>>(routes: Record<keyof RouteDefinitions, string>): {
    getRouteByName: (route: keyof RouteDefinitions, params: RouteDefinitions[keyof RouteDefinitions]["params"]) => Record<keyof RouteDefinitions, string>[keyof RouteDefinitions];
} & NextRouter;
