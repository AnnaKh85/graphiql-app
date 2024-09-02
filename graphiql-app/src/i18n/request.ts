import {notFound} from "next/navigation";
import {getRequestConfig} from "next-intl/server";
import {routing} from "@/i18n/routing";



export default getRequestConfig(async (prop) => {
    if (! routing.locales.includes(prop.locale as any)) notFound();

    return {
        messages: (await import(`../../messages/${prop.locale}.json`)).default
    }
});

