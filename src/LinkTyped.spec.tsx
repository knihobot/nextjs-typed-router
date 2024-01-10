import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LinkTyped } from "./LinkTyped";
import { mockRoutes } from "./__mocks__/routes";
import { useRouter } from "next/router";
import { mockRouter } from "./__mocks__/useRouterTypedMock";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("LinkTyped Component", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it("renders href correctly for a normal route", () => {
    render(<LinkTyped route="home" routes={mockRoutes} defaultLocale="en" />);
    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute("href", "/");
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
    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute("href", "/profile/johnDoe");
  });

  it("renders localized href based on locale", () => {
    render(
      <LinkTyped route="about" routes={mockRoutes} defaultLocale="de-AT" />,
    );
    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute("href", "/ueber-uns");
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

  // Add more tests for edge cases and other scenarios as needed
});
