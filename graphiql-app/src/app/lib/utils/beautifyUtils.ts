export function makeItBeautiful(text: string): string {
  try {
    let jsonTmp = JSON.parse(text);
    let v2 = JSON.stringify(jsonTmp, null, 4);
    return v2;
  } catch (e) {}

  return text;
}
