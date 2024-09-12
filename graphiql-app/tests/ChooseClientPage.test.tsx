import React from 'react';
import {render, screen} from '@testing-library/react';
import {NextIntlClientProvider} from 'next-intl';
import ChooseClientPage from '../src/app/choose/page';
import AuthProvider from "@app/lib/auth/AuthProvider/AuthProvider";
import {AuthProps} from "@app/lib/auth/auth.types";
import {loadMessagesFile_en} from "./test_utils";
import {vi} from "vitest";
import SignIn from "@app/signin/page";
import SignUp from "@app/signup/page";
import HistoryPage from "@app/history/page";
import {
    consoleLogError,
    consoleLog,
    consoleLogValue,
    consoleLogValues,
    consoleLogValuesError, CHANGE_DEFAULT_DEBUG_VALUE
} from "@app/lib/utils/consoleUtils";


// @deprecated
const mockAuthProps: AuthProps = {
    isAuth: true,
    userId: 'test@example.com',
    email: 'test@example.com',
};


//Зкомментрровано, потому что решили грузить из файла через библиотеку test_utils
// @deprecated
const messagesMock = {
    CHOOSE: {welcome: 'Welcome'},
    REST_CLIENT: {title: 'REST Client'},
    GRAPHIQL_CLIENT: {title: 'GraphiQL Client'},
    HISTORY: {title: 'History'},
};



describe('ChooseClientPage', () => {

    it('renders the welcome message and links', async (props) => {
        const messages = await loadMessagesFile_en();
        // const messages = await loadMessagesFile_ru();

        render(
            <NextIntlClientProvider messages={messages} locale={"en"}>
                <AuthProvider>
                    <ChooseClientPage/>
                </AuthProvider>
            </NextIntlClientProvider>
        );

        expect(screen.getByText(/Welcome/)).toBeInTheDocument();
        expect(screen.getByText('REST Client')).toBeInTheDocument();
        expect(screen.getByText('GraphiQL Client')).toBeInTheDocument();
        expect(screen.getByText('History')).toBeInTheDocument();
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
    });


    it('test-history-page', async (props) => {
        const messages = await loadMessagesFile_en();

        render(
            <NextIntlClientProvider messages={messages} locale={"en"}>
                <AuthProvider>
                    <HistoryPage/>
                </AuthProvider>
            </NextIntlClientProvider>
        );

        expect(await screen.findAllByText("History", {exact: false})).not.toHaveLength(0);
        expect(await screen.findAllByText("You haven't executed any requests. It's empty here. Try:", {exact: false})).not.toHaveLength(0);
    });


    it('test-history-page2', async (props) => {
        const messages = await loadMessagesFile_en();

        vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
            const jsonObj = {"list":[{"userId":"1@2.ru","ts":1726140520632,"type":"REST","payload":{"method":"GET","url":"https://jsonplaceholder.typicode.com/posts/1","headers":[],"response":{"status":200,"text":"{\"userId\":1,\"id\":1,\"title\":\"sunt aut facere repellat provident occaecati excepturi optio reprehenderit\",\"body\":\"quia et suscipit\\nsuscipit recusandae consequuntur expedita et cum\\nreprehenderit molestiae ut ut quas totam\\nnostrum rerum est autem sunt rem eveniet architecto\"}"}}}]};
            return JSON.stringify(jsonObj);
        });


        render(
            <NextIntlClientProvider messages={messages} locale={"en"}>
                <AuthProvider>
                    <HistoryPage/>
                </AuthProvider>
            </NextIntlClientProvider>
        );

        expect(await screen.findAllByText("History", {exact: false})).not.toHaveLength(0);
        expect(await screen.findAllByText("Resp.Status", {exact: false})).not.toHaveLength(0);
    });


    it('test-console', async (props) => {

        expect(consoleLogError("123123123")).not.toThrow;
        expect(consoleLog("123123123")).not.toThrow;
        expect(consoleLogValue({key: 1, value: "test1"})).not.toThrow;
        expect(consoleLogValues({key: 1, value: "test1"}, {key: 2, value: "test2"})).not.toThrow;
        expect(consoleLogValuesError("123123123")).not.toThrow;

        CHANGE_DEFAULT_DEBUG_VALUE(false);

        expect(consoleLogError("123123123")).not.toThrow;
        expect(consoleLog("123123123")).not.toThrow;
        expect(consoleLogValue({key: 1, value: "test1"})).not.toThrow;
        expect(consoleLogValues({key: 1, value: "test1"}, {key: 2, value: "test2"})).not.toThrow;
        expect(consoleLogValuesError("123123123")).not.toThrow;
    });

});



