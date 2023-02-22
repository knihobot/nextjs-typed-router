"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRouteByName = void 0;
function getRouteByName(route, routes, params, locale, defaultLocale) {
    const routeAddress = routes[route][locale];
    const fallbackRouteAddress = routes[route][defaultLocale];
    if (!params) {
        if (!routeAddress) {
            if (fallbackRouteAddress) {
                return fallbackRouteAddress;
            }
            return undefined;
        }
        return routeAddress;
    }
    const paramsKeys = Object.keys(params);
    const key = paramsKeys[0];
    return (routeAddress || fallbackRouteAddress).replace(new RegExp(`\\[${key}\\]`, "gi"), 
    // @ts-ignore TODO: assign correct type for paramKey
    params[key]);
}
exports.getRouteByName = getRouteByName;
