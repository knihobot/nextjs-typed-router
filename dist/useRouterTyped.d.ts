import { NextRouter } from "next/router";
import { GetCurrentDomain, GetCurrentRoute, GetRouteByName, GetRouteName, IsCurrentRoute, LocalizedRoute, MatchRealAddressByRouteName, Push, PushCustomUrl, PushShallow, RouteProps } from "./types";
interface EnhancedNextRouter<RouteDefinitions extends Record<string, RouteProps>, Locales extends string> {
    getCurrentDomain: GetCurrentDomain;
    getCurrentRoute: GetCurrentRoute<RouteDefinitions>;
    getRouteByName: GetRouteByName<RouteDefinitions>;
    getRouteName: GetRouteName<RouteDefinitions>;
    isCurrentRoute: IsCurrentRoute<RouteDefinitions>;
    push: Push<RouteDefinitions>;
    pushCustomUrl: PushCustomUrl;
    pushShallow: PushShallow<RouteDefinitions>;
    matchRealAddressByRouteName: MatchRealAddressByRouteName<RouteDefinitions>;
    locale: Locales;
}
export declare function useRouterTyped<RouteDefinitions extends Record<string, RouteProps>, Locales extends string, DefaultLocale extends Locales>(routes: Record<keyof RouteDefinitions, LocalizedRoute<Locales, DefaultLocale>>, defaultLocale: DefaultLocale): EnhancedNextRouter<RouteDefinitions, Locales> & Omit<NextRouter, "push" | "locale">;
export {};
