"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRouteByName = void 0;
const removeUndefined_1 = require("../helpers/removeUndefined");
function getRouteByName(route, routes, params, locale) {
    const matchedRoute = routes[route];
    if (!matchedRoute) {
        throw new Error("Route not found.");
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
                throw new Error("No parameters provided for the route.");
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
