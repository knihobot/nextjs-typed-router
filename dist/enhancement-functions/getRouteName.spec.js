"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getRouteName_1 = require("./getRouteName");
const routes_1 = require("../tests/data/routes");
describe("getRouteName", () => {
    it("should return the correct route name for a normal route", () => {
        expect((0, getRouteName_1.getRouteName)("/about", routes_1.mockRoutes)).toBe("about");
    });
    // Routes with specified parameters
    describe("should handle routes with one or multiple required parameters", () => {
        it("should return the correct route name for a route with optional parameters", () => {
            expect((0, getRouteName_1.getRouteName)("/blog/2022/07/interesting-article", routes_1.mockRoutes)).toBe("blogPost");
        });
        it("should return undefined for a partially matching URL", () => {
            expect((0, getRouteName_1.getRouteName)("/userDetails/123", routes_1.mockRoutes)).toBeUndefined();
        });
    });
    // Routes with required catch-all parameters
    describe("should handle routes with required catch-all params", () => {
        it("should return the correct route name for a required catch-all route", () => {
            expect((0, getRouteName_1.getRouteName)("/docs/guide/intro", routes_1.mockRoutes)).toBe("docs");
        });
        it("should handle routes with a catch-all parameter correctly", () => {
            expect((0, getRouteName_1.getRouteName)("/gallery/image1/image2/image3", routes_1.mockRoutes)).toBe("gallery");
        });
        it("should return the correct route name for a deeply nested route", () => {
            expect((0, getRouteName_1.getRouteName)("/files/document/2022/report", routes_1.mockRoutes)).toBe("files");
        });
    });
    // Optional catch-all routes
    describe("should handle optional catch-all routes", () => {
        it("should return the correct route name for an optional catch-all route", () => {
            expect((0, getRouteName_1.getRouteName)("/optional-gallery/landscape/monet/1856", routes_1.mockRoutes)).toBe("optionalGallery");
        });
        it("should return the correct route name for a route with complex parameters", () => {
            expect((0, getRouteName_1.getRouteName)("/userFiles/userId/1234/fileCategory/document/uploadDate/20220715", routes_1.mockRoutes)).toBe("userFiles");
        });
        it("should handle routes with an optional catch-all parameter that is not used", () => {
            expect((0, getRouteName_1.getRouteName)("/optional-gallery", routes_1.mockRoutes)).toBe("optionalGallery");
        });
    });
    // Routes with translation
    describe("should handle routes with translation", () => {
        it("should return the correct route name for an English route", () => {
            expect((0, getRouteName_1.getRouteName)("/about", routes_1.mockRoutes)).toBe("about");
        });
        it("should return the correct route name for a Czech route", () => {
            expect((0, getRouteName_1.getRouteName)("/o-nas", routes_1.mockRoutes)).toBe("about");
        });
        it("should return the correct route name for a German (Austria) route", () => {
            expect((0, getRouteName_1.getRouteName)("/ueber-uns", routes_1.mockRoutes)).toBe("about");
        });
        it("should return the correct route name for a Slovak route with parameter", () => {
            expect((0, getRouteName_1.getRouteName)("/profil/johndoe", routes_1.mockRoutes)).toBe("profile");
        });
        it("should return the correct route name for a German (Germany) route with multiple parameters", () => {
            expect((0, getRouteName_1.getRouteName)("/produkt/123/bewertung/456", routes_1.mockRoutes)).toBe("productReview");
        });
        it("should return the correct route name for a Czech required catch-all route", () => {
            expect((0, getRouteName_1.getRouteName)("/dokumentace/guide/intro", routes_1.mockRoutes)).toBe("docs");
        });
        it("should return the correct route name for a Slovak optional catch-all route", () => {
            expect((0, getRouteName_1.getRouteName)("/volitelna-galeria/landscape/monet/1856", routes_1.mockRoutes)).toBe("optionalGallery");
        });
    });
    // Non-existent route
    it("should return undefined for a URL not present in the routes", () => {
        expect((0, getRouteName_1.getRouteName)("/nonexistent", routes_1.mockRoutes)).toBeUndefined();
    });
});
