import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { AnchorHTMLAttributes, MouseEventHandler, Ref } from "react";
import { RouteProps } from "@types-app/index";

type LinkEnhancedProps<
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
  };

export const Link = <
  RouteDefinitions extends Record<string, RouteProps>,
  RouteName extends keyof RouteDefinitions
>(
  props: LinkEnhancedProps<RouteDefinitions, RouteName> & {
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
    ...anchorProps
  } = props;

  if (route) {
    return (
      <NextLink
        href={{
          pathname: routes[route],
          query: params || query ? { ...params, ...query } : undefined,
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

Link.displayName = "Link";