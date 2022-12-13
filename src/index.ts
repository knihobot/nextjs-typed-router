import { RouteProps, useRouterTyped } from "./main/useRouterTyped";

export function useRouterKnihobot() {
  return useRouterTyped<{ index: RouteProps }>({ index: "/" });
}
