"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchRealAddressByRouteName = void 0;
function matchRealAddressByRouteName(routeName, routes) {
    if (typeof routeName === "object") {
        const matched = routes[routeName.pathname];
        if (!matched) {
            return null;
        }
        return {
            pathname: routes[routeName.pathname],
            query: routeName.query,
        };
    }
    const matched = routes[routeName];
    if (!matched) {
        return null;
    }
    return matched;
}
exports.matchRealAddressByRouteName = matchRealAddressByRouteName;
