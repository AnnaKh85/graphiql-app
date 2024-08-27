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
                    <div className="form-text" style={{"display": "block", "textAlign": "center"}}>
                        <button className={"btn btn-primary btn-rss me-2"}>Sign In</button>
                        <button className={"btn btn-primary btn-rss me-2"}>Sign Up</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
}

