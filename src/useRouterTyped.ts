import { NextRouter, useRouter } from "next/router";
import { resolveExactAddressByRouteName } from "./resolveExactAddressByRouteName";
import {
  GetCurrentDomain,
  GetCurrentRoute,
  GetRouteByName,
  IsCurrentRoute,
  PushCustomUrl,
  PushReplace,
  PushShallow,
  RouteProps,
} from "./types";
import { translatePushReplaceArgs } from "next-translate-routes/react/translatePushReplaceArgs";

interface EnhancedNextRouter<
  RouteDefinitions extends Record<string, RouteProps>
> {
  getRouteByName: GetRouteByName<RouteDefinitions>;
  pushReplace: PushReplace<RouteDefinitions>;
  pushShallow: PushShallow<RouteDefinitions>;
  getCurrentRoute: GetCurrentRoute<RouteDefinitions>;
  isCurrentRoute: IsCurrentRoute<RouteDefinitions>;
  getCurrentDomain: GetCurrentDomain;
  pushCustomUrl: PushCustomUrl;
}

export function useRouterTyped<
  RouteDefinitions extends Record<string, RouteProps>
>(
  routes: Record<keyof RouteDefinitions, string>
): EnhancedNextRouter<RouteDefinitions> & Omit<NextRouter, "push"> {
  const router = useRouter();

  const pushShallow: PushShallow<RouteDefinitions> = async (
    route,
    as?,
    translate?
  ) => {
    const push = pushReplace("push");

    await push(route, as, { shallow: true }, translate);
  };

  const pushCustomUrl: PushCustomUrl = async (url, as, options) => {
    await router.push(url, as, options);
  };

  const pushReplace: (
    fnName: "push" | "replace"
  ) => PushReplace<RouteDefinitions> =
    (fnName: "push" | "replace") =>
    async (route, as?, options?, translate?) => {
      const url = resolveExactAddressByRouteName<RouteDefinitions>(
        route,
        routes
      );
      const urlAs = as
        ? resolveExactAddressByRouteName<RouteDefinitions>(as, routes)
        : undefined;

      const translatedArgs = translate
        ? translatePushReplaceArgs({
            router,
            url,
            as: urlAs,
            locale: options?.locale,
          })
        : undefined;

      const translatedUrl = translatedArgs?.url;
      const translatedAsUrl = translatedArgs?.as;
      const translatedLocale = translatedArgs?.locale;

      await router[fnName](
        translatedUrl ? translatedUrl : url,
        translatedAsUrl ? translatedAsUrl : urlAs,
        translatedLocale ? { ...options, locale: translatedLocale } : options
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
    push: pushReplace("push"),
    pushCustomUrl,
    pushShallow,
    replace: pushReplace("replace"),
  };
}
