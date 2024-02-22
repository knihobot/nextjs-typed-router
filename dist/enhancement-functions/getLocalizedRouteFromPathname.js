"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocalizedRouteFromPathname = void 0;
function getLocalizedRouteFromPathname(pathname, routes, locale) {
    const pathnameSegments = pathname.split("/").filter(Boolean);
    // Iterate through the routes object which contains localized groups of routes
    for (const routeKey in routes) {
        const routePatternCollection = routes[routeKey];
        // Iterate through localized route group
        for (const localeKey in routePatternCollection) {
            const routePattern = routePatternCollection[localeKey];
            if (!routePattern) {
                continue;
            }
            const routePatternSegments = (typeof routePattern === "object" ? routePattern.pathname : routePattern)
                .split("/")
                .filter(Boolean);
            const segmentsMatching = () => {
                for (const [index, pathnameSegment] of pathnameSegments.entries()) {
                    // Check if the segment doesn't match or if the index is out of bounds for routePatternSegments
                    if (routePatternSegments[index] === undefined ||
                        pathnameSegment !== routePatternSegments[index]) {
                        return false; // Return false immediately when a mismatch is found
                    }
                }
                // Return true if all segments matched
                return true;
            };
            if (pathnameSegments[0] === routePatternSegments[0]) {
                const localizedRoute = routePatternCollection[locale] || routePatternCollection["fallback"];
                const localizedRouteSegments = (typeof localizedRoute === "object"
                    ? localizedRoute.pathname
                    : localizedRoute)
                    .split("/")
                    .filter(Boolean);
                if (routePatternSegments.length === pathnameSegments.length) {
                    // Normal params
                    if ((typeof localizedRoute === "object"
                        ? localizedRoute.pathname
                        : localizedRoute).match(/\/\[[a-zA-Z]+\]/g)) {
                        routePatternSegments.map((segment, index) => {
                            if (segment.startsWith("[") && segment.endsWith("]")) {
                                localizedRouteSegments[index] = pathnameSegments[index];
                            }
                        });
                        return `/${localizedRouteSegments.join("/")}`;
                    }
                    else {
                        if (segmentsMatching()) {
                            if (typeof localizedRoute === "object") {
                                return localizedRoute.pathname;
                            }
                            return localizedRoute;
                        }
                    }
                }
                // Optional catch-all params
                if ((typeof localizedRoute === "object"
                    ? localizedRoute.pathname
                    : localizedRoute).includes("[[...")) {
                    return replaceCatchAllSegments(pathnameSegments, localizedRouteSegments, routePatternSegments, "optional");
                }
                // Required catch-all params
                if ((typeof localizedRoute === "object"
                    ? localizedRoute.pathname
                    : localizedRoute).includes("[...")) {
                    return replaceCatchAllSegments(pathnameSegments, localizedRouteSegments, routePatternSegments, "required");
                }
            }
        }
    }
    return undefined;
}
exports.getLocalizedRouteFromPathname = getLocalizedRouteFromPathname;
function replaceCatchAllSegments(pathnameSegments, localizedSegments, routePatternSegments, type) {
    routePatternSegments.map((segment, index) => {
        if (segment.startsWith(type === "required" ? "[" : "[[") &&
            segment.endsWith(type === "required" ? "]" : "]]")) {
            localizedSegments[index] = pathnameSegments.slice(index).join("/");
        }
    });
    return `/${localizedSegments.filter(Boolean).join("/")}`;
}
