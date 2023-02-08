export function removeUndefined(
  params: Record<string, (unknown | undefined)[]>
) {
  const keys = Object.keys(params);

  const extractedParams = params[keys[0]];

  params[keys[0]] = extractedParams.filter((param) => param);

  if (extractedParams) {
    return params;
  }
}
