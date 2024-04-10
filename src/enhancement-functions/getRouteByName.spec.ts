import { LocalizedRoute } from "@types-app/index";
import { getRouteByName } from "./getRouteByName";
import { ValidationError } from "../ValidationError/ValidationError";

describe("getRouteByName", () => {
  const routes: Record<
    string,
    LocalizedRoute<"en" | "sk" | "cs" | "de-DE" | "de-AT">
  > = {
    // One Segment
    users: {
      fallback: "/users/[id]",
      en: { pathname: "/users/[id]" },
      cs: { pathname: "/uzivatele/[id]" },
      sk: { pathname: "/pouzivatelia/[id]" },
      "de-DE": { pathname: "/benutzer/[id]" },
      "de-AT": { pathname: "/benutzer/[id]" },
    },
    // Catch-all Segments
    account: {
      fallback: "/account/[...segments]",
      en: { pathname: "/account/[...segments]" },
      cs: { pathname: "/ucet/[...segments]" },
      sk: { pathname: "/ucet/[...segments]" },
      "de-DE": { pathname: "/konto/[...segments]" },
      "de-AT": { pathname: "/konto/[...segments]" },
    },
    // Optional Catch-all Segments
    products: {
      fallback: "/products/[[...segments]]",
      en: { pathname: "/products/[[...segments]]" },
      cs: { pathname: "/produkty/[[...segments]]" },
      sk: { pathname: "/produkty/[[...segments]]" },
      "de-DE": { pathname: "/produkte/[[...segments]]" },
      "de-AT": { pathname: "/produkte/[[...segments]]" },
    },
  };

  // Test cases for handling different locales
  describe("should return the correct route for a given locale", () => {
    it("should return the correct route for a given locale", () => {
      const path = getRouteByName("users", routes, "cs", { id: "123" });
      expect(path).toBe("/uzivatele/123");
    });

    it("should handle missing locale and use default locale", () => {
      const path = getRouteByName("users", routes, "fr", { id: "123" });
      expect(path).toBe("/users/123");
    });
  });

  // Test cases for handling parameters in the route
  describe("should correctly replace parameters in the route", () => {
    it("should correctly replace parameters in the route", () => {
      const path = getRouteByName("users", routes, "en", { id: "456" });
      expect(path).toBe("/users/456");
    });

    it("should ignore extra unnecessary parameters", () => {
      const path = getRouteByName("users", routes, "en", {
        id: "123",
        extra: "unused",
      });
      expect(path).toBe("/users/123");
    });
  });

  // Test cases for handling required catch-all segments
  describe("should correctly replace required catch-all segments", () => {
    it("should handle required catch-all segments with a single element array", () => {
      const path = getRouteByName("account", routes, "en", {
        segments: ["settings"],
      });
      expect(path).toBe("/account/settings");
    });

    it("should handle required catch-all segments with a multi-element array", () => {
      const path = getRouteByName("account", routes, "en", {
        segments: ["settings", "security"],
      });
      expect(path).toBe("/account/settings/security");
    });

    it("should handle optional catch-all segments with a long array of segments including undefined on some indexes", () => {
      expect(() => getRouteByName("account", routes, "en", {})).toThrow(
        new ValidationError("params-required", {
          routeName: "account",
          locale: "en",
        }),
      );
    });
  });

  // Test cases for handling optional catch-all segments
  describe("should correctly replace optional catch-all segments", () => {
    it("should handle optional catch-all segments with no segments provided", () => {
      const path = getRouteByName("products", routes, "en", {});
      expect(path).toBe("/products/");
    });

    it("should handle optional catch-all segments with empty array", () => {
      const path = getRouteByName("products", routes, "en", { segments: [] });
      expect(path).toBe("/products/");
    });

    it("should handle optional catch-all segments with a single element array", () => {
      const path = getRouteByName("products", routes, "en", {
        segments: ["details"],
      });
      expect(path).toBe("/products/details");
    });

    it("should handle optional catch-all segments with a multi-element array", () => {
      const path = getRouteByName("products", routes, "en", {
        segments: ["category", "123", "edit"],
      });
      expect(path).toBe("/products/category/123/edit");
    });

    it("should handle optional catch-all segments with a long array of segments", () => {
      const path = getRouteByName("products", routes, "en", {
        segments: [
          "category1",
          "item123",
          "detail",
          "review",
          "image",
          "specification",
          "compare",
          "offer",
          "discount",
          "history",
        ],
      });
      expect(path).toBe(
        "/products/category1/item123/detail/review/image/specification/compare/offer/discount/history",
      );
    });

    it("should handle optional catch-all segments with a long array of segments including undefined on some indexes", () => {
      const path = getRouteByName("products", routes, "en", {
        segments: [
          "category1",
          "item123",
          undefined,
          undefined,
          "image",
          "specification",
          "compare",
          "offer",
          undefined,
          undefined,
          undefined,
          undefined,
        ],
      });
      expect(path).toBe(
        "/products/category1/item123/image/specification/compare/offer",
      );
    });
  });

  // Test case for non-existent routes
  it("should throw an error for non-existent routes", () => {
    expect(() =>
      getRouteByName("nonExistentRoute", routes, "en", { id: "789" }),
    ).toThrow(
      new ValidationError("route-key-not-found", {
        routeName: "nonExistentRoute",
      }),
    );
  });
});
