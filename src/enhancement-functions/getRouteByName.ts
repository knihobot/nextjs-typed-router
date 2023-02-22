import { LocalizedRoute, RouteProps } from "@types-app/index";

export function getRouteByName<
  RouteDefinitions extends Record<string, RouteProps>,
  Locales extends string,
  DefaultLocale extends Locales
>(
  route: keyof RouteDefinitions,
  routes: Record<
    keyof RouteDefinitions,
    LocalizedRoute<Locales, DefaultLocale>
  >,
  params: RouteDefinitions[keyof RouteDefinitions]["params"],
  locale?: Locales,
  defaultLocale?: DefaultLocale
): Record<keyof RouteDefinitions, string>[keyof RouteDefinitions] | undefined {
  const routeAddress = routes[route][locale as Locales];

  if (!params) {
    if (!routeAddress) {
      const fallbackRouteAddress = routes[route][defaultLocale as Locales];

      if (fallbackRouteAddress) {
        return fallbackRouteAddress;
      }

      return undefined;
    }

    return routeAddress;
  }

  const paramsKeys = Object.keys(params);
  const key = paramsKeys[0];

  return routeAddress.replace(
    new RegExp(`\\[${key}\\]`, "gi"),
    // @ts-ignore TODO: assign correct type for paramKey
    params[key]
  );
}
