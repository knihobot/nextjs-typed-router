import { ValidationErrorType } from "./types";
export declare class ValidationError extends Error {
    private static messages;
    constructor(type: ValidationErrorType, params: {
        routeName?: string;
        locale?: string;
        pathname?: string;
    });
}
