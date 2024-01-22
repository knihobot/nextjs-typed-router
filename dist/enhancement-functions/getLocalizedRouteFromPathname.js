"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocalizedRouteFromPathname = void 0;
function getLocalizedRouteFromPathname(pathname, routes, fallbackLocale, locale) {
    const pathnameSegments = pathname.split("/").filter(Boolean);
    for (const routeKey in routes) {
        const routePatternCollection = routes[routeKey];
        for (const localeKey in routePatternCollection) {
            const routePattern = routePatternCollection[localeKey];
            const routePatternSegments = routePattern.split("/").filter(Boolean);
            if (routePatternSegments[0] === pathnameSegments[0]) {
                const localizedRoute = routePatternCollection[locale] ||
                    routePatternCollection[fallbackLocale];
                // Normal params or without params
                if (routePatternSegments.length === pathnameSegments.length) {
                    const localizedRouteSegments = localizedRoute
                        .split("/")
                        .filter(Boolean);
                    routePatternSegments.map((segment, index) => {
                        if (segment.startsWith("[") && segment.endsWith("]")) {
                            localizedRouteSegments[index] = pathnameSegments[index];
                        }
                    });
                    return `/${localizedRouteSegments.join("/")}`;
                }
                // Optional catch-all params
                if (localizedRoute.includes("[[...")) {
                    const localizedRouteSegments = localizedRoute
                        .split("/")
                        .filter(Boolean);
                    routePatternSegments.map((segment, index) => {
                        if (segment.startsWith("[[") && segment.endsWith("]]")) {
                            localizedRouteSegments[index] = pathnameSegments
                                .slice(index)
                                .join("/");
                        }
                    });
                    return `/${localizedRouteSegments.join("/")}`;
                }
                // Required catch-all params
                if (localizedRoute.match(/(?<!\[)\[\.\.\./)) {
                    const localizedRouteSegments = localizedRoute
                        .split("/")
                        .filter(Boolean);
                    routePatternSegments.map((segment, index) => {
                        if (segment.startsWith("[") && segment.endsWith("]")) {
                            localizedRouteSegments[index] = pathnameSegments
                                .slice(index)
                                .join("/");
                        }
                    });
                    return `/${localizedRouteSegments.join("/")}`;
                }
            }
        }
    }
    return undefined;
}
exports.getLocalizedRouteFromPathname = getLocalizedRouteFromPathname;
