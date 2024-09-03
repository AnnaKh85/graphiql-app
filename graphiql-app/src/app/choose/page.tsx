'use client'

import React, {useContext} from "react";
import {AUTH_CONTEXT} from "@app/lib/auth/AuthProvider/AuthProvider";
import {useTranslations} from "next-intl";
import {useRouter} from "next/navigation";
import Link from "next/link";

export default function ChooseClientPage() {
    const router = useRouter();
    const {authProps} = useContext(AUTH_CONTEXT);
    const t = useTranslations("CHOOSE");
    const t2 = useTranslations("HEADER");


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
                        <label className={"form-label position-relative start-50 translate-middle-x"}>{t2("welcome")}, [<span style={{"fontWeight": "bold"}}>{authProps.email}</span>]</label>
                    </div>
                </div>
            </div>

            <div className={"row"}>
                <div className={"col"}>
                    <ul className={"list-group list-group-horizontal"}>
                        <li className={"list-group-item"}>
                            <Link href={"/restfulClient/GET"}>{t("REST_Client")}</Link>
                        </li>
                        <li className={"list-group-item"}>
                            <Link href={"/graphiQlClient"}>{t("GraphiQL_Client")}</Link>
                        </li>
                        <li className={"list-group-item"}>
                            <Link href={"/history"}>{t('History')}</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}