'use client';


import {useRouter, usePathname} from "next/navigation";
import React, {useContext, useState, ReactNode} from "react";
import {AUTH_CONTEXT} from "@app/lib/auth/AuthProvider/AuthProvider";
import {HistoryLocalStorageRecord, HistorySavedItem} from "@app/lib/types/types";
import {getAppLocalStorage} from "@app/lib/store/LocalStorageStore";
import Link from "next/link";
import {urlBuildService} from "@app/lib/urlBuildService";
import {useTranslations} from "next-intl";

export default function HistoryPage() {
    const router = useRouter();
    const path = usePathname();
    const {authProps} = useContext(AUTH_CONTEXT);
    const t = useTranslations("HISTORY");

    const [histItems, setHistItems] = useState<HistorySavedItem[]>([]);

    React.useEffect(function() {
        if (! authProps.isAuth) {
            router.push("./");
        }

        loadData();
    }, []);


    function loadData() {
        const list: HistorySavedItem[] = getAppLocalStorage().getHistory(authProps.userId ?? "");
        list.sort(function(a, b) {
            if (a.ts > b.ts) return -1;
            if (a.ts === b.ts) return 0;
            return 1;
        });
        setHistItems(list);
    }

    function checkHistory(): boolean {
        const list: HistorySavedItem[] = getAppLocalStorage().getHistory(authProps.userId ?? "");
        return list && list.length > 0;
    }

    function renderHistory(): ReactNode {
        return histItems.map(function(item) {
            if (! item.payload) return <></>;

            const dt = new Date(item.ts);

            const url = urlBuildService.buildUrl_fromHistory(item.type, item.payload.paramsBase64, item.payload.method, item.payload.url, item.payload.body, item.payload.headers);

            return <tr key={item.ts}>
                <td>{dt.toLocaleString()}</td>
                <td>{item.type}</td>
                <td>{item.payload.method}</td>
                <td>{item.payload.url}</td>
                <td><Link href={url}>.....</Link></td>
            </tr>
        });
    }

    function renderBody(): ReactNode {
        if (checkHistory()) {
            return <>
                <table className={"table table-bordered"}>
                    <thead>
                    <tr>
                        <th>{t("column_time")}<i className="bi bi-arrow-down ms-1"></i></th>
                        <th>{t("column_client")}</th>
                        <th>{t("column_method")}</th>
                        <th>{t("column_url")}</th>
                        <th>{t("column_goto")}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {renderHistory()}
                    </tbody>
                </table>
            </>;
        } else {
            return <h4>{t("no_history")}</h4>
        }
    }


    return <>
        <div className={"card min-vw-90"}>
            <div className={"card-body"}>
                <h6 className={"card-title"}>
                    {t("title")}
                    <button className={"btn btn-sm btn-outline-secondary ms-1"} onClick={loadData}><i className="bi bi-repeat"></i></button>
                </h6>

                <div className={"container-fluid"}>
                    <div className={"row"}>
                        <div className={"col"}>
                            {renderBody()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>;

}