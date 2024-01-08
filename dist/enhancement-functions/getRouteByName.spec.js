"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getRouteByName_1 = require("./getRouteByName");
describe("getRouteByName", () => {
    const routes = {
        // One Segment
        users: {
            en: "/users/[id]",
            cs: "/uzivatele/[id]",
            sk: "/pouzivatelia/[id]",
            "de-DE": "/benutzer/[id]",
            "de-AT": "/benutzer/[id]",
        },
        // Catch-all Segments
        account: {
            en: "/account/[...segments]",
            cs: "/ucet/[...segments]",
            sk: "/ucet/[...segments]",
            "de-DE": "/konto/[...segments]",
            "de-AT": "/konto/[...segments]",
        },
        // Optional Catch-all Segments
        products: {
            en: "/products/[[...segments]]",
            cs: "/produkty/[[...segments]]",
            sk: "/produkty/[[...segments]]",
            "de-DE": "/produkte/[[...segments]]",
            "de-AT": "/produkte/[[...segments]]",
        },
    };
    it("should return the correct route for a given locale", () => {
        const path = (0, getRouteByName_1.getRouteByName)("users", routes, { id: "123" }, "cs");
        expect(path).toBe("/uzivatele/123");
    });
    it("should handle missing locale and use default locale", () => {
        const path = (0, getRouteByName_1.getRouteByName)("users", routes, { id: "123" }, "fr", "en");
        expect(path).toBe("/users/123");
    });
    it("should correctly replace parameters in the route", () => {
        const path = (0, getRouteByName_1.getRouteByName)("users", routes, { id: "456" }, "en");
        expect(path).toBe("/users/456");
    });
    it("should handle required catch-all segments with a single element array", () => {
        const path = (0, getRouteByName_1.getRouteByName)("account", routes, { segments: ["settings"] }, "en");
        expect(path).toBe("/account/settings");
    });
    it("should handle required catch-all segments with a multi-element array", () => {
        const path = (0, getRouteByName_1.getRouteByName)("account", routes, { segments: ["settings", "security"] }, "en");
        expect(path).toBe("/account/settings/security");
    });
    it("should handle required catch-all segments with a deeply nested array", () => {
        const path = (0, getRouteByName_1.getRouteByName)("account", routes, { segments: ["user", "123", "edit", "password"] }, "en");
        expect(path).toBe("/account/user/123/edit/password");
    });
    // Add a test case to ensure that it fails gracefully if 'segments' is not provided
    it("should return undefined for required catch-all segments if not provided", () => {
        const path = (0, getRouteByName_1.getRouteByName)("account", routes, {}, "en");
        expect(path).toBeUndefined();
    });
    it("should handle optional catch-all segments with no segments provided", () => {
        const path = (0, getRouteByName_1.getRouteByName)("products", routes, {}, "en");
        expect(path).toBe("/products/");
    });
    it("should handle optional catch-all segments with empty array", () => {
        const path = (0, getRouteByName_1.getRouteByName)("products", routes, { segments: [] }, "en");
        expect(path).toBe("/products/");
    });
    it("should handle optional catch-all segments with a single element array", () => {
        const path = (0, getRouteByName_1.getRouteByName)("products", routes, { segments: ["details"] }, "en");
        expect(path).toBe("/products/details");
    });
    it("should handle optional catch-all segments with a multi-element array", () => {
        const path = (0, getRouteByName_1.getRouteByName)("products", routes, { segments: ["category", "123", "edit"] }, "en");
        expect(path).toBe("/products/category/123/edit");
    });
    it("should return undefined for non-existent routes", () => {
        const path = (0, getRouteByName_1.getRouteByName)("nonExistentRoute", routes, { id: "789" }, "en");
        expect(path).toBeUndefined();
    });
});
