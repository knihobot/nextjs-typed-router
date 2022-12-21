"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveExactAddressByRouteName = void 0;
function resolveExactAddressByRouteName(routeName, routes) {
    if (typeof routeName === "object") {
        return Object.assign(Object.assign({}, routeName), { pathname: routes[routeName.pathname], query: routeName.query });
    }
    return routes[routeName];
}
exports.resolveExactAddressByRouteName = resolveExactAddressByRouteName;
