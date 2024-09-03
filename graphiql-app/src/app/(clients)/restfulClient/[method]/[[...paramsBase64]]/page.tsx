'use client';

import TextEditor from "@app/lib/components/TextEditor/TextEditor";
import Response from "@app/lib/components/Response/Response";
import React, {useState, useContext} from "react";
import {RECORD_TYPE, getAppLocalStorage} from "@app/lib/store/LocalStorageStore";
import {usePathname, useRouter, useSelectedLayoutSegment, useSearchParams} from "next/navigation";
import {AUTH_CONTEXT} from "@app/lib/auth/AuthProvider/AuthProvider";
import {doRestRequest} from "@app/lib/http/restSender";
import {consoleLog, consoleLogValue, consoleLogValues} from "@app/lib/utils/consoleUtils";
import {HttpHeader} from "@app/lib/types/types";
import {
    toBase64_fromString_new, fromBase64_toString_new
} from "@app/lib/utils/convert";
import {makeItBeautiful} from "@app/lib/utils/beautifyUtils";
import {notEmptyString} from "@app/lib/utils/stringUtils";


const appLocalStorage = getAppLocalStorage();


export default function RestfulClientPage({params}: {params: {method: string, paramsBase64: string[]}}) {
    const router = useRouter();
    const path = usePathname();
    const queryParams = useSearchParams();
    const {authProps} = useContext(AUTH_CONTEXT);


    const [beautifyCnt, setBeautifyCnt] = useState<number>(0);
    const [headers, setHeaders] = useState<HttpHeader[]>([]);
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

                //consoleLogValues("v=" + value + ",k=" + key);
            });
        }

    }, []);


    function buildUrl(method: string, url: string, body: string, hdrs: HttpHeader[]): string {
        const globalPath = path;
        const globalParamsBase64 = params.paramsBase64;

        const pathPart = globalPath.split("/");
        if (globalParamsBase64) {
            pathPart.splice(-globalParamsBase64.length);
        }
        pathPart.splice(-1);

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

    function handleChangeRequestType(newValue: string) {
        setRequestType(newValue);

        router.push(
            buildUrl(newValue, requestUrl, requestBody, headers)
        );
    }

    function handleLeave() {
        router.push(
            buildUrl(requestType, requestUrl, requestBody, headers)
        )
    }


    function collectDataForSave() {
        const res = {
            rt: requestType,
            url: requestUrl,
            body: requestBody
        };

        return res;
    }


    async function runQuery() {
        appLocalStorage.addToHistory(RECORD_TYPE.REST, "test", collectDataForSave());

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

    return <>
        <div className={"card min-vw-90"}>
            <div className={"card-body"}>
                <h6 className={"card-title"}>REST Client</h6>

                <div className={"container-fluid"}>
                    <div className={"row"}>
                        <div className={"col-3"}>
                            <div className="mb-1">
                                <label className={"form-label"}>Method</label>
                                <select className={"form-select"} value={requestType} onChange={e => handleChangeRequestType(e.target.value)}>
                                    <option value="POST">POST</option>
                                    <option value="GET">GET</option>
                                </select>
                            </div>
                        </div>
                        <div className={"col-9"}>
                            <div className="mb-1">
                                <label className={"form-label"}>Endpoint URL</label>
                                <input className={"form-control"} type="url" value={requestUrl} onChange={e => setRequestUrl(e.target.value)} onBlur={handleLeave} />
                            </div>
                        </div>
                    </div>

                    <div className={"row"}>
                        <div className={"col"}>
                            <div className={"row"}>
                                <div className={"col-auto"}>
                                    <label className={"col-form-label"}>Headers:</label>
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
                                            <th style={{"width": "50px"}}>Del</th>
                                            <th>Header Key</th>
                                            <th>Header Value</th>
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
                                    <label className={"col-form-label"}>Body:</label>
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
                            <button type="button" className={"btn btn-rss btn-outline-secondary"} onClick={runQuery}>Выполнить</button>
                        </div>
                        <div className={"col-auto ps-0"}>
                            <button type="button" className={"btn btn-rss btn-outline-secondary"}>Очистить</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>



        <div className={"card min-vw-90 mt-2"}>
            <div className={"card-body"}>
                <h6 className={"card-title"}>Response</h6>
                <Response />
            </div>
        </div>


    </>;
}

