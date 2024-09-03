'use server';

import {HttpHeader} from "@app/lib/types/types";

export async function doRestRequest(method: string, url: string, body: string, contentType: string, headers: HttpHeader[]) {
    // const urlBase64 = toBase64(url);
    // const bodyBase64 = toBase64(body);
    // const headersBase64 = "";// toBase64(body);
    // const contentTypeBase64 = toBase64(contentType);
    //
    // if ("GET" === method) {
    //     let data = await fetch(`/GET/${urlBase64}`);
    // } else if ("POST" === method) {
    //     let data = await fetch(`/POST/${urlBase64}?body=${bodyBase64}&content-type=${contentTypeBase64}`);
    // }


}