import { LocalizedRoute, RouteProps } from "@types-app/index";
export declare function getRouteByName<RouteDefinitions extends Record<string, RouteProps>, Locales extends string, DefaultLocale extends Locales>(route: keyof RouteDefinitions, routes: Record<keyof RouteDefinitions, LocalizedRoute<Locales, DefaultLocale>>, params: RouteDefinitions[keyof RouteDefinitions]["params"], locale?: Locales): Record<keyof RouteDefinitions, string>[keyof RouteDefinitions];
