import React from 'react';
import {render, screen} from '@testing-library/react';
import {NextIntlClientProvider} from 'next-intl';
import ChooseClientPage from '../src/app/choose/page';
import AuthProvider from "@app/lib/auth/AuthProvider/AuthProvider";
import {AuthProps} from "@app/lib/auth/auth.types";
import {loadMessagesFile_en} from "./test_utils";


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


vi.mock("next/navigation", async () => {
    const actual = await vi.importActual('next/navigation');
    return {
        ...actual,
        useRouter: vi.fn(() => ({
            push: vi.fn(),
            replace: vi.fn(),
        })),
        useSearchParams: vi.fn(() => ({
            // get: vi.fn(),
        })),
        usePathname: vi.fn(),
    };
});


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
});



