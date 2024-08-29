'use client';

import Link from "next/link";
import {useContext} from "react";
import {AUTH_CONTEXT} from "@app/lib/auth/AuthProvider/AuthProvider";
import {logout} from "@app/lib/auth/firebase";
import {useRouter} from "next/navigation";

export default function Header() {
    const router = useRouter();
    const {authProps, setAuthProps} = useContext(AUTH_CONTEXT);

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
                <select className={"form-select me-2"} defaultValue={"RU"} style={{"width": "220px"}}>
                    <option value={"RU"}>Русский</option>
                    <option value={"EN"}>English</option>
                </select>
                <div className={"badge text-bg-secondary me-2"} style={{"alignContent": "center"}}>
                    {authProps.email}
                </div>
                {
                    !authProps.isAuth &&
                    <>
                    <Link href={"./signin"}>
                        <button className={"btn btn-outline-secondary btn-rss me-2"} type="button">
                            Sign In
                        </button>
                    </Link>
                    <Link href={"./signup"}>
                        <button className={"btn btn-outline-secondary btn-rss me-2"} type="button">
                        Sign Up
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

