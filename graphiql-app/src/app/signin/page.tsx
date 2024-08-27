'use client';


import Link from "next/link";
import {useRouter} from "next/navigation";

export default function SignIn() {
    const router = useRouter();

    function handleOk() {
        router.push("/choose")
    }


    return (
        <div className={"card"} style={{"width": "18rem"}}>
            <div className={"card-body"}>
                <h5 className={"card-title"}>Вход в программу</h5>
                <form>
                    <div className={"mb-3"}>
                        <label htmlFor="inputEmail" className={"form-label"}>Email</label>
                        <input type="email" className="form-control" id="inputEmail" placeholder="email"/>
                    </div>
                    <div className={"mb-3"}>
                        <label htmlFor="inputPass" className={"form-label"}>Password</label>
                        <input type="password" className="form-control" id="inputPass" placeholder="password"/>
                    </div>
                </form>
            </div>
            <div className="card-footer d-flex justify-content-center">
                <button type="button" className={"btn btn-secondary btn-rss mb-3 me-1"} onClick={handleOk}>Вход</button>
                <Link href={"./"}>
                    <button className={"btn btn-secondary btn-rss mb-3"}>Отмена</button>
                </Link>
            </div>
        </div>
    );
}


