import React from 'react';
import {render, screen} from '@testing-library/react';
import {IntlProvider} from 'next-intl';
import {createRouter} from 'next-router-mock';
import ChooseClientPage from '../src/app/choose/page';
import {AUTH_CONTEXT} from "@app/lib/auth/AuthProvider/AuthProvider";

const mockAuthProps = {
    isAuth: true,
    email: 'test@example.com',
};

const messages = {
    CHOOSE: {welcome: 'Welcome'},
    REST_CLIENT: {title: 'REST Client'},
    GRAPHIQL_CLIENT: {title: 'GraphiQL Client'},
    HISTORY: {title: 'History'},
};

describe('ChooseClientPage', () => {
    it('renders the welcome message and links', () => {
        const router = createRouter({});

        render(
            <AUTH_CONTEXT.Provider value={{authProps: mockAuthProps}}>
                <IntlProvider messages={messages} locale="en">
                    <ChooseClientPage/>
                </IntlProvider>
            </AUTH_CONTEXT.Provider>
        );

        expect(screen.getByText(/Welcome/)).toBeInTheDocument();
        expect(screen.getByText('REST Client')).toBeInTheDocument();
        expect(screen.getByText('GraphiQL Client')).toBeInTheDocument();
        expect(screen.getByText('History')).toBeInTheDocument();
    });
});