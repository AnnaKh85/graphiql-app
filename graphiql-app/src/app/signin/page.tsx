"use client";

import { useContext, useState } from "react";
import { AUTH_CONTEXT } from "@app/lib/auth/AuthProvider/AuthProvider";
import { logInWithEmailAndPassword } from "@app/lib/auth/firebase";
import {
  consoleLogError,
  consoleLogValuesError,
} from "@app/lib/utils/consoleUtils";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ErrorMessage } from "@app/lib/components/ErrorMessage/ErrorMessage";
import { FirebaseError } from "firebase/app";

//Вход
export default function SignIn() {
  const [emailValue, setEmailValue] = useState<string>("");
  const [passValue, setPassValue] = useState<string>("");
  const [errMessage, setErrMessage] = useState<string | undefined>(undefined);

  const router = useRouter();
  const { authProps, setAuthProps } = useContext(AUTH_CONTEXT);

  const t = useTranslations("SIGNIN");
  const tBut = useTranslations("BUTTONS");

  function showSigninError(reason: FirebaseError) {
    consoleLogValuesError(reason);

    if (reason.code === "auth/invalid-credential") {
      setErrMessage(t("error_login_pass"));
    } else {
      consoleLogValuesError(reason);
      if (reason) {
        setErrMessage((reason as Error).message);
      }
    }
  }

  function handleOk() {
    logInWithEmailAndPassword(emailValue, passValue)
      .then(
        function (v) {
          if (v != undefined) {
            setAuthProps({
              isAuth: true,
              email: emailValue,
              userId: emailValue,
            });

            router.push("/choose");
          }
        },
        function (e) {
          showSigninError(e);
        },
      )
      .catch(function (reason) {
        showSigninError(reason);
      });
  }

  return (
    <div className={"card"} style={{ width: "41rem" }}>
      <div className={"card-body"}>
        <h5 className={"card-title"}>{t("head")} 1@2.ru / 123123</h5>
        <form>
          {errMessage && (
            <ErrorMessage
              message={errMessage}
              closed={() => setErrMessage(undefined)}
            />
          )}
          <div className={"mb-3"}>
            <label htmlFor="inputEmail" className={"form-label"}>
              {t("email")}
            </label>
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              placeholder={t("email")}
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              data-testid="inputEmail-test"
            />
          </div>
          <div className={"mb-3"}>
            <label htmlFor="inputPass" className={"form-label"}>
              {t("password")}
            </label>
            <input
              type="password"
              className="form-control"
              id="inputPass"
              placeholder={t("password")}
              value={passValue}
              onChange={(e) => setPassValue(e.target.value)}
              data-testid="inputPass-test"
            />
          </div>
        </form>
      </div>
      <div className="card-footer d-flex justify-content-center">
        <button
          type="button"
          className={"btn btn-secondary btn-rss mb-3 me-1"}
          onClick={handleOk}
        >
          {tBut("enter")}
        </button>
        <Link href={"./"}>
          <button className={"btn btn-secondary btn-rss mb-3 me-1"}>
            {tBut("cancel")}
          </button>
        </Link>
        <Link href={"./signup"}>
          <button className={"btn btn-outline-success mb-3"}>
            {" "}
            --&gt; {tBut("return_to_registration")}
          </button>
        </Link>
      </div>
    </div>
  );
}
