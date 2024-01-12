"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = require("../mock-data/routes");
const matchRealAddressByRouteName_1 = require("./matchRealAddressByRouteName");
describe("matchRealAddressByRouteName", () => {
    it("Non-existent route", () => {
        expect((0, matchRealAddressByRouteName_1.matchRealAddressByRouteName)({
            pathname: "non-existent-route",
            query: { params: ["testParam", "testParamValue"] },
        }, routes_1.mockRoutes, "en")).toBeUndefined();
    });
    it("Existing route with no locale specified", () => {
        expect((0, matchRealAddressByRouteName_1.matchRealAddressByRouteName)("home", routes_1.mockRoutes)).toBeUndefined();
    });
    it("Existing route with specified locale", () => {
        expect((0, matchRealAddressByRouteName_1.matchRealAddressByRouteName)("home", routes_1.mockRoutes, "en")).toEqual("/");
    });
    it("Existing route with specified locale and query", () => {
        expect((0, matchRealAddressByRouteName_1.matchRealAddressByRouteName)({
            pathname: "profile",
            query: { username: "testUser" },
        }, routes_1.mockRoutes, "en")).toEqual({
            pathname: "/profile/[username]",
            query: { username: "testUser" },
        });
    });
    it("Existing route with specified locale and multiple query parameters", () => {
        expect((0, matchRealAddressByRouteName_1.matchRealAddressByRouteName)({
            pathname: "product",
            query: { productId: "123", param1: "value1", param2: "value2" },
        }, routes_1.mockRoutes, "en")).toEqual({
            pathname: "/product/[productId]",
            query: { productId: "123", param1: "value1", param2: "value2" },
        });
    });
    it("Non-existent route with default locale", () => {
        expect((0, matchRealAddressByRouteName_1.matchRealAddressByRouteName)(
        // @ts-ignore
        "nonexistent", routes_1.mockRoutes, "en", routes_1.defaultLocale)).toBeUndefined();
    });
    it("Existing route with default locale", () => {
        expect((0, matchRealAddressByRouteName_1.matchRealAddressByRouteName)("home", routes_1.mockRoutes, routes_1.defaultLocale)).toEqual("/");
    });
    it("Existing required catch-all route with specified locale", () => {
        expect((0, matchRealAddressByRouteName_1.matchRealAddressByRouteName)({
            pathname: "docs",
            query: { path: ["folder1", "file.txt"] },
        }, routes_1.mockRoutes, "en")).toEqual({
            pathname: "/docs/[...path]",
            query: { path: ["folder1", "file.txt"] },
        });
    });
    it("Existing required catch-all route with default locale", () => {
        expect((0, matchRealAddressByRouteName_1.matchRealAddressByRouteName)({
            pathname: "docs",
            query: { path: ["folder1", "file.txt"] },
        }, routes_1.mockRoutes, routes_1.defaultLocale)).toEqual({
            pathname: "/docs/[...path]",
            query: { path: ["folder1", "file.txt"] },
        });
    });
    it("Existing optional catch-all route with specified locale", () => {
        expect((0, matchRealAddressByRouteName_1.matchRealAddressByRouteName)({
            pathname: "optionalGallery",
            query: { images: ["image1.jpg", "image2.jpg"] },
        }, routes_1.mockRoutes, "en")).toEqual({
            pathname: "/optional-gallery/[[...images]]",
            query: { images: ["image1.jpg", "image2.jpg"] },
        });
    });
    it("Existing optional catch-all route with default locale", () => {
        expect((0, matchRealAddressByRouteName_1.matchRealAddressByRouteName)({
            pathname: "optionalGallery",
            query: { images: ["image1.jpg", "image2.jpg"] },
        }, routes_1.mockRoutes, routes_1.defaultLocale)).toEqual({
            pathname: "/optional-gallery/[[...images]]",
            query: { images: ["image1.jpg", "image2.jpg"] },
        });
    });
});
