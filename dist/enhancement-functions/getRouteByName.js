"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRouteByName = void 0;
const removeUndefined_1 = require("../helpers/removeUndefined");
const ValidationError_1 = require("../ValidationError/ValidationError");
function getRouteByName(route, routes, locale, params) {
    const matchedRoute = routes[route];
    if (!matchedRoute) {
        throw new ValidationError_1.ValidationError("route-key-not-found", {
            routeName: String(route),
        });
    }
    let path = routes[route][locale] || routes[route]["fallback"];
    // Handle optional catch-all segments
    const optionalCatchAllRegex = /\[\[\.\.\.(.*?)]]/g;
    if (typeof path === "object"
        ? path.pathname.match(optionalCatchAllRegex)
        : path.match(optionalCatchAllRegex)) {
        path = (typeof path === "object" ? path.pathname : path).replace(optionalCatchAllRegex, (match, segmentKey) => {
            const paramValue = params && params[segmentKey];
            if (params &&
                paramValue &&
                Array.isArray(paramValue) &&
                paramValue.length > 0) {
                return (0, removeUndefined_1.removeUndefined)(paramValue).join("/");
            }
            return ""; // Remove optional catch-all segment if not provided or empty
        });
    }
    else {
        // Handle required catch-all segments and single parameters
        if (params) {
            const paramsKeys = Object.keys(params);
            if (paramsKeys.length === 0) {
                throw new ValidationError_1.ValidationError("params-required", {
                    routeName: String(route),
                    locale,
                });
            }
            for (const key of paramsKeys) {
                const value = params[key];
                const catchAllRegex = new RegExp(`\\[\\.\\.\\.${key}\\]`, "g");
                const singleParamRegex = new RegExp(`\\[${key}\\]`, "gi");
                if (Array.isArray(value)) {
                    const joinedValue = value.join("/") || "";
                    path = (typeof path === "object" ? path.pathname : path).replace(catchAllRegex, joinedValue);
                }
                else {
                    const stringValue = value || "";
                    path = (typeof path === "object" ? path.pathname : path).replace(singleParamRegex, stringValue);
                }
            }
        }
    }
    if (typeof path === "object") {
        return path.pathname;
    }
    return path;
}
exports.getRouteByName = getRouteByName;
