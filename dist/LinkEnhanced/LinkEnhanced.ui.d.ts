import { LinkProps as NextLinkProps } from "next/link";
import { MouseEventHandler, AnchorHTMLAttributes } from "react";
import { RouteProps } from "@types-app/index";
import { ParamsOrQueryType } from "./LinkEnhanced.types";
type LinkEnhancedProps<RouteDefinitions extends Record<string, RouteProps>, RouteName extends keyof RouteDefinitions> = Omit<NextLinkProps, "href" | "onClick" | "onMouseEnter"> & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick" | "onMouseEnter"> & {
    routes: Record<keyof RouteDefinitions, string>;
    route?: RouteName;
    href?: string;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
    onMouseEnter?: MouseEventHandler<HTMLAnchorElement>;
} & ParamsOrQueryType<RouteDefinitions, RouteName>;
export declare const LinkEnhanced: {
    <RouteDefinitions extends Record<string, RouteProps<Record<string, string> | undefined, Record<string, string> | undefined>>, RouteName extends keyof RouteDefinitions>(): import("react").ForwardRefExoticComponent<LinkEnhancedProps<RouteDefinitions, RouteName> & import("react").RefAttributes<HTMLAnchorElement>>;
    displayName: string;
};
export {};
