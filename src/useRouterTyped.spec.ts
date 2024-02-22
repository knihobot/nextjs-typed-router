import { useRouter } from "next/router";
import { mockRouter, useRouterTypedMock } from "./mock-data/useRouterTypedMock";
import { getLocalizedRouteFromPathname } from "./enhancement-functions/getLocalizedRouteFromPathname";
import {
  LocaleLabelType,
  mockRoutes,
  MockRoutesType,
} from "./mock-data/routes";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("useRouterTyped", () => {
  describe("custom enhancement functions", () => {
    beforeEach(() => {
      (useRouter as jest.Mock).mockReturnValue({
        ...mockRouter,
        domainLocales: [{ domain: "example.com", defaultLocale: "en" }],
      });
    });

    it("getCurrentDomain returns the correct domain", () => {
      const routerMock = useRouterTypedMock();
      expect(routerMock.getCurrentDomain()).toBe("example.com");
    });

    it("getCurrentRoute returns the current route key", () => {
      (useRouter as jest.Mock).mockReturnValue({
        ...mockRouter,
        pathname: "/about",
      });
      const routerMock = useRouterTypedMock();
      expect(routerMock.getCurrentRoute()).toBe("about");
    });

    it("getRouteByName returns the correct URL for a route", () => {
      const routerMock = useRouterTypedMock();
      expect(routerMock.getRouteByName("about")).toBe("/about");
    });

    // Get route name
    describe("getRouteName", () => {
      it("getRouteName returns the correct route name for a URL", () => {
        const routerMock = useRouterTypedMock();
        expect(routerMock.getRouteName("/about")).toBe("about");
      });

      it("getRouteName returns the correct route name for a parameterized URL", () => {
        const routerMock = useRouterTypedMock();
        expect(routerMock.getRouteName("/profile/johnDoe")).toBe("profile");
      });
    });

    // Is current route
    describe("isCurrentRoute", () => {
      it("isCurrentRoute returns true for the current route", () => {
        (useRouter as jest.Mock).mockReturnValue({
          ...mockRouter,
          pathname: "/about",
        });
        const routerMock = useRouterTypedMock();
        expect(routerMock.isCurrentRoute("about")).toBe(true);
      });

      it("isCurrentRoute returns true for a parameterized current route", () => {
        (useRouter as jest.Mock).mockReturnValue({
          ...mockRouter,
          pathname: "/profile/[username]",
        });
        const routerMock = useRouterTypedMock();
        expect(routerMock.isCurrentRoute("profile")).toBe(true);
      });
    });

    // Push
    describe("push", () => {
      it("push navigates to the specified route", async () => {
        const routerMock = useRouterTypedMock();
        await routerMock.push("contact");
        expect(mockRouter.push).toHaveBeenCalledWith(
          "/contact",
          undefined,
          undefined,
        );
      });

      it("push navigates to a route with parameters", async () => {
        const routerMock = useRouterTypedMock();
        const params = { username: "johnDoe" };
        await routerMock.push({ pathname: "profile", query: params });
        expect(mockRouter.push).toHaveBeenCalledWith(
          { pathname: "/profile/[username]", query: { username: "johnDoe" } },
          undefined,
          undefined,
        );
      });

      it("push navigates to a route with multiple parameters", async () => {
        const routerMock = useRouterTypedMock();
        const params = { productId: "123", reviewId: "456" };
        await routerMock.push({ pathname: "productReview", query: params });
        expect(mockRouter.push).toHaveBeenCalledWith(
          {
            pathname: "/product/[productId]/review/[reviewId]",
            query: { productId: "123", reviewId: "456" },
          },
          undefined,
          undefined,
        );
      });

      it("push navigates to a required catch-all route", async () => {
        const routerMock = useRouterTypedMock();
        const path = ["docs", "guide"];
        await routerMock.push({ pathname: "docs", query: { path } });
        expect(mockRouter.push).toHaveBeenCalledWith(
          { pathname: "/docs/[...path]", query: { path } },
          undefined,
          undefined,
        );
      });

      it("push navigates to an optional catch-all route with parameters", async () => {
        const routerMock = useRouterTypedMock();
        const fileId = ["userId", "user123", "fileCategory", "document"];
        await routerMock.push({ pathname: "userFiles", query: { fileId } });
        expect(mockRouter.push).toHaveBeenCalledWith(
          { pathname: "/userFiles/[[...fileId]]", query: { fileId } },
          undefined,
          undefined,
        );
      });
    });

    // Get localized route from pathname
    describe("get localized route from pathname", () => {
      it("should return the correct localized route pathname for a requested pathname", () => {
        (useRouter as jest.Mock).mockReturnValue({
          ...mockRouter,
          locale: "cs",
        });
        const routerMock = useRouterTypedMock();
        expect(routerMock.getLocalizedRouteFromPathname("/about")).toBe(
          "/o-nas",
        );
      });

      it("should return the correct localized route pathname for a requested pathname with one param", () => {
        (useRouter as jest.Mock).mockReturnValue({
          ...mockRouter,
          locale: "de-DE",
        });
        const routerMock = useRouterTypedMock();
        expect(
          routerMock.getLocalizedRouteFromPathname("/kategoria/slovensko"),
        ).toBe("/kategorie/slovensko");
      });

      it("should return the correct localized route pathname for a requested pathname with one param and three segments", () => {
        (useRouter as jest.Mock).mockReturnValue({
          ...mockRouter,
          locale: "sk",
        });
        const routerMock = useRouterTypedMock();
        expect(
          routerMock.getLocalizedRouteFromPathname("/benutzer/123/details/abc"),
        ).toBe("/uzivatel/123/detaily/abc");
      });

      it("should return the correct localized route pathname for a requested pathname with two params and four segments", () => {
        (useRouter as jest.Mock).mockReturnValue({
          ...mockRouter,
          locale: "de-AT",
        });
        const routerMock = useRouterTypedMock();
        expect(
          routerMock.getLocalizedRouteFromPathname("/product/cars/review/654"),
        ).toBe("/produkt/cars/bewertung/654");
      });

      it("should return the correct localized route pathname for a requested pathname with required catch all params", () => {
        (useRouter as jest.Mock).mockReturnValue({
          ...mockRouter,
          locale: "cs",
        });
        const routerMock = useRouterTypedMock();
        expect(
          routerMock.getLocalizedRouteFromPathname("/docs/guide/intro/123"),
        ).toBe("/dokumentace/guide/intro/123");
      });

      it("should return the correct localized route pathname for a requested pathname with optional catch all params", () => {
        (useRouter as jest.Mock).mockReturnValue({
          ...mockRouter,
          locale: "sk",
        });
        const routerMock = useRouterTypedMock();
        expect(
          routerMock.getLocalizedRouteFromPathname(
            "/uzivatelSoubory/123/456/789/abc",
          ),
        ).toBe("/uzivatelSubory/123/456/789/abc");
      });
    });

    // Push custom url
    it("pushCustomUrl navigates to a custom URL", async () => {
      const routerMock = useRouterTypedMock();
      await routerMock.pushCustomUrl("/custom-url");
      expect(mockRouter.push).toHaveBeenCalledWith(
        "/custom-url",
        undefined,
        undefined,
      );
    });

    // Push shallow
    it("pushShallow performs shallow navigation", async () => {
      const routerMock = useRouterTypedMock();
      await routerMock.pushShallow("services");
      expect(mockRouter.push).toHaveBeenCalledWith("/services", undefined, {
        shallow: true,
      });
    });
  });
});
