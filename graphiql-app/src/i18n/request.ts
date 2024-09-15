import {getRequestConfig} from "next-intl/server";
import {getUserLocale} from "@app/lib/locale/locale";

export const default_locale = "en";


export default getRequestConfig(async (prop) => {
    const locale = await getUserLocale();

    return {
        locale,
        messages: (await import(`../../messages/${locale}.json`)).default
    }
});

