import {
  LocalizedRoute,
  RouteInputType,
  RouteProps,
  UrlObjectGeneric,
} from "@types-app/index";
import { removeUndefined } from "../helpers/removeUndefined";
import { ValidationError } from "../ValidationError/ValidationError";

export function matchRealAddressByRouteName<
  RouteDefinitions extends Record<string, RouteProps>,
  Locales extends string,
>(
  routeName: RouteInputType<RouteDefinitions>,
  routes: Record<keyof RouteDefinitions, LocalizedRoute<Locales>>,
  locale: Locales,
): string | UrlObjectGeneric<RouteDefinitions> {
  if (typeof routeName === "object") {
    const matched = routes[routeName.pathname];

    if (!matched) {
      throw new ValidationError("route-key-not-found", {
        routeName: String(routeName.pathname),
        locale,
      });
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
    throw new ValidationError("route-key-not-found", {
      routeName: String(routeName),
      locale,
    });
  }

  const matched = routes[routeName][locale];

  if (!matched) {
    const fallbackMatch = routes[routeName]["fallback"];

    if (fallbackMatch) {
      return fallbackMatch;
    }

    throw new ValidationError("fallback-required", {
      routeName: String(routeName),
    });
  }

  if (typeof matched === "object") {
    return matched.pathname;
  }

  return matched;
}
