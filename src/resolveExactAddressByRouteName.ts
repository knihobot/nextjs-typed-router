import { RouteInputType, RouteProps } from "./types";

export function resolveExactAddressByRouteName<
  RouteDefinitions extends Record<string, RouteProps>
>(
  routeName: RouteInputType<RouteDefinitions>,
  routes: Record<keyof RouteDefinitions, string>
): string | Record<string, unknown> {
  if (typeof routeName === "object") {
    return {
      ...routeName,
      pathname: routes[routeName.pathname],
      query: routeName.query,
    };
  }
  return routes[routeName];
}
