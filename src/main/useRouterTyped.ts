import { NextRouter, useRouter } from "next/router";
import { resolveExactAddressByRouteName } from "./resolveExactAddressByRouteName";
import {
  GetCurrentDomain,
  GetCurrentRoute,
  GetRouteByName,
  IsCurrentRoute,
  Push,
  PushShallow,
  RouteProps,
} from "./types";

interface EnhancedNextRouter<
  RouteDefinitions extends Record<string, RouteProps>
> {
  getRouteByName: GetRouteByName<RouteDefinitions>;
  push: Push<RouteDefinitions>;
  pushShallow: PushShallow<RouteDefinitions>;
  getCurrentRoute: GetCurrentRoute<RouteDefinitions>;
  isCurrentRoute: IsCurrentRoute<RouteDefinitions>;
  getCurrentDomain: GetCurrentDomain;
}

export function useRouterTyped<
  RouteDefinitions extends Record<string, RouteProps>
>(
  routes: Record<keyof RouteDefinitions, string>
): EnhancedNextRouter<RouteDefinitions> & Omit<NextRouter, "push"> {
  const router = useRouter();

  const pushShallow: PushShallow<RouteDefinitions> = async (route, as?) => {
    await push(route, as, { shallow: true });
  };

  const push: Push<RouteDefinitions> = async (route, as?, options?) => {
    await router.push(
      resolveExactAddressByRouteName(route, routes),
      as ? resolveExactAddressByRouteName(as, routes) : undefined,
      options
    );
  };

  const isCurrentRoute: IsCurrentRoute<RouteDefinitions> = (route) => {
    return routes[route] === router.pathname;
  };

  const getCurrentRoute: GetCurrentRoute<RouteDefinitions> = () => {
    let result;

    // Object.keys removes types from keys - "as" needed
    Object.keys(routes).map((routeKey) => {
      const currentNode = routes[routeKey as keyof RouteDefinitions];

      if (currentNode === router.pathname) {
        result = routeKey as keyof RouteDefinitions;
      }
    });

    return result;
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

  const getRouteByName: GetRouteByName<RouteDefinitions> = (route, params) => {
    const routeAddress = routes[route];

    if (!params) {
      return routeAddress;
    }

    const paramsKeys = Object.keys(params);
    const key = paramsKeys[0];

    return routeAddress.replace(
      new RegExp(`\\[${key}\\]`, "gi"),
      // @ts-ignore TODO: assign correct type for paramKey
      params[key]
    );
  };

  return {
    ...router,
    getCurrentDomain,
    getCurrentRoute,
    getRouteByName,
    isCurrentRoute,
    push,
    pushShallow,
  };
}
