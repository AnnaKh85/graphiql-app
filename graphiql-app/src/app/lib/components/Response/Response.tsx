'use client';


import TextEditor from "@app/lib/components/TextEditor/TextEditor";
import {useTranslations} from "next-intl";

export default function Response() {
    const t = useTranslations("RESPONSE");


    return <div className={"container-fluid"}>
        <div className={"row"}>

            <div className={"col-auto"}>
                <label className={"col-form-label"}>{t("status")}:</label>
            </div>
            <div className={"col"}>
                <span className={"pl-2"}>Текст</span>
            </div>

        </div>
        <div className={"row"}>

            <div className={"col-auto"}>
                <label className={"col-form-label"}>{t("body")}:</label>
            </div>
            <div className={"col"}>
                <TextEditor beautifyTrigger={0} value={""} onChange={()=>{}} />
            </div>

        </div>
    </div>;
}
