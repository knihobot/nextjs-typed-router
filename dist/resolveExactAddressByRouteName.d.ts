/// <reference types="node" />
import { RouteInputType, RouteProps } from "./types";
import { UrlObject } from "url";
export declare function resolveExactAddressByRouteName<RouteDefinitions extends Record<string, RouteProps>>(routeName: RouteInputType<RouteDefinitions>, routes: Record<keyof RouteDefinitions, string>): string | UrlObject;
