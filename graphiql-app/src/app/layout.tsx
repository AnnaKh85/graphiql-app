import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import "../../public/bootstrap-icons.min.css";
import "./applications.scss";
import LanguageProvider from "@app/lib/LanguageProvider/LanguageProvider";
import React from "react";
import Header from "@app/lib/components/Header/Header";
import Footer from "@app/lib/components/Footer/Footer";
import AuthProvider from "@app/lib/auth/AuthProvider/AuthProvider";



const inter = Inter({subsets: ["latin"]});



export const metadata: Metadata = {
    title: "GraphiQL Client v1",
    description: "Anna Kh"
};

export default function RootLayout({children, }: Readonly<{children: React.ReactNode;}>) {


    return (
        <html lang="en">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                {/*<script src="/bootstrap.bundle.min.js"*/}
                {/*        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"*/}
                {/*        crossOrigin="anonymous" async></script>*/}
            </head>
            <body className={"d-flex flex-column min-vh-100"}>
                <LanguageProvider>
                    <AuthProvider>
                        <nav className={"navbar navbar-rss"}>
                            <Header />
                        </nav>

                        <div className={"position-relative m-2 min-vw-100"}>
                            <div className={"position-absolute start-50 translate-middle-x"}>
                                {children}
                            </div>
                        </div>

                        <footer className={"mt-auto p-2"} style={{"height": "60px"}}>
                            <Footer />
                        </footer>
                    </AuthProvider>
                </LanguageProvider>
            </body>
        </html>
    );
}

