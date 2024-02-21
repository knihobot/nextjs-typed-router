/// <reference types="node" />
import { LinkProps as NextLinkProps } from "next/link";
import { AnchorHTMLAttributes, MouseEventHandler, Ref } from "react";
import { LocalizedRoute, RouteProps } from "@types-app/index";
import React from "react";
import { UrlObject } from "url";
type LinkTypedProps<RouteDefinitions extends Record<string, RouteProps>, RouteName extends keyof RouteDefinitions, Locales extends string> = Omit<NextLinkProps, "href" | "onClick" | "onMouseEnter"> & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick" | "onMouseEnter"> & {
    href?: string;
    hrefNext?: Omit<UrlObject, "pathname" | "query">;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
    onMouseEnter?: MouseEventHandler<HTMLAnchorElement>;
    params?: RouteDefinitions[RouteName]["params"];
    query?: RouteDefinitions[RouteName]["query"];
    route?: RouteName;
    routes: Record<keyof RouteDefinitions, LocalizedRoute<Locales>>;
};
export declare const LinkTyped: <RouteDefinitions extends Record<string, RouteProps<Record<string, string | (string | undefined)[]> | undefined, Record<string, string> | undefined>>, RouteName extends keyof RouteDefinitions, Locales extends string, DefaultLocale extends Locales>(props: Omit<{
    href: string | UrlObject;
    as?: (string | UrlObject) | undefined;
    replace?: boolean | undefined;
    scroll?: boolean | undefined;
    shallow?: boolean | undefined;
    passHref?: boolean | undefined;
    prefetch?: boolean | undefined;
    locale?: string | false | undefined;
    legacyBehavior?: boolean | undefined;
    onMouseEnter?: MouseEventHandler<HTMLAnchorElement> | undefined;
    onTouchStart?: React.TouchEventHandler<HTMLAnchorElement> | undefined;
    onClick?: MouseEventHandler<HTMLAnchorElement> | undefined;
}, "href" | "onClick" | "onMouseEnter"> & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick" | "onMouseEnter"> & {
    href?: string | undefined;
    hrefNext?: Omit<UrlObject, "pathname" | "query"> | undefined;
    onClick?: MouseEventHandler<HTMLAnchorElement> | undefined;
    onMouseEnter?: MouseEventHandler<HTMLAnchorElement> | undefined;
    params?: RouteDefinitions[RouteName]["params"] | undefined;
    query?: RouteDefinitions[RouteName]["query"] | undefined;
    route?: RouteName | undefined;
    routes: Record<keyof RouteDefinitions, LocalizedRoute<Locales>>;
} & {
    ref?: Ref<HTMLAnchorElement> | undefined;
}) => import("react/jsx-runtime").JSX.Element;
export {};
