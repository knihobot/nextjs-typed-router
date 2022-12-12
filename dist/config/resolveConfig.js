"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cfg = void 0;
const cosmiconfig_1 = require("cosmiconfig");
const cosmiconfig_typescript_loader_1 = require("cosmiconfig-typescript-loader");
const explorer = (0, cosmiconfig_1.cosmiconfig)("router", {
    loaders: {
        ".ts": (0, cosmiconfig_typescript_loader_1.TypeScriptLoader)(),
    },
});
exports.cfg = explorer.load("./routes.ts");
