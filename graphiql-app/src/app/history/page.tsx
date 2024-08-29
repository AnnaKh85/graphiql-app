'use client';


import {useRouter} from "next/navigation";
import React, {useContext} from "react";
import {AUTH_CONTEXT} from "@app/lib/auth/AuthProvider/AuthProvider";

export default function HistoryPage() {
    const router = useRouter();
    const {authProps} = useContext(AUTH_CONTEXT);

    React.useEffect(function() {
        if (! authProps.isAuth) {
            router.push("./");
        }
    }, []);


    return <>
        <div className={"card min-vw-90"}>
            <div className={"card-body"}>
                <h6 className={"card-title"}>History Requests</h6>

                <div className={"container-fluid"}>
                    <div className={"row"}>
                        <div className={"col"}>

                            <table className={"table table-bordered"}>
                                <thead>
                                <tr>
                                    <th>Method</th>
                                    <th>URL</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>GET</td>
                                    <td>https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/final.md</td>
                                    <td><button className={"btn btn-link btn-sm"}>.....</button></td>
                                </tr>
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>;

}