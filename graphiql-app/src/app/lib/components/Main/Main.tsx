import Link from "next/link";

export default function Main() {


    return <div className={"row"}>
        <div className={"col"}>
            <form>
                <div className={"mb-3"}>
                    <label className={"form-label pt-3"} style={{"display": "block", "textAlign": "center"}}>
                        Welcome!
                    </label>
                </div>
                <div className={"mb-3"}>
                    <div className="form-text">
                        <Link href={"./signin"}>
                            <button className={"btn btn-primary btn-rss me-2"}>Sign In</button>
                        </Link>
                        <Link href={"./signup"}>
                            <button className={"btn btn-primary btn-rss me-2"}>Sign Up</button>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    </div>
}

