export type HttpHeader = {
    seq: number,
    key: string,
    value: string
};


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
};

export type HistoryLocalStorageRecord = {
    list: HistorySavedItem[]
}

