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
exports.Link = void 0;
const link_1 = __importDefault(require("next/link"));
const Link = (props) => {
    const { children, href, locale, query, prefetch, replace, route, scroll, shallow, params, ref, routes } = props, anchorProps = __rest(props, ["children", "href", "locale", "query", "prefetch", "replace", "route", "scroll", "shallow", "params", "ref", "routes"]);
    const paramsAndQuery = params || query ? Object.assign(Object.assign({}, params), query) : undefined;
    if (route) {
        return (<link_1.default href={{
                pathname: routes[route],
                query: paramsAndQuery,
            }} locale={locale} passHref prefetch={prefetch} replace={replace} scroll={scroll} shallow={shallow}>
        <a ref={ref} {...anchorProps}>
          {children}
        </a>
      </link_1.default>);
    }
    return (<a ref={ref} href={href ? href.toString() : " "} {...anchorProps}>
      {children}
    </a>);
};
exports.Link = Link;
exports.Link.displayName = "Link";
