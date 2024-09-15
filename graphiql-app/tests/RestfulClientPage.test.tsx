import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {NextIntlClientProvider} from 'next-intl';
import AuthProvider from "@app/lib/auth/AuthProvider/AuthProvider";
import {loadMessagesFile_en} from "./test_utils";
import RestfulClientPage from "@app/(clients)/restfulClient/[method]/[[...paramsBase64]]/page";
import {expect} from "vitest";
import {EditHeadersModal} from "@app/lib/components/EditHeadersModal/EditHeadersModal";
import {HttpHeader} from "@app/lib/types/types";


describe('RestfulClientPage', () => {

    it('render Rest client', async (props) => {
        const messages = await loadMessagesFile_en();

        render(
            <NextIntlClientProvider messages={messages} locale={"en"}>
                <AuthProvider>
                    <RestfulClientPage params={{method: "GET", paramsBase64: ["aHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tL3Bvc3RzLzE", "IA"]}} />
                </AuthProvider>
            </NextIntlClientProvider>
        );

        expect(await screen.findAllByText("Headers count", {exact: false})).not.toHaveLength(0);


        const input = screen.getByDisplayValue("https://jsonplaceholder.typicode.com", {exact: false});
        fireEvent.blur(input);
    });


    it('Rest client -> Run GET', async (props) => {
        const messages = await loadMessagesFile_en();

        render(
            <NextIntlClientProvider messages={messages} locale={"en"}>
                <AuthProvider>
                    <RestfulClientPage params={{method: "GET", paramsBase64: ["aHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tL3Bvc3RzLzE", "IA"]}} />
                </AuthProvider>
            </NextIntlClientProvider>
        );


        const button = screen.getByText("Run");

        await waitFor(() => {
            fireEvent.click(button);
        })


    });


    it('Rest client -> Run POST', async (props) => {
        const messages = await loadMessagesFile_en();

        render(
            <NextIntlClientProvider messages={messages} locale={"en"}>
                <AuthProvider>
                    <RestfulClientPage params={{method: "POST", paramsBase64: ["aHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tL3Bvc3RzLzE", "IA"]}} />
                </AuthProvider>
            </NextIntlClientProvider>
        );


        const button = screen.getByText("Run");
        fireEvent.click(button);
    });


    it('Rest client -> EditHeadersModal', async (props) => {
        const messages = await loadMessagesFile_en();

        const h: HttpHeader[] = [
            {
                seq: 1,
                key: "qwe",
                value: "123"
            }
        ];


        render(
            <NextIntlClientProvider messages={messages} locale={"en"}>
                <AuthProvider>
                    <EditHeadersModal onOk={() => {}} onCancel={() => {}} headers={h} />
                </AuthProvider>
            </NextIntlClientProvider>
        );


        const columnDel = screen.getByText("Del");
        expect(columnDel);


        const btnPlus = await screen.getByTitle("+");
        fireEvent.click(btnPlus);


        const inputs = screen.getAllByRole("textbox");
        for (let i = 0; inputs && i < inputs.length; i++) {
            const inp = inputs[i];

            fireEvent.change(inp, {key: "e", code: 49, target: {value: "ee"}}); //"1"
        }


        const btnsMinus = await screen.getAllByTitle("-");
        fireEvent.click(btnsMinus[0]);



        const btnSave = screen.getByText("Save");
        btnSave.click();
    });


    it('Rest client -> edit url', async (props) => {
        const messages = await loadMessagesFile_en();

        render(
            <NextIntlClientProvider messages={messages} locale={"en"}>
                <AuthProvider>
                    <RestfulClientPage params={{method: "POST", paramsBase64: []}} />
                </AuthProvider>
            </NextIntlClientProvider>
        );


        const tes = screen.getAllByTestId("text-editor-textarea");
        tes.forEach(function(te) {
            fireEvent.change(te, {key: "e", code: 49, target: {value: "ee"}}); //"1"
        })


        const sel = screen.getByTestId("http-method-selector-test");

    });

});



