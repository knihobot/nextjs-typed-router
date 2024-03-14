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
>(
  routeName: RouteInputType<RouteDefinitions>,
  routes: Record<keyof RouteDefinitions, LocalizedRoute<Locales>>,
  locale?: Locales,
): string | UrlObjectGeneric<RouteDefinitions> {
  if (!locale) {
    throw new Error("Locale is not defined.");
  }

  if (typeof routeName === "object") {
    const matched = routes[routeName.pathname];

    if (!matched) {
      throw new Error(
        `No route with provided key ${String(
          routeName.pathname,
        )} exists in routes object`,
      );
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

    const localizedAddress = matched[locale] || matched["fallback"];

    return {
      pathname:
        typeof localizedAddress === "object"
          ? localizedAddress.pathname
          : localizedAddress,
      query: routeName.query,
    };
  }

  const matchedRouteSet = routes[routeName];

  if (!matchedRouteSet) {
    throw new Error(
      `No route with provided key ${String(routeName)} exists in routes object`,
    );
  }

  const matched = routes[routeName][locale];

  if (!matched) {
    const fallbackMatch = routes[routeName]["fallback"];

    if (fallbackMatch) {
      return fallbackMatch;
    }

    throw new Error(
      `No route with provided key ${String(
        routeName,
      )} exists in routes object for locale ${locale}`,
    );
  }

  if (typeof matched === "object") {
    return matched.pathname;
  }

  return matched;
}
