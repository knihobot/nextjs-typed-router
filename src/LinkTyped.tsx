import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { AnchorHTMLAttributes, MouseEventHandler, Ref } from "react";
import { RouteProps } from "@types-app/index";
import React from "react";
import { removeUndefined } from "./helpers/removeUndefined";
import { translatePushReplaceArgs } from "next-translate-routes/react/translatePushReplaceArgs";
import { useRouter } from "next/router";

type LinkTypedProps<
  RouteDefinitions extends Record<string, RouteProps>,
  RouteName extends keyof RouteDefinitions
> = Omit<NextLinkProps, "href" | "onClick" | "onMouseEnter"> &
  Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "href" | "onClick" | "onMouseEnter"
  > & {
    routes: Record<keyof RouteDefinitions, string>;
    route?: RouteName;
    href?: string;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
    onMouseEnter?: MouseEventHandler<HTMLAnchorElement>;
    query?: RouteDefinitions[RouteName]["query"];
    params?: RouteDefinitions[RouteName]["params"];
    translate?: boolean;
  };

export const LinkTyped = <
  RouteDefinitions extends Record<string, RouteProps>,
  RouteName extends keyof RouteDefinitions
>(
  props: LinkTypedProps<RouteDefinitions, RouteName> & {
    ref?: Ref<HTMLAnchorElement>;
  }
) => {
  const {
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
    translate,
    as,
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

  const router = useRouter();

  if (route) {
    const hrefObject = {
      pathname: routes[route],
      query: paramsAndQuery,
    };

    const translatedArgs = translatePushReplaceArgs({
      router,
      url: hrefObject,
      locale,
    });

    return (
      <NextLink
        as={translate ? translatedArgs.as : as}
        href={translate ? translatedArgs.url : hrefObject}
        locale={translate ? translatedArgs.locale : locale}
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
