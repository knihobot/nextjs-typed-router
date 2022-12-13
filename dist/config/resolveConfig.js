"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveConfig = void 0;
const cosmiconfig_1 = require("cosmiconfig");
const cosmiconfig_typescript_loader_1 = require("cosmiconfig-typescript-loader");
const moduleName = "routes";
const explorer = (0, cosmiconfig_1.cosmiconfigSync)("routes", {
    searchPlaces: [
        "package.json",
        `.${moduleName}rc`,
        `.${moduleName}rc.json`,
        `.${moduleName}rc.yaml`,
        `.${moduleName}rc.yml`,
        `.${moduleName}rc.js`,
        `.${moduleName}rc.ts`,
        `.${moduleName}rc.cjs`,
        `${moduleName}.config.js`,
        `${moduleName}.config.ts`,
    ],
    loaders: {
        ".ts": (0, cosmiconfig_typescript_loader_1.TypeScriptLoader)(),
    },
});
function resolveConfig() {
    return explorer.search();
}
exports.resolveConfig = resolveConfig;
