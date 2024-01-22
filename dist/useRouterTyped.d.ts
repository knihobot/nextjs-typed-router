import { NextRouter } from "next/router";
import { GetCurrentDomain, GetCurrentRoute, GetLocalizedRouteFromPathname, GetRouteByName, GetRouteName, IsCurrentRoute, LocalizedRoute, MatchRealAddressByRouteName, Push, PushCustomUrl, PushShallow, RouteProps } from "./types";
interface EnhancedNextRouter<RouteDefinitions extends Record<string, RouteProps>, Locales extends string> {
    getCurrentDomain: GetCurrentDomain;
    getCurrentRoute: GetCurrentRoute<RouteDefinitions>;
    getLocalizedRouteFromPathname: GetLocalizedRouteFromPathname;
    getRouteByName: GetRouteByName<RouteDefinitions>;
    getRouteName: GetRouteName<RouteDefinitions>;
    isCurrentRoute: IsCurrentRoute<RouteDefinitions>;
    locale: Locales;
    matchRealAddressByRouteName: MatchRealAddressByRouteName<RouteDefinitions>;
    push: Push<RouteDefinitions>;
    pushCustomUrl: PushCustomUrl;
    pushShallow: PushShallow<RouteDefinitions>;
}
export declare function useRouterTyped<RouteDefinitions extends Record<string, RouteProps>, Locales extends string, DefaultLocale extends Locales>(routes: Record<keyof RouteDefinitions, LocalizedRoute<Locales, DefaultLocale>>, defaultLocale: DefaultLocale): EnhancedNextRouter<RouteDefinitions, Locales> & Omit<NextRouter, "push" | "locale">;
export {};
