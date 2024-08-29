'use client'

import Link from "next/link";
import React, {useContext} from "react";
import {useRouter} from "next/navigation";
import {AUTH_CONTEXT} from "@app/lib/auth/AuthProvider/AuthProvider";

export default function ChooseClientPage() {
    const router = useRouter();
    const {authProps} = useContext(AUTH_CONTEXT);

    React.useEffect(function() {
        if (! authProps.isAuth) {
            router.push("./");
        }
    }, []);


    return (
        <div className={"container-fluid"}>
            <div className={"row"}>
                <div className={"col"}>
                    <div className={"position-relative m-2"}>
                        <label className={"form-label position-relative start-50 translate-middle-x"}>Welcome, [<span style={{"fontWeight": "bold"}}>{authProps.email}</span>]</label>
                    </div>
                </div>
            </div>

            <div className={"row"}>
                <div className={"col"}>
                    <ul className={"list-group list-group-horizontal"}>
                        <li className={"list-group-item"}>
                            <Link href={"/restfulClient"}>REST Client</Link>
                        </li>
                        <li className={"list-group-item"}>
                            <Link href={"/graphiQlClient"}>GraphiQL Client</Link>
                        </li>
                        <li className={"list-group-item"}>
                            <Link href={"/history"}>History</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}