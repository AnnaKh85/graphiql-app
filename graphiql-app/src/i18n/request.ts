import {notFound} from "next/navigation";
import {getRequestConfig} from "next-intl/server";
import {getUserLocale} from "@app/lib/locale/locale";

export const all_locales = ["en", "ru"];
export const default_locale = "en";


export default getRequestConfig(async (prop) => {
    //if (! all_locales.includes(prop.locale as any)) notFound();

    const locale = await getUserLocale();

    return {
        locale,
        messages: (await import(`../../messages/${locale}.json`)).default
    }
});

