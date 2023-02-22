"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRouteByName = void 0;
function getRouteByName(route, routes, params, locale) {
    const routeAddress = routes[route][locale];
    if (!params) {
        return routeAddress;
    }
    const paramsKeys = Object.keys(params);
    const key = paramsKeys[0];
    return routeAddress.replace(new RegExp(`\\[${key}\\]`, "gi"), 
    // @ts-ignore TODO: assign correct type for paramKey
    params[key]);
}
exports.getRouteByName = getRouteByName;
