"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@testing-library/react");
require("@testing-library/jest-dom");
const LinkTyped_1 = require("./LinkTyped");
const routes_1 = require("./mock-data/routes");
const router_1 = require("next/router");
const useRouterTypedMock_1 = require("./mock-data/useRouterTypedMock");
const react_2 = require("react");
jest.mock("next/router", () => ({
    useRouter: jest.fn(),
}));
let mockHref;
jest.mock("next/link", () => ({
    __esModule: true,
    default: (_a) => {
        var { children, legacyBehavior, passHref, href } = _a, rest = __rest(_a, ["children", "legacyBehavior", "passHref", "href"]);
        mockHref = href;
        if (!(0, react_2.isValidElement)(children)) {
            return null; // Or some fallback UI
        }
        // Clone the child element without 'legacyBehavior', 'passHref', ' props
        const clonedChild = (0, react_2.cloneElement)(children, rest);
        return (0, jsx_runtime_1.jsx)("div", { children: clonedChild });
    },
}));
describe("LinkTyped Component", () => {
    beforeEach(() => {
        router_1.useRouter.mockReturnValue(useRouterTypedMock_1.mockRouter);
    });
    afterEach(() => {
        mockHref = undefined;
    });
    it("renders href correctly for a normal route", () => {
        (0, react_1.render)((0, jsx_runtime_1.jsx)(LinkTyped_1.LinkTyped, { route: "home", routes: routes_1.mockRoutes, defaultLocale: "en", children: "Link" }));
        expect(mockHref).toEqual({ pathname: "/" });
    });
    it("renders href correctly for a route with parameters", () => {
        (0, react_1.render)((0, jsx_runtime_1.jsx)(LinkTyped_1.LinkTyped, { route: "profile", params: { username: "johnDoe" }, routes: routes_1.mockRoutes, defaultLocale: "en" }));
        expect(mockHref).toEqual({
            pathname: "/profile/[username]",
            query: { username: "johnDoe" },
        });
    });
    it("renders localized href based on locale", () => {
        router_1.useRouter.mockReturnValue(Object.assign(Object.assign({}, useRouterTypedMock_1.mockRouter), { locale: "de-DE" }));
        (0, react_1.render)((0, jsx_runtime_1.jsx)(LinkTyped_1.LinkTyped, { route: "about", routes: routes_1.mockRoutes, defaultLocale: "en" }));
        expect(mockHref).toEqual({
            pathname: "/ueber-uns",
        });
    });
    it("renders href from href prop when no route is provided", () => {
        (0, react_1.render)((0, jsx_runtime_1.jsx)(LinkTyped_1.LinkTyped, { href: "https://example.com", routes: routes_1.mockRoutes, defaultLocale: "en" }));
        const linkElement = react_1.screen.getByRole("link");
        expect(linkElement).toHaveAttribute("href", "https://example.com");
    });
    // Test case 5: Route with multiple parameters
    it("renders href correctly for a route with multiple parameters", () => {
        (0, react_1.render)((0, jsx_runtime_1.jsx)(LinkTyped_1.LinkTyped, { route: "userDetails", params: { userId: "123", detailsKey: "bio" }, routes: routes_1.mockRoutes, defaultLocale: "en" }));
        expect(mockHref).toEqual({
            pathname: "/user/[userId]/details",
            query: { userId: "123", detailsKey: "bio" },
        });
    });
    // Test case 6: Catch-all route
    it("renders href correctly for a catch-all route", () => {
        (0, react_1.render)((0, jsx_runtime_1.jsx)(LinkTyped_1.LinkTyped, { route: "docs", params: { path: ["docs", "guide", "introduction"] }, routes: routes_1.mockRoutes, defaultLocale: "en" }));
        expect(mockHref).toEqual({
            pathname: "/docs/[...path]",
            query: { path: ["docs", "guide", "introduction"] },
        });
    });
    // Test case 7: Optional catch-all route
    it("renders href correctly for an optional catch-all route", () => {
        (0, react_1.render)((0, jsx_runtime_1.jsx)(LinkTyped_1.LinkTyped, { route: "optionalGallery", params: { images: ["landscape", "portrait"] }, routes: routes_1.mockRoutes, defaultLocale: "en" }));
        expect(mockHref).toEqual({
            pathname: "/optional-gallery/[[...images]]",
            query: { images: ["landscape", "portrait"] },
        });
    });
    it("renders href correctly for an optional catch-all route with undefined on some indexes", () => {
        (0, react_1.render)((0, jsx_runtime_1.jsx)(LinkTyped_1.LinkTyped, { route: "optionalGallery", params: {
                images: ["landscape", undefined, "portrait", undefined, undefined],
            }, routes: routes_1.mockRoutes, defaultLocale: "en" }));
        expect(mockHref).toEqual({
            pathname: "/optional-gallery/[[...images]]",
            query: { images: ["landscape", "portrait"] },
        });
    });
    // Test case 8: Localized route in a different locale
    it("renders localized href in 'cs' locale", () => {
        router_1.useRouter.mockReturnValue(Object.assign(Object.assign({}, useRouterTypedMock_1.mockRouter), { locale: "cs" }));
        (0, react_1.render)((0, jsx_runtime_1.jsx)(LinkTyped_1.LinkTyped, { route: "about", routes: routes_1.mockRoutes, defaultLocale: "en" }));
        expect(mockHref).toEqual({
            pathname: "/o-nas",
        });
    });
    // Test case 9: Route with query parameters
    it("renders href with additional query parameters", () => {
        (0, react_1.render)((0, jsx_runtime_1.jsx)(LinkTyped_1.LinkTyped, { route: "blog", query: { author: "JohnDoe", page: "2" }, routes: routes_1.mockRoutes, defaultLocale: "en" }));
        expect(mockHref).toEqual({
            pathname: "/blog",
            query: { author: "JohnDoe", page: "2" },
        });
    });
    // Test case 10: Route with a parameter and different locale
    it("renders href for a parameterized route in 'de-AT' locale", () => {
        router_1.useRouter.mockReturnValue(Object.assign(Object.assign({}, useRouterTypedMock_1.mockRouter), { locale: "de-AT" }));
        (0, react_1.render)((0, jsx_runtime_1.jsx)(LinkTyped_1.LinkTyped, { route: "profile", params: { username: "maxMustermann" }, routes: routes_1.mockRoutes, defaultLocale: "en" }));
        expect(mockHref).toEqual({
            pathname: "/profil/[username]",
            query: { username: "maxMustermann" },
        });
    });
    // Route with Multiple Parameters and Locale Switch
    it("handles route with multiple parameters and different locale ('de-DE')", () => {
        router_1.useRouter.mockReturnValue(Object.assign(Object.assign({}, useRouterTypedMock_1.mockRouter), { locale: "de-DE" }));
        (0, react_1.render)((0, jsx_runtime_1.jsx)(LinkTyped_1.LinkTyped, { route: "productReview", params: { productId: "1001", reviewId: "5002" }, routes: routes_1.mockRoutes, defaultLocale: "en" }));
        expect(mockHref).toEqual({
            pathname: "/produkt/[productId]/bewertung/[reviewId]",
            query: { productId: "1001", reviewId: "5002" },
        });
    });
    // Optional Catch-All Route with Multiple Nested Parameters
    it("renders href for optional catch-all route with nested parameters", () => {
        (0, react_1.render)((0, jsx_runtime_1.jsx)(LinkTyped_1.LinkTyped, { route: "userFiles", params: {
                fileId: [
                    "userId",
                    "42",
                    "fileCategory",
                    "document",
                    "uploadDate",
                    "2021-01-01",
                ],
            }, routes: routes_1.mockRoutes, defaultLocale: "en" }));
        expect(mockHref).toEqual({
            pathname: "/userFiles/[[...fileId]]",
            query: {
                fileId: [
                    "userId",
                    "42",
                    "fileCategory",
                    "document",
                    "uploadDate",
                    "2021-01-01",
                ],
            },
        });
    });
    // Complex Route with Multi-Layered Localization and Query Parameters
    it("handles complex route with multi-layered localization and query parameters", () => {
        router_1.useRouter.mockReturnValue(Object.assign(Object.assign({}, useRouterTypedMock_1.mockRouter), { locale: "cs" }));
        (0, react_1.render)((0, jsx_runtime_1.jsx)(LinkTyped_1.LinkTyped, { route: "blogPost", params: { year: "2020", month: "03", slug: "spring-festival" }, query: { highlight: "yes", comments: "open" }, routes: routes_1.mockRoutes, defaultLocale: "en" }));
        expect(mockHref).toEqual({
            pathname: "/blog/[year]/[month]/[slug]",
            query: {
                year: "2020",
                month: "03",
                slug: "spring-festival",
                highlight: "yes",
                comments: "open",
            },
        });
    });
    // Route with Deeply Nested Parameters and Different Default Locale
    it("renders href for deeply nested parameters with a non-English default locale", () => {
        router_1.useRouter.mockReturnValue(Object.assign(Object.assign({}, useRouterTypedMock_1.mockRouter), { locale: "sk" }));
        (0, react_1.render)((0, jsx_runtime_1.jsx)(LinkTyped_1.LinkTyped, { route: "optionalGallery", params: {
                images: [
                    "galleryId",
                    "1234",
                    "imageType",
                    "portrait",
                    "artist",
                    "JohnDoe",
                    "creationYear",
                    "2022",
                ],
            }, routes: routes_1.mockRoutes, defaultLocale: "sk" }));
        expect(mockHref).toEqual({
            pathname: "/volitelna-galeria/[[...images]]",
            query: {
                images: [
                    "galleryId",
                    "1234",
                    "imageType",
                    "portrait",
                    "artist",
                    "JohnDoe",
                    "creationYear",
                    "2022",
                ],
            },
        });
    });
    // Route with Multiple Parameters and Dynamic Locale
    it("dynamically renders href based on user-selected locale for a route with multiple parameters", () => {
        const userLocale = "de-AT"; // Simulate user-selected locale
        router_1.useRouter.mockReturnValue(Object.assign(Object.assign({}, useRouterTypedMock_1.mockRouter), { locale: userLocale }));
        (0, react_1.render)((0, jsx_runtime_1.jsx)(LinkTyped_1.LinkTyped, { route: "event", params: { year: "2023", month: "07", day: "15" }, routes: routes_1.mockRoutes, defaultLocale: "en" }));
        expect(mockHref).toEqual({
            pathname: "/veranstaltung/[year]/[month]/[day]",
            query: { year: "2023", month: "07", day: "15" },
        });
    });
    it("fallbacks to default locale to render localized href for an invalid locale", () => {
        router_1.useRouter.mockReturnValue(Object.assign(Object.assign({}, useRouterTypedMock_1.mockRouter), { locale: "invalid-locale" }));
        (0, react_1.render)((0, jsx_runtime_1.jsx)(LinkTyped_1.LinkTyped, { route: "about", routes: routes_1.mockRoutes, defaultLocale: "en" }));
        expect(mockHref).toEqual({
            pathname: "/about",
        });
    });
    it("fails to render href for an unsupported route", () => {
        const renderLinkTypedWithUnsupportedRoute = () => {
            (0, react_1.render)((0, jsx_runtime_1.jsx)(LinkTyped_1.LinkTyped, { route: "unsupportedRoute", routes: routes_1.mockRoutes, defaultLocale: "en" }));
        };
        expect(mockHref).toBeUndefined();
        expect(renderLinkTypedWithUnsupportedRoute).toThrow();
    });
    it("fails to render href when parameters are of incorrect type", () => {
        var _a;
        (0, react_1.render)((0, jsx_runtime_1.jsx)(LinkTyped_1.LinkTyped, { route: "product", 
            // @ts-ignore
            params: { productId: 123 }, routes: routes_1.mockRoutes, defaultLocale: "en" }));
        expect(mockHref).toBeInstanceOf(Object);
        expect(mockHref).not.toBeUndefined();
        // @ts-ignore
        expect((_a = mockHref.query) === null || _a === void 0 ? void 0 : _a.productId).not.toBe("123"); // Expect failure due to incorrect parameter type
    });
});
