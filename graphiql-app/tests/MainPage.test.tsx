import React, {useContext} from 'react';
import {render, screen, act, fireEvent} from '@testing-library/react';
import {NextIntlClientProvider} from 'next-intl';
import AuthProvider, {AUTH_CONTEXT} from "@app/lib/auth/AuthProvider/AuthProvider";
import {loadMessagesFile_en} from "./test_utils";
import {metadata} from "@app/layout";
import {expect} from "vitest";
import Footer from "@app/lib/components/Footer/Footer";
import Header from "@app/lib/components/Header/Header";
import {getUserLocale, setUserLocale} from "@app/lib/locale/locale";
import {
    toBase64_fromString,
    toBase64_fromString_uri,
    fromBase64_toString,
    fromBase64_toString_uri
} from "@app/lib/utils/convert";
import {makeItBeautiful} from "@app/lib/utils/beautifyUtils";
import Main from "@app/lib/components/Main/Main";


describe('MainPage', () => {

    it('main layout', async (props) => {

        const md = metadata;


        // render (
        //     <RootLayout params={{locale: "en"}}>
        //         <br>123</br>
        //     </RootLayout>
        // );

    });

    it('render Main', async (props) => {
        const messages = await loadMessagesFile_en();
        const da = {
           isAuth: true,
           userId: "1@2.ru",
           email: "1@2.ru"
        };

        render(
            <NextIntlClientProvider messages={messages} locale={"en"}>
                <AuthProvider defaultAuth={da}>
                    <Main />
                </AuthProvider>
            </NextIntlClientProvider>
        );

    });



    it('render Footer', async (props) => {
        const messages = await loadMessagesFile_en();

        render(
            <NextIntlClientProvider messages={messages} locale={"en"}>
                <AuthProvider>
                    <Footer  />
                </AuthProvider>
            </NextIntlClientProvider>
        );

        expect(await screen.findAllByText("Author", {exact: false})).not.toHaveLength(0);
    });

    it('render Header', async (props) => {
        const messages = await loadMessagesFile_en();

        render(
            <NextIntlClientProvider messages={messages} locale={"en"}>
                <AuthProvider>
                    <Header  />
                </AuthProvider>
            </NextIntlClientProvider>
        );

        expect(await screen.findAllByRole("button")).not.toHaveLength(0);

        const dropDown = screen.getByTestId("locale-select-test");

        act(() => {
            fireEvent.change(dropDown, {target: {value: "Русский"}});
        });
    });

    it('userLocale testing', async (props) => {
        await getUserLocale();
        await setUserLocale("en");
    });

    it('converters testing', (props) => {
        fromBase64_toString(toBase64_fromString("test"));
        fromBase64_toString_uri(toBase64_fromString_uri("http://localhost:1"));
    });

    it('beautify testing', (props) => {
        makeItBeautiful('{"123": "qwe"}');
    });
});



