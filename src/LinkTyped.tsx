import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { AnchorHTMLAttributes, MouseEventHandler, Ref } from "react";
import { LocalizedRoute, RouteProps } from "@types-app/index";
import React from "react";
import { removeUndefined } from "./helpers/removeUndefined";
import { useRouter } from "next/router";

type LinkTypedProps<
  RouteDefinitions extends Record<string, RouteProps>,
  RouteName extends keyof RouteDefinitions,
  Locales extends string,
  DefaultLocale extends Locales
> = Omit<NextLinkProps, "href" | "onClick" | "onMouseEnter"> &
  Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "href" | "onClick" | "onMouseEnter"
  > & {
    routes: Record<
      keyof RouteDefinitions,
      LocalizedRoute<Locales, DefaultLocale>
    >;
    route?: RouteName;
    href?: string;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
    onMouseEnter?: MouseEventHandler<HTMLAnchorElement>;
    query?: RouteDefinitions[RouteName]["query"];
    params?: RouteDefinitions[RouteName]["params"];
    appLocale: Locales;
  };

export const LinkTyped = <
  RouteDefinitions extends Record<string, RouteProps>,
  RouteName extends keyof RouteDefinitions,
  Locales extends string,
  DefaultLocale extends Locales
>(
  props: LinkTypedProps<RouteDefinitions, RouteName, Locales, DefaultLocale> & {
    ref?: Ref<HTMLAnchorElement>;
  }
) => {
  const {
    appLocale,
    children,
    href,
    locale,
    query,
    prefetch,
    replace,
    route,
    scroll,
    shallow,
    params,
    ref,
    routes,
    ...anchorProps
  } = props;

  const keys = params ? Object.keys(params) : undefined;

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
    return (
      <NextLink
        href={{
          pathname: routes[route][appLocale],
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
