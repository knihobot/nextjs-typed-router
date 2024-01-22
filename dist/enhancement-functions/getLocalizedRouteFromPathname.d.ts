import { LocalizedRoute, RouteProps } from "@types-app/index";
export declare function getLocalizedRouteFromPathname<RouteDefinitions extends Record<string, RouteProps>, Locales extends string, DefaultLocale extends Locales>(pathname: string, routes: Record<keyof RouteDefinitions, LocalizedRoute<Locales, DefaultLocale>>, fallbackLocale: DefaultLocale, locale: Locales): string | undefined;
