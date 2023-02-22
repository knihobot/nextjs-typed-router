import { LocalizedRoute, RouteProps } from "@types-app/index";

export function getRouteName<
  RouteDefinitions extends Record<string, RouteProps>,
  Locales extends string,
  DefaultLocale extends Locales
>(
  url: string,
  routes: Record<keyof RouteDefinitions, LocalizedRoute<Locales, DefaultLocale>>
): keyof RouteDefinitions | undefined {
  for (const routeName in routes) {
    const selectedRoute = routes[routeName];

    for (const localeKey in selectedRoute) {
      const localizedRoute = selectedRoute[localeKey];

      if (localizedRoute === url) {
        return routeName;
      }
    }
  }
}
