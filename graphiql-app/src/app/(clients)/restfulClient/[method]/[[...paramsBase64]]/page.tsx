'use client';

import TextEditor from "@app/lib/components/TextEditor/TextEditor";
import Response from "@app/lib/components/Response/Response";
import React, {useState, useContext} from "react";
import {getAppLocalStorage} from "@app/lib/store/LocalStorageStore";
import {usePathname, useRouter, useSelectedLayoutSegment, useSearchParams} from "next/navigation";
import {AUTH_CONTEXT} from "@app/lib/auth/AuthProvider/AuthProvider";
import {doRestRequest} from "@app/lib/http/restSender";
import {consoleLog, consoleLogValue, consoleLogValues} from "@app/lib/utils/consoleUtils";
import {HttpHeader, HistoryRecordType, HistoryPayload, QueryParam} from "@app/lib/types/types";
import {
    toBase64_fromString_new, fromBase64_toString_new
} from "@app/lib/utils/convert";
import {makeItBeautiful} from "@app/lib/utils/beautifyUtils";
import {urlBuildService} from "@app/lib/urlBuildService";
import {useTranslations} from "next-intl";
import {HttpMethodSelector} from "@app/lib/components/HttpMethodSelector/HttpMethodSelector";


const appLocalStorage = getAppLocalStorage();


export default function RestfulClientPage({params}: {params: {method: string, paramsBase64: string[]}}) {
    const router = useRouter();
    const path = usePathname();
    const queryParams = useSearchParams();
    const {authProps} = useContext(AUTH_CONTEXT);
    const t = useTranslations("REST_CLIENT");
    const tResp = useTranslations("RESPONSE");


    const [beautifyCnt, setBeautifyCnt] = useState<number>(0);
    const [headers, setHeaders] = useState<HttpHeader[]>([]);
    const [epQueryParams, setEpQueryParams] = useState<QueryParam[]>([]);
    const [requestType, setRequestType] = useState<string>(params.method);
    const [requestUrl, setRequestUrl] = useState<string>("https://jsonplaceholder.typicode.com/posts/1");
    const [requestBody, setRequestBody] = useState<string>("");


    React.useEffect(function() {
        // if (! authProps.isAuth) {
        //     router.push("./");
        // }



        const globalParamsBase64 = params.paramsBase64;
        const globalSearchParams = queryParams;

        if (globalParamsBase64 && globalParamsBase64.length) {

            for (let i = 0; i < globalParamsBase64.length; i++) {
                if (i === 0) {
                    const url = fromBase64_toString_new(globalParamsBase64[i]);
                    setRequestUrl(url);
                } else
                if (i === 1) {
                    const body = fromBase64_toString_new(globalParamsBase64[i]);
                    setRequestBody(makeItBeautiful(body));
                }
            }
        }

        if (globalSearchParams && globalSearchParams.size > 0) {
            globalSearchParams.forEach(function(v, k) {
                const key = fromBase64_toString_new(k);
                const value = fromBase64_toString_new(v);
                addHeader(key, value);
            });
        }

    }, []);



    function addHeader(key?: string, value?: string) {
        let max = 0;
        headers.forEach(v => max = v.seq > max ? v.seq : max);
        let list = [...headers, {seq: max + 1, key: key || "", value: value || ""}]
        setHeaders(list);
    }

    function delHeader(seq: number) {
        let list = headers.filter(h => h.seq !== seq);
        setHeaders(list);
    }

    function setHeaderKey(seq: number, k: string) {
        let list: typeof headers = [];

        headers.forEach(h => {
            if (seq === h.seq) {
                h.key = k;
            }
            list.push(h);
        });

        setHeaders(list);
    }

    function setHeaderValue(seq: number, v: string) {
        let list: typeof headers = [];

        headers.forEach(h => {
            if (seq === h.seq) {
                h.value = v;
            }
            list.push(h);
        });

        setHeaders(list);
    }

    function addEpQueryParam(key?: string, value?: string) {
        let max = 0;
        epQueryParams.forEach(v => max = v.seq > max ? v.seq : max);
        let list = [...epQueryParams, {seq: max + 1, key: key || "", value: value || ""}]
        setEpQueryParams(list);
    }

    function delEpQueryParam(seq: number) {
        let list = epQueryParams.filter(h => h.seq !== seq);
        setEpQueryParams(list);
    }

    function setEpQueryParamKey(seq: number, k: string) {
        let list: typeof epQueryParams = [];

        epQueryParams.forEach(h => {
            if (seq === h.seq) {
                h.key = k;
            }
            list.push(h);
        });

        setEpQueryParams(list);
    }

    function setEpQueryParamValue(seq: number, v: string) {
        let list: typeof epQueryParams = [];

        epQueryParams.forEach(h => {
            if (seq === h.seq) {
                h.value = v;
            }
            list.push(h);
        });

        setEpQueryParams(list);
    }


    function handleChangeRequestType(newValue: string) {
        setRequestType(newValue);

        router.push(
            urlBuildService.buildUrl_fromClient(path, params.paramsBase64, newValue, requestUrl, requestBody, headers)
        );
    }

    function handleLeave() {
        router.push(
            urlBuildService.buildUrl_fromClient(path, params.paramsBase64, requestType, requestUrl, requestBody, headers)
        )
    }

    function handleQpLeave() {
        // router.push(
        //     urlBuildService.buildUrl_fromClient(path, params.paramsBase64, requestType, requestUrl, requestBody, headers)
        // )
    }


    function collectDataForSave(): HistoryPayload {
        const res: HistoryPayload = {
            method: params.method,
            paramsBase64: params.paramsBase64,
            url: requestUrl,
            headers,
            body: requestBody
        };

        return res;
    }


    async function runQuery() {
        appLocalStorage.addToHistory(collectDataForSave(), HistoryRecordType.REST, authProps.userId ?? "");

        const res = await doRestRequest(requestType, requestUrl, requestBody, "application/json", []);
        consoleLogValue(res);
    }


    function beautyClick() {
        setBeautifyCnt(prevCnt => {
            return prevCnt + 1;
        });
    }

    function renderHeaders(): React.ReactNode {
        return headers.map((h, i) => {
            return (
                <tr key={h.seq + ":" + i}>
                    <td style={{"textAlign": "center", "alignContent": "center"}}>
                        <button className={"btn btn-sm btn-outline-secondary"} onClick={() => delHeader(h.seq)}><i className="bi bi-cart-x"></i></button>
                    </td>
                    <td>
                        <input type="text" className={"form-control"} value={h.key} onChange={e => setHeaderKey(h.seq, e.target.value)} onBlur={handleLeave} />
                    </td>
                    <td>
                        <input type="text" className={"form-control"} value={h.value} onChange={e => setHeaderValue(h.seq, e.target.value)} onBlur={handleLeave} />
                    </td>
                </tr>
            );
        });
    }

    function renderQueryParams(): React.ReactNode {
        return epQueryParams.map((h, i) => {
            return (
                <tr key={h.seq + ":" + i}>
                    <td style={{"textAlign": "center", "alignContent": "center"}}>
                        <button className={"btn btn-sm btn-outline-secondary"} onClick={() => delEpQueryParam(h.seq)}><i className="bi bi-cart-x"></i></button>
                    </td>
                    <td>
                        <input type="text" className={"form-control"} value={h.key} onChange={e => setEpQueryParamKey(h.seq, e.target.value)} onBlur={handleQpLeave} />
                    </td>
                    <td>
                        <input type="text" className={"form-control"} value={h.value} onChange={e => setEpQueryParamValue(h.seq, e.target.value)} onBlur={handleQpLeave} />
                    </td>
                </tr>
            );
        });
    }


    return <>
        <div className={"card min-vw-90"}>
            <div className={"card-body"}>
                <h6 className={"card-title"}>{t("title")}</h6>

                <div className={"container-fluid"}>
                    <div className={"row"}>
                        <div className={"col-3"}>
                            <div className="mb-1">
                                <label className={"form-label"}>{t("method")}</label>
                                <HttpMethodSelector onChange={handleChangeRequestType} defaultValue={requestType} />
                            </div>
                        </div>
                        <div className={"col-9"}>
                            <div className="mb-1">
                                <label className={"form-label"}>{t("ep_url")}</label>
                                <input className={"form-control"} type="url" value={requestUrl} onChange={e => setRequestUrl(e.target.value)} onBlur={handleLeave} />
                            </div>
                        </div>
                    </div>

                    <div className={"row"}>
                        <div className={"col"}>
                            <div className={"row"}>
                                <div className={"col-auto"}>
                                    <label className={"col-form-label"}>{t("headers")}:</label>
                                </div>
                                <div className={"col-auto"}>
                                    <button className={"btn btn-sm btn-outline-secondary"} onClick={(e) => addHeader()}>
                                        <i className="bi bi-plus-circle"></i>
                                    </button>
                                </div>
                            </div>

                            <div className={"row"}>
                                <div className={"col"}>
                                    <table className={"table table-bordered table-rss"}>
                                        <thead>
                                        <tr>
                                            <th style={{"width": "50px"}}>{t("column_headers_del")}</th>
                                            <th>{t("column_headers_key")}</th>
                                            <th>{t("column_headers_value")}</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {renderHeaders()}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={"row"}>
                        <div className={"col"}>
                            <div className={"row"}>
                                <div className={"col-auto"}>
                                    <label className={"col-form-label"}>{t("ep_query_params")}:</label>
                                </div>
                                <div className={"col-auto"}>
                                    <button className={"btn btn-sm btn-outline-secondary"} onClick={(e) => addEpQueryParam()}>
                                        <i className="bi bi-plus-circle"></i>
                                    </button>
                                </div>
                            </div>

                            <div className={"row"}>
                                <div className={"col"}>
                                    <table className={"table table-bordered table-rss"}>
                                        <thead>
                                        <tr>
                                            <th style={{"width": "50px"}}>{t("column_qp_del")}</th>
                                            <th>{t("column_qp_key")}</th>
                                            <th>{t("column_qp_value")}</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {renderQueryParams()}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className={"row"}>
                        <div className={"col"}>
                            <div className={"row"}>
                                <div className={"col-auto"}>
                                    <label className={"col-form-label"}>{t("body")}:</label>
                                    <br/>
                                    <button className={"btn btn-sm btn-outline-secondary"} title="Beautify" onClick={beautyClick} style={{"display":"none"}}>
                                        <i className="bi bi-flower1"></i>
                                    </button>
                                </div>
                                <div className={"col"}>
                                    <TextEditor beautifyTrigger={beautifyCnt} value={requestBody} onChange={v => setRequestBody(v)} onBlur={handleLeave} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={"row mt-2"}>
                        <div className={"col-auto pe-1"}>
                            <button type="button" className={"btn btn-rss btn-outline-secondary"} onClick={runQuery}>{t("btn_execute")}</button>
                        </div>
                        <div className={"col-auto ps-0"}>
                            <button type="button" className={"btn btn-rss btn-outline-secondary"}>{t("btn_clean")}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>



        <div className={"card min-vw-90 mt-2"}>
            <div className={"card-body"}>
                <h6 className={"card-title"}>{tResp("title")}</h6>
                <Response />
            </div>
        </div>


    </>;
}

