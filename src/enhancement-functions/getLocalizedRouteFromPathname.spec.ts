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
        "en",
        "cs",
      ),
    ).toBe("/o-nas");
  });

  it("should return the correct localized route pathname for a requested pathname login", () => {
    expect(
      getLocalizedRouteFromPathname<MockRoutesType, LocaleLabelType, "en">(
        "/login",
        mockRoutes,
        "en",
        "cs",
      ),
    ).toBe("/login");
  });

  it("should return the correct localized route pathname for a requested pathname account details", () => {
    expect(
      getLocalizedRouteFromPathname<MockRoutesType, LocaleLabelType, "en">(
        "/account/details",
        mockRoutes,
        "en",
        "cs",
      ),
    ).toBe("/account/details");
  });

  it("should return the correct localized route pathname for a requested pathname with one param", () => {
    expect(
      getLocalizedRouteFromPathname<MockRoutesType, LocaleLabelType, "en">(
        "/kategoria/slovensko",
        mockRoutes,
        "en",
        "de-DE",
      ),
    ).toBe("/kategorie/slovensko");
  });

  it("should return the correct localized route pathname for a requested pathname with one param and three segments", () => {
    expect(
      getLocalizedRouteFromPathname<MockRoutesType, LocaleLabelType, "en">(
        "/benutzer/123/details",
        mockRoutes,
        "en",
        "sk",
      ),
    ).toBe("/uzivatel/123/detaily");
  });

  it("should return the correct localized route pathname for a requested pathname with two params and four segments", () => {
    expect(
      getLocalizedRouteFromPathname<MockRoutesType, LocaleLabelType, "en">(
        "/product/cars/review/654",
        mockRoutes,
        "en",
        "de-AT",
      ),
    ).toBe("/produkt/cars/bewertung/654");
  });

  it("should return the correct localized route pathname for a requested pathname with required catch all params", () => {
    expect(
      getLocalizedRouteFromPathname<MockRoutesType, LocaleLabelType, "en">(
        "/docs/guide/intro/123",
        mockRoutes,
        "en",
        "cs",
      ),
    ).toBe("/dokumentace/guide/intro/123");
  });

  it("should return the correct localized route pathname for a requested pathname with optional catch all params", () => {
    expect(
      getLocalizedRouteFromPathname<MockRoutesType, LocaleLabelType, "en">(
        "/uzivatelSoubory/123/456/789/abc",
        mockRoutes,
        "en",
        "sk",
      ),
    ).toBe("/uzivatelSubory/123/456/789/abc");
  });

  it("should return the correct localized route pathname for a requested pathname with optional catch all params pattern, but without params specified", () => {
    expect(
      getLocalizedRouteFromPathname<MockRoutesType, LocaleLabelType, "en">(
        "/p",
        mockRoutes,
        "en",
        "de-DE",
      ),
    ).toBe("/p");
  });
});