"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRouterTyped = void 0;
const router_1 = require("next/router");
const matchRealAddressByRouteName_1 = require("./enhancement-functions/matchRealAddressByRouteName");
const getRouteByName_1 = require("./enhancement-functions/getRouteByName");
function useRouterTyped(routes) {
    const router = (0, router_1.useRouter)();
    const pushShallow = (route, as) => __awaiter(this, void 0, void 0, function* () {
        yield push(route, as, { shallow: true });
    });
    const pushCustomUrl = (url, as, options) => __awaiter(this, void 0, void 0, function* () {
        yield router.push(url, as, options);
    });
    const push = (route, as, options) => __awaiter(this, void 0, void 0, function* () {
        const url = matchRealAddressByRouteName(route);
        // TODO: fix type casting
        yield router.push(url, as ? matchRealAddressByRouteName(as) : undefined, options);
    });
    const isCurrentRoute = (route) => {
        return routes[route][router.locale] === router.pathname;
    };
    const getCurrentRoute = () => {
        for (const routeKey in routes) {
            const currentNode = routes[routeKey][router.locale];
            if (currentNode === router.pathname) {
                return routeKey;
            }
        }
    };
    const getCurrentDomain = () => {
        const { locale, domainLocales } = router;
        if (!locale || !domainLocales) {
            return;
        }
        const currentDomain = domainLocales === null || domainLocales === void 0 ? void 0 : domainLocales.find((domainLocale) => (domainLocale === null || domainLocale === void 0 ? void 0 : domainLocale.defaultLocale) === locale);
        return currentDomain === null || currentDomain === void 0 ? void 0 : currentDomain.domain;
    };
    const getRouteName = (url) => {
        for (const routeName in routes) {
            const selectedRoute = routes[routeName];
            for (const localeKey in selectedRoute) {
                const localizedRoute = selectedRoute[localeKey];
                if (localizedRoute === url) {
                    return routeName;
                }
            }
        }
    };
    const getRouteByName = (route, params) => (0, getRouteByName_1.getRouteByName)(route, routes, params, router.locale);
    const matchRealAddressByRouteName = (routeName) => (0, matchRealAddressByRouteName_1.matchRealAddressByRouteName)(routeName, routes, router.locale);
    return Object.assign(Object.assign({}, router), { getCurrentDomain,
        getCurrentRoute,
        getRouteByName,
        getRouteName,
        isCurrentRoute,
        matchRealAddressByRouteName,
        push,
        pushCustomUrl,
        pushShallow });
}
exports.useRouterTyped = useRouterTyped;
