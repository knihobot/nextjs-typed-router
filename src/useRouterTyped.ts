import { NextRouter, useRouter } from "next/router";
import {
  GetCurrentDomain,
  GetCurrentRoute,
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

interface EnhancedNextRouter<
  RouteDefinitions extends Record<string, RouteProps>,
  Locales extends string
> {
  getCurrentDomain: GetCurrentDomain;
  getCurrentRoute: GetCurrentRoute<RouteDefinitions>;
  getRouteByName: GetRouteByName<RouteDefinitions>;
  getRouteName: GetRouteName<RouteDefinitions>;
  isCurrentRoute: IsCurrentRoute<RouteDefinitions>;
  push: Push<RouteDefinitions>;
  pushCustomUrl: PushCustomUrl;
  pushShallow: PushShallow<RouteDefinitions>;
  matchRealAddressByRouteName: MatchRealAddressByRouteName<RouteDefinitions>;
  locale: Locales;
}

export function useRouterTyped<
  RouteDefinitions extends Record<string, RouteProps>,
  Locales extends string,
  DefaultLocale extends Locales
>(
  routes: Record<
    keyof RouteDefinitions,
    LocalizedRoute<Locales, DefaultLocale>
  >,
  defaultLocale: DefaultLocale
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
      options
    );
  };

  const isCurrentRoute: IsCurrentRoute<RouteDefinitions> = (route) => {
    return routes[route][router.locale as Locales] === router.pathname;
  };

  const getCurrentRoute: GetCurrentRoute<RouteDefinitions> = () => {
    for (const routeKey in routes) {
      const currentNode = routes[routeKey][router.locale as Locales];

      if (!currentNode) {
        const fallbackCurrentNode = routes[routeKey][defaultLocale];

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
      (domainLocale) => domainLocale?.defaultLocale === locale
    );
    return currentDomain?.domain;
  };

  const getRouteName: GetRouteName<RouteDefinitions> = (url) =>
    getRouteNameStandalone(url, routes);

  const getRouteByName: GetRouteByName<RouteDefinitions> = (route, params) =>
    getRouteByNameStandalone(
      route,
      routes,
      params,
      router.locale as Locales,
      defaultLocale
    );

  const matchRealAddressByRouteName: MatchRealAddressByRouteName<
    RouteDefinitions
  > = (routeName: RouteInputType<RouteDefinitions>) =>
    matchRealAddressByRouteNameStandalone(
      routeName,
      routes,
      router.locale as Locales,
      defaultLocale
    );

  return {
    ...router,
    locale: router.locale as Locales,
    getCurrentDomain,
    getCurrentRoute,
    getRouteByName,
    getRouteName,
    isCurrentRoute,
    matchRealAddressByRouteName,
    push,
    pushCustomUrl,
    pushShallow,
  };
}
