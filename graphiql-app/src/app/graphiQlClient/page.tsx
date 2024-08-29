'use client';


import {useRouter} from "next/navigation";
import React, {useContext} from "react";
import {AUTH_CONTEXT} from "@app/lib/auth/AuthProvider/AuthProvider";

export default function GraphiQlClientPage() {
    const router = useRouter();
    const {authProps} = useContext(AUTH_CONTEXT);

    React.useEffect(function() {
        if (! authProps.isAuth) {
            router.push("./");
        }
    }, []);


    return <></>;
}