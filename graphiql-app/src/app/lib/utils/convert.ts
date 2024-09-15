import base64url from "base64url";

// @deprecated
export function toBase64_fromString(value: string): string {
  return Buffer.from(encodeURIComponent(value)).toString("base64");
  //return Buffer.from(value).toString("base64");
  //return btoa(value);
}

// @deprecated
export function toBase64_fromString_uri(value: string): string {
  return Buffer.from(encodeURI(value)).toString("base64");
  //return Buffer.from(value).toString("base64");
  //return btoa(value);
}

// @deprecated
export function fromBase64_toString(valueBase64: string): string {
  return decodeURIComponent(Buffer.from(valueBase64, "base64").toString());
  //return Buffer.from(valueBase64, "base64").toString();
  //return btoa(value);
}

// @deprecated
export function fromBase64_toString_uri(valueBase64: string): string {
  return decodeURI(Buffer.from(valueBase64, "base64").toString("ascii"));
  //return Buffer.from(valueBase64, "base64").toString();
  //return btoa(value);
}

export function toBase64_fromString_new(value: string): string {
  return base64url.encode(value);
}

export function fromBase64_toString_new(valueBase64: string): string {
  return base64url.decode(valueBase64);
}
