'use client';

import React, {useContext, useState, startTransition} from "react";
import {AUTH_CONTEXT} from "@app/lib/auth/AuthProvider/AuthProvider";
import {logout} from "@app/lib/auth/firebase";

import {useTranslations, useLocale} from "next-intl";
// import {Link, useRouter, usePathname, redirect} from "@/i18n/routing";
import {useParams, usePathname, useRouter} from "next/navigation";
import Link from "next/link";
import {setUserLocale} from "@app/lib/locale/locale";


export default function Header(): React.ReactNode {
    const locale = useLocale();
    const [lang, setLang] = useState<string>(locale || "en");

    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();
    const {authProps, setAuthProps} = useContext(AUTH_CONTEXT);
    const t = useTranslations("HEADER");

    function handleLogout() {
        logout().then(function(v) {
            setAuthProps({
                isAuth: false,
                userId: null,
                email: null
            })

            router.push("/");
        });
    }

    function handleLocaleChange(e: {target: {value: string}}) {
        const locale = e.target.value;
        setLang(locale);

        startTransition(() => {
            setUserLocale(locale);
        });
    }


    return (
        <div className={"container-fluid"}>
            <Link className={"navbar-brand"} href={"/"}>
                <img src="/logo-1.png"
                     className={"img-fluid"}
                     alt="Логотип" width="60" height="60"
                     style={{"aspectRatio": "auto", "border": "1px", "borderStyle": "solid", "borderRadius": "6px"}}
                />
            </Link>

            <div className={"d-flex"}>
                <select className={"form-select me-2"} value={lang} style={{"width": "220px"}} onChange={handleLocaleChange} >
                    <option value={"en"}>English</option>
                    <option value={"ru"}>Русский</option>
                </select>

                <div className={"badge text-bg-secondary me-2"} style={{"alignContent": "center"}}>
                    {authProps.email}
                </div>
                {
                    !authProps.isAuth &&
                    <>
                    <Link href={"/signin"}>
                        <button className={"btn btn-outline-secondary btn-rss me-2"} type="button">
                            {t('btn_signin')}
                        </button>
                    </Link>
                    <Link href={"/signup"}>
                        <button className={"btn btn-outline-secondary btn-rss me-2"} type="button">
                            {t('btn_signup')}
                        </button>
                    </Link>
                    </>
                }
                {
                    authProps.isAuth &&
                    <button className={"btn btn-outline-secondary btn-rss me-2"} type="button" onClick={handleLogout}>
                        {t("btn_logout")}
                        &nbsp;
                        <i className="bi bi-door-open"></i>
                    </button>
                }
            </div>
        </div>
    );

}

