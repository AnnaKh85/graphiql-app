'use client';

import TextEditor from "@app/lib/components/TextEditor/TextEditor";
import Response from "@app/lib/components/Response/Response";
import React, {useState, useContext} from "react";
import {getAppLocalStorage} from "@app/lib/store/LocalStorageStore";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {AUTH_CONTEXT} from "@app/lib/auth/AuthProvider/AuthProvider";
import {doRestRequest} from "@app/lib/http/restSender";
import {consoleLogValue} from "@app/lib/utils/consoleUtils";
import {HttpHeader, HistoryRecordType, HistoryPayload, QueryParam} from "@app/lib/types/types";
import {fromBase64_toString_new} from "@app/lib/utils/convert";
import {makeItBeautiful} from "@app/lib/utils/beautifyUtils";
import {urlBuildService} from "@app/lib/urlBuildService";
import {useTranslations} from "next-intl";
import {HttpMethodSelector} from "@app/lib/components/HttpMethodSelector/HttpMethodSelector";
import {EditHeadersModal} from "@app/lib/components/EditHeadersModal/EditHeadersModal";
import {EditEqParamsModal} from "@app/lib/components/EditEqParamsModal/EditEqParamsModal";
import {func} from "prop-types";


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

    const [visibleEditHeadersModal, setVisibleEditHeadersModal] = useState<boolean>(false);
    const [visibleEditEqParamsModal, setVisibleEditEqParamsModal] = useState<boolean>(false);


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
            let hTemp: HttpHeader[] = [];
            globalSearchParams.forEach(function(v, k) {
                const key = fromBase64_toString_new(k);
                const value = fromBase64_toString_new(v);
                hTemp = addHeader(hTemp, key, value);
            });
            setHeaders(hTemp);
        }

    }, []);


    function saveHeaders(headers: HttpHeader[]) {
        setHeaders(headers);
        router.push(
            urlBuildService.buildUrl_fromClient(path, params.paramsBase64, requestType, requestUrl, requestBody, headers)
        )
        closeEditHeadersModal();
    }

    function saveEpQueryParams(epQueryParams: QueryParam[]) {
        setEpQueryParams(epQueryParams);
        router.push(
            urlBuildService.buildUrl_fromClient(path, params.paramsBase64, requestType, requestUrl, requestBody, headers)
        )
        closeEditEpQueryParamsModal();
    }


    function addHeader(arr: HttpHeader[], key?: string, value?: string): HttpHeader[] {
        let max = 0;
        arr.forEach(v => max = v.seq > max ? v.seq : max);
        let list = [...arr, {seq: max + 1, key: key || "", value: value || ""}]
        return list;
    }

    function addEpQueryParam(key?: string, value?: string) {
        let max = 0;
        epQueryParams.forEach(v => max = v.seq > max ? v.seq : max);
        let list = [...epQueryParams, {seq: max + 1, key: key || "", value: value || ""}]
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

    function isBodyDisabled(): boolean {
        return params.method === "GET";
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


    function renderHeadersCount() {
        return (
            <strong><small>{t("headers_of_cnt")}: [{headers.length}]</small></strong>
        );
    }

    function renderEpQueryParamsCount() {
        return (
            <strong><small>{t("ep_query_params_of_cnt")}: [{epQueryParams.length}]</small></strong>
        );
    }


    function openEditHeadersModal() {
        setVisibleEditHeadersModal(curr => true);
    }
    function closeEditHeadersModal() {
        setVisibleEditHeadersModal(curr => false);
    }


    function openEditEpQueryParamsModal() {
        setVisibleEditEqParamsModal(curr => true);
    }
    function closeEditEpQueryParamsModal() {
        setVisibleEditEqParamsModal(curr => false);
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
                        <div className={"col-5"}>
                            <label className={"col-form-label"}>{t("headers")}:</label>
                            <div className={"input-group"}>
                                <span className={"form-control"}>{renderHeadersCount()}</span>
                                <div className={"input-group-text"}>
                                    <button className={"btn btn-sm btn-outline-secondary"} onClick={openEditHeadersModal}>
                                        <i className="bi bi-card-checklist"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={"row"}>
                        <div className={"col-5"}>
                            <label className={"col-form-label"}>{t("ep_query_params")}:</label>
                            <div className={"input-group"}>
                                <span className={"form-control"}>{renderEpQueryParamsCount()}</span>
                                <div className={"input-group-text"}>
                                    <button className={"btn btn-sm btn-outline-secondary"} onClick={openEditEpQueryParamsModal}>
                                        <i className="bi bi-card-checklist"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className={"row mt-2"}>
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
                                    <TextEditor beautifyTrigger={beautifyCnt} value={requestBody} onChange={v => setRequestBody(v)} onBlur={handleLeave} disabled={isBodyDisabled()} />
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


        {visibleEditHeadersModal &&
            <EditHeadersModal
                onOk={saveHeaders}
                onCancel={closeEditHeadersModal}
                headers={headers}
            />
        }
        {visibleEditEqParamsModal &&
            <EditEqParamsModal
                onOk={saveEpQueryParams}
                onCancel={closeEditEpQueryParamsModal}
                epQueryParams={epQueryParams}
            />
        }

    </>;
}

