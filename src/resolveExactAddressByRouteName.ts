import { RouteInputType, RouteProps, UrlObjectGeneric } from "./types";
import { UrlObject } from "url";

export function resolveExactAddressByRouteName<
  RouteDefinitions extends Record<string, RouteProps>
>(
  routeName: RouteInputType<RouteDefinitions>,
  routes: Record<keyof RouteDefinitions, string>
): string | UrlObject {
  if (typeof routeName === "object") {
    // TODO: find a better solution for this
    const routeNameTyped = routeName as UrlObjectGeneric<RouteDefinitions>;

    return {
      ...routeName,
      pathname: routes[routeNameTyped.pathname],
      query: routeNameTyped.query,
    };
  }
  return routes[routeName];
}
