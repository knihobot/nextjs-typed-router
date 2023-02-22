"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchRealAddressByRouteName = void 0;
const removeUndefined_1 = require("../helpers/removeUndefined");
function matchRealAddressByRouteName(routeName, routes, locale, defaultLocale) {
    if (!locale) {
        return undefined;
    }
    if (typeof routeName === "object") {
        const matched = routes[routeName.pathname];
        if (!matched) {
            return undefined;
        }
        const query = routeName.query;
        const keys = query ? Object.keys(query) : undefined;
        if (query) {
            keys === null || keys === void 0 ? void 0 : keys.map((key) => {
                const params = query[key];
                if (Array.isArray(params)) {
                    query[key] = (0, removeUndefined_1.removeUndefined)(params);
                }
            });
        }
        const localizedRouteObject = routes[routeName.pathname];
        return {
            pathname: localizedRouteObject[locale],
            query: routeName.query,
        };
    }
    const matched = routes[routeName][locale];
    if (!matched) {
        const fallbackMatch = routes[routeName][defaultLocale];
        if (fallbackMatch) {
            return fallbackMatch;
        }
        return undefined;
    }
    return matched;
}
exports.matchRealAddressByRouteName = matchRealAddressByRouteName;