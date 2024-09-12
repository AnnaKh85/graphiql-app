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
import RootLayout, {metadata} from "@app/layout";



describe('MainPage', () => {

    it('main layout', async (props) => {

        const md = metadata;


        // render (
        //     <RootLayout params={{locale: "en"}}>
        //         <br>123</br>
        //     </RootLayout>
        // );

    });

});



