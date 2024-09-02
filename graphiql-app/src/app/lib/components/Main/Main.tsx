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

    React.useEffect(function() {
        if (authProps.isAuth) {
            router.push(`/${locale}/choose`);
        }
    }, []);



    return <div className={"row"}>
        <div className={"col"}>
            <form>
                <div className={"mb-3"}>
                    <label className={"form-label pt-3"} style={{"display": "block", "textAlign": "center"}}>
                        {t('welcome')}!
                    </label>
                </div>
                <div className={"mb-3"}>
                    <div className="form-text">
                        <Link href={`/${locale}/signin`}>
                            <button className={"btn btn-primary btn-rss me-2"}>{t("signinButton")}</button>
                        </Link>
                        <Link href={"./signup"}>
                            <button className={"btn btn-primary btn-rss me-2"}>{t("signupButton")}</button>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    </div>
}

