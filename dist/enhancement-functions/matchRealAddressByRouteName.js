"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchRealAddressByRouteName = void 0;
const removeUndefined_1 = require("../helpers/removeUndefined");
const ValidationError_1 = require("../ValidationError/ValidationError");
function matchRealAddressByRouteName(routeName, routes, locale) {
    if (typeof routeName === "object") {
        const matched = routes[routeName.pathname];
        if (!matched) {
            throw new ValidationError_1.ValidationError("route-key-not-found", {
                routeName: String(routeName.pathname),
                locale,
            });
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
        const localizedAddress = matched[locale] || matched["fallback"];
        return {
            pathname: typeof localizedAddress === "object"
                ? localizedAddress.pathname
                : localizedAddress,
            query: routeName.query,
        };
    }
    const matchedRouteSet = routes[routeName];
    if (!matchedRouteSet) {
        throw new ValidationError_1.ValidationError("route-key-not-found", {
            routeName: String(routeName),
            locale,
        });
    }
    const matched = routes[routeName][locale];
    if (!matched) {
        const fallbackMatch = routes[routeName]["fallback"];
        if (fallbackMatch) {
            return fallbackMatch;
        }
        throw new ValidationError_1.ValidationError("fallback-required", {
            routeName: String(routeName),
        });
    }
    if (typeof matched === "object") {
        return matched.pathname;
    }
    return matched;
}
exports.matchRealAddressByRouteName = matchRealAddressByRouteName;
