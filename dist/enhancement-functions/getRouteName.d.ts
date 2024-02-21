import { LocalizedRoute, RouteProps } from "@types-app/index";
export declare function getRouteName<RouteDefinitions extends Record<string, RouteProps>, Locales extends string>(url: string, routes: Record<keyof RouteDefinitions, LocalizedRoute<Locales>>): keyof RouteDefinitions | undefined | null;
