'use client';


import Header from "@app/lib/components/Header/Header";
import Main from "@app/lib/components/Main/Main";
import Footer from "@app/lib/components/Footer/Footer";
import {useEffect} from "react";
import {useRouter} from "next/navigation";


export default function Home() {
    const router = useRouter();

    useEffect(function() {
        if (typeof document !== undefined) {
            require("bootstrap");
            // require("bootstrap-icons");
            // require("@popperjs");
            // require("@popperjs/core");
        }
    }, []);




    return (
        <>
            <nav className={"navbar bg-body-tertiary"}>
                <Header />
            </nav>

            <div className={"container-fluid"}>
                <div className={"row"}>
                    <div className={"col-sm-12"}>
                        <Main />
                    </div>
                </div>
            </div>

            <footer className={"mt-auto p-2"} style={{"height": "60px", "backgroundColor": "#e4e4e4"}}>
                <Footer />
            </footer>
        </>
    );
}


