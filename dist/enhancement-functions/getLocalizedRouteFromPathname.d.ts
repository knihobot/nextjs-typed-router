import { LocalizedRoute, LocalizedRouteConfig, RouteProps } from "@types-app/index";
export declare function getLocalizedRouteFromPathname<RouteDefinitions extends Record<string, RouteProps>, Locales extends string>(pathname: string, routes: Record<keyof RouteDefinitions, LocalizedRoute<Locales>>, locale: Locales): string | LocalizedRouteConfig;
