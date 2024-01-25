"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = require("../mock-data/routes");
const getLocalizedRouteFromPathname_1 = require("./getLocalizedRouteFromPathname");
describe("getLocalizedRouteFromPathname", () => {
    it("should return the correct localized route pathname for a requested pathname", () => {
        expect((0, getLocalizedRouteFromPathname_1.getLocalizedRouteFromPathname)("/about", routes_1.mockRoutes, "en", "cs")).toBe("/o-nas");
    });
    it("should return the correct localized route pathname for a requested pathname login", () => {
        expect((0, getLocalizedRouteFromPathname_1.getLocalizedRouteFromPathname)("/login", routes_1.mockRoutes, "en", "cs")).toBe("/login");
    });
    it("should return the correct localized route pathname for a requested pathname account details", () => {
        expect((0, getLocalizedRouteFromPathname_1.getLocalizedRouteFromPathname)("/account/details", routes_1.mockRoutes, "en", "cs")).toBe("/account/details");
    });
    it("should return the correct localized route pathname for a requested pathname with one param", () => {
        expect((0, getLocalizedRouteFromPathname_1.getLocalizedRouteFromPathname)("/kategoria/slovensko", routes_1.mockRoutes, "en", "de-DE")).toBe("/kategorie/slovensko");
    });
    it("should return the correct localized route pathname for a requested pathname with one param and three segments", () => {
        expect((0, getLocalizedRouteFromPathname_1.getLocalizedRouteFromPathname)("/benutzer/123/details", routes_1.mockRoutes, "en", "sk")).toBe("/uzivatel/123/detaily");
    });
    it("should return the correct localized route pathname for a requested pathname with two params and four segments", () => {
        expect((0, getLocalizedRouteFromPathname_1.getLocalizedRouteFromPathname)("/product/cars/review/654", routes_1.mockRoutes, "en", "de-AT")).toBe("/produkt/cars/bewertung/654");
    });
    it("should return the correct localized route pathname for a requested pathname with required catch all params", () => {
        expect((0, getLocalizedRouteFromPathname_1.getLocalizedRouteFromPathname)("/docs/guide/intro/123", routes_1.mockRoutes, "en", "cs")).toBe("/dokumentace/guide/intro/123");
    });
    it("should return the correct localized route pathname for a requested pathname with optional catch all params", () => {
        expect((0, getLocalizedRouteFromPathname_1.getLocalizedRouteFromPathname)("/uzivatelSoubory/123/456/789/abc", routes_1.mockRoutes, "en", "sk")).toBe("/uzivatelSubory/123/456/789/abc");
    });
});
