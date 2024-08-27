'use client';


import Main from "@app/lib/components/Main/Main";
import {useEffect} from "react";
import {useRouter} from "next/navigation";


export default function Home() {
    const router = useRouter();

    // useEffect(function() {
    //     if (typeof document !== undefined) {
    //         require("bootstrap");
    //     }
    // }, []);




    return (
        <div className={"container-fluid"}>
            <div className={"row"}>
                <div className={"col-sm-12"}>
                    <Main />
                </div>
            </div>
        </div>
    );
}


