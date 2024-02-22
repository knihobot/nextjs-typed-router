import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { AnchorHTMLAttributes, MouseEventHandler, Ref } from "react";
import { LocalizedRoute, RouteProps } from "@types-app/index";
import React from "react";
import { removeUndefined } from "./helpers/removeUndefined";
import { useRouter } from "next/router";
import { UrlObject } from "url";

type LinkTypedProps<
  RouteDefinitions extends Record<string, RouteProps>,
  RouteName extends keyof RouteDefinitions,
  Locales extends string,
> = Omit<NextLinkProps, "href" | "onClick" | "onMouseEnter"> &
  Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "href" | "onClick" | "onMouseEnter"
  > & {
    href?: string;
    hrefNext?: Omit<UrlObject, "pathname" | "query">;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
    onMouseEnter?: MouseEventHandler<HTMLAnchorElement>;
    params?: RouteDefinitions[RouteName]["params"];
    query?: RouteDefinitions[RouteName]["query"];
    route?: RouteName;
    routes: Record<keyof RouteDefinitions, LocalizedRoute<Locales>>;
  };

export const LinkTyped = <
  RouteDefinitions extends Record<string, RouteProps>,
  RouteName extends keyof RouteDefinitions,
  Locales extends string,
  DefaultLocale extends Locales,
>(
  props: LinkTypedProps<RouteDefinitions, RouteName, Locales> & {
    ref?: Ref<HTMLAnchorElement>;
  },
) => {
  const {
    children,
    href,
    hrefNext,
    locale,
    params,
    prefetch,
    query,
    ref,
    replace,
    route,
    routes,
    scroll,
    shallow,
    legacyBehavior,
    ...anchorProps
  } = props;

  const keys = params ? Object.keys(params) : undefined;

  const { locale: routerLocale } = useRouter();

  const paramsExtracted =
    params && keys && keys.length > 0 ? params[keys[0]] : undefined;

  const paramsAndQuery =
    params || query
      ? {
          ...(Array.isArray(paramsExtracted)
            ? { [keys ? keys[0] : "params"]: removeUndefined(paramsExtracted) }
            : params),
          ...query,
        }
      : undefined;

  if (route) {
    const localizedRoutesSet = routes[route];

    if (!localizedRoutesSet)
      throw new Error(
        `No route with provided key ${String(route)} exists in routes object`,
      );

    const localizedPathname =
      localizedRoutesSet[routerLocale as Locales] ||
      localizedRoutesSet["fallback"];

    return (
      <NextLink
        legacyBehavior // TODO: fix
        href={{
          ...hrefNext,
          pathname:
            typeof localizedPathname === "object"
              ? localizedPathname.pathname
              : localizedPathname,
          query: paramsAndQuery,
        }}
        locale={locale}
        passHref
        prefetch={prefetch}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
      >
        <a ref={ref} {...anchorProps}>
          {children}
        </a>
      </NextLink>
    );
  }

  return (
    <a ref={ref} href={href ? href.toString() : " "} {...anchorProps}>
      {children}
    </a>
  );
};
