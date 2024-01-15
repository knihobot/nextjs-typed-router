import { LocalizedRoute, RouteProps } from "@types-app/index";
import { removeUndefined } from "../helpers/removeUndefined";

export function getRouteByName<
  RouteDefinitions extends Record<string, RouteProps>,
  Locales extends string,
  DefaultLocale extends Locales,
>(
  route: keyof RouteDefinitions,
  routes: Record<
    keyof RouteDefinitions,
    LocalizedRoute<Locales, DefaultLocale>
  >,
  params: RouteDefinitions[keyof RouteDefinitions]["params"],
  locale?: Locales,
  defaultLocale?: DefaultLocale,
): Record<keyof RouteDefinitions, string>[keyof RouteDefinitions] | undefined {
  const matchedRoute = routes[route];

  if (!matchedRoute) {
    return undefined;
  }

  let path =
    routes[route][locale as Locales] || routes[route][defaultLocale as Locales];

  // Handle optional catch-all segments
  const optionalCatchAllRegex = /\[\[\.\.\.(.*?)]]/g;

  if (path.match(optionalCatchAllRegex)) {
    path = path.replace(optionalCatchAllRegex, (match, segmentKey) => {
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
    }) as typeof path;
  } else {
    // Handle required catch-all segments and single parameters
    if (params) {
      const paramsKeys = Object.keys(params);

      if (paramsKeys.length === 0) {
        return undefined;
      }

      for (const key of paramsKeys) {
        const value = params[key];
        const catchAllRegex = new RegExp(`\\[\\.\\.\\.${key}\\]`, "g");
        const singleParamRegex = new RegExp(`\\[${key}\\]`, "gi");

        if (Array.isArray(value)) {
          const joinedValue = value.join("/") || "";
          path = path.replace(catchAllRegex, joinedValue) as typeof path;
        } else {
          const stringValue = value || "";
          path = path.replace(singleParamRegex, stringValue) as typeof path;
        }
      }
    }
  }

  return path;
}
