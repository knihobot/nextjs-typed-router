import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { MouseEventHandler, AnchorHTMLAttributes, forwardRef } from "react";
import { RouteProps } from "@types-app/index";
import Link from "next/link";
import { ParamsOrQueryType } from "./LinkEnhanced.types";

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
  } & ParamsOrQueryType<RouteDefinitions, RouteName>;

export const LinkEnhanced = <
  RouteDefinitions extends Record<string, RouteProps>,
  RouteName extends keyof RouteDefinitions
>() =>
  forwardRef<HTMLAnchorElement, LinkEnhancedProps<RouteDefinitions, RouteName>>(
    (props, ref) => {
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
        routes,
        ...anchorProps
      } = props;

      if (route) {
        return (
          <NextLink
            href={{
              pathname: routes[route],
              query: params ?? query,
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
    }
  );

LinkEnhanced.displayName = "Link";
