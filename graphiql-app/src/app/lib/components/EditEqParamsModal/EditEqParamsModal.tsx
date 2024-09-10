import React, {FC, useState} from "react";
import {QueryParam} from "@app/lib/types/types";
import {useTranslations} from "next-intl";

type Props = {
    onCancel: () => void,
    onOk: (eqParams: QueryParam[]) => void,
    epQueryParams: QueryParam[]
}


export const EditEqParamsModal: FC<Props> = (props) => {
    const t = useTranslations("REST_CLIENT");
    const tBtn = useTranslations("BUTTONS");


    const [epQueryParams, setEpQueryParams] = useState<QueryParam[]>(props.epQueryParams);


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


    function renderQueryParams(): React.ReactNode {
        return epQueryParams.map((h, i) => {
            return (
                <tr key={h.seq + ":" + i}>
                    <td style={{"textAlign": "center", "alignContent": "center"}}>
                        <button className={"btn btn-sm btn-outline-secondary"} onClick={() => delEpQueryParam(h.seq)}><i className="bi bi-cart-x"></i></button>
                    </td>
                    <td>
                        <input type="text" className={"form-control"} value={h.key} onChange={e => setEpQueryParamKey(h.seq, e.target.value)} />
                    </td>
                    <td>
                        <input type="text" className={"form-control"} value={h.value} onChange={e => setEpQueryParamValue(h.seq, e.target.value)} />
                    </td>
                </tr>
            );
        });
    }


    return (
        <div className={"modal show"} tabIndex={-1} data-bs-backdrop="static" data-bs-keyboard="false" style={{"display": "block"}}>
            <div className={"modal-dialog modal-lg"} style={{"top": "10vh"}}>
                <div className={"modal-content"}>
                    <div className={"modal-header pt-1 pb-1"}>
                        <h4>{t("ep_query_params_editor_title")}</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={props.onCancel}></button>
                    </div>

                    <div className={"modal-body"} style={{"height": "400px", "maxHeight": "400px", "overflowY": "auto"}}>
                        <div className={"container-fluid"}>
                            <div className={"row"}>
                                <div className={"col-12"}>

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

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer pt-1 pb-1">
                        <button type="button" className="btn btn-outline-secondary btn-rss" onClick={() => props.onOk(epQueryParams)}>{tBtn("save")}</button>
                        <button type="button" className="btn btn-outline-secondary btn-rss" data-bs-dismiss="modal" onClick={props.onCancel}>{tBtn("cancel")}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
