import { LocalizedRoute, RouteInputType, RouteProps, UrlObjectGeneric } from "@types-app/index";
export declare function matchRealAddressByRouteName<RouteDefinitions extends Record<string, RouteProps>, Locales extends string>(routeName: RouteInputType<RouteDefinitions>, routes: Record<keyof RouteDefinitions, LocalizedRoute<Locales>>, locale?: Locales): string | UrlObjectGeneric<RouteDefinitions>;
