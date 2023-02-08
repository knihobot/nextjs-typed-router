"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUndefined = void 0;
function removeUndefined(params) {
    const keys = Object.keys(params);
    const extractedParams = params[keys[0]];
    params[keys[0]] = extractedParams.filter((param) => param);
    if (extractedParams) {
        return params;
    }
}
exports.removeUndefined = removeUndefined;
