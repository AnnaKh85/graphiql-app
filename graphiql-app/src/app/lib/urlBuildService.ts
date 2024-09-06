import {HttpHeader, HistoryRecordType} from "@app/lib/types/types";
import {toBase64_fromString_new} from "@app/lib/utils/convert";
import {notEmptyString} from "@app/lib/utils/stringUtils";



function buildUrl_fromClient(path: string, paramsBase64: string[], method: string, url: string, body: string, hdrs: HttpHeader[]): string {
    const globalPath = path;
    const globalParamsBase64 = paramsBase64;

    const pathPart = globalPath.split("/");
    if (globalParamsBase64) {
        pathPart.splice(-globalParamsBase64.length);
    }
    pathPart.splice(-1);

    return build(pathPart, method, url, body, hdrs);
}


function buildUrl_fromHistory(type: HistoryRecordType, paramsBase64: string[], method: string, url: string, body: string, hdrs: HttpHeader[]): string {
    const globalParamsBase64 = paramsBase64;

    const pathPart = [];

    if (HistoryRecordType.REST === type) {
        pathPart.push("restfulClient");
    } else if (HistoryRecordType.GRAPHiQL === type) {
        pathPart.push("graphiQlClient");
    } else {
        return "";
    }

    return build(pathPart, method, url, body, hdrs);
}


function build(pathPart: string[], method: string, url: string, body: string, hdrs: HttpHeader[]): string {
    pathPart.push(method);

    if (!url) {
        pathPart.push(toBase64_fromString_new(" "));
    } else {
        pathPart.push(toBase64_fromString_new(url));
    }
    if (!body) {
        pathPart.push(toBase64_fromString_new(" "));
    } else {
        pathPart.push(toBase64_fromString_new(body));
    }

    const hObj: string[] = [];
    for (let j = 0; j < hdrs.length; j++) {
        const key = hdrs[j].key;
        const value =  hdrs[j].value || " ";

        if (notEmptyString(key)) {
            hObj.push(`${toBase64_fromString_new(key)}=${toBase64_fromString_new(value)}`)
        }
    }


    let MAIN_URL_PART: string;

    if (hObj.length > 0) {
        MAIN_URL_PART = `${pathPart.join("/")}?${hObj.join("&")}`;
    } else {
        MAIN_URL_PART = pathPart.join("/");
    }

    return MAIN_URL_PART;

}


export const urlBuildService = {
    buildUrl_fromClient,
    buildUrl_fromHistory
}

