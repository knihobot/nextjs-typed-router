"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const matchRealAddressByRouteName_1 = require("./matchRealAddressByRouteName");
describe("Match real route address by route name", () => {
    const routes = {
        catchAllOptional: "/catch-all-optional/[[...params]]",
        catchAll: "/catch-all/[...params]",
        slug: "/slug/[slug]",
    };
    it("Non-existent route", () => {
        expect((0, matchRealAddressByRouteName_1.matchRealAddressByRouteName)({
            pathname: "non-existent-route",
            query: { params: ["testParam", "testParamValue"] },
        }, routes)).toBeUndefined();
    });
    it("Match route with optional dynamic params and query", () => {
        expect((0, matchRealAddressByRouteName_1.matchRealAddressByRouteName)({
            pathname: "catchAllOptional",
            query: { params: ["testParam", "testParamValue"] },
        }, routes)).toStrictEqual({
            pathname: "/catch-all-optional/[[...params]]",
            query: { params: ["testParam", "testParamValue"] },
        });
    });
    it("Match route with dynamic params and query", () => {
        expect((0, matchRealAddressByRouteName_1.matchRealAddressByRouteName)({
            pathname: "catchAll",
            query: {
                params: ["testParam", "testParamValue"],
                query: "testQuery",
            },
        }, routes)).toStrictEqual({
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
        }, routes)).toStrictEqual({
            pathname: "/slug/[slug]",
            query: { slug: "slug" },
        });
    });
});
