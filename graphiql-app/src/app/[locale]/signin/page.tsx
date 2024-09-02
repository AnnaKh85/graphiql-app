'use client';


import {useContext, useState} from "react";
import {AUTH_CONTEXT} from "@app/lib/auth/AuthProvider/AuthProvider";
import {logInWithEmailAndPassword} from "@app/lib/auth/firebase";
import {consoleLogError} from "@app/lib/utils/consoleUtils";
import {useRouter, Link} from "@/i18n/routing";
import {useTranslations, useLocale} from "next-intl";


//Вход
export default function SignIn() {
    const [emailValue, setEmailValue] = useState<string>("");
    const [passValue, setPassValue] = useState<string>("");

    const router = useRouter();
    const locale = useLocale();
    const {authProps, setAuthProps} = useContext(AUTH_CONTEXT);

    const t = useTranslations("SIGNIN");


    function handleOk() {
        logInWithEmailAndPassword(emailValue, passValue).then(function(v) {
            if (v != undefined) {
                setAuthProps({
                    isAuth: true,
                    email: emailValue,
                    userId: emailValue
                });
                // @ts-ignore
                router.push("/choose", {locale: locale});
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
                        <label htmlFor="inputEmail" className={"form-label"}>Email</label>
                        <input type="email" className="form-control" id="inputEmail" placeholder="email" value={emailValue} onChange={e => setEmailValue(e.target.value)} />
                    </div>
                    <div className={"mb-3"}>
                        <label htmlFor="inputPass" className={"form-label"}>Password</label>
                        <input type="password" className="form-control" id="inputPass" placeholder="password" value={passValue} onChange={e => setPassValue(e.target.value)}/>
                    </div>
                </form>
            </div>
            <div className="card-footer d-flex justify-content-center">
                <button type="button" className={"btn btn-secondary btn-rss mb-3 me-1"} onClick={handleOk}>Вход</button>
                <Link href={"./"}>
                    <button className={"btn btn-secondary btn-rss mb-3 me-1"}>Отмена</button>
                </Link>
                <Link href={"./signup"}>
                    <button className={"btn btn-outline-success mb-3"}> --&gt; Регистрация</button>
                </Link>
            </div>
        </div>
    );
}


