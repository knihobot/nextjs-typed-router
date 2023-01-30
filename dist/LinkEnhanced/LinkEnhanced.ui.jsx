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
exports.LinkEnhanced = void 0;
const link_1 = __importDefault(require("next/link"));
const react_1 = require("react");
const LinkEnhanced = () => (0, react_1.forwardRef)((props, ref) => {
    const { children, href, locale, query, prefetch, replace, route, scroll, shallow, params, routes } = props, anchorProps = __rest(props, ["children", "href", "locale", "query", "prefetch", "replace", "route", "scroll", "shallow", "params", "routes"]);
    if (route) {
        return (<link_1.default href={{
                pathname: routes[route],
                query: params !== null && params !== void 0 ? params : query,
            }} locale={locale} passHref prefetch={prefetch} replace={replace} scroll={scroll} shallow={shallow}>
            <a ref={ref} {...anchorProps}>
              {children}
            </a>
          </link_1.default>);
    }
    return (<a ref={ref} href={href ? href.toString() : " "} {...anchorProps}>
          {children}
        </a>);
});
exports.LinkEnhanced = LinkEnhanced;
exports.LinkEnhanced.displayName = "Link";
