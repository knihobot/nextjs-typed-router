import { removeUndefined } from "./removeUndefined";
import { test } from "@jest/globals";

test("Remove undefined from params array", () => {
  expect(
    removeUndefined([
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
    ])
  ).toStrictEqual([
    "q",
    encodeURIComponent("Harry Potter"),
    "category",
    "2_7",
    "language",
    "1_2",
  ]);
});
