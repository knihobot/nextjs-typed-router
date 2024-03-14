import {
  LocaleLabelType,
  mockRoutes,
  MockRoutesType,
} from "../mock-data/routes";
import { matchRealAddressByRouteName } from "./matchRealAddressByRouteName";

describe("matchRealAddressByRouteName", () => {
  it("Non-existent route with params", () => {
    expect(() =>
      matchRealAddressByRouteName<MockRoutesType, LocaleLabelType>(
        {
          pathname: "non-existent-route",
          query: { params: ["testParam", "testParamValue"] },
        },
        mockRoutes,
        "en",
      ),
    ).toThrow(
      new Error(
        "No route with provided key non-existent-route exists in routes object",
      ),
    );
  });

  it("Existing route with no locale specified", () => {
    expect(() =>
      matchRealAddressByRouteName<MockRoutesType, LocaleLabelType>(
        "home",
        mockRoutes,
      ),
    ).toThrow(new Error("Locale is not defined."));
  });

  it("Existing route with specified locale", () => {
    expect(
      matchRealAddressByRouteName<MockRoutesType, LocaleLabelType>(
        "home",
        mockRoutes,
        "en",
      ),
    ).toEqual("/");
  });

  it("Existing route with specified locale and query", () => {
    expect(
      matchRealAddressByRouteName<MockRoutesType, LocaleLabelType>(
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
      matchRealAddressByRouteName<MockRoutesType, LocaleLabelType>(
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

  it("Non-existent simple route with default locale", () => {
    expect(() =>
      matchRealAddressByRouteName<MockRoutesType, LocaleLabelType>(
        // @ts-expect-error
        "nonexistent",
        mockRoutes,
        "en",
      ),
    ).toThrow(
      new Error(
        "No route with provided key nonexistent exists in routes object",
      ),
    );
  });

  it("Simple route with non-existent locale and without fallback", () => {
    expect(() =>
      matchRealAddressByRouteName<MockRoutesType, LocaleLabelType>(
        "no-fallback",
        mockRoutes,
        // @ts-expect-error
        "fr",
      ),
    ).toThrow(
      new Error(
        "No route with provided key no-fallback exists in routes object for locale fr",
      ),
    );
  });

  it("Existing route with default locale", () => {
    expect(
      matchRealAddressByRouteName<MockRoutesType, LocaleLabelType>(
        "home",
        mockRoutes,
        "en",
      ),
    ).toEqual("/");
  });

  it("Existing required catch-all route with specified locale", () => {
    expect(
      matchRealAddressByRouteName<MockRoutesType, LocaleLabelType>(
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
      matchRealAddressByRouteName<MockRoutesType, LocaleLabelType>(
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

  it("Existing optional catch-all route with disabled english variant", () => {
    expect(
      matchRealAddressByRouteName<MockRoutesType, LocaleLabelType>(
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

  it("Existing optional catch-all route with specified locale with undefined on some indexes", () => {
    expect(
      matchRealAddressByRouteName<MockRoutesType, LocaleLabelType>(
        {
          pathname: "optionalGallery",
          query: {
            images: [
              "image1.jpg",
              undefined,
              undefined,
              "image2.jpg",
              undefined,
              undefined,
            ],
          },
        },
        mockRoutes,
        "cs",
      ),
    ).toEqual({
      pathname: "/volitelna-galerie/[[...images]]",
      query: { images: ["image1.jpg", "image2.jpg"] },
    });
  });

  it("Existing optional catch-all route with default locale", () => {
    expect(
      matchRealAddressByRouteName<MockRoutesType, LocaleLabelType>(
        {
          pathname: "optionalGallery",
          query: { images: ["image1.jpg", "image2.jpg"] },
        },
        mockRoutes,
        "de-DE",
      ),
    ).toEqual({
      pathname: "/optionale-galerie/[[...images]]",
      query: { images: ["image1.jpg", "image2.jpg"] },
    });
  });
});
