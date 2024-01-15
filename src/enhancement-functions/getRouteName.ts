import { LocalizedRoute, RouteProps } from "@types-app/index";

export function getRouteName<
  RouteDefinitions extends Record<string, RouteProps>,
  Locales extends string,
  DefaultLocale extends Locales,
>(
  url: string,
  routes: Record<
    keyof RouteDefinitions,
    LocalizedRoute<Locales, DefaultLocale>
  >,
): keyof RouteDefinitions | undefined {
  for (const routeName in routes) {
    const selectedRoute = routes[routeName];

    for (const localeKey in selectedRoute) {
      const localizedRoute = selectedRoute[localeKey];

      // Check if the route matches using pattern matching
      if (doesRouteMatch(url, localizedRoute)) {
        return routeName;
      }
    }
  }
}

function doesRouteMatch(url: string, routePattern: string): boolean {
  // Split the URL and the route pattern into segments
  const urlSegments = url.split("/").filter((segment) => segment);
  const patternSegments = routePattern.split("/").filter((segment) => segment);

  let urlIndex = 0,
    patternIndex = 0;

  while (
    urlIndex < urlSegments.length &&
    patternIndex < patternSegments.length
  ) {
    const patternSegment = patternSegments[patternIndex];

    // Check if the segment is a parameterized or catch-all segment
    const isParameterized =
      patternSegment.startsWith("[") && patternSegment.endsWith("]");
    const isCatchAll = patternSegment.startsWith("[...");
    const isCatchAllOptional = patternSegment.startsWith("[[...");

    if (isCatchAll || isCatchAllOptional) {
      // If it's a catch-all segment, it matches the rest of the URL
      return true;
    } else if (isParameterized) {
      // Increment urlIndex for parameterized segments
      urlIndex++;
    } else {
      // For regular segments, they must match exactly
      if (urlSegments[urlIndex] !== patternSegment) {
        return false;
      }
      urlIndex++;
    }
    patternIndex++;
  }

  // Handle the case where the URL exactly matches the pattern
  // or where the pattern ends with a catch-all and the URL is longer
  return (
    urlIndex === urlSegments.length ||
    (patternSegments[patternIndex - 1] === "[...]" &&
      urlIndex <= urlSegments.length)
  );
}
