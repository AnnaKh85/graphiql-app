import Link from "next/link";

export default function Header() {
    return (
        <div className={"container-fluid"}>
            <Link className={"navbar-brand"} href={"/"}>
                <img src="/logo-1.png"
                     className={"img-fluid"}
                     alt="Логотип" width="60" height="60"
                     style={{"aspectRatio": "auto", "border": "1px", "borderStyle": "solid", "borderRadius": "6px"}}
                />
            </Link>

            <div className={"d-flex"}>
                <select className={"form-select me-2"} defaultValue={"RU"} style={{"width": "220px"}}>
                    <option value={"RU"}>Русский</option>
                    <option value={"EN"}>English</option>
                </select>
                <Link href={"./signin"}>
                    <button className={"btn btn-outline-secondary btn-rss me-2"} type="button">
                        Sign In
                    </button>
                </Link>
                <Link href={"./signup"}>
                    <button className={"btn btn-outline-secondary btn-rss me-2"} type="button">
                        Sign Up
                    </button>
                </Link>
                <button className={"btn btn-outline-secondary btn-rss me-2"} type="button">
                    Выход
                    &nbsp;
                    <i className="bi bi-door-open"></i>
                </button>
            </div>
        </div>
    );

}

