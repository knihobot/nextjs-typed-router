import { NextRouter } from "next/router";
import { GetCurrentDomain, GetCurrentRoute, GetLocalizedRouteFromPathname, GetRouteByName, IsCurrentRoute, LocalizedRoute, MatchRealAddressByRouteName, Push, PushCustomUrl, PushShallow, RouteProps } from "./types";
interface EnhancedNextRouter<RouteDefinitions extends Record<string, RouteProps>, Locales extends string> {
    getCurrentDomain: GetCurrentDomain;
    getCurrentRoute: GetCurrentRoute<RouteDefinitions>;
    getLocalizedRouteFromPathname: GetLocalizedRouteFromPathname;
    getRouteByName: GetRouteByName<RouteDefinitions>;
    isCurrentRoute: IsCurrentRoute<RouteDefinitions>;
    locale: Locales;
    matchRealAddressByRouteName: MatchRealAddressByRouteName<RouteDefinitions>;
    push: Push<RouteDefinitions>;
    pushCustomUrl: PushCustomUrl;
    pushShallow: PushShallow<RouteDefinitions>;
}
export declare function useRouterTyped<RouteDefinitions extends Record<string, RouteProps>, Locales extends string>(routes: Record<keyof RouteDefinitions, LocalizedRoute<Locales>>): EnhancedNextRouter<RouteDefinitions, Locales> & Omit<NextRouter, "push" | "locale">;
export {};
