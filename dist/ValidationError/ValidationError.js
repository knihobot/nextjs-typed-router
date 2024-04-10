"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
class ValidationError extends Error {
    constructor(type, params) {
        let message;
        if (type === "route-by-pathname-not-found" && params.pathname) {
            // Handle the pathname specific error
            message = ValidationError.messages[type](params.pathname);
        }
        else if (params.routeName) {
            // Handle errors related to routeName, with optional locale
            message = ValidationError.messages[type](params.routeName, params.locale);
        }
        else {
            // Fallback message or throw an error if parameters are not as expected
            message = ValidationError.messages.unknown;
        }
        super(message);
        // Set the prototype explicitly to ensure instanceof checks works correctly for transpiled code
        Object.setPrototypeOf(this, ValidationError.prototype);
        // Maintain a consistent stack trace across different environments
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ValidationError);
        }
        // Set the error name to the class name
        this.name = "ValidationError";
    }
}
exports.ValidationError = ValidationError;
ValidationError.messages = {
    "localized-route-not-found": (routeName, locale) => `No route with provided key ${routeName} exists in routes object${locale ? ` for locale ${locale}` : ""}`,
    "route-key-not-found": (routeName, locale) => `No route with provided key ${routeName}${locale ? ` for locale ${locale}` : ""} exists in routes object`,
    "fallback-required": (routeName) => `Route with key ${routeName} requires a fallback route`,
    "params-required": (routeName, locale) => `Route with key ${routeName}${locale ? ` for locale ${locale}` : ""} requires params`,
    "route-by-pathname-not-found": (pathname) => `No route with pathname ${pathname} exists in routes object`,
    unknown: "An unknown validation error occurred.",
};
