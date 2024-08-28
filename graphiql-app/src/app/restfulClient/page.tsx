'use client';

import TextEditor from "@app/lib/components/TextEditor/TextEditor";
import Response from "@app/lib/components/Response/Response";
import React, {useState} from "react";
import {func} from "prop-types";
import {RECORD_TYPE, getAppLocalStorage} from "@app/lib/store/LocalStorageStore";


const appLocalStorage = getAppLocalStorage();


export default function RestfulClientPage() {
    const [beautifyCnt, setBeautifyCnt] = useState<number>(0);
    const [headers, setHeaders] = useState<{seq: number, key: string, value: string}[]>([]);
    const [requestType, setRequestType] = useState<string>("POST");
    const [requestUrl, setRequestUrl] = useState<string>("");
    const [requestBody, setRequestBody] = useState<string>("");


    function addHeader() {
        let max = 0;
        headers.forEach(v => max = v.seq > max ? v.seq : max);
        let list = [...headers, {seq: max + 1, key: "", value: ""}]
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


    function collectDataForSave() {
        const res = {
            rt: requestType,
            url: requestUrl,
            body: requestBody
        };

        return res;
    }


    function runQuery() {
        appLocalStorage.addToHistory(RECORD_TYPE.REST, "test", collectDataForSave());
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
                    <td>
                        <button className={"btn btn-sm btn-outline-secondary"} onClick={() => delHeader(h.seq)}><i className="bi bi-cart-x"></i></button>
                    </td>
                    <td>
                        <input type="text" className={"form-control"} value={h.key} onChange={e => setHeaderKey(h.seq, e.target.value)} />
                    </td>
                    <td>
                        <input type="text" className={"form-control"} value={h.value} onChange={e => setHeaderValue(h.seq, e.target.value)} />
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
                                <select className={"form-select"} value={requestType} onChange={e => setRequestType(e.target.value)}>
                                    <option value="POST">POST</option>
                                    <option value="GET">GET</option>
                                </select>
                            </div>
                        </div>
                        <div className={"col-9"}>
                            <div className="mb-1">
                                <label className={"form-label"}>Endpoint URL</label>
                                <input className={"form-control"} type="url" value={requestUrl} onChange={e => setRequestUrl(e.target.value)} />
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
                                    <button className={"btn btn-sm btn-outline-secondary"} onClick={addHeader}>
                                        <i className="bi bi-plus-circle"></i>
                                    </button>
                                </div>
                            </div>

                            <div className={"row"}>
                                <div className={"col"}>
                                    <table className={"table table-bordered"}>
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
                                    <button className={"btn btn-sm btn-outline-secondary"} title="Beautify" onClick={beautyClick}>
                                        <i className="bi bi-flower1"></i>
                                    </button>
                                </div>
                                <div className={"col"}>
                                    <TextEditor beautifyTrigger={beautifyCnt} value={requestBody} onChange={v => setRequestBody(v)} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={"row mt-2"}>
                        <div className={"col-auto"}>
                            <button type="button" className={"btn btn-rss btn-outline-secondary"} onClick={runQuery}>Выполнить</button>
                        </div>
                        <div className={"col-auto"}>
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

