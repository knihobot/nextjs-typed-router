import { NextRouter } from "next/router";
import { GetCurrentDomain, GetCurrentRoute, GetRouteByName, IsCurrentRoute, Push, PushShallow, RouteProps } from "./types";
interface EnhancedNextRouter<RouteDefinitions extends Record<string, RouteProps>> {
    getRouteByName: GetRouteByName<RouteDefinitions>;
    push: Push<RouteDefinitions>;
    pushShallow: PushShallow<RouteDefinitions>;
    getCurrentRoute: GetCurrentRoute<RouteDefinitions>;
    isCurrentRoute: IsCurrentRoute<RouteDefinitions>;
    getCurrentDomain: GetCurrentDomain;
}
export declare function useRouterTyped<RouteDefinitions extends Record<string, RouteProps>>(routes: Record<keyof RouteDefinitions, string>): EnhancedNextRouter<RouteDefinitions> & Omit<NextRouter, "push">;
export {};
