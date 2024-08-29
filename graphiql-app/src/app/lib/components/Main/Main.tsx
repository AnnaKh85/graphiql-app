'use client';


import Link from "next/link";
import {useRouter} from "next/navigation";
import React, {useContext} from "react";
import {AUTH_CONTEXT} from "@app/lib/auth/AuthProvider/AuthProvider";

export default function Main() {
    const router = useRouter();
    const {authProps} = useContext(AUTH_CONTEXT);

    React.useEffect(function() {
        if (authProps.isAuth) {
            router.push("/choose");
        }
    }, []);



    return <div className={"row"}>
        <div className={"col"}>
            <form>
                <div className={"mb-3"}>
                    <label className={"form-label pt-3"} style={{"display": "block", "textAlign": "center"}}>
                        Welcome!
                    </label>
                </div>
                <div className={"mb-3"}>
                    <div className="form-text">
                        <Link href={"./signin"}>
                            <button className={"btn btn-primary btn-rss me-2"}>Sign In</button>
                        </Link>
                        <Link href={"./signup"}>
                            <button className={"btn btn-primary btn-rss me-2"}>Sign Up</button>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    </div>
}

