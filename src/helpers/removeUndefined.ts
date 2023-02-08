export function removeUndefined(params: (string | undefined)[]) {
  return params.filter((param) => param);
}
