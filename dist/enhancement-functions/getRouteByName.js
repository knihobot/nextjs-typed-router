"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRouteByName = void 0;
function getRouteByName(route, routes, params, locale, defaultLocale) {
    const matchedRoute = routes[route];
    if (!matchedRoute) {
        return undefined;
    }
    let path = routes[route][locale] || routes[route][defaultLocale];
    // Handle optional catch-all segments
    const optionalCatchAllRegex = /\[\[\.\.\.(.*?)]]/g;
    if (path.match(optionalCatchAllRegex)) {
        path = path.replace(optionalCatchAllRegex, (match, segmentKey) => {
            const paramValue = params && params[segmentKey];
            if (params &&
                paramValue &&
                Array.isArray(paramValue) &&
                paramValue.length > 0) {
                return paramValue.join("/");
            }
            return ""; // Remove optional catch-all segment if not provided or empty
        });
    }
    else {
        // Handle required catch-all segments and single parameters
        if (params) {
            const paramsKeys = Object.keys(params);
            if (paramsKeys.length === 0) {
                return undefined;
            }
            for (const key of paramsKeys) {
                const value = params[key];
                const catchAllRegex = new RegExp(`\\[\\.\\.\\.${key}\\]`, "g");
                const singleParamRegex = new RegExp(`\\[${key}\\]`, "gi");
                if (Array.isArray(value)) {
                    const joinedValue = value.join("/") || "";
                    path = path.replace(catchAllRegex, joinedValue);
                }
                else {
                    const stringValue = value || "";
                    path = path.replace(singleParamRegex, stringValue);
                }
            }
        }
    }
    return path;
}
exports.getRouteByName = getRouteByName;
