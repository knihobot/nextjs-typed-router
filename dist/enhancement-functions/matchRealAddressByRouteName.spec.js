"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const matchRealAddressByRouteName_1 = require("./matchRealAddressByRouteName");
describe("Match real route address by route name", () => {
    const routes = {
        catchAllOptional: { en: "/catch-all-optional/[[...params]]" },
        catchAll: { en: "/catch-all/[...params]" },
        slug: { en: "/slug/[slug]" },
    };
    it("Non-existent route", () => {
        expect((0, matchRealAddressByRouteName_1.matchRealAddressByRouteName)({
            pathname: "non-existent-route",
            query: { params: ["testParam", "testParamValue"] },
        }, routes, "en")).toBeUndefined();
    });
    it("Match route with optional dynamic params and query", () => {
        expect((0, matchRealAddressByRouteName_1.matchRealAddressByRouteName)({
            pathname: "catchAllOptional",
            query: { optionalParams: ["q", "abc"] },
        }, routes, "en")).toStrictEqual({
            pathname: "/catch-all-optional/[[...params]]",
            query: { optionalParams: ["q", "abc"] },
        });
    });
    it("Match route with optional dynamic params with some empty fields", () => {
        expect((0, matchRealAddressByRouteName_1.matchRealAddressByRouteName)({
            pathname: "catchAllOptional",
            query: {
                optionalParams: ["q", "abc", undefined, undefined, "year", "2011"],
            },
        }, routes, "en")).toStrictEqual({
            pathname: "/catch-all-optional/[[...params]]",
            query: { optionalParams: ["q", "abc", "year", "2011"] },
        });
    });
    it("Match route with dynamic params and query", () => {
        expect((0, matchRealAddressByRouteName_1.matchRealAddressByRouteName)({
            pathname: "catchAll",
            query: {
                params: ["testParam", "testParamValue"],
                query: "testQuery",
            },
        }, routes, "en")).toStrictEqual({
            pathname: "/catch-all/[...params]",
            query: { params: ["testParam", "testParamValue"], query: "testQuery" },
        });
    });
    it("Match route with slug param", () => {
        expect((0, matchRealAddressByRouteName_1.matchRealAddressByRouteName)({
            pathname: "slug",
            query: {
                slug: "slug",
            },
        }, routes, "en")).toStrictEqual({
            pathname: "/slug/[slug]",
            query: { slug: "slug" },
        });
    });
});
