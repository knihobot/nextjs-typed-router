import {
  defaultLocale,
  LocaleLabelType,
  mockRoutes,
  MockRoutesType,
} from "../mock-data/routes";
import { matchRealAddressByRouteName } from "./matchRealAddressByRouteName";

describe("matchRealAddressByRouteName", () => {
  it("Non-existent route", () => {
    expect(
      matchRealAddressByRouteName<MockRoutesType, LocaleLabelType, "en">(
        {
          pathname: "non-existent-route",
          query: { params: ["testParam", "testParamValue"] },
        },
        mockRoutes,
        "en",
      ),
    ).toBeUndefined();
  });

  it("Existing route with no locale specified", () => {
    expect(
      matchRealAddressByRouteName<MockRoutesType, LocaleLabelType, "en">(
        "home",
        mockRoutes,
      ),
    ).toBeUndefined();
  });

  it("Existing route with specified locale", () => {
    expect(
      matchRealAddressByRouteName<MockRoutesType, LocaleLabelType, "en">(
        "home",
        mockRoutes,
        "en",
      ),
    ).toEqual("/");
  });

  it("Existing route with specified locale and query", () => {
    expect(
      matchRealAddressByRouteName<MockRoutesType, LocaleLabelType, "en">(
        {
          pathname: "profile",
          query: { username: "testUser" },
        },
        mockRoutes,
        "en",
      ),
    ).toEqual({
      pathname: "/profile/[username]",
      query: { username: "testUser" },
    });
  });

  it("Existing route with specified locale and multiple query parameters", () => {
    expect(
      matchRealAddressByRouteName<MockRoutesType, LocaleLabelType, "en">(
        {
          pathname: "product",
          query: { productId: "123", param1: "value1", param2: "value2" },
        },
        mockRoutes,
        "en",
      ),
    ).toEqual({
      pathname: "/product/[productId]",
      query: { productId: "123", param1: "value1", param2: "value2" },
    });
  });

  it("Non-existent route with default locale", () => {
    expect(
      matchRealAddressByRouteName<MockRoutesType, LocaleLabelType, "en">(
        // @ts-ignore
        "nonexistent",
        mockRoutes,
        "en",
        defaultLocale,
      ),
    ).toBeUndefined();
  });

  it("Existing route with default locale", () => {
    expect(
      matchRealAddressByRouteName<MockRoutesType, LocaleLabelType, "en">(
        "home",
        mockRoutes,
        defaultLocale,
      ),
    ).toEqual("/");
  });

  it("Existing required catch-all route with specified locale", () => {
    expect(
      matchRealAddressByRouteName<MockRoutesType, LocaleLabelType, "en">(
        {
          pathname: "docs",
          query: { path: ["folder1", "file.txt"] },
        },
        mockRoutes,
        "en",
      ),
    ).toEqual({
      pathname: "/docs/[...path]",
      query: { path: ["folder1", "file.txt"] },
    });
  });

  it("Existing required catch-all route with default locale", () => {
    expect(
      matchRealAddressByRouteName<MockRoutesType, LocaleLabelType, "en">(
        {
          pathname: "docs",
          query: { path: ["folder1", "file.txt"] },
        },
        mockRoutes,
        defaultLocale,
      ),
    ).toEqual({
      pathname: "/docs/[...path]",
      query: { path: ["folder1", "file.txt"] },
    });
  });

  it("Existing optional catch-all route with specified locale", () => {
    expect(
      matchRealAddressByRouteName<MockRoutesType, LocaleLabelType, "en">(
        {
          pathname: "optionalGallery",
          query: { images: ["image1.jpg", "image2.jpg"] },
        },
        mockRoutes,
        "en",
      ),
    ).toEqual({
      pathname: "/optional-gallery/[[...images]]",
      query: { images: ["image1.jpg", "image2.jpg"] },
    });
  });

  it("Existing optional catch-all route with default locale", () => {
    expect(
      matchRealAddressByRouteName<MockRoutesType, LocaleLabelType, "en">(
        {
          pathname: "optionalGallery",
          query: { images: ["image1.jpg", "image2.jpg"] },
        },
        mockRoutes,
        defaultLocale,
      ),
    ).toEqual({
      pathname: "/optional-gallery/[[...images]]",
      query: { images: ["image1.jpg", "image2.jpg"] },
    });
  });
});
