import {useTranslations} from "next-intl";

export default function NotFoundPage() {
    const t = useTranslations("NOT_FOUND");

    return <h3>
        {t("text")}
    </h3>;
}

