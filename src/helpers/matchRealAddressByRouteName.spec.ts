import { matchRealAddressByRouteName } from "./matchRealAddressByRouteName";
import { RouteProps } from "@types-app/index";

type RoutesType = {
  catchAllOptional: RouteProps<
    {
      optionalParams: [
        queryKey?: "q",
        queryValue?: string,
        caregoryKey?: "category",
        categoryValue?: string,
        yearKey?: "year",
        yearValue?: string,
        languageKey?: "language",
        languageValue?: string,
        conditionKey?: "condition",
        conditionValue?: string,
        bindingKey?: "binding",
        bindingValue?: string,
        priceKey?: "price",
        priceValue?: string,
        pageKey?: "page",
        pageValue?: string,
        userKey?: "user",
        userValue?: string
      ];
    },
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
    ).toBeUndefined();
  });

  it("Match route with optional dynamic params and query", () => {
    expect(
      matchRealAddressByRouteName<RoutesType>(
        {
          pathname: "catchAllOptional",
          query: { optionalParams: ["q", "abc"] },
        },
        routes
      )
    ).toStrictEqual({
      pathname: "/catch-all-optional/[[...params]]",
      query: { optionalParams: ["q", "abc"] },
    });
  });

  it("Match route with optional dynamic params with some empty fields", () => {
    expect(
      matchRealAddressByRouteName<RoutesType>(
        {
          pathname: "catchAllOptional",
          query: {
            optionalParams: ["q", "abc", undefined, undefined, "year", "2011"],
          },
        },
        routes
      )
    ).toStrictEqual({
      pathname: "/catch-all-optional/[[...params]]",
      query: { optionalParams: ["q", "abc", "year", "2011"] },
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
