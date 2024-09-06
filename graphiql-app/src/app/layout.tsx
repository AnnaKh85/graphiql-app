import type {Metadata} from "next";
import "./globals.css";
import "../../public/bootstrap-icons.min.css";
import "./applications.scss";
import React from "react";
import Header from "@app/lib/components/Header/Header";
import Footer from "@app/lib/components/Footer/Footer";
import AuthProvider from "@app/lib/auth/AuthProvider/AuthProvider";
import {NextIntlClientProvider} from "next-intl";
import {getMessages, getLocale} from "next-intl/server";
import ErrorBoundary from "@app/lib/ErrorBoundary";


export const metadata: Metadata = {
    title: "GraphiQL Client v1",
    description: "Anna Kh"
};


export default async function RootLayout({children, params}: Readonly<{children: React.ReactNode;} & {params: {locale: string}}>) {
    const messages = await getMessages();
    const locale = await getLocale();


    return (
        <html lang={locale}>
            <head>
                <title>GraphiQL Client v1</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />

                {/*Ниже js для bootstrap*/}
                <script src="/bootstrap.bundle.min.js"
                        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
                        crossOrigin="anonymous" async></script>
            </head>
            <body className={"d-flex flex-column min-vh-100"}>
                <AuthProvider>
                    <NextIntlClientProvider messages={messages}>
                        <nav className={"navbar fixed-top p-0 navbar-rss"}>
                            <Header />
                        </nav>

                        <div className={"position-relative min-vw-100"} >
                            <div className={"position-absolute start-50 translate-middle-x"} style={{"paddingTop": "80px", "paddingBottom": "60px"}}>
                                {children}
                            </div>
                        </div>

                        <footer className={"mt-auto py-1 w-100 position-absolute bottom-0 start-50 translate-middle-x"}>
                            <Footer />
                        </footer>
                    </NextIntlClientProvider>
                </AuthProvider>
            </body>
        </html>
    );
}

