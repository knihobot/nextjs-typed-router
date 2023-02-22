"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkTyped = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const link_1 = __importDefault(require("next/link"));
const removeUndefined_1 = require("./helpers/removeUndefined");
const router_1 = require("next/router");
const LinkTyped = (props) => {
    const { children, href, locale, query, prefetch, replace, route, scroll, shallow, params, ref, routes } = props, anchorProps = __rest(props, ["children", "href", "locale", "query", "prefetch", "replace", "route", "scroll", "shallow", "params", "ref", "routes"]);
    const keys = params ? Object.keys(params) : undefined;
    const { locale: routerLocale, defaultLocale } = (0, router_1.useRouter)();
    const paramsExtracted = params && keys && keys.length > 0 ? params[keys[0]] : undefined;
    const paramsAndQuery = params || query
        ? Object.assign(Object.assign({}, (Array.isArray(paramsExtracted)
            ? { [keys ? keys[0] : "params"]: (0, removeUndefined_1.removeUndefined)(paramsExtracted) }
            : params)), query) : undefined;
    if (route) {
        const localizedPathname = routes[route][routerLocale];
        return ((0, jsx_runtime_1.jsx)(link_1.default, Object.assign({ href: {
                pathname: localizedPathname ? localizedPathname : routes[route][defaultLocale],
                query: paramsAndQuery,
            }, locale: locale, passHref: true, prefetch: prefetch, replace: replace, scroll: scroll, shallow: shallow }, { children: (0, jsx_runtime_1.jsx)("a", Object.assign({ ref: ref }, anchorProps, { children: children })) })));
    }
    return ((0, jsx_runtime_1.jsx)("a", Object.assign({ ref: ref, href: href ? href.toString() : " " }, anchorProps, { children: children })));
};
exports.LinkTyped = LinkTyped;
