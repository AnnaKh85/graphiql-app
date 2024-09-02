'use client';


import {useContext, useState} from "react";
import {AUTH_CONTEXT} from "@app/lib/auth/AuthProvider/AuthProvider";
import {logInWithEmailAndPassword} from "@app/lib/auth/firebase";
import {consoleLogError} from "@app/lib/utils/consoleUtils";
import {useTranslations, useLocale} from "next-intl";
import {useRouter} from "next/navigation";
import Link from "next/link";


//Вход
export default function SignIn() {
    const [emailValue, setEmailValue] = useState<string>("");
    const [passValue, setPassValue] = useState<string>("");

    const router = useRouter();
    const locale = useLocale();
    const {authProps, setAuthProps} = useContext(AUTH_CONTEXT);

    const t = useTranslations("SIGNIN");
    const tBut = useTranslations("BUTTONS");


    function handleOk() {
        logInWithEmailAndPassword(emailValue, passValue).then(function(v) {
            if (v != undefined) {
                setAuthProps({
                    isAuth: true,
                    email: emailValue,
                    userId: emailValue
                });

                router.push("/choose");

                // @ts-ignore
                // router.push("/choose", {locale: locale});
            }
        }, function (e) {
            consoleLogError(e);
        });
    }



    return (
        <div className={"card"} style={{"width": "31rem"}}>
            <div className={"card-body"}>
                <h5 className={"card-title"}>{t("head")}</h5>
                <form>
                    <div className={"mb-3"}>
                        <label htmlFor="inputEmail" className={"form-label"}>{t("email")}</label>
                        <input type="email" className="form-control" id="inputEmail" placeholder={t("email")} value={emailValue} onChange={e => setEmailValue(e.target.value)} />
                    </div>
                    <div className={"mb-3"}>
                        <label htmlFor="inputPass" className={"form-label"}>{t("password")}</label>
                        <input type="password" className="form-control" id="inputPass" placeholder={t("password")} value={passValue} onChange={e => setPassValue(e.target.value)}/>
                    </div>
                </form>
            </div>
            <div className="card-footer d-flex justify-content-center">
                <button type="button" className={"btn btn-secondary btn-rss mb-3 me-1"} onClick={handleOk}>{tBut("enter")}</button>
                <Link href={"./"}>
                    <button className={"btn btn-secondary btn-rss mb-3 me-1"}>{tBut("cancel")}</button>
                </Link>
                <Link href={"./signup"}>
                    <button className={"btn btn-outline-success mb-3"}> --&gt; {tBut("registration")}</button>
                </Link>
            </div>
        </div>
    );
}


