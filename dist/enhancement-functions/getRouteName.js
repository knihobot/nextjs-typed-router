"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRouteName = void 0;
function getRouteName(url, routes) {
    for (const routeName in routes) {
        const selectedRoute = routes[routeName];
        for (const localeKey in selectedRoute) {
            const localizedRoute = selectedRoute[localeKey];
            if (localizedRoute === url) {
                return routeName;
            }
        }
    }
}
exports.getRouteName = getRouteName;
