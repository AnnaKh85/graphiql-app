"use client";

import TextEditor from "@app/lib/components/TextEditor/TextEditor";
import { useTranslations } from "next-intl";
import { FC, useState, useEffect } from "react";
import { func } from "prop-types";
import { makeItBeautiful } from "@app/lib/utils/beautifyUtils";

type Props = {
  status?: string;
  text?: string;
};

export const Response: FC<Props> = (props) => {
  const t = useTranslations("RESPONSE");

  const [text, setText] = useState<string>(getBeautifulText(props.text));

  useEffect(
    function () {
      setText(getBeautifulText(props.text));
    },
    [props.text],
  );

  function getBeautifulText(s?: string): string {
    return makeItBeautiful(s ?? "");
  }

  return (
    <div className={"container-fluid"}>
      <div className={"row"}>
        <div className={"col-auto"}>
          <label className={"col-form-label"}>{t("status")}:</label>
        </div>
        <div className={"col"}>
          <span className={"pl-2"}>{props.status ?? ""}</span>
        </div>
      </div>
      <div className={"row"}>
        <div className={"col-auto"}>
          <label className={"col-form-label"}>{t("body")}:</label>
        </div>
        <div className={"col"}>
          <TextEditor
            beautifyTrigger={0}
            value={text}
            onChange={() => {}}
            disabled={true}
          />
        </div>
      </div>
    </div>
  );
};
