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
const matchRealAddressByRouteName_1 = require("./helpers/matchRealAddressByRouteName");
const translatePushReplaceArgs_1 = require("next-translate-routes/react/translatePushReplaceArgs");
function useRouterTyped(routes) {
    const router = (0, router_1.useRouter)();
    const pushShallow = (route, as, translate) => __awaiter(this, void 0, void 0, function* () {
        const push = pushReplace("push");
        yield push(route, as, { shallow: true }, translate);
    });
    const pushCustomUrl = (url, as, options) => __awaiter(this, void 0, void 0, function* () {
        yield router.push(url, as, options);
    });
    const pushReplace = (fnName) => (route, as, options, translate) => __awaiter(this, void 0, void 0, function* () {
        const url = (0, matchRealAddressByRouteName_1.matchRealAddressByRouteName)(route, routes);
        const urlAs = as
            ? (0, matchRealAddressByRouteName_1.matchRealAddressByRouteName)(as, routes)
            : undefined;
        const translatedArgs = translate && url && urlAs
            ? (0, translatePushReplaceArgs_1.translatePushReplaceArgs)({
                router,
                // TODO: not good
                url: url,
                as: urlAs,
                locale: options === null || options === void 0 ? void 0 : options.locale,
            })
            : undefined;
        const translatedUrl = translatedArgs === null || translatedArgs === void 0 ? void 0 : translatedArgs.url;
        const translatedAsUrl = translatedArgs === null || translatedArgs === void 0 ? void 0 : translatedArgs.as;
        const translatedLocale = translatedArgs === null || translatedArgs === void 0 ? void 0 : translatedArgs.locale;
        yield router[fnName](
        // TODO: not good
        translatedUrl ? translatedUrl : url, translatedAsUrl ? translatedAsUrl : urlAs, translatedLocale ? Object.assign(Object.assign({}, options), { locale: translatedLocale }) : options);
    });
    const isCurrentRoute = (route) => {
        return routes[route] === router.pathname;
    };
    const getCurrentRoute = () => {
        let result;
        // Object.keys removes types from keys - "as" needed
        Object.keys(routes).map((routeKey) => {
            const currentNode = routes[routeKey];
            if (currentNode === router.pathname) {
                result = routeKey;
            }
        });
        return result;
    };
    const getCurrentDomain = () => {
        const { locale, domainLocales } = router;
        if (!locale || !domainLocales) {
            return;
        }
        const currentDomain = domainLocales === null || domainLocales === void 0 ? void 0 : domainLocales.find((domainLocale) => (domainLocale === null || domainLocale === void 0 ? void 0 : domainLocale.defaultLocale) === locale);
        return currentDomain === null || currentDomain === void 0 ? void 0 : currentDomain.domain;
    };
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
    return Object.assign(Object.assign({}, router), { getCurrentDomain,
        getCurrentRoute,
        getRouteByName,
        isCurrentRoute, push: pushReplace("push"), pushCustomUrl,
        pushShallow, replace: pushReplace("replace") });
}
exports.useRouterTyped = useRouterTyped;
