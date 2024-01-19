import {
  LocaleLabelType,
  mockRoutes,
  MockRoutesType,
} from "../mock-data/routes";
import { getLocalizedRouteFromPathname } from "./getLocalizedRouteFromPathname";

describe("getLocalizedRouteFromPathname", () => {
  it("should return the correct localized route pathname for a requested pathname", () => {
    expect(
      getLocalizedRouteFromPathname<MockRoutesType, LocaleLabelType, "en">(
        "/about",
        mockRoutes,
        "cs",
        "en",
      ),
    ).toBe("/o-nas");
  });

  it("should return the correct localized route pathname for a requested pathname with one param", () => {
    expect(
      getLocalizedRouteFromPathname<MockRoutesType, LocaleLabelType, "en">(
        "/kategoria/slovensko",
        mockRoutes,
        "de-DE",
        "en",
      ),
    ).toBe("/kategorie/slovensko");
  });

  it("should return the correct localized route pathname for a requested pathname with one param and three segments", () => {
    expect(
      getLocalizedRouteFromPathname<MockRoutesType, LocaleLabelType, "en">(
        "/benutzer/123/details",
        mockRoutes,
        "sk",
        "en",
      ),
    ).toBe("/uzivatel/123/detaily");
  });

  it("should return the correct localized route pathname for a requested pathname with two params and four segments", () => {
    expect(
      getLocalizedRouteFromPathname<MockRoutesType, LocaleLabelType, "en">(
        "/product/cars/review/654",
        mockRoutes,
        "de-AT",
        "en",
      ),
    ).toBe("/produkt/cars/bewertung/654");
  });

  it("should return the correct localized route pathname for a requested pathname with required catch all params", () => {
    expect(
      getLocalizedRouteFromPathname<MockRoutesType, LocaleLabelType, "en">(
        "/docs/guide/intro/123",
        mockRoutes,
        "cs",
        "en",
      ),
    ).toBe("/dokumentace/guide/intro/123");
  });

  it("should return the correct localized route pathname for a requested pathname with optional catch all params", () => {
    expect(
      getLocalizedRouteFromPathname<MockRoutesType, LocaleLabelType, "en">(
        "/uzivatelSoubory/123/456/789/abc",
        mockRoutes,
        "sk",
        "en",
      ),
    ).toBe("/uzivatelSubory/123/456/789/abc");
  });
});
