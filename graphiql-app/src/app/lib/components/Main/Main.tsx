'use client';


import Link from "next/link";
import {useRouter} from "next/navigation";
import React, {useContext} from "react";
import {AUTH_CONTEXT} from "@app/lib/auth/AuthProvider/AuthProvider";
import {useTranslations, useLocale} from "next-intl";

export default function Main() {
    const router = useRouter();
    const {authProps} = useContext(AUTH_CONTEXT);
    const locale = useLocale();
    const t = useTranslations("HEADER");
    const tCh = useTranslations("CHOOSE");


    React.useEffect(function() {
        if (authProps.isAuth) {
            router.push(`/choose`);
        }
    }, []);



    return <div className={"row"}>
        <div className={"col"}>
            <form>
                <div className={"mb-3"}>
                    <label className={"form-label pt-3"} style={{"display": "block", "textAlign": "center"}}>
                        {tCh('welcome')}!
                    </label>
                </div>
                <div className={"mb-3"}>
                    <div className="form-text">
                        <Link href={`/signin`}>
                            <button className={"btn btn-primary btn-rss me-2"}>{t("btn_signin")}</button>
                        </Link>
                        <Link href={"./signup"}>
                            <button className={"btn btn-primary btn-rss me-2"}>{t("btn_signup")}</button>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    </div>
}

