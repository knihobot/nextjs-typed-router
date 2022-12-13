import { NextRouter, useRouter } from "next/router";

export interface RouteProps<
  Params extends Record<string, string> | undefined =
    | Record<string, string>
    | undefined,
  Query extends Record<string, string> | undefined =
    | Record<string, string>
    | undefined
> {
  params: Params;
  query: Query;
}

export function useRouterTyped<
  RouteDefinitions extends Record<string, RouteProps>
>(
  routes: Record<keyof RouteDefinitions, string>
): {
  getRouteByName: (
    route: keyof RouteDefinitions,
    params: RouteDefinitions[keyof RouteDefinitions]["params"]
  ) => Record<keyof RouteDefinitions, string>[keyof RouteDefinitions];
} & NextRouter {
  const router = useRouter();

  /*async function pushShallow(
    route: keyof RouteDefinitions,
    as?: UrlObject | keyof RouteDefinitions
  ): Promise<void> {
    await router.push(
      resolveExactAddressByRouteName(route),
      as ? resolveExactAddressByRouteName(as) : undefined,
      { shallow: true }
    );
  }*/

  /*async function push<RouteName extends RoutesKeys>(
    route: RouteInputType<RouteName>,
    as?: RouteInputType<RoutesKeys>,
    options?: TransitionOptions
  ): Promise<void> {
    await router.push(
      resolveExactAddressByRouteName(route),
      as ? resolveExactAddressByRouteName(as) : undefined,
      options
    );
  }*/

  function isCurrentRoute(route: keyof RouteDefinitions): boolean {
    return routes[route] === router.pathname;
  }

  function getCurrentRoute(): keyof RouteDefinitions | undefined {
    let result;

    // Object.keys removes types from keys - "as" needed
    Object.keys(routes).map((routeKey) => {
      const currentNode = routes[routeKey as keyof RouteDefinitions];

      if (currentNode === router.pathname) {
        result = routeKey as keyof RouteDefinitions;
      }
    });

    return result;
  }

  function getCurrentDomain() {
    const { locale, domainLocales } = router;
    if (!locale || !domainLocales) {
      return;
    }
    const currentDomain = domainLocales?.find(
      (domainLocale) => domainLocale?.defaultLocale === locale
    );
    return currentDomain?.domain;
  }

  const getRouteByName = (
    route: keyof RouteDefinitions,
    params: RouteDefinitions[keyof RouteDefinitions]["params"]
  ) => {
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
    getRouteByName,
  };
}
