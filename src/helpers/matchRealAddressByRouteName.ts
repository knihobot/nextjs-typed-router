import { RouteInputType, RouteProps, UrlObjectGeneric } from "@types-app/index";

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
