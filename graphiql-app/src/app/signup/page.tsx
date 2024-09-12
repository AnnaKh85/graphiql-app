'use client';


import Link from "next/link";
import {useRouter} from "next/navigation";
import {useContext, useState} from "react";
import {AUTH_CONTEXT} from "@app/lib/auth/AuthProvider/AuthProvider";
import {logInWithEmailAndPassword, registerWithEmailAndPassword} from "@app/lib/auth/firebase";
import {consoleLogError} from "@app/lib/utils/consoleUtils";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import signupSchema from "@app/lib/validator/validator.signup.yup";
import {useTranslations} from "next-intl";


export type SignupProps = {
    email: string,
    pass: string,
    passRepeat: string
};



//Регистрация
export default function SignUp() {
    const router = useRouter();
    const {authProps, setAuthProps} = useContext(AUTH_CONTEXT);

    const t = useTranslations("SIGNUP");
    const tBut = useTranslations("BUTTONS");

    const {register, trigger, formState: {errors, isValid}, getValues, setValue, control} = useForm({
        resolver: yupResolver(signupSchema),
        defaultValues: {
            email: "",
            password: "123!@#",
            passwordRepeat: "123!@#"
        },
        mode: "onChange"
    });


    function handleOk() {
        trigger().then(function() {
            if (isValid) {
                const values = getValues();
                const email = values.email;
                const pass = values.password;

                registerWithEmailAndPassword(email, pass).then(function(v) {
                    if (v != undefined) {
                        setAuthProps({
                            isAuth: true,
                            email: email,
                            userId: email
                        });
                        router.push("/choose")
                    }
                }, function (e) {
                    consoleLogError(e);
                });
            }
        }, function(err) {
            consoleLogError(err);
        });
    }



    return (
        <div className={"card"} style={{"width": "41rem"}}>
            <div className={"card-body"}>
                <h5 className={"card-title"}>{t("head")}</h5>
                <form>
                    <div className={"mb-3"}>
                        <label htmlFor="inputEmail" className={"form-label"}>{t("email")}</label>
                        <input type="email"
                               className="form-control"
                               id="inputEmail"
                               placeholder={t("email")}
                               {...register("email")}
                        />
                        <p className={"validation-block-rss"}>{errors.email?.message}</p>
                    </div>

                    <div className={"mb-3"}>
                        <label htmlFor="inputPass" className={"form-label"}>{t("password")}</label>
                        <input type="password"
                               className="form-control"
                               id="inputPass"
                               placeholder={t("password")}
                               {...register("password")}
                        />
                        <p className={"validation-block-rss"}>{errors.password?.message}</p>
                    </div>

                    <div className={"mb-3"}>
                        <label htmlFor="inputPass" className={"form-label"}>{t("password_repeat")}</label>
                        <input type="password"
                               className="form-control"
                               id="inputPass"
                               placeholder={t("password_repeat")}
                               {...register("passwordRepeat")}
                        />
                    </div>
                </form>
            </div>

            <div className="card-footer d-flex justify-content-center">
                <button type="button" className={"btn btn-secondary btn-rss mb-3 me-1"} onClick={handleOk}>{tBut("registration")}</button>
                <Link href={"./"}>
                    <button className={"btn btn-secondary btn-rss mb-3 me-1"}>{tBut("cancel")}</button>
                </Link>
                <Link href={"./signin"}>
                    <button className={"btn btn-outline-success btn-rss mb-3"}> --&gt; {tBut("return_to_enter")}</button>
                </Link>
            </div>
        </div>
    );
}


