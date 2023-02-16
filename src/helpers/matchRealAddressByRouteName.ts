import { RouteInputType, RouteProps, UrlObjectGeneric } from "@types-app/index";
import { removeUndefined } from "./removeUndefined";

export function matchRealAddressByRouteName<
  RouteDefinitions extends Record<string, RouteProps>
>(
  routeName: RouteInputType<RouteDefinitions>,
  routes: Record<keyof RouteDefinitions, string>
): string | UrlObjectGeneric<RouteDefinitions> | undefined {
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

    return {
      pathname: routes[routeName.pathname],
      query: routeName.query,
    };
  }

  const matched = routes[routeName];

  if (!matched) {
    return undefined;
  }

  return matched;
}
