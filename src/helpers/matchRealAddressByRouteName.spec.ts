import { matchRealAddressByRouteName } from "./matchRealAddressByRouteName";
import { RouteProps } from "@types-app/index";

type RoutesType = {
  catchAllOptional: RouteProps<
    { optionalParams: ["testParam", "testParamValue"] },
    { query?: string }
  >;
  catchAll: RouteProps<
    { params: ["testParam", "testParamValue"] },
    { query?: string }
  >;
  slug: RouteProps<{ slug: "slug" }, { query?: string }>;
};

describe("Match real route address by route name", () => {
  const routes: Record<keyof RoutesType, string> = {
    catchAllOptional: "/catch-all-optional/[[...params]]",
    catchAll: "/catch-all/[...params]",
    slug: "/slug/[slug]",
  };

  it("Non-existent route", () => {
    expect(
      matchRealAddressByRouteName<RoutesType>(
        {
          pathname: "non-existent-route",
          query: { params: ["testParam", "testParamValue"] },
        },
        routes
      )
    ).toBeNull();
  });

  it("Match route with optional dynamic params and query", () => {
    expect(
      matchRealAddressByRouteName<RoutesType>(
        {
          pathname: "catchAllOptional",
          query: { params: ["testParam", "testParamValue"] },
        },
        routes
      )
    ).toStrictEqual({
      pathname: "/catch-all-optional/[[...params]]",
      query: { params: ["testParam", "testParamValue"] },
    });
  });

  it("Match route with dynamic params and query", () => {
    expect(
      matchRealAddressByRouteName<RoutesType>(
        {
          pathname: "catchAll",
          query: {
            params: ["testParam", "testParamValue"],
            query: "testQuery",
          },
        },
        routes
      )
    ).toStrictEqual({
      pathname: "/catch-all/[...params]",
      query: { params: ["testParam", "testParamValue"], query: "testQuery" },
    });
  });

  it("Match route with slug param", () => {
    expect(
      matchRealAddressByRouteName<RoutesType>(
        {
          pathname: "slug",
          query: {
            slug: "slug",
          },
        },
        routes
      )
    ).toStrictEqual({
      pathname: "/slug/[slug]",
      query: { slug: "slug" },
    });
  });
});
