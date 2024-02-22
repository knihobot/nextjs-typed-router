import {
  LocaleLabelType,
  mockRoutes,
  MockRoutesType,
} from "../mock-data/routes";
import { getLocalizedRouteFromPathname } from "./getLocalizedRouteFromPathname";

describe("getLocalizedRouteFromPathname", () => {
  it("should return the correct localized route pathname for a requested pathname", () => {
    expect(
      getLocalizedRouteFromPathname<MockRoutesType, LocaleLabelType>(
        "/about",
        mockRoutes,
        "cs",
      ),
    ).toBe("/o-nas");
  });

  it("should return the correct localized route pathname for a requested pathname login", () => {
    expect(
      getLocalizedRouteFromPathname<MockRoutesType, LocaleLabelType>(
        "/login",
        mockRoutes,
        "en",
      ),
    ).toBe("/login");
  });

  it("should return the correct localized route pathname for a requested pathname account details", () => {
    expect(
      getLocalizedRouteFromPathname<MockRoutesType, LocaleLabelType>(
        "/account/details",
        mockRoutes,
        "en",
      ),
    ).toBe("/account/details");
  });

  it("should return the correct localized route pathname for a requested pathname with one param", () => {
    expect(
      getLocalizedRouteFromPathname<MockRoutesType, LocaleLabelType>(
        "/kategoria/slovensko",
        mockRoutes,
        "cs",
      ),
    ).toBe("/kategorie/slovensko");
  });

  it("should return the correct localized route pathname for a requested pathname with one param and three segments", () => {
    expect(
      getLocalizedRouteFromPathname<MockRoutesType, LocaleLabelType>(
        "/benutzer/123/details/abc",
        mockRoutes,
        "cs",
      ),
    ).toBe("/uzivatel/123/detaily/abc");
  });

  it("should return the correct localized route pathname for a requested pathname with two params and four segments", () => {
    expect(
      getLocalizedRouteFromPathname<MockRoutesType, LocaleLabelType>(
        "/product/cars/review/654",
        mockRoutes,
        "de-DE",
      ),
    ).toBe("/produkt/cars/bewertung/654");
  });

  it("should return the correct localized route pathname for a requested pathname with required catch all params", () => {
    expect(
      getLocalizedRouteFromPathname<MockRoutesType, LocaleLabelType>(
        "/docs/guide/intro/123",
        mockRoutes,
        "cs",
      ),
    ).toBe("/dokumentace/guide/intro/123");
  });

  it("should return the correct localized route pathname for a requested pathname with optional catch all params", () => {
    expect(
      getLocalizedRouteFromPathname<MockRoutesType, LocaleLabelType>(
        "/uzivatelSoubory/123/456/789/abc",
        mockRoutes,
        "sk",
      ),
    ).toBe("/uzivatelSubory/123/456/789/abc");
  });

  it("should return the correct localized route pathname for a requested pathname with optional catch all params pattern, but without params specified", () => {
    expect(
      getLocalizedRouteFromPathname<MockRoutesType, LocaleLabelType>(
        "/p",
        mockRoutes,
        "en",
      ),
    ).toBe("/p");
  });
});
