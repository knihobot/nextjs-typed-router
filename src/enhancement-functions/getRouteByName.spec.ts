import { LocalizedRoute, RouteProps } from "@types-app/index";
import { getRouteByName } from "./getRouteByName";

describe("getRouteByName", () => {
  const routes: Record<string, LocalizedRoute<"en" | "fr", "en">> = {
    home: {
      en: "/",
      fr: "/accueil",
    },
    user: {
      en: "/users/[id]",
      fr: "/utilisateurs/[id]",
    },
  };

  const routeDefinitions: Record<string, RouteProps> = {
    home: {
      params: undefined,
      query: undefined,
    },
    user: {
      params: {
        id: ["1"],
      },
      query: {
        page: "2",
      },
    },
  };

  it("returns undefined if the route name does not exist in the routes object", () => {
    const result = getRouteByName("nonexistent", routes, undefined, "en", "en");

    expect(result).toBeUndefined();
  });

  it("returns the default locale route if the locale is undefined and the route is not defined in the specified locale", () => {
    const result = getRouteByName("home", routes, undefined, undefined, "en");

    expect(result).toBe("/");
  });

  it("returns the specified locale route if it is defined, even if a default locale route exists", () => {
    const result = getRouteByName("home", routes, undefined, "fr", "en");

    expect(result).toBe("/accueil");
  });

  it("returns the default locale route if the specified locale route is not defined", () => {
    const result = getRouteByName("user", routes, undefined, "fr", "en");

    expect(result).toBe("/utilisateurs/[id]");
  });

  it("replaces all occurrences of route parameters with their corresponding values", () => {
    const result = getRouteByName("user", routes, { id: "2" }, "en", "en");

    expect(result).toBe("/users/2");
  });
});
