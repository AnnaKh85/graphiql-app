export function safeString(value: string): string {
    if (!value) return "";
    if (value.trim().length === 0) return "";
    return value.trim();
}

export function isEmptyString(value: string): boolean {
    return safeString(value).length === 0;
}

export function notEmptyString(value: string): boolean {
    return ! isEmptyString(value);
}


