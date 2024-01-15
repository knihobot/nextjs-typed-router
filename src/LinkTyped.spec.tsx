import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LinkTyped } from "./LinkTyped";
import { mockRoutes } from "./mock-data/routes";
import { useRouter } from "next/router";
import { mockRouter } from "./mock-data/useRouterTypedMock";
import { cloneElement, isValidElement, PropsWithChildren } from "react";
import { LinkProps } from "next/link";
import { UrlObject } from "url";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

let mockHref: string | UrlObject | undefined;

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    legacyBehavior,
    passHref,
    href,
    ...rest
  }: PropsWithChildren<LinkProps>) => {
    mockHref = href;

    if (!isValidElement(children)) {
      return null; // Or some fallback UI
    }

    // Clone the child element without 'legacyBehavior', 'passHref', ' props
    const clonedChild = cloneElement(children, rest);

    return <div>{clonedChild}</div>;
  },
}));

describe("LinkTyped Component", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  afterEach(() => {
    mockHref = undefined;
  });

  it("renders href correctly for a normal route", () => {
    render(
      <LinkTyped route="home" routes={mockRoutes} defaultLocale="en">
        Link
      </LinkTyped>,
    );
    expect(mockHref).toEqual({ pathname: "/" });
  });

  it("renders href correctly for a route with parameters", () => {
    render(
      <LinkTyped
        route="profile"
        params={{ username: "johnDoe" }}
        routes={mockRoutes}
        defaultLocale="en"
      />,
    );
    expect(mockHref).toEqual({
      pathname: "/profile/[username]",
      query: { username: "johnDoe" },
    });
  });

  it("renders localized href based on locale", () => {
    (useRouter as jest.Mock).mockReturnValue({
      ...mockRouter,
      locale: "de-DE",
    });

    render(<LinkTyped route="about" routes={mockRoutes} defaultLocale="en" />);
    expect(mockHref).toEqual({
      pathname: "/ueber-uns",
    });
  });

  it("renders href from href prop when no route is provided", () => {
    render(
      <LinkTyped
        href="https://example.com"
        routes={mockRoutes}
        defaultLocale="en"
      />,
    );
    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute("href", "https://example.com");
  });

  // Test case 5: Route with multiple parameters
  it("renders href correctly for a route with multiple parameters", () => {
    render(
      <LinkTyped
        route="userDetails"
        params={{ userId: "123", detailsKey: "bio" }}
        routes={mockRoutes}
        defaultLocale="en"
      />,
    );
    expect(mockHref).toEqual({
      pathname: "/user/[userId]/details",
      query: { userId: "123", detailsKey: "bio" },
    });
  });

  // Test case 6: Catch-all route
  it("renders href correctly for a catch-all route", () => {
    render(
      <LinkTyped
        route="docs"
        params={{ path: ["docs", "guide", "introduction"] }}
        routes={mockRoutes}
        defaultLocale="en"
      />,
    );
    expect(mockHref).toEqual({
      pathname: "/docs/[...path]",
      query: { path: ["docs", "guide", "introduction"] },
    });
  });

  // Test case 7: Optional catch-all route
  it("renders href correctly for an optional catch-all route", () => {
    render(
      <LinkTyped
        route="optionalGallery"
        params={{ images: ["landscape", "portrait"] }}
        routes={mockRoutes}
        defaultLocale="en"
      />,
    );
    expect(mockHref).toEqual({
      pathname: "/optional-gallery/[[...images]]",
      query: { images: ["landscape", "portrait"] },
    });
  });

  // Test case 8: Localized route in a different locale
  it("renders localized href in 'cs' locale", () => {
    (useRouter as jest.Mock).mockReturnValue({
      ...mockRouter,
      locale: "cs",
    });

    render(<LinkTyped route="about" routes={mockRoutes} defaultLocale="en" />);
    expect(mockHref).toEqual({
      pathname: "/o-nas",
    });
  });

  // Test case 9: Route with query parameters
  it("renders href with additional query parameters", () => {
    render(
      <LinkTyped
        route="blog"
        query={{ author: "JohnDoe", page: "2" }}
        routes={mockRoutes}
        defaultLocale="en"
      />,
    );
    expect(mockHref).toEqual({
      pathname: "/blog",
      query: { author: "JohnDoe", page: "2" },
    });
  });

  // Test case 10: Route with a parameter and different locale
  it("renders href for a parameterized route in 'de-AT' locale", () => {
    (useRouter as jest.Mock).mockReturnValue({
      ...mockRouter,
      locale: "de-AT",
    });

    render(
      <LinkTyped
        route="profile"
        params={{ username: "maxMustermann" }}
        routes={mockRoutes}
        defaultLocale="en"
      />,
    );
    expect(mockHref).toEqual({
      pathname: "/profil/[username]",
      query: { username: "maxMustermann" },
    });
  });

  // Route with Multiple Parameters and Locale Switch
  it("handles route with multiple parameters and different locale ('de-DE')", () => {
    (useRouter as jest.Mock).mockReturnValue({
      ...mockRouter,
      locale: "de-DE",
    });

    render(
      <LinkTyped
        route="productReview"
        params={{ productId: "1001", reviewId: "5002" }}
        routes={mockRoutes}
        defaultLocale="en"
      />,
    );
    expect(mockHref).toEqual({
      pathname: "/produkt/[productId]/bewertung/[reviewId]",
      query: { productId: "1001", reviewId: "5002" },
    });
  });

  // Optional Catch-All Route with Multiple Nested Parameters
  it("renders href for optional catch-all route with nested parameters", () => {
    render(
      <LinkTyped
        route="userFiles"
        params={{
          fileId: [
            "userId",
            "42",
            "fileCategory",
            "document",
            "uploadDate",
            "2021-01-01",
          ],
        }}
        routes={mockRoutes}
        defaultLocale="en"
      />,
    );
    expect(mockHref).toEqual({
      pathname: "/userFiles/[[...fileId]]",
      query: {
        fileId: [
          "userId",
          "42",
          "fileCategory",
          "document",
          "uploadDate",
          "2021-01-01",
        ],
      },
    });
  });

  // Complex Route with Multi-Layered Localization and Query Parameters
  it("handles complex route with multi-layered localization and query parameters", () => {
    (useRouter as jest.Mock).mockReturnValue({
      ...mockRouter,
      locale: "cs",
    });

    render(
      <LinkTyped
        route="blogPost"
        params={{ year: "2020", month: "03", slug: "spring-festival" }}
        query={{ highlight: "yes", comments: "open" }}
        routes={mockRoutes}
        defaultLocale="en"
      />,
    );
    expect(mockHref).toEqual({
      pathname: "/blog/[year]/[month]/[slug]",
      query: {
        year: "2020",
        month: "03",
        slug: "spring-festival",
        highlight: "yes",
        comments: "open",
      },
    });
  });

  // Route with Deeply Nested Parameters and Different Default Locale
  it("renders href for deeply nested parameters with a non-English default locale", () => {
    (useRouter as jest.Mock).mockReturnValue({
      ...mockRouter,
      locale: "sk",
    });

    render(
      <LinkTyped
        route="optionalGallery"
        params={{
          images: [
            "galleryId",
            "1234",
            "imageType",
            "portrait",
            "artist",
            "JohnDoe",
            "creationYear",
            "2022",
          ],
        }}
        routes={mockRoutes}
        defaultLocale="sk"
      />,
    );
    expect(mockHref).toEqual({
      pathname: "/volitelna-galeria/[[...images]]",
      query: {
        images: [
          "galleryId",
          "1234",
          "imageType",
          "portrait",
          "artist",
          "JohnDoe",
          "creationYear",
          "2022",
        ],
      },
    });
  });

  // Route with Multiple Parameters and Dynamic Locale
  it("dynamically renders href based on user-selected locale for a route with multiple parameters", () => {
    const userLocale = "de-AT"; // Simulate user-selected locale
    (useRouter as jest.Mock).mockReturnValue({
      ...mockRouter,
      locale: userLocale,
    });

    render(
      <LinkTyped
        route="event"
        params={{ year: "2023", month: "07", day: "15" }}
        routes={mockRoutes}
        defaultLocale="en"
      />,
    );
    expect(mockHref).toEqual({
      pathname: "/veranstaltung/[year]/[month]/[day]",
      query: { year: "2023", month: "07", day: "15" },
    });
  });

  it("fallbacks to default locale to render localized href for an invalid locale", () => {
    (useRouter as jest.Mock).mockReturnValue({
      ...mockRouter,
      locale: "invalid-locale",
    });

    render(<LinkTyped route="about" routes={mockRoutes} defaultLocale="en" />);
    expect(mockHref).toEqual({
      pathname: "/about",
    });
  });

  it("fails to render href for an unsupported route", () => {
    const renderLinkTypedWithUnsupportedRoute = () => {
      render(
        <LinkTyped
          route="unsupportedRoute"
          routes={mockRoutes}
          defaultLocale="en"
        />,
      );
    };

    expect(mockHref).toBeUndefined();
    expect(renderLinkTypedWithUnsupportedRoute).toThrow();
  });

  it("fails to render href when parameters are of incorrect type", () => {
    render(
      <LinkTyped
        route="product"
        // @ts-ignore
        params={{ productId: 123 }} // productId should be a string, not a number
        routes={mockRoutes}
        defaultLocale="en"
      />,
    );
    expect(mockHref).toBeInstanceOf(Object);
    expect(mockHref).not.toBeUndefined();
    // @ts-ignore
    expect((mockHref as UrlObject).query?.productId).not.toBe("123"); // Expect failure due to incorrect parameter type
  });
});
