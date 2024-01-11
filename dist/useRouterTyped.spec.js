"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("next/router");
const useRouterTypedMock_1 = require("./tests/data/useRouterTypedMock");
jest.mock("next/router", () => ({
    useRouter: jest.fn(),
}));
describe("useRouterTyped", () => {
    describe("custom enhancement functions", () => {
        beforeEach(() => {
            router_1.useRouter.mockReturnValue(Object.assign(Object.assign({}, useRouterTypedMock_1.mockRouter), { domainLocales: [{ domain: "example.com", defaultLocale: "en" }] }));
        });
        it("getCurrentDomain returns the correct domain", () => {
            const routerMock = (0, useRouterTypedMock_1.useRouterTypedMock)();
            expect(routerMock.getCurrentDomain()).toBe("example.com");
        });
        it("getCurrentRoute returns the current route key", () => {
            router_1.useRouter.mockReturnValue(Object.assign(Object.assign({}, useRouterTypedMock_1.mockRouter), { pathname: "/about" }));
            const routerMock = (0, useRouterTypedMock_1.useRouterTypedMock)();
            expect(routerMock.getCurrentRoute()).toBe("about");
        });
        it("getRouteByName returns the correct URL for a route", () => {
            const routerMock = (0, useRouterTypedMock_1.useRouterTypedMock)();
            expect(routerMock.getRouteByName("about")).toBe("/about");
        });
        // Get route name
        describe("getRouteName", () => {
            it("getRouteName returns the correct route name for a URL", () => {
                const routerMock = (0, useRouterTypedMock_1.useRouterTypedMock)();
                expect(routerMock.getRouteName("/about")).toBe("about");
            });
            it("getRouteName returns the correct route name for a parameterized URL", () => {
                const routerMock = (0, useRouterTypedMock_1.useRouterTypedMock)();
                expect(routerMock.getRouteName("/profile/johnDoe")).toBe("profile");
            });
        });
        // Is current route
        describe("isCurrentRoute", () => {
            it("isCurrentRoute returns true for the current route", () => {
                router_1.useRouter.mockReturnValue(Object.assign(Object.assign({}, useRouterTypedMock_1.mockRouter), { pathname: "/about" }));
                const routerMock = (0, useRouterTypedMock_1.useRouterTypedMock)();
                expect(routerMock.isCurrentRoute("about")).toBe(true);
            });
            it("isCurrentRoute returns true for a parameterized current route", () => {
                router_1.useRouter.mockReturnValue(Object.assign(Object.assign({}, useRouterTypedMock_1.mockRouter), { pathname: "/profile/[username]" }));
                const routerMock = (0, useRouterTypedMock_1.useRouterTypedMock)();
                expect(routerMock.isCurrentRoute("profile")).toBe(true);
            });
        });
        // Push
        describe("push", () => {
            it("push navigates to the specified route", () => __awaiter(void 0, void 0, void 0, function* () {
                const routerMock = (0, useRouterTypedMock_1.useRouterTypedMock)();
                yield routerMock.push("contact");
                expect(useRouterTypedMock_1.mockRouter.push).toHaveBeenCalledWith("/contact", undefined, undefined);
            }));
            it("push navigates to a route with parameters", () => __awaiter(void 0, void 0, void 0, function* () {
                const routerMock = (0, useRouterTypedMock_1.useRouterTypedMock)();
                const params = { username: "johnDoe" };
                yield routerMock.push({ pathname: "profile", query: params });
                expect(useRouterTypedMock_1.mockRouter.push).toHaveBeenCalledWith({ pathname: "/profile/[username]", query: { username: "johnDoe" } }, undefined, undefined);
            }));
            it("push navigates to a route with multiple parameters", () => __awaiter(void 0, void 0, void 0, function* () {
                const routerMock = (0, useRouterTypedMock_1.useRouterTypedMock)();
                const params = { productId: "123", reviewId: "456" };
                yield routerMock.push({ pathname: "productReview", query: params });
                expect(useRouterTypedMock_1.mockRouter.push).toHaveBeenCalledWith({
                    pathname: "/product/[productId]/review/[reviewId]",
                    query: { productId: "123", reviewId: "456" },
                }, undefined, undefined);
            }));
            it("push navigates to a required catch-all route", () => __awaiter(void 0, void 0, void 0, function* () {
                const routerMock = (0, useRouterTypedMock_1.useRouterTypedMock)();
                const path = ["docs", "guide"];
                yield routerMock.push({ pathname: "docs", query: { path } });
                expect(useRouterTypedMock_1.mockRouter.push).toHaveBeenCalledWith({ pathname: "/docs/[...path]", query: { path } }, undefined, undefined);
            }));
            it("push navigates to an optional catch-all route with parameters", () => __awaiter(void 0, void 0, void 0, function* () {
                const routerMock = (0, useRouterTypedMock_1.useRouterTypedMock)();
                const fileId = ["userId", "user123", "fileCategory", "document"];
                yield routerMock.push({ pathname: "userFiles", query: { fileId } });
                expect(useRouterTypedMock_1.mockRouter.push).toHaveBeenCalledWith({ pathname: "/userFiles/[[...fileId]]", query: { fileId } }, undefined, undefined);
            }));
        });
        // Push custom url
        it("pushCustomUrl navigates to a custom URL", () => __awaiter(void 0, void 0, void 0, function* () {
            const routerMock = (0, useRouterTypedMock_1.useRouterTypedMock)();
            yield routerMock.pushCustomUrl("/custom-url");
            expect(useRouterTypedMock_1.mockRouter.push).toHaveBeenCalledWith("/custom-url", undefined, undefined);
        }));
        // Push shallow
        it("pushShallow performs shallow navigation", () => __awaiter(void 0, void 0, void 0, function* () {
            const routerMock = (0, useRouterTypedMock_1.useRouterTypedMock)();
            yield routerMock.pushShallow("services");
            expect(useRouterTypedMock_1.mockRouter.push).toHaveBeenCalledWith("/services", undefined, {
                shallow: true,
            });
        }));
    });
});
