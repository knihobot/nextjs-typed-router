"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getRouteByName_1 = require("./getRouteByName");
describe("getRouteByName", () => {
    const routes = {
        home: {
            en: "/",
            fr: "/accueil",
        },
        user: {
            en: "/users/[id]",
            fr: "/utilisateurs/[id]",
        },
    };
    const routeDefinitions = {
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
        const result = (0, getRouteByName_1.getRouteByName)("nonexistent", routes, undefined, "en", "en");
        expect(result).toBeUndefined();
    });
    it("returns the default locale route if the locale is undefined and the route is not defined in the specified locale", () => {
        const result = (0, getRouteByName_1.getRouteByName)("home", routes, undefined, undefined, "en");
        expect(result).toBe("/");
    });
    it("returns the specified locale route if it is defined, even if a default locale route exists", () => {
        const result = (0, getRouteByName_1.getRouteByName)("home", routes, undefined, "fr", "en");
        expect(result).toBe("/accueil");
    });
    it("returns the default locale route if the specified locale route is not defined", () => {
        const result = (0, getRouteByName_1.getRouteByName)("user", routes, undefined, "fr", "en");
        expect(result).toBe("/utilisateurs/[id]");
    });
    it("replaces all occurrences of route parameters with their corresponding values", () => {
        const result = (0, getRouteByName_1.getRouteByName)("user", routes, { id: "2" }, "en", "en");
        expect(result).toBe("/users/2");
    });
});
