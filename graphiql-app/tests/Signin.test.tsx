import React from 'react';
import {expect} from "vitest";
import {logInWithEmailAndPassword, registerWithEmailAndPassword, logout} from "@app/lib/auth/firebase";
import {loadMessagesFile_en} from "./test_utils";
import {render, screen, fireEvent, act} from "@testing-library/react";
import {NextIntlClientProvider} from "next-intl";
import AuthProvider from "@app/lib/auth/AuthProvider/AuthProvider";
import SignIn from "@app/signin/page";
import SignUp from "@app/signup/page";


describe('Signin+SignUp', () => {

    it('SignIn firebase', async (props) => {
        expect(await registerWithEmailAndPassword("1@2","Qwerty123456!")).all;
        expect(await logInWithEmailAndPassword("1","Qwerty123456")).all;

        expect(await registerWithEmailAndPassword("1@2","")).all;
        expect(await logInWithEmailAndPassword("2@2.ru","")).all;
        expect(await logInWithEmailAndPassword("3@3.ru","")).all;

        await logout();
    });



    it('test-signin-page', async (props) => {
        const messages = await loadMessagesFile_en();
        // const messages = await loadMessagesFile_ru();

        render(
            <NextIntlClientProvider messages={messages} locale={"en"}>
                <AuthProvider>
                    <SignIn/>
                </AuthProvider>
            </NextIntlClientProvider>
        );

        expect(await screen.findAllByText("Enter to program", {exact: false})).not.toHaveLength(0);
    });

    it('test-signup-page', async (props) => {
        const messages = await loadMessagesFile_en();
        // const messages = await loadMessagesFile_ru();

        render(
            <NextIntlClientProvider messages={messages} locale={"en"}>
                <AuthProvider>
                    <SignUp/>
                </AuthProvider>
            </NextIntlClientProvider>
        );

        expect(await screen.findAllByText("Registration in program", {exact: false})).not.toHaveLength(0);

        const inpEmail = screen.getByTestId("inputEmail-test");
        const inpPass = screen.getByTestId("inputPass-test");
        const inpPass2 = screen.getByTestId("inputPass2-test");
        const button = screen.getByText("Ok");


        act(() => {
            fireEvent.change(inpEmail, {target: {value: "1@2.ru"}});
            fireEvent.change(inpPass, {target: {value: "Qwerty123!"}});
            fireEvent.change(inpPass2, {target: {value: "Qwerty123!"}});
        });

        expect(await screen.getByTestId("inputPass2-test")).toHaveValue("Qwerty123!");

        act(() => {
            fireEvent.click(button);
        });
    });


});



