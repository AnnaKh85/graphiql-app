'use client';

import React, {useContext, useState} from "react";
import {AUTH_CONTEXT} from "@app/lib/auth/AuthProvider/AuthProvider";
import {logout} from "@app/lib/auth/firebase";

import {useTranslations} from "next-intl";
import {Link, useRouter, usePathname, redirect} from "@/i18n/routing";
import {useParams} from "next/navigation";


type HeaderProps = {
    locale: string
}



export default function Header({locale}: HeaderProps): React.ReactNode {
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

        // const newPath = pathname.substring(3);

        // @ts-ignore
        router.replace(
            pathname,
            {locale: locale}
        );

        // @ts-ignore
        // router.push(
        //     pathname,
        //     {locale: locale}
        // );

        // router.push(pathname, {locale: locale});
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
                {/*<div className="dropdown me-2" style={{"width": "220px"}}>*/}
                {/*    <a className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">*/}
                {/*        язык*/}
                {/*    </a>*/}
                {/*    <ul className={"dropdown-menu"}>*/}
                {/*        <li>*/}
                {/*            <Link href={"."} locale={"en"} replace={true} className={"dropdown-item"}>*/}
                {/*                English*/}
                {/*            </Link>*/}
                {/*        </li>*/}
                {/*        <li>*/}
                {/*            <Link href={"."} locale={"ru"} replace={true} className={"dropdown-item"}>*/}
                {/*                Русский*/}
                {/*            </Link>*/}
                {/*        </li>*/}
                {/*    </ul>*/}
                {/*</div>*/}

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
                    <Link href={"./signin"}>
                        <button className={"btn btn-outline-secondary btn-rss me-2"} type="button">
                            {t('signinButton')}
                        </button>
                    </Link>
                    <Link href={"./signup"}>
                        <button className={"btn btn-outline-secondary btn-rss me-2"} type="button">
                            {t('signupButton')}
                        </button>
                    </Link>
                    </>
                }
                {
                    authProps.isAuth &&
                    <button className={"btn btn-outline-secondary btn-rss me-2"} type="button" onClick={handleLogout}>
                        Выход
                        &nbsp;
                        <i className="bi bi-door-open"></i>
                    </button>
                }
            </div>
        </div>
    );

}

