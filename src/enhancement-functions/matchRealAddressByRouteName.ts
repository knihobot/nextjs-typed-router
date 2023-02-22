import {
  LocalizedRoute,
  RouteInputType,
  RouteProps,
  UrlObjectGeneric,
} from "@types-app/index";
import { removeUndefined } from "../helpers/removeUndefined";

export function matchRealAddressByRouteName<
  RouteDefinitions extends Record<string, RouteProps>,
  Locales extends string,
  DefaultLocale extends Locales
>(
  routeName: RouteInputType<RouteDefinitions>,
  routes: Record<
    keyof RouteDefinitions,
    LocalizedRoute<Locales, DefaultLocale>
  >,
  locale?: Locales,
  defaultLocale?: DefaultLocale
): string | UrlObjectGeneric<RouteDefinitions> | undefined {
  if (!locale) {
    return undefined;
  }

  if (typeof routeName === "object") {
    const matched = routes[routeName.pathname];

    if (!matched) {
      return undefined;
    }

    const query = routeName.query;

    const keys = query ? Object.keys(query) : undefined;

    if (query) {
      keys?.map((key) => {
        const params = query[key];

        if (Array.isArray(params)) {
          query[key] = removeUndefined(params);
        }
      });
    }

    const localizedRouteObject = routes[routeName.pathname];

    return {
      pathname: localizedRouteObject[locale],
      query: routeName.query,
    };
  }

  const matched = routes[routeName][locale];

  if (!matched) {
    const fallbackMatch = routes[routeName][defaultLocale as DefaultLocale];

    if (fallbackMatch) {
      return fallbackMatch;
    }

    return undefined;
  }

  return matched;
}
