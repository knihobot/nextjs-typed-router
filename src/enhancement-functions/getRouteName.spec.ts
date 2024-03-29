import { getRouteName } from "./getRouteName";
import {
  LocaleLabelType,
  mockRoutes,
  MockRoutesType,
} from "../mock-data/routes";

describe("getRouteName", () => {
  it("should return the correct route name for a normal route", () => {
    expect(
      getRouteName<MockRoutesType, LocaleLabelType>("/about", mockRoutes),
    ).toBe("about");
  });

  // Routes with specified parameters
  describe("should handle routes with one or multiple required parameters", () => {
    it("should return the correct route name for a route with optional parameters", () => {
      expect(
        getRouteName<MockRoutesType, LocaleLabelType>(
          "/blog/2022/07/interesting-article",
          mockRoutes,
        ),
      ).toBe("blogPost");
    });

    it("should return undefined for a partially matching URL", () => {
      expect(
        getRouteName<MockRoutesType, LocaleLabelType>(
          "/userDetails/123",
          mockRoutes,
        ),
      ).toBeUndefined();
    });
  });

  // Routes with required catch-all parameters
  describe("should handle routes with required catch-all params", () => {
    it("should return the correct route name for a required catch-all route", () => {
      expect(
        getRouteName<MockRoutesType, LocaleLabelType>(
          "/docs/guide/intro",
          mockRoutes,
        ),
      ).toBe("docs");
    });

    it("should handle routes with a catch-all parameter correctly", () => {
      expect(
        getRouteName<MockRoutesType, LocaleLabelType>(
          "/gallery/image1/image2/image3",
          mockRoutes,
        ),
      ).toBe("gallery");
    });

    it("should return the correct route name for a deeply nested route", () => {
      expect(
        getRouteName<MockRoutesType, LocaleLabelType>(
          "/files/document/2022/report",
          mockRoutes,
        ),
      ).toBe("files");
    });
  });

  // Optional catch-all routes
  describe("should handle optional catch-all routes", () => {
    it("should return the correct route name for an optional catch-all route", () => {
      expect(
        getRouteName<MockRoutesType, LocaleLabelType>(
          "/optional-gallery/landscape/monet/1856",
          mockRoutes,
        ),
      ).toBe("optionalGallery");
    });

    it("should return the correct route name for a route with complex parameters", () => {
      expect(
        getRouteName<MockRoutesType, LocaleLabelType>(
          "/userFiles/userId/1234/fileCategory/document/uploadDate/20220715",
          mockRoutes,
        ),
      ).toBe("userFiles");
    });

    it("should handle routes with an optional catch-all parameter that is not used", () => {
      expect(
        getRouteName<MockRoutesType, LocaleLabelType>(
          "/optional-gallery",
          mockRoutes,
        ),
      ).toBe("optionalGallery");
    });
  });

  // Routes with translation
  describe("should handle routes with translation", () => {
    it("should return the correct route name for an English route", () => {
      expect(
        getRouteName<MockRoutesType, LocaleLabelType>("/about", mockRoutes),
      ).toBe("about");
    });

    it("should return the correct route name for a Czech route", () => {
      expect(
        getRouteName<MockRoutesType, LocaleLabelType>("/o-nas", mockRoutes),
      ).toBe("about");
    });

    it("should return the correct route name for a German (Austria) route", () => {
      expect(
        getRouteName<MockRoutesType, LocaleLabelType>("/ueber-uns", mockRoutes),
      ).toBe("about");
    });

    it("should return the correct route name for a Slovak route with parameter", () => {
      expect(
        getRouteName<MockRoutesType, LocaleLabelType>(
          "/profil/johndoe",
          mockRoutes,
        ),
      ).toBe("profile");
    });

    it("should return the correct route name for a German (Germany) route with multiple parameters", () => {
      expect(
        getRouteName<MockRoutesType, LocaleLabelType>(
          "/produkt/123/bewertung/456",
          mockRoutes,
        ),
      ).toBe("productReview");
    });

    it("should return the correct route name for a Czech required catch-all route", () => {
      expect(
        getRouteName<MockRoutesType, LocaleLabelType>(
          "/dokumentace/guide/intro",
          mockRoutes,
        ),
      ).toBe("docs");
    });

    it("should return the correct route name for a Slovak optional catch-all route", () => {
      expect(
        getRouteName<MockRoutesType, LocaleLabelType>(
          "/volitelna-galeria/landscape/monet/1856",
          mockRoutes,
        ),
      ).toBe("optionalGallery");
    });
  });

  // Non-existent route
  it("should return undefined for a URL not present in the routes", () => {
    expect(
      getRouteName<MockRoutesType, LocaleLabelType>("/nonexistent", mockRoutes),
    ).toBeUndefined();
  });
});
