import {
  LocaleLabelType,
  mockRoutes,
  MockRoutesType,
} from "../mock-data/routes";
import { matchRealAddressByRouteName } from "./matchRealAddressByRouteName";

describe("matchRealAddressByRouteName", () => {
  it("Non-existent route", () => {
    expect(
      matchRealAddressByRouteName<MockRoutesType, LocaleLabelType>(
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
      matchRealAddressByRouteName<MockRoutesType, LocaleLabelType>(
        "home",
        mockRoutes,
      ),
    ).toBeUndefined();
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

  it("Non-existent route with default locale", () => {
    expect(
      matchRealAddressByRouteName<MockRoutesType, LocaleLabelType>(
        // @ts-ignore
        "nonexistent",
        mockRoutes,
        "en",
      ),
    ).toBeUndefined();
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
