import { LocalizedRoute, RouteProps } from "@types-app/index";
import { removeUndefined } from "../helpers/removeUndefined";
import { ValidationError } from "../ValidationError/ValidationError";

export function getRouteByName<
  RouteDefinitions extends Record<string, RouteProps>,
  Locales extends string,
>(
  route: keyof RouteDefinitions,
  routes: Record<keyof RouteDefinitions, LocalizedRoute<Locales>>,
  locale: Locales,
  params?: RouteDefinitions[keyof RouteDefinitions]["params"],
): Record<keyof RouteDefinitions, string>[keyof RouteDefinitions] {
  const matchedRoute = routes[route];

  if (!matchedRoute) {
    throw new ValidationError("route-key-not-found", {
      routeName: String(route),
    });
  }

  let path = routes[route][locale as Locales] || routes[route]["fallback"];

  // Handle optional catch-all segments
  const optionalCatchAllRegex = /\[\[\.\.\.(.*?)]]/g;

  if (
    typeof path === "object"
      ? path.pathname.match(optionalCatchAllRegex)
      : path.match(optionalCatchAllRegex)
  ) {
    path = (typeof path === "object" ? path.pathname : path).replace(
      optionalCatchAllRegex,
      (match, segmentKey) => {
        const paramValue = params && params[segmentKey];

        if (
          params &&
          paramValue &&
          Array.isArray(paramValue) &&
          paramValue.length > 0
        ) {
          return removeUndefined(paramValue).join("/");
        }
        return ""; // Remove optional catch-all segment if not provided or empty
      },
    ) as typeof path;
  } else {
    // Handle required catch-all segments and single parameters
    if (params) {
      const paramsKeys = Object.keys(params);

      if (paramsKeys.length === 0) {
        throw new ValidationError("params-required", {
          routeName: String(route),
          locale,
        });
      }

      for (const key of paramsKeys) {
        const value = params[key];
        const catchAllRegex = new RegExp(`\\[\\.\\.\\.${key}\\]`, "g");
        const singleParamRegex = new RegExp(`\\[${key}\\]`, "gi");

        if (Array.isArray(value)) {
          const joinedValue = value.join("/") || "";
          path = (typeof path === "object" ? path.pathname : path).replace(
            catchAllRegex,
            joinedValue,
          ) as typeof path;
        } else {
          const stringValue = value || "";
          path = (typeof path === "object" ? path.pathname : path).replace(
            singleParamRegex,
            stringValue,
          ) as typeof path;
        }
      }
    }
  }

  if (typeof path === "object") {
    return path.pathname;
  }

  return path;
}
