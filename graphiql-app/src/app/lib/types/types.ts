export type HttpHeader = {
    seq: number,
    key: string,
    value: string
}

export type QueryParam = {
    seq: number,
    key: string,
    value: string
}



export enum HistoryRecordType {
    REST = "REST",
    GRAPHiQL = "GRAPHiQL"
}

export type HistoryPayload = {
    method: string,
    paramsBase64: string[],
    url: string,
    headers: HttpHeader[],
    body: string
}

export type HistorySavedItem = {
    userId: string,
    ts: number, //time for sorting
    type: HistoryRecordType,
    payload: HistoryPayload
}

export type HistoryLocalStorageRecord = {
    list: HistorySavedItem[]
}



export enum HttpMethods {
    POST = "POST",
    GET = "GET",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE",
    HEAD = "HEAD",
    OPTIONS = "OPTIONS"
}

export const HttpMethodsFunc = {
    getAllStr: function(): HttpMethods[] {
        return Object.values(HttpMethods);
    },
    toString: function(v: HttpMethods): string {
        return v;
    }
}
