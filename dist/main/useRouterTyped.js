"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRouterTyped = void 0;
const router_1 = require("next/router");
function useRouterTyped(routes) {
    const router = (0, router_1.useRouter)();
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
    function isCurrentRoute(route) {
        return routes[route] === router.pathname;
    }
    function getCurrentRoute() {
        let result;
        // Object.keys removes types from keys - "as" needed
        Object.keys(routes).map((routeKey) => {
            const currentNode = routes[routeKey];
            if (currentNode === router.pathname) {
                result = routeKey;
            }
        });
        return result;
    }
    function getCurrentDomain() {
        const { locale, domainLocales } = router;
        if (!locale || !domainLocales) {
            return;
        }
        const currentDomain = domainLocales === null || domainLocales === void 0 ? void 0 : domainLocales.find((domainLocale) => (domainLocale === null || domainLocale === void 0 ? void 0 : domainLocale.defaultLocale) === locale);
        return currentDomain === null || currentDomain === void 0 ? void 0 : currentDomain.domain;
    }
    const getRouteByName = (route, params) => {
        const routeAddress = routes[route];
        if (!params) {
            return routeAddress;
        }
        const paramsKeys = Object.keys(params);
        const key = paramsKeys[0];
        return routeAddress.replace(new RegExp(`\\[${key}\\]`, "gi"), 
        // @ts-ignore TODO: assign correct type for paramKey
        params[key]);
    };
    return Object.assign(Object.assign({}, router), { getRouteByName });
}
exports.useRouterTyped = useRouterTyped;
