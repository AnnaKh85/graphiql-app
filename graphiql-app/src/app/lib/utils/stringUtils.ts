export function safeString(value: string | null | undefined): string {
  if (!value) return "";
  if (value.trim().length === 0) return "";
  return value.trim();
}

export function isEmptyString(value: string | null | undefined): boolean {
  return safeString(value).length === 0;
}

export function notEmptyString(value: string | null | undefined): boolean {
  return !isEmptyString(value);
}
