'use server';

import {cookies} from 'next/headers';
import {default_locale} from "@/i18n/request";

// In this example the locale is read from a cookie. You could alternatively
// also read it from a database, backend service, or any other source.
const COOKIE_NAME = 'RSS_ANN_LOCALE';

export async function getUserLocale() {
    return cookies().get(COOKIE_NAME)?.value || default_locale;
}

export async function setUserLocale(locale: string) {
    cookies().set(COOKIE_NAME, locale);
}

