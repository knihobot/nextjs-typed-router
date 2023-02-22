/// <reference types="node" />
import { LinkProps as NextLinkProps } from "next/link";
import { AnchorHTMLAttributes, MouseEventHandler, Ref } from "react";
import { LocalizedRoute, RouteProps } from "@types-app/index";
import React from "react";
type LinkTypedProps<RouteDefinitions extends Record<string, RouteProps>, RouteName extends keyof RouteDefinitions, Locales extends string, DefaultLocale extends Locales> = Omit<NextLinkProps, "href" | "onClick" | "onMouseEnter"> & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick" | "onMouseEnter"> & {
    routes: Record<keyof RouteDefinitions, LocalizedRoute<Locales, DefaultLocale>>;
    route?: RouteName;
    href?: string;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
    onMouseEnter?: MouseEventHandler<HTMLAnchorElement>;
    query?: RouteDefinitions[RouteName]["query"];
    params?: RouteDefinitions[RouteName]["params"];
    appLocale: Locales;
};
export declare const LinkTyped: <RouteDefinitions extends Record<string, RouteProps<Record<string, string | (string | undefined)[]> | undefined, Record<string, string> | undefined>>, RouteName extends keyof RouteDefinitions, Locales extends string, DefaultLocale extends Locales>(props: Omit<{
    href: string | import("url").UrlObject;
    as?: (string | import("url").UrlObject) | undefined;
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
    routes: Record<keyof RouteDefinitions, LocalizedRoute<Locales, DefaultLocale>>;
    route?: RouteName | undefined;
    href?: string | undefined;
    onClick?: MouseEventHandler<HTMLAnchorElement> | undefined;
    onMouseEnter?: MouseEventHandler<HTMLAnchorElement> | undefined;
    query?: RouteDefinitions[RouteName]["query"] | undefined;
    params?: RouteDefinitions[RouteName]["params"] | undefined;
    appLocale: Locales;
} & {
    ref?: Ref<HTMLAnchorElement> | undefined;
}) => JSX.Element;
export {};
