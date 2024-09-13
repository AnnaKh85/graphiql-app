'use server';

import {HttpHeader, QueryParam, HttpMethods} from "@app/lib/types/types";
import {notEmptyString, safeString} from "@app/lib/utils/stringUtils";


export async function doRestRequest(method: string, url: string, body?: string, headers?: HttpHeader[]) {
    const h: {[key: string]: string} = {};
    if (headers && headers.length) {
        headers.forEach(function(v) {
            if (notEmptyString(v.key)) {
                h[safeString(v.key)] = safeString(v.value);
            }
        });
    }


    let res;

    if (HttpMethods.GET === method || HttpMethods.HEAD === method) {

        res = await fetch(
            url,
            {
                method,
                headers: h,
                cache: "no-cache"
            }
        );

    } else {

        res = await fetch(
            url,
            {
                method,
                body,
                headers: h,
                cache: "no-cache"
            }
        );

    }

    const resultFromServer = [];

    if (res.ok) {
        resultFromServer.push("true");
        resultFromServer.push(res.status);
        resultFromServer.push(await res.json());
    } else {
        resultFromServer.push("false");
        resultFromServer.push(res.status);
        resultFromServer.push("");
    }


    return resultFromServer;
}

