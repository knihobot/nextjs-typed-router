"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveExactAddressByRouteName = void 0;
function resolveExactAddressByRouteName(routeName, routes) {
    if (typeof routeName === "object") {
        // TODO: find a better solution for this
        const routeNameTyped = routeName;
        return Object.assign(Object.assign({}, routeName), { pathname: routes[routeNameTyped.pathname], query: routeNameTyped.query });
    }
    return routes[routeName];
}
exports.resolveExactAddressByRouteName = resolveExactAddressByRouteName;
