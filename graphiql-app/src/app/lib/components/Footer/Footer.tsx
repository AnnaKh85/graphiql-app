export default function Footer() {

    return (
        <div className={"row"}>
            <div className={"col-12"}>
                <ul className={"list-group list-group-horizontal navbar-rss ul-footer-rss"} style={{"overflow": "hidden"}}>
                    <li className={"list-group-item navbar-rss"} style={{"width": "100px"}}>
                        <a href="https://github.com/AnnaKh85" target={"_blank"}>
                            <i className="bi bi-github"></i>:Автор
                        </a>
                    </li>
                    <li className={"list-group-item navbar-rss"} style={{"width": "100px"}}>
                        <label>2024</label>
                    </li>
                    <li className={"list-group-item navbar-rss"} style={{"width": "100px"}}>
                        <a href="https://rs.school/react/" target={"_blank"}>
                            <img src="/rss-course-logo-1.png"
                                 className={"img-fluid"}
                                 alt="course logo" width="30" height="30"
                                 style={{"aspectRatio": "auto", "border": "1px", "borderStyle": "solid", "borderRadius": "3px"}}
                            />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

