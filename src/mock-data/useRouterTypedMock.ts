import { useRouterTyped } from "../useRouterTyped";
import { mockRoutes } from "./routes";
import { Router } from "next/router";

export function useRouterTypedMock(): ReturnType<typeof useRouterTyped> {
  return useRouterTyped(mockRoutes);
}

export const mockRouter: Partial<Router> = {
  basePath: "",
  route: "/",
  pathname: "/",
  query: {},
  forward: jest.fn(() => Promise.resolve(true)),
  asPath: `/`,
  isLocaleDomain: false,
  push: jest.fn(() => Promise.resolve(true)),
  replace: jest.fn(() => Promise.resolve(true)),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn(() => Promise.resolve()),
  beforePopState: jest.fn(),
  events: {
    emit: jest.fn(),
    on: jest.fn(),
    off: jest.fn(),
  },
  isFallback: false,
  isReady: true,
  isPreview: false,
  locale: "en",
};
