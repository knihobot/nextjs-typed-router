import { LocalizedRoute, RouteProps } from "@types-app/index";
export declare function getRouteName<RouteDefinitions extends Record<string, RouteProps>, Locales extends string, DefaultLocale extends Locales>(url: string, routes: Record<keyof RouteDefinitions, LocalizedRoute<Locales, DefaultLocale>>): keyof RouteDefinitions | undefined;
