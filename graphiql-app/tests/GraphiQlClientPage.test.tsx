import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {NextIntlClientProvider} from 'next-intl';
import AuthProvider from "@app/lib/auth/AuthProvider/AuthProvider";
import {loadMessagesFile_en} from "./test_utils";
import RestfulClientPage from "@app/(clients)/restfulClient/[method]/[[...paramsBase64]]/page";
import {expect} from "vitest";
import {EditHeadersModal} from "@app/lib/components/EditHeadersModal/EditHeadersModal";
import {HttpHeader} from "@app/lib/types/types";
import {aw} from "vitest/dist/chunks/reporters.C_zwCd4j";
import GraphiQlClientPage from "@app/(clients)/graphiQlClient/page";


describe('GraphiQlClientPage', () => {

    it('render GraphiQl Page', async (props) => {
        const messages = await loadMessagesFile_en();

        render(
            <NextIntlClientProvider messages={messages} locale={"en"}>
                <AuthProvider>
                    <GraphiQlClientPage />
                </AuthProvider>
            </NextIntlClientProvider>
        );

    });



});



