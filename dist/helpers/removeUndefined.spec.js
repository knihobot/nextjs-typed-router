"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const removeUndefined_1 = require("./removeUndefined");
const globals_1 = require("@jest/globals");
(0, globals_1.test)("Remove undefined from params array", () => {
    expect((0, removeUndefined_1.removeUndefined)([
        "q",
        encodeURIComponent("Harry Potter"),
        "category",
        "2_7",
        undefined,
        undefined,
        "language",
        "1_2",
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
    ])).toStrictEqual([
        "q",
        encodeURIComponent("Harry Potter"),
        "category",
        "2_7",
        "language",
        "1_2",
    ]);
});
