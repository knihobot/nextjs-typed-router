import { matchRealAddressByRouteName } from "./matchRealAddressByRouteName";
import { LocalizedRoute, RouteProps } from "@types-app/index";

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

type Locales = "cs" | "en" | "sk" | "de-AT" | "de-DE";
type DefaultLocale = "en";

describe("Match real route address by route name", () => {
  const routes: Record<
    keyof RoutesType,
    LocalizedRoute<Locales, DefaultLocale>
  > = {
    catchAllOptional: { en: "/catch-all-optional/[[...params]]" },
    catchAll: { en: "/catch-all/[...params]" },
    slug: { en: "/slug/[slug]" },
  };

  it("Non-existent route", () => {
    expect(
      matchRealAddressByRouteName<RoutesType, Locales, DefaultLocale>(
        {
          pathname: "non-existent-route",
          query: { params: ["testParam", "testParamValue"] },
        },
        routes,
        "en"
      )
    ).toBeUndefined();
  });

  it("Match route with optional dynamic params and query", () => {
    expect(
      matchRealAddressByRouteName<RoutesType, Locales, DefaultLocale>(
        {
          pathname: "catchAllOptional",
          query: { optionalParams: ["q", "abc"] },
        },
        routes,
        "en"
      )
    ).toStrictEqual({
      pathname: "/catch-all-optional/[[...params]]",
      query: { optionalParams: ["q", "abc"] },
    });
  });

  it("Match route with optional dynamic params with some empty fields", () => {
    expect(
      matchRealAddressByRouteName<RoutesType, Locales, DefaultLocale>(
        {
          pathname: "catchAllOptional",
          query: {
            optionalParams: ["q", "abc", undefined, undefined, "year", "2011"],
          },
        },
        routes,
        "en"
      )
    ).toStrictEqual({
      pathname: "/catch-all-optional/[[...params]]",
      query: { optionalParams: ["q", "abc", "year", "2011"] },
    });
  });

  it("Match route with dynamic params and query", () => {
    expect(
      matchRealAddressByRouteName<RoutesType, Locales, DefaultLocale>(
        {
          pathname: "catchAll",
          query: {
            params: ["testParam", "testParamValue"],
            query: "testQuery",
          },
        },
        routes,
        "en"
      )
    ).toStrictEqual({
      pathname: "/catch-all/[...params]",
      query: { params: ["testParam", "testParamValue"], query: "testQuery" },
    });
  });

  it("Match route with slug param", () => {
    expect(
      matchRealAddressByRouteName<RoutesType, Locales, DefaultLocale>(
        {
          pathname: "slug",
          query: {
            slug: "slug",
          },
        },
        routes,
        "en"
      )
    ).toStrictEqual({
      pathname: "/slug/[slug]",
      query: { slug: "slug" },
    });
  });
});
