"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockRouter = exports.useRouterTypedMock = void 0;
const useRouterTyped_1 = require("../useRouterTyped");
const routes_1 = require("./routes");
function useRouterTypedMock() {
    return (0, useRouterTyped_1.useRouterTyped)(routes_1.mockRoutes, "en");
}
exports.useRouterTypedMock = useRouterTypedMock;
exports.mockRouter = {
    basePath: "",
    route: "/",
    pathname: "/",
    query: {},
    forward: jest.fn(() => Promise.resolve(true)),
    asPath: `/`,
    isLocaleDomain: false,
    push: jest.fn(() => Promise.resolve(true)),
    replace: jest.fn(() => Promise.resolve(true)),
    reload: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(() => Promise.resolve()),
    beforePopState: jest.fn(),
    events: {
        emit: jest.fn(),
        on: jest.fn(),
        off: jest.fn(),
    },
    isFallback: false,
    isReady: true,
    isPreview: false,
    locale: "en",
};
