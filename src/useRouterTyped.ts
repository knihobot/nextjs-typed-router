import { NextRouter, useRouter } from "next/router";
import {
  GetCurrentDomain,
  GetCurrentRoute,
  GetLocalizedRouteFromPathname,
  GetRouteByName,
  GetRouteName,
  IsCurrentRoute,
  LocalizedRoute,
  MatchRealAddressByRouteName,
  Push,
  PushCustomUrl,
  PushShallow,
  RouteInputType,
  RouteProps,
} from "./types";
import { matchRealAddressByRouteName as matchRealAddressByRouteNameStandalone } from "./enhancement-functions/matchRealAddressByRouteName";
import { getRouteByName as getRouteByNameStandalone } from "./enhancement-functions/getRouteByName";
import { UrlObject } from "url";
import { getRouteName as getRouteNameStandalone } from "./enhancement-functions/getRouteName";
import { getLocalizedRouteFromPathname as getLocalizedRouteFromPathnameStandalone } from "./enhancement-functions/getLocalizedRouteFromPathname";

interface EnhancedNextRouter<
  RouteDefinitions extends Record<string, RouteProps>,
  Locales extends string,
> {
  getCurrentDomain: GetCurrentDomain;
  getCurrentRoute: GetCurrentRoute<RouteDefinitions>;
  getLocalizedRouteFromPathname: GetLocalizedRouteFromPathname;
  getRouteByName: GetRouteByName<RouteDefinitions>;
  getRouteName: GetRouteName<RouteDefinitions>;
  isCurrentRoute: IsCurrentRoute<RouteDefinitions>;
  locale: Locales;
  matchRealAddressByRouteName: MatchRealAddressByRouteName<RouteDefinitions>;
  push: Push<RouteDefinitions>;
  pushCustomUrl: PushCustomUrl;
  pushShallow: PushShallow<RouteDefinitions>;
}

export function useRouterTyped<
  RouteDefinitions extends Record<string, RouteProps>,
  Locales extends string,
>(
  routes: Record<keyof RouteDefinitions, LocalizedRoute<Locales>>,
): EnhancedNextRouter<RouteDefinitions, Locales> &
  Omit<NextRouter, "push" | "locale"> {
  const router = useRouter();

  const pushShallow: PushShallow<RouteDefinitions> = async (route, as?) => {
    await push(route, as, { shallow: true });
  };

  const pushCustomUrl: PushCustomUrl = async (url, as, options) => {
    await router.push(url, as, options);
  };

  const push: Push<RouteDefinitions> = async (route, as?, options?) => {
    const url = matchRealAddressByRouteName(route);

    // TODO: fix type casting
    await router.push(
      url as string | UrlObject,
      as ? (matchRealAddressByRouteName(as) as string | UrlObject) : undefined,
      options,
    );
  };

  const isCurrentRoute: IsCurrentRoute<RouteDefinitions> = (route) => {
    return routes[route][router.locale as Locales] === router.pathname;
  };

  const getCurrentRoute: GetCurrentRoute<RouteDefinitions> = () => {
    for (const routeKey in routes) {
      const currentNode = routes[routeKey][router.locale as Locales];

      if (!currentNode) {
        const fallbackCurrentNode = routes[routeKey]["fallback"];

        if (fallbackCurrentNode && fallbackCurrentNode === router.pathname) {
          return routeKey;
        }
      }

      if (currentNode === router.pathname) {
        return routeKey;
      }
    }
  };

  const getCurrentDomain: GetCurrentDomain = () => {
    const { locale, domainLocales } = router;
    if (!locale || !domainLocales) {
      return;
    }
    const currentDomain = domainLocales?.find(
      (domainLocale) => domainLocale?.defaultLocale === locale,
    );
    return currentDomain?.domain;
  };

  const getRouteName: GetRouteName<RouteDefinitions> = (url) =>
    getRouteNameStandalone(url, routes);

  const getLocalizedRouteFromPathname: GetLocalizedRouteFromPathname = (
    pathname,
  ) =>
    getLocalizedRouteFromPathnameStandalone(
      pathname,
      routes,
      router.locale as Locales,
    );

  const getRouteByName: GetRouteByName<RouteDefinitions> = (route, params) =>
    getRouteByNameStandalone(route, routes, params, router.locale as Locales);

  const matchRealAddressByRouteName: MatchRealAddressByRouteName<
    RouteDefinitions
  > = (routeName: RouteInputType<RouteDefinitions>) =>
    matchRealAddressByRouteNameStandalone(
      routeName,
      routes,
      router.locale as Locales,
    );

  return {
    ...router,
    getCurrentDomain,
    getCurrentRoute,
    getLocalizedRouteFromPathname,
    getRouteByName,
    getRouteName,
    isCurrentRoute,
    locale: router.locale as Locales,
    matchRealAddressByRouteName,
    push,
    pushCustomUrl,
    pushShallow,
  };
}
